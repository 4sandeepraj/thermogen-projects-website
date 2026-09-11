<?php
/*
Plugin Name: TPPL SureForms Bridge
Description: Native bridge between Google AI Studio inquiry form and WordPress SureForms Form 1591 via internal REST dispatch.
Version: 2.3.0
Author: Thermogen Projects Private Limited
License: GPLv2 or later
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class TPPL_SureForms_Bridge {

    /**
     * Target SureForms Form ID - strictly locked server-side.
     */
    const TARGET_FORM_ID = 1591;

    /**
     * REST API Namespace for this bridge.
     */
    const REST_NAMESPACE = 'tppl/v1';

    /**
     * Option key for stored Bridge Secret Key.
     */
    const OPTION_BRIDGE_KEY = 'tppl_bridge_key';

    /**
     * Option key for last submission/test diagnostic result.
     */
    const OPTION_LAST_RESULT = 'tppl_last_submission_result';

    /**
     * Canonical SureForms internal submission route.
     */
    const SUREFORMS_SUBMIT_ROUTE = '/sureforms/v1/submit-form';

    /**
     * Singleton instance.
     */
    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Register REST API Routes
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );

        // LiteSpeed Cache and proxy cache exclusion headers
        add_action( 'rest_api_init', array( $this, 'configure_cache_exclusions' ) );

        // Strict CORS handling for authorized frontend origins only
        add_action( 'rest_pre_serve_request', array( $this, 'handle_cors_headers' ), 10, 4 );

        // WordPress Admin Settings and Diagnostics
        add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
        add_action( 'admin_init', array( $this, 'register_admin_settings' ) );
        add_action( 'admin_post_tppl_run_diagnostic_test', array( $this, 'handle_admin_diagnostic_test' ) );
    }

    /**
     * Register Admin Menu Page under Settings.
     */
    public function register_admin_menu() {
        add_options_page(
            'TPPL SureForms Bridge',
            'TPPL SureForms Bridge',
            'manage_options',
            'tppl-sureforms-bridge',
            array( $this, 'render_admin_page' )
        );
    }

    /**
     * Register Admin Settings and Sanitization.
     */
    public function register_admin_settings() {
        register_setting(
            'tppl_bridge_settings_group',
            self::OPTION_BRIDGE_KEY,
            array(
                'type'              => 'string',
                'sanitize_callback' => array( $this, 'sanitize_bridge_key' ),
                'default'           => '',
            )
        );
    }

    /**
     * Sanitize Bridge Key when saving in Admin.
     */
    public function sanitize_bridge_key( $input ) {
        $input = sanitize_text_field( trim( (string) $input ) );
        if ( strpos( $input, '••••' ) !== false ) {
            return get_option( self::OPTION_BRIDGE_KEY, '' );
        }
        return $input;
    }

    /**
     * Admin action to trigger a self-diagnostic test submission to Form 1591.
     */
    public function handle_admin_diagnostic_test() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( 'Unauthorized' );
        }

        check_admin_referer( 'tppl_diagnostic_test_nonce' );

        // Run internal test submission to Form 1591 using native payload
        $test_result = $this->dispatch_to_sureforms(
            self::TARGET_FORM_ID,
            array(
                'name'    => 'TPPL Admin Diagnostic Test',
                'email'   => 'info@thermogenprojects.com',
                'phone'   => '+91 9876543210',
                'company' => 'Thermogen Projects Diagnostics',
                'service' => 'Combustion Audit & Revamp',
                'message' => 'Automated diagnostic test submission executed from TPPL SureForms Bridge Admin panel.',
            )
        );

        // Update last result option for diagnostic display
        update_option( self::OPTION_LAST_RESULT, array(
            'timestamp'     => current_time( 'mysql' ),
            'form_id'       => self::TARGET_FORM_ID,
            'is_success'    => $test_result['success'],
            'entry_id'      => $test_result['entry_id'],
            'http_status'   => $test_result['http_status'],
            'error_message' => $test_result['error'],
            'response_data' => $test_result['raw_response'],
            'route_used'    => $test_result['route'],
            'native_keys'   => $test_result['native_keys'],
        ) );

        $redirect_url = add_query_arg(
            array(
                'page'         => 'tppl-sureforms-bridge',
                'tppl_tested'  => 1,
                'tppl_success' => $test_result['success'] ? 1 : 0,
            ),
            admin_url( 'options-general.php' )
        );

        wp_safe_redirect( $redirect_url );
        exit;
    }

    /**
     * Render WordPress Admin Diagnostics & Settings Page.
     */
    public function render_admin_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        $form_id               = self::TARGET_FORM_ID;
        $form_post             = get_post( $form_id );
        $sureforms_route       = self::SUREFORMS_SUBMIT_ROUTE;
        $sureforms_route_found = $this->verify_sureforms_route();
        $field_map             = $this->resolve_form_field_map( $form_id );
        $last_result           = get_option( self::OPTION_LAST_RESULT, null );
        $saved_key             = (string) get_option( self::OPTION_BRIDGE_KEY, '' );
        $is_key_set            = ! empty( $saved_key );
        $masked_key            = $is_key_set ? substr( $saved_key, 0, 4 ) . '••••••••' . substr( $saved_key, -4 ) : '';
        $endpoint_url          = rest_url( self::REST_NAMESPACE . '/contact' );
        $token_class_exists    = class_exists( '\SRFM\Inc\Submit_Token' ) && method_exists( '\SRFM\Inc\Submit_Token', 'generate' );
        $sample_token          = $token_class_exists ? \SRFM\Inc\Submit_Token::generate( $form_id ) : 'N/A (Submit_Token class not found)';

        if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] ) {
            add_settings_error( 'tppl_messages', 'tppl_message', __( 'Bridge settings saved successfully.', 'tppl-sureforms-bridge' ), 'updated' );
        }

        if ( isset( $_GET['tppl_tested'] ) ) {
            if ( ! empty( $_GET['tppl_success'] ) ) {
                add_settings_error( 'tppl_messages', 'tppl_test_ok', __( 'Diagnostic test submission succeeded! SureForms accepted the submission.', 'tppl-sureforms-bridge' ), 'updated' );
            } else {
                add_settings_error( 'tppl_messages', 'tppl_test_fail', __( 'Diagnostic test submission failed. Review the diagnostic output below.', 'tppl-sureforms-bridge' ), 'error' );
            }
        }
        ?>
        <div class="wrap" style="max-width: 1000px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
            <h1 style="display: flex; align-items: center; gap: 10px; font-size: 24px; font-weight: 700; color: #082e57; margin-bottom: 8px;">
                <span style="display: inline-block; width: 14px; height: 14px; background: #e06311; border-radius: 3px;"></span>
                TPPL SureForms Bridge v2.3.0
            </h1>
            <p style="color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 24px;">
                Internal REST bridge connecting Google AI Studio contact form to SureForms Form ID <?php echo esc_html( $form_id ); ?> using native REST dispatch.
            </p>

            <?php settings_errors( 'tppl_messages' ); ?>

            <!-- AUDIT SECTION 1: System Status -->
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <h2 style="margin-top: 0; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px; color: #1e293b;">1. System Integration Status</h2>
                <table class="form-table" role="presentation" style="margin-top: 0;">
                    <tbody>
                        <tr>
                            <th scope="row"><strong>Target Form ID</strong></th>
                            <td>
                                <code><?php echo esc_html( $form_id ); ?></code>
                                <?php if ( $form_post ) : ?>
                                    <span style="color: #059669; font-size: 12px; margin-left: 8px; font-weight: 600;">✓ Found: "<?php echo esc_html( $form_post->post_title ); ?>" (Post Type: <?php echo esc_html( $form_post->post_type ); ?>)</span>
                                <?php else : ?>
                                    <span style="color: #dc2626; font-size: 12px; margin-left: 8px; font-weight: 600;">✗ Form ID <?php echo esc_html( $form_id ); ?> post not found in wp_posts</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Native SureForms Route</strong></th>
                            <td>
                                <code><?php echo esc_html( $sureforms_route ); ?></code>
                                <?php if ( $sureforms_route_found ) : ?>
                                    <span style="color: #059669; font-size: 12px; margin-left: 8px; font-weight: 600;">✓ Active in WordPress REST Server</span>
                                <?php else : ?>
                                    <span style="color: #d97706; font-size: 12px; margin-left: 8px; font-weight: 600;">(Dynamic SureForms Route)</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Submit Token Class</strong></th>
                            <td>
                                <code>\SRFM\Inc\Submit_Token::generate()</code>
                                <?php if ( $token_class_exists ) : ?>
                                    <span style="color: #059669; font-size: 12px; margin-left: 8px; font-weight: 600;">✓ Verified & Loaded from installed SureForms plugin</span>
                                <?php else : ?>
                                    <span style="color: #dc2626; font-size: 12px; margin-left: 8px; font-weight: 600;">✗ Class \SRFM\Inc\Submit_Token not found</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>TPPL Bridge Endpoint</strong></th>
                            <td>
                                <code style="padding: 4px 8px; background: #f1f5f9; border-radius: 4px; font-size: 13px; color: #0f172a; user-select: all;"><?php echo esc_url( $endpoint_url ); ?></code>
                                <p class="description">Receives incoming inquiries from Google AI Studio and dispatches them internally.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Bridge Secret Key</strong></th>
                            <td>
                                <?php if ( $is_key_set ) : ?>
                                    <span style="color: #059669; font-weight: 600;">Configured</span>
                                    <span style="font-family: monospace; background: #f8fafc; padding: 2px 8px; border: 1px solid #e2e8f0; border-radius: 4px; margin-left: 8px;"><?php echo esc_html( $masked_key ); ?></span>
                                <?php else : ?>
                                    <span style="color: #d97706; font-weight: 600;">Not Configured</span>
                                    <p class="description">Set a secret key below to protect your REST endpoint from unauthorized submissions.</p>
                                <?php endif; ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- AUDIT SECTION 2: Exact Resolved Native SureForms Fields -->
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <h2 style="margin-top: 0; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px; color: #1e293b;">2. Resolved Form 1591 Native Fields (via parse_blocks)</h2>
                <p class="description" style="margin-bottom: 16px;">
                    Each field is resolved from Form 1591's Gutenberg blocks. The bridge constructs <strong>ONLY</strong> the exact native key required by SureForms (<code>srfm-{type}-{block_id}-lbl-{encoded_label}-{slug}</code>). Zero guessed duplicate keys, zero fallback labels as keys, and zero <code>fields[]</code> wrappers are sent.
                </p>

                <?php if ( ! empty( $field_map['resolved'] ) ) : ?>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px;">
                        <thead>
                            <tr style="background: #f8fafc; text-align: left;">
                                <th style="padding: 8px 10px; border: 1px solid #e2e8f0;">Field Role</th>
                                <th style="padding: 8px 10px; border: 1px solid #e2e8f0;">Exact Native SureForms Field Key</th>
                                <th style="padding: 8px 10px; border: 1px solid #e2e8f0;">Block ID</th>
                                <th style="padding: 8px 10px; border: 1px solid #e2e8f0;">Slug</th>
                                <th style="padding: 8px 10px; border: 1px solid #e2e8f0;">Block Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ( $field_map['resolved'] as $role => $info ) : ?>
                                <tr>
                                    <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-weight: 600; text-transform: capitalize; color: #082e57;">
                                        <?php echo esc_html( $role ); ?>
                                        <?php if ( 'email' === $role ) : ?>
                                            <span style="display: block; font-size: 11px; color: #059669; font-weight: normal;">Resolves {form:email}</span>
                                        <?php endif; ?>
                                    </td>
                                    <td style="padding: 8px 10px; border: 1px solid #e2e8f0;">
                                        <code style="font-size: 12px; color: #0f172a; word-break: break-all;"><?php echo esc_html( $info['native_key'] ); ?></code>
                                    </td>
                                    <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-family: monospace;"><?php echo esc_html( $info['block_id'] ); ?></td>
                                    <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-family: monospace;"><?php echo esc_html( $info['slug'] ); ?></td>
                                    <td style="padding: 8px 10px; border: 1px solid #e2e8f0; color: #64748b;"><?php echo esc_html( $info['block_name'] ); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else : ?>
                    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 16px; color: #64748b;">
                        <p style="margin: 0;">No Gutenberg blocks were parsed from Form 1591's <code>post_content</code>. Please verify that Form 1591 exists and contains SureForms blocks.</p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- AUDIT SECTION 3: Exact Native Submission Specification -->
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <h2 style="margin-top: 0; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px; color: #1e293b;">3. Native SureForms Submission Specification</h2>

                <table class="form-table" role="presentation" style="margin-top: 0;">
                    <tbody>
                        <tr>
                            <th scope="row"><strong>Internal REST Route</strong></th>
                            <td><code>POST /sureforms/v1/submit-form</code> (Dispatched via <code>rest_do_request()</code>)</td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Content-Type</strong></th>
                            <td><code>application/json</code></td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Form ID Parameter</strong></th>
                            <td><code>form-id: 1591</code> (Required by SureForms <code>Form_Submit::submit_form_permissions_check</code>)</td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Authentication Header</strong></th>
                            <td>
                                <code>X-WP-Submit-Token: <?php echo esc_html( substr( $sample_token, 0, 18 ) . '...' ); ?></code>
                                <p class="description" style="margin-top: 4px;">Direct call to native <code>\SRFM\Inc\Submit_Token::generate( 1591 )</code>.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Required Hidden Metadata</strong></th>
                            <td>
                                <code>srfm-honeypot-field: ""</code> (Required to pass anti-spam check)<br/>
                                <code>srfm-form-language: "<?php echo esc_html( substr( get_locale() ? get_locale() : 'en', 0, 2 ) ); ?>"</code> (Multilingual tag)<br/>
                                <code>srfm-sender-email-field: ""</code> (Form structure attribute)
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>Email Notification</strong></th>
                            <td>
                                <strong>Native SureForms Email Engine</strong>: Triggers Form 1591's existing notification to <code>info@thermogenprojects.com</code>.
                                <br/><span style="color: #64748b; font-size: 12px;">Reply-To resolves dynamically from <code>{form:email}</code> matching the native email field slug.</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- AUDIT SECTION 4: Last Test / Submission Result -->
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 16px; color: #1e293b;">4. Diagnostic Test & Last Submission Result</h2>
                    <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="margin: 0;">
                        <input type="hidden" name="action" value="tppl_run_diagnostic_test" />
                        <?php wp_nonce_field( 'tppl_diagnostic_test_nonce' ); ?>
                        <button type="submit" class="button button-secondary" style="display: inline-flex; align-items: center; gap: 6px;">
                            Run Diagnostic Test Submission Now
                        </button>
                    </form>
                </div>

                <?php if ( $last_result ) : ?>
                    <table class="form-table" role="presentation" style="margin-top: 0;">
                        <tbody>
                            <tr>
                                <th scope="row"><strong>Timestamp</strong></th>
                                <td><?php echo esc_html( $last_result['timestamp'] ); ?></td>
                            </tr>
                            <tr>
                                <th scope="row"><strong>Status</strong></th>
                                <td>
                                    <?php if ( ! empty( $last_result['is_success'] ) ) : ?>
                                        <span style="display: inline-flex; align-items: center; gap: 6px; background: #ecfdf5; color: #065f46; padding: 3px 10px; border-radius: 12px; font-weight: 600; font-size: 12px;">
                                            SUCCESS (HTTP <?php echo esc_html( $last_result['http_status'] ); ?>)
                                        </span>
                                    <?php else : ?>
                                        <span style="display: inline-flex; align-items: center; gap: 6px; background: #fef2f2; color: #991b1b; padding: 3px 10px; border-radius: 12px; font-weight: 600; font-size: 12px;">
                                            FAILED (HTTP <?php echo esc_html( $last_result['http_status'] ); ?>)
                                        </span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><strong>SureForms Entry ID</strong></th>
                                <td>
                                    <?php echo ! empty( $last_result['entry_id'] ) ? esc_html( $last_result['entry_id'] ) : '<em>(Recorded in wp_srfm_entries)</em>'; ?>
                                </td>
                            </tr>
                            <?php if ( ! empty( $last_result['error_message'] ) ) : ?>
                                <tr>
                                    <th scope="row"><strong>Error Message</strong></th>
                                    <td style="color: #dc2626;"><code><?php echo esc_html( $last_result['error_message'] ); ?></code></td>
                                </tr>
                            <?php endif; ?>
                            <?php if ( ! empty( $last_result['native_keys'] ) && is_array( $last_result['native_keys'] ) ) : ?>
                                <tr>
                                    <th scope="row"><strong>Dispatched Native Keys</strong></th>
                                    <td>
                                        <ul style="margin: 0; padding-left: 20px; font-family: monospace; font-size: 12px;">
                                            <?php foreach ( $last_result['native_keys'] as $k => $v ) : ?>
                                                <li><strong><?php echo esc_html( $k ); ?></strong>: <?php echo esc_html( is_scalar( $v ) ? (string) $v : json_encode( $v ) ); ?></li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </td>
                                </tr>
                            <?php endif; ?>
                            <tr>
                                <th scope="row"><strong>Route Used</strong></th>
                                <td><code><?php echo esc_html( ! empty( $last_result['route_used'] ) ? $last_result['route_used'] : self::SUREFORMS_SUBMIT_ROUTE ); ?></code></td>
                            </tr>
                        </tbody>
                    </table>
                <?php else : ?>
                    <p style="color: #64748b; margin: 0;">No test submission recorded yet. Click <strong>"Run Diagnostic Test Submission Now"</strong> above to perform an internal test.</p>
                <?php endif; ?>
            </div>

            <!-- SETTINGS FORM: Configure Bridge Key -->
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <h2 style="margin-top: 0; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px; color: #1e293b;">5. Configure TPPL Bridge Key</h2>

                <form method="post" action="options.php">
                    <?php
                    settings_fields( 'tppl_bridge_settings_group' );
                    do_settings_sections( 'tppl_bridge_settings_group' );
                    ?>
                    <table class="form-table" role="presentation">
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <label for="<?php echo esc_attr( self::OPTION_BRIDGE_KEY ); ?>">Bridge Secret Key</label>
                                </th>
                                <td>
                                    <input
                                        type="password"
                                        id="<?php echo esc_attr( self::OPTION_BRIDGE_KEY ); ?>"
                                        name="<?php echo esc_attr( self::OPTION_BRIDGE_KEY ); ?>"
                                        value="<?php echo esc_attr( $is_key_set ? '••••••••••••••••' : '' ); ?>"
                                        class="regular-text"
                                        autocomplete="new-password"
                                        placeholder="Enter a secure random secret key"
                                    />
                                    <button type="button" class="button button-secondary" onclick="generateRandomKey()" style="margin-left: 6px;">
                                        Generate Key
                                    </button>
                                    <p class="description" style="margin-top: 6px;">
                                        This secret key authorizes incoming POST requests from the Google AI Studio frontend. Leave blank to disable bridge key authentication during initial testing.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="submit" style="margin-bottom: 0;">
                        <?php submit_button( 'Save Bridge Settings', 'primary', 'submit', false ); ?>
                    </p>
                </form>
            </div>
        </div>

        <script>
        function generateRandomKey() {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
            var key = '';
            var array = new Uint8Array(32);
            window.crypto.getRandomValues(array);
            for (var i = 0; i < 32; i++) {
                key += chars.charAt(array[i] % chars.length);
            }
            var input = document.getElementById('<?php echo esc_js( self::OPTION_BRIDGE_KEY ); ?>');
            if (input) {
                input.type = 'text';
                input.value = key;
            }
        }
        </script>
        <?php
    }

    /**
     * Register REST API routes:
     * - POST /wp-json/tppl/v1/contact
     * - POST /wp-json/tppl/v1/inquiry
     */
    public function register_rest_routes() {
        register_rest_route(
            self::REST_NAMESPACE,
            '/contact',
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'handle_incoming_submission' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => $this->get_endpoint_args(),
            )
        );

        register_rest_route(
            self::REST_NAMESPACE,
            '/inquiry',
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'handle_incoming_submission' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => $this->get_endpoint_args(),
            )
        );
    }

    /**
     * Input argument definitions.
     */
    private function get_endpoint_args() {
        return array(
            'name'    => array(
                'required'          => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'email'   => array(
                'required'          => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_email',
            ),
            'phone'   => array(
                'required'          => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'company' => array(
                'required'          => false,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '',
            ),
            'service' => array(
                'required'          => false,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => 'Industrial Combustion Systems',
            ),
            'message' => array(
                'required'          => true,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_textarea_field',
            ),
            'website' => array(
                'required'          => false,
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '',
            ),
        );
    }

    /**
     * Permission check:
     * Validates bridge secret key and applies anti-spam rate limiting.
     */
    public function check_permission( WP_REST_Request $request ) {
        $saved_key = (string) get_option( self::OPTION_BRIDGE_KEY, '' );

        if ( ! empty( $saved_key ) ) {
            $header_key = $request->get_header( 'x_tppl_bridge_key' );
            if ( empty( $header_key ) ) {
                $header_key = $request->get_header( 'x-tppl-bridge-key' );
            }
            if ( empty( $header_key ) ) {
                $auth_header = $request->get_header( 'authorization' );
                if ( ! empty( $auth_header ) && preg_match( '/Bearer\s+(.*)$/i', $auth_header, $matches ) ) {
                    $header_key = trim( $matches[1] );
                }
            }

            if ( empty( $header_key ) || ! hash_equals( $saved_key, (string) $header_key ) ) {
                return new WP_Error(
                    'tppl_unauthorized',
                    __( 'Unauthorized: Invalid or missing TPPL Bridge Key.', 'tppl-sureforms-bridge' ),
                    array( 'status' => 401 )
                );
            }
        }

        // Anti-Spam: Rate limiting per IP (20 inquiries per 10 minutes)
        $ip            = $this->get_client_ip();
        $transient_key = 'tppl_rate_' . md5( $ip );
        $count         = (int) get_transient( $transient_key );

        if ( $count >= 20 ) {
            return new WP_Error(
                'rate_limit_exceeded',
                __( 'Too many inquiries submitted from this network. Please wait a few minutes or contact us directly at info@thermogenprojects.com.', 'tppl-sureforms-bridge' ),
                array( 'status' => 429 )
            );
        }

        set_transient( $transient_key, $count + 1, 10 * MINUTE_IN_SECONDS );
        return true;
    }

    /**
     * Configure cache exclusions for LiteSpeed Cache and proxy headers.
     */
    public function configure_cache_exclusions() {
        if ( ! headers_sent() ) {
            nocache_headers();
            header( 'X-LiteSpeed-Cache-Control: no-cache' );
            header( 'Cache-Control: no-store, no-cache, must-revalidate, max-age=0' );
            header( 'Pragma: no-cache' );
            header( 'Expires: 0' );
        }
        if ( ! defined( 'DONOTCACHEPAGE' ) ) {
            define( 'DONOTCACHEPAGE', true );
        }
    }

    /**
     * Handle strict CORS headers for authorized origins only.
     */
    public function handle_cors_headers( $served, $result, $request, $server ) {
        $origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_ORIGIN'] ) ) : '';

        $allowed = false;
        if ( ! empty( $origin ) ) {
            $parsed = wp_parse_url( $origin );
            $host   = isset( $parsed['host'] ) ? strtolower( $parsed['host'] ) : '';

            if (
                $host === 'thermogenprojects.com' ||
                $host === 'www.thermogenprojects.com' ||
                ( strlen( $host ) >= 8 && substr( $host, -8 ) === '.run.app' ) ||
                $host === 'localhost' ||
                $host === '127.0.0.1'
            ) {
                $allowed = true;
            }
        }

        if ( $allowed ) {
            header( 'Access-Control-Allow-Origin: ' . $origin );
            header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
            header( 'Access-Control-Allow-Headers: Content-Type, X-TPPL-Bridge-Key, Authorization' );
            header( 'Access-Control-Allow-Credentials: true' );
        }

        if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
            status_header( 204 );
            exit;
        }

        return $served;
    }

    /**
     * Main submission handler:
     * 1. Validates inputs & honeypot.
     * 2. Resolves actual SureForms Form 1591 block attributes via parse_blocks().
     * 3. Constructs ONLY the exact native SureForms payload.
     * 4. Dispatches internal request via rest_do_request() to /sureforms/v1/submit-form with X-WP-Submit-Token.
     * 5. Checks response status and data, returning true status to AI Studio only on success.
     * 6. Updates diagnostic option for administrator review.
     */
    public function handle_incoming_submission( WP_REST_Request $request ) {
        // 1. Honeypot check
        $website = trim( (string) $request->get_param( 'website' ) );
        if ( ! empty( $website ) ) {
            return rest_ensure_response( array(
                'success' => true,
                'message' => 'Thank you. Your inquiry has been submitted successfully. Our team will get back to you shortly.',
            ) );
        }

        // 2. Extract & validate inputs
        $name    = sanitize_text_field( $request->get_param( 'name' ) );
        $email   = sanitize_email( $request->get_param( 'email' ) );
        $phone   = sanitize_text_field( $request->get_param( 'phone' ) );
        $company = sanitize_text_field( $request->get_param( 'company' ) );
        $service = sanitize_text_field( $request->get_param( 'service' ) );
        $message = sanitize_textarea_field( $request->get_param( 'message' ) );

        if ( empty( $name ) || mb_strlen( $name ) < 2 ) {
            return new WP_Error(
                'invalid_name',
                __( 'Please provide a valid contact name (minimum 2 characters).', 'tppl-sureforms-bridge' ),
                array( 'status' => 400 )
            );
        }

        if ( ! is_email( $email ) ) {
            return new WP_Error(
                'invalid_email',
                __( 'Please provide a valid business email address.', 'tppl-sureforms-bridge' ),
                array( 'status' => 400 )
            );
        }

        if ( empty( $phone ) || mb_strlen( $phone ) < 6 ) {
            return new WP_Error(
                'invalid_phone',
                __( 'Please provide a valid contact phone number (minimum 6 digits).', 'tppl-sureforms-bridge' ),
                array( 'status' => 400 )
            );
        }

        if ( empty( $message ) || mb_strlen( $message ) < 5 ) {
            return new WP_Error(
                'invalid_message',
                __( 'Please provide project scope or inquiry details (minimum 5 characters).', 'tppl-sureforms-bridge' ),
                array( 'status' => 400 )
            );
        }

        // Deduplication (30-second window)
        $dup_hash      = md5( $email . '|' . $phone . '|' . $service . '|' . $message );
        $dup_transient = 'tppl_dup_' . $dup_hash;
        if ( get_transient( $dup_transient ) ) {
            return rest_ensure_response( array(
                'success'   => true,
                'message'   => 'Thank you. Your inquiry has been submitted successfully. Our team will get back to you shortly.',
                'duplicate' => true,
            ) );
        }
        set_transient( $dup_transient, 1, 30 );

        $form_id = self::TARGET_FORM_ID;

        // 3. Dispatch internally to SureForms using exact native payload
        $dispatch_result = $this->dispatch_to_sureforms( $form_id, array(
            'name'    => $name,
            'email'   => $email,
            'phone'   => $phone,
            'company' => $company,
            'service' => $service,
            'message' => $message,
        ) );

        // 4. Update last submission diagnostic result
        update_option( self::OPTION_LAST_RESULT, array(
            'timestamp'     => current_time( 'mysql' ),
            'form_id'       => $form_id,
            'is_success'    => $dispatch_result['success'],
            'entry_id'      => $dispatch_result['entry_id'],
            'http_status'   => $dispatch_result['http_status'],
            'error_message' => $dispatch_result['error'],
            'response_data' => $dispatch_result['raw_response'],
            'route_used'    => $dispatch_result['route'],
            'native_keys'   => $dispatch_result['native_keys'],
        ) );

        // 5. Return true status to AI Studio only upon verified SureForms acceptance
        if ( ! $dispatch_result['success'] ) {
            return new WP_Error(
                'sureforms_submission_failed',
                __( 'We couldn\'t send your inquiry right now. Please try again or contact us directly at info@thermogenprojects.com.', 'tppl-sureforms-bridge' ),
                array(
                    'status'  => 502,
                    'details' => $dispatch_result['error'],
                )
            );
        }

        return rest_ensure_response( array(
            'success'  => true,
            'message'  => 'Thank you. Your inquiry has been submitted successfully. Our team will get back to you shortly.',
            'form_id'  => $form_id,
            'entry_id' => $dispatch_result['entry_id'],
        ) );
    }

    /**
     * Dispatch submission internally to SureForms using rest_do_request().
     *
     * Exact native payload rules:
     * 1. Parameter 'form-id' is integer 1591 (exact parameter name expected by SureForms).
     * 2. Header 'X-WP-Submit-Token' uses \SRFM\Inc\Submit_Token::generate(1591).
     * 3. Fields are ONLY formatted with the native key: srfm-{type}-{block_id}-lbl-{encoded_label}-{slug}.
     * 4. Zero guessed duplicate keys, zero fallback labels as keys, zero fields[] wrapper.
     * 5. Hidden metadata: 'srfm-honeypot-field' => '', 'srfm-form-language' => lang, 'srfm-sender-email-field' => ''.
     */
    private function dispatch_to_sureforms( $form_id, array $values ) {
        // 1. Resolve Form 1591 blocks dynamically using parse_blocks()
        $field_map = $this->resolve_form_field_map( $form_id );

        if ( empty( $field_map['resolved'] ) ) {
            return array(
                'success'      => false,
                'entry_id'     => 0,
                'http_status'  => 500,
                'error'        => sprintf( 'SureForms Form ID %d was not found or has no parsed field blocks in WordPress.', $form_id ),
                'raw_response' => null,
                'route'        => self::SUREFORMS_SUBMIT_ROUTE,
                'native_keys'  => array(),
            );
        }

        // 2. Build ONLY the exact native SureForms submission payload
        $payload = $this->build_native_sureforms_payload( $form_id, $field_map['resolved'], $values );

        // 3. Obtain native SureForms Submit Token using actual \SRFM\Inc\Submit_Token class
        $submit_token = $this->generate_sureforms_submit_token( $form_id );

        // 4. Determine SureForms submission route
        $submit_route = $this->get_sureforms_submit_route();

        // 5. Construct internal WP_REST_Request
        $internal_request = new WP_REST_Request( 'POST', $submit_route );
        $internal_request->set_header( 'Content-Type', 'application/json' );

        if ( ! empty( $submit_token ) ) {
            $internal_request->set_header( 'X-WP-Submit-Token', $submit_token );
        }
        $internal_request->set_header( 'X-WP-Nonce', wp_create_nonce( 'wp_rest' ) );
        $internal_request->set_header( 'X-Forwarded-For', $this->get_client_ip() );
        $internal_request->set_header( 'User-Agent', 'TPPL-SureForms-Bridge/2.3' );

        // Bind exact payload both as JSON body and as parameters
        $internal_request->set_body( wp_json_encode( $payload ) );
        foreach ( $payload as $key => $value ) {
            $internal_request->set_param( $key, $value );
        }

        // 6. Execute internal dispatch via rest_do_request() (no external HTTP request)
        $response = rest_do_request( $internal_request );

        // 7. Verify the actual SureForms response
        $is_success = false;
        $error_msg  = '';
        $entry_id   = 0;
        $resp_data  = null;
        $http_code  = 500;

        if ( is_wp_error( $response ) ) {
            $error_msg = $response->get_error_message();
            $data      = $response->get_error_data();
            $http_code = ( is_array( $data ) && isset( $data['status'] ) ) ? (int) $data['status'] : 500;
        } elseif ( $response instanceof WP_REST_Response ) {
            $http_code = $response->get_status();
            $resp_data = $response->get_data();

            if ( $http_code >= 200 && $http_code < 300 ) {
                if ( is_array( $resp_data ) && isset( $resp_data['success'] ) && false === $resp_data['success'] ) {
                    // SureForms returned an error response (e.g., validation failure or token mismatch)
                    if ( isset( $resp_data['data']['message'] ) ) {
                        $error_msg = (string) $resp_data['data']['message'];
                    } elseif ( isset( $resp_data['message'] ) ) {
                        $error_msg = (string) $resp_data['message'];
                    } else {
                        $error_msg = 'SureForms rejected the submission.';
                    }

                    if ( ! empty( $resp_data['data']['field_errors'] ) && is_array( $resp_data['data']['field_errors'] ) ) {
                        $error_msg .= ' [' . implode( '; ', $resp_data['data']['field_errors'] ) . ']';
                    }
                } else {
                    // Actual verified acceptance by SureForms
                    $is_success = true;
                    if ( is_array( $resp_data ) ) {
                        if ( isset( $resp_data['entry_id'] ) ) {
                            $entry_id = (int) $resp_data['entry_id'];
                        } elseif ( isset( $resp_data['data']['entry_id'] ) ) {
                            $entry_id = (int) $resp_data['data']['entry_id'];
                        }
                    }
                }
            } else {
                if ( is_array( $resp_data ) && isset( $resp_data['message'] ) ) {
                    $error_msg = (string) $resp_data['message'];
                } elseif ( is_string( $resp_data ) ) {
                    $error_msg = $resp_data;
                } else {
                    $error_msg = sprintf( 'SureForms returned HTTP status %d', $http_code );
                }
            }
        } else {
            $error_msg = 'Unexpected response format from internal SureForms dispatch.';
        }

        // If entry_id is not present directly in REST response, check the latest entry in SureForms DB if possible
        if ( $is_success && empty( $entry_id ) ) {
            $entry_id = $this->get_latest_sureforms_entry_id( $form_id );
        }

        return array(
            'success'      => $is_success,
            'entry_id'     => $entry_id,
            'http_status'  => $http_code,
            'error'        => $error_msg,
            'raw_response' => $resp_data,
            'route'        => $submit_route,
            'native_keys'  => $payload,
        );
    }

    /**
     * Resolve Form 1591 fields dynamically using parse_blocks().
     *
     * Inspects the actual Gutenberg block structure of Form 1591, extracts
     * block_id, slug, label, and type, and computes the EXACT native field key:
     * srfm-{type}-{block_id}-lbl-{encoded_label}-{slug}
     */
    public function resolve_form_field_map( $form_id ) {
        $result = array(
            'resolved'   => array(),
            'form_attrs' => array(),
            'raw'        => array(),
        );

        $form_post = get_post( $form_id );
        if ( ! $form_post || empty( $form_post->post_content ) ) {
            return $result;
        }

        $blocks = parse_blocks( $form_post->post_content );
        $flat   = $this->flatten_blocks( $blocks );

        $result['raw'] = $flat;

        // Standard SureForms fallback label strings (from SureForms Base markup)
        $default_labels = array(
            'input'        => 'Text field',
            'email'        => 'Email',
            'phone'        => 'Phone',
            'textarea'     => 'Textarea',
            'dropdown'     => 'Dropdown',
            'multi-choice' => 'Multi Choice',
            'number'       => 'Number',
            'url'          => 'URL',
            'checkbox'     => 'Checkbox',
        );

        foreach ( $flat as $block ) {
            $block_name = isset( $block['blockName'] ) ? (string) $block['blockName'] : '';
            $attrs      = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();

            if ( empty( $block_name ) || strpos( $block_name, 'srfm/' ) === false ) {
                continue;
            }

            // Capture root form block attributes if present
            if ( strpos( $block_name, 'sform' ) !== false && empty( $result['form_attrs'] ) ) {
                $result['form_attrs'] = $attrs;
                continue;
            }

            // Skip non-input blocks (buttons, page breaks, layout containers)
            if ( strpos( $block_name, 'button' ) !== false || strpos( $block_name, 'page-break' ) !== false ) {
                continue;
            }

            // Extract block attributes
            $block_id = ! empty( $attrs['block_id'] ) ? (string) $attrs['block_id'] : ( ! empty( $attrs['blockId'] ) ? (string) $attrs['blockId'] : '' );
            $slug     = ! empty( $attrs['slug'] ) ? (string) $attrs['slug'] : '';
            $label    = isset( $attrs['label'] ) ? (string) $attrs['label'] : '';

            // Determine field type slug (e.g. input, email, phone, textarea, dropdown)
            $type_slug = str_replace( 'srfm/', '', $block_name );
            if ( 'name' === $type_slug ) {
                $type_slug = 'input';
            } elseif ( 'multichoice' === $type_slug ) {
                $type_slug = 'multi-choice';
            }

            // Fallback label for base64 encoding if block has empty label
            $fallback_label  = isset( $default_labels[ $type_slug ] ) ? $default_labels[ $type_slug ] : ucfirst( $type_slug );
            $label_to_encode = ! empty( $label ) ? $label : $fallback_label;

            // Encode label using SureForms exact Helper::encode logic (unkeyed base64 with stripped '=' and tags)
            $encoded_label = $this->encode_field_label( $label_to_encode );

            // Native SureForms field name formula: srfm-{type}-{block_id}-lbl-{encoded_label}-{slug}
            $native_key = 'srfm-' . $type_slug . '-' . $block_id . '-lbl-' . $encoded_label . '-' . $slug;

            // If WordPress dynamic block rendering is active, verify against actual rendered HTML
            if ( function_exists( 'render_block' ) ) {
                $rendered = render_block( $block );
                if ( ! empty( $rendered ) && preg_match( '/name=["\'](srfm-[^"\']*-lbl-[^"\']*)["\']/', $rendered, $matches ) ) {
                    $native_key = $matches[1];
                }
            }

            // Detect semantic role for mapping incoming inquiry values
            $role = $this->detect_field_role( $block_name, $label, $slug );
            if ( $role && ! isset( $result['resolved'][ $role ] ) ) {
                $result['resolved'][ $role ] = array(
                    'native_key' => $native_key,
                    'block_id'   => $block_id,
                    'slug'       => $slug,
                    'label'      => $label,
                    'type'       => $type_slug,
                    'block_name' => $block_name,
                    'attrs'      => $attrs,
                );
            }
        }

        return $result;
    }

    /**
     * Replicate SureForms Helper::encode():
     * Strips all tags and base64 encodes with trailing '=' trimmed.
     * Uses \SRFM\Inc\Helper::encode if available.
     */
    private function encode_field_label( $label ) {
        if ( class_exists( '\SRFM\Inc\Helper' ) && method_exists( '\SRFM\Inc\Helper', 'encode' ) ) {
            return \SRFM\Inc\Helper::encode( (string) $label );
        }
        $stripped = wp_strip_all_tags( (string) $label );
        return rtrim( base64_encode( $stripped ), '=' );
    }

    /**
     * Obtain native SureForms Submit Token:
     * Directly calls \SRFM\Inc\Submit_Token::generate($form_id).
     * Does NOT guess or invent an HMAC algorithm if class is absent.
     */
    private function generate_sureforms_submit_token( $form_id ) {
        if ( class_exists( '\SRFM\Inc\Submit_Token' ) && method_exists( '\SRFM\Inc\Submit_Token', 'generate' ) ) {
            return \SRFM\Inc\Submit_Token::generate( (int) $form_id );
        }

        // Do NOT invent or assume an HMAC algorithm.
        return '';
    }

    /**
     * Build the EXACT Native SureForms Submission Payload.
     *
     * Only contains:
     * - 'form-id' (int)
     * - 'srfm-honeypot-field' => ''
     * - 'srfm-form-language' => locale code
     * - 'srfm-sender-email-field' => ''
     * - Exact native field keys for each resolved field
     *
     * ZERO guessed duplicate keys. ZERO fallback labels as keys. ZERO fields[] wrapper.
     */
    private function build_native_sureforms_payload( $form_id, array $resolved_fields, array $input_values ) {
        $locale = get_locale();
        $lang   = ! empty( $locale ) ? substr( $locale, 0, 2 ) : 'en';

        $payload = array(
            'form-id'                 => (int) $form_id,
            'srfm-honeypot-field'     => '',
            'srfm-form-language'      => $lang,
            'srfm-sender-email-field' => '',
        );

        foreach ( $resolved_fields as $role => $info ) {
            if ( isset( $input_values[ $role ] ) && ! empty( $info['native_key'] ) ) {
                $payload[ $info['native_key'] ] = (string) $input_values[ $role ];
            }
        }

        return $payload;
    }

    /**
     * Detect field role (name, email, phone, company, service, message).
     */
    private function detect_field_role( $block_name, $label, $slug ) {
        $combined = strtolower( $block_name . ' ' . $label . ' ' . $slug );

        // 1. Email field
        if ( strpos( $block_name, 'email' ) !== false || strpos( $combined, 'email' ) !== false ) {
            return 'email';
        }

        // 2. Phone field
        if (
            strpos( $block_name, 'phone' ) !== false ||
            strpos( $combined, 'phone' ) !== false ||
            strpos( $combined, 'mobile' ) !== false ||
            strpos( $combined, 'tel' ) !== false
        ) {
            return 'phone';
        }

        // 3. Message / Project Scope field
        if (
            strpos( $block_name, 'textarea' ) !== false ||
            strpos( $combined, 'message' ) !== false ||
            strpos( $combined, 'scope' ) !== false ||
            strpos( $combined, 'project' ) !== false ||
            strpos( $combined, 'details' ) !== false
        ) {
            return 'message';
        }

        // 4. Company / Organization field
        if (
            strpos( $combined, 'company' ) !== false ||
            strpos( $combined, 'organization' ) !== false ||
            strpos( $combined, 'organisation' ) !== false
        ) {
            return 'company';
        }

        // 5. Service Requirement field
        if (
            strpos( $combined, 'service' ) !== false ||
            strpos( $combined, 'requirement' ) !== false ||
            strpos( $block_name, 'select' ) !== false ||
            strpos( $block_name, 'dropdown' ) !== false
        ) {
            return 'service';
        }

        // 6. Name field
        if (
            strpos( $block_name, 'name' ) !== false ||
            strpos( $combined, 'name' ) !== false
        ) {
            return 'name';
        }

        return null;
    }

    /**
     * Flatten nested Gutenberg blocks.
     */
    private function flatten_blocks( array $blocks ) {
        $flat = array();
        foreach ( $blocks as $block ) {
            if ( ! empty( $block['blockName'] ) ) {
                $flat[] = $block;
            }
            if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
                $flat = array_merge( $flat, $this->flatten_blocks( $block['innerBlocks'] ) );
            }
        }
        return $flat;
    }

    /**
     * Locate active SureForms submission route.
     */
    private function get_sureforms_submit_route() {
        if ( function_exists( 'rest_get_server' ) ) {
            $server = rest_get_server();
            if ( $server ) {
                $routes = $server->get_routes();
                if ( isset( $routes[ self::SUREFORMS_SUBMIT_ROUTE ] ) ) {
                    return self::SUREFORMS_SUBMIT_ROUTE;
                }
                foreach ( array_keys( $routes ) as $route ) {
                    if ( ( strpos( $route, 'sureforms' ) !== false || strpos( $route, 'srfm' ) !== false ) && strpos( $route, 'submit' ) !== false ) {
                        return $route;
                    }
                }
            }
        }
        return self::SUREFORMS_SUBMIT_ROUTE;
    }

    /**
     * Verify if SureForms REST route exists.
     */
    private function verify_sureforms_route() {
        if ( function_exists( 'rest_get_server' ) ) {
            $server = rest_get_server();
            if ( $server ) {
                $routes = $server->get_routes();
                if ( isset( $routes[ self::SUREFORMS_SUBMIT_ROUTE ] ) ) {
                    return true;
                }
                foreach ( array_keys( $routes ) as $route ) {
                    if ( ( strpos( $route, 'sureforms' ) !== false || strpos( $route, 'srfm' ) !== false ) && strpos( $route, 'submit' ) !== false ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Query latest entry ID in SureForms table if available.
     */
    private function get_latest_sureforms_entry_id( $form_id ) {
        global $wpdb;
        $table = $wpdb->prefix . 'srfm_entries';
        $entry_id = $wpdb->get_var( $wpdb->prepare(
            "SELECT id FROM {$table} WHERE form_id = %d ORDER BY id DESC LIMIT 1",
            $form_id
        ) );
        return $entry_id ? (int) $entry_id : 0;
    }

    /**
     * Retrieve Client IP.
     */
    private function get_client_ip() {
        $ip = '';
        if ( ! empty( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ) {
            $ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CF_CONNECTING_IP'] ) );
        } elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
            $parts = explode( ',', sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) );
            $ip = trim( $parts[0] );
        } elseif ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
            $ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
        }
        return filter_var( $ip, FILTER_VALIDATE_IP ) ? $ip : '127.0.0.1';
    }
}

// Initialize the plugin instance
add_action( 'plugins_loaded', array( 'TPPL_SureForms_Bridge', 'get_instance' ) );
