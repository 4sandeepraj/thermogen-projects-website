=== TPPL SureForms Bridge ===
Contributors: thermogenprojects
Tags: sureforms, forms, rest api, email notification
Requires at least: 5.8
Tested up to: 6.7
Stable tag: 2.3.0
License: GPLv2 or later

Secure bridge connecting the Thermogen Projects Google AI Studio inquiry form directly to WordPress and SureForms Form ID 1591 via native internal REST dispatch.

== Description ==

This plugin provides a dedicated, hardened REST API endpoint at:
`/wp-json/tppl/v1/contact`

When an inquiry is received from the Google AI Studio frontend:
1. Performs server-side input validation and honeypot checks.
2. Dynamically resolves Form 1591's actual Gutenberg block structure, block IDs, field slugs, and attributes using WordPress core `parse_blocks()`.
3. Constructs ONLY the exact native SureForms submission payload matching SureForms specification (`srfm-{type}-{block_id}-lbl-{encoded_label}-{slug}`). Zero guessed duplicate keys, zero fallback labels as keys, and zero `fields[]` wrappers are sent.
4. Directly invokes native `\SRFM\Inc\Submit_Token::generate(1591)` to authenticate with SureForms via `X-WP-Submit-Token` header.
5. Dispatches the submission internally using WordPress core `rest_do_request()` to `POST /sureforms/v1/submit-form`.
6. SureForms natively executes its validation, saves the entry in SureForms Entries (`wp_srfm_entries`), resolves `{form:email}` for Reply-To, and fires the existing email notification to info@thermogenprojects.com.
7. Returns true status back to the Google AI Studio frontend only upon verified SureForms acceptance.

== Installation ==

1. Go to WordPress Admin -> Plugins -> Add New Plugin -> Upload Plugin.
2. Choose `tppl-sureforms-bridge.zip` and click "Install Now".
3. Click "Activate Plugin".
4. Go to Settings -> TPPL SureForms Bridge to view real-time diagnostics, verify Form 1591 integration, test submission internally, and configure the Secret Bridge Key.

== Features ==
- Native integration with SureForms Form ID 1591 using internal `rest_do_request()`.
- Exact native SureForms payload keys derived via `parse_blocks()` and `Helper::encode()`.
- Uses native `\SRFM\Inc\Submit_Token::generate()` for `X-WP-Submit-Token` authentication.
- Built-in WordPress Admin Diagnostics page (Settings -> TPPL SureForms Bridge) showing form status, resolved native keys, and live test submission tool.
- No duplicate email sending; triggers existing SureForms notification workflow.
- Resolves `{form:email}` Reply-To automatically.
- Zero direct database tampering and zero fake hook calls.
- Secure TPPL Bridge Key authentication (configurable under Settings -> TPPL SureForms Bridge).
- Strict CORS whitelist for thermogenprojects.com and Google AI Studio environments.
- Anti-spam honeypot filtering and rate limiting.
- LiteSpeed Cache exclusion headers (`X-LiteSpeed-Cache-Control: no-cache` and `DONOTCACHEPAGE`).
