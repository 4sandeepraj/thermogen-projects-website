import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  Mail,
  Phone,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { InteractiveLocationMap } from './InteractiveLocationMap';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Industrial Combustion Systems',
    message: '',
    website: '', // Hidden honeypot field for bot spam prevention
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Client-side quick check
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setSubmitError('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setSubmitError(null);
        // Clear all fields on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Industrial Combustion Systems',
          message: '',
          website: '',
        });
      } else {
        const errorMsg =
          result.error ||
          "We couldn't send your inquiry right now. Please try again or contact us directly at info@thermogenprojects.com.";
        setSubmitError(errorMsg);
      }
    } catch (err) {
      console.error('[ContactForm] Network or server error during submission:', err);
      setSubmitError(
        "We couldn't send your inquiry right now. Please try again or contact us directly at info@thermogenprojects.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-20 w-full bg-[#F7FAFD] pt-[60px] pb-[56px] border-t border-[#DCE7F2] overflow-hidden"
    >
      {/* Background: Subtle engineering blueprint pattern & grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#082E57 1px, transparent 1px), linear-gradient(to right, #082E57 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Subtle background pipeline curve motifs */}
      <svg
        className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none opacity-[0.03] text-[#082E57] hidden lg:block"
        viewBox="0 0 420 320"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 60 H200 C260 60 300 100 300 160 V320"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M60 0 V120 C60 180 100 220 160 220 H420"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <circle cx="300" cy="160" r="5" fill="#1688E8" />
        <circle cx="160" cy="220" r="4" fill="#FF7A00" />
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
        {/* ================================================== */}
        {/* 1. SECTION HEADING                                */}
        {/* ================================================== */}
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-[28px]">
          {/* Eyebrow */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-2.5"
          >
            <span className="w-5 h-[2px] rounded-full bg-[#FF7A00]" aria-hidden="true" />
            <span className="font-heading text-[12px] sm:text-[13px] font-bold text-[#FF7A00] tracking-[0.2em] uppercase">
              GET IN TOUCH
            </span>
            <span className="w-5 h-[2px] rounded-full bg-[#FF7A00]" aria-hidden="true" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            id="contact-heading"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="font-heading text-[27px] sm:text-[32px] lg:text-[36px] font-bold text-[#082E57] leading-[1.22] tracking-tight mb-2.5"
          >
            Let’s Build the Right Engineering Solution
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="font-body text-[14.5px] sm:text-[15.5px] text-[#5F6F82] leading-[1.55] max-w-[620px]"
          >
            Tell us about your project requirements and our team will get back to you with the right technical approach.
          </motion.p>

          {/* Thin Orange Accent Line */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="w-14 h-[2px] bg-[#FF7A00] rounded-full mt-3.5"
            aria-hidden="true"
          />
        </div>

        {/* ================================================== */}
        {/* 2. TWO-COLUMN LAYOUT: 40% LEFT, 60% RIGHT (≥1200px) */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-[34px]">
          {/* ------------------------------------------------ */}
          {/* LEFT COLUMN (40% / 5 cols): CONTACT INFORMATION  */}
          {/* ------------------------------------------------ */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="xl:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-[18px] bg-white border border-[#DCE7F2] shadow-[0_4px_20px_rgba(8,46,87,0.04)] relative overflow-hidden"
          >
            {/* Subtle blueprint watermark on card background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(#082E57 1px, transparent 1px), linear-gradient(to right, #082E57 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col">
              {/* Header: Company Details */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0F4F8]">
                <div className="w-10 h-10 rounded-xl bg-[#F0F7FE] text-[#1688E8] flex items-center justify-center shrink-0 border border-[#DCE7F2]/60">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[10.5px] font-bold text-[#FF7A00] tracking-wider uppercase">
                    CONTACT INFORMATION
                  </span>
                  <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-[#082E57] leading-snug">
                    THERMOGEN PROJECTS PRIVATE LIMITED
                  </h3>
                </div>
              </div>

              {/* Information Block 1: OFFICE */}
              <div className="group flex items-start gap-3.5 mb-5 pb-5 border-b border-[#F0F4F8]">
                <div className="w-9 h-9 rounded-xl bg-[#F0F7FE] group-hover:bg-[#1688E8]/10 text-[#1688E8] flex items-center justify-center shrink-0 border border-[#DCE7F2]/50 transition-colors duration-200 mt-0.5">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11px] font-bold text-[#082E57] uppercase tracking-wider mb-1">
                    REGISTERED OFFICE
                  </div>
                  <address className="not-italic font-body text-[13.5px] text-[#5F6F82] leading-[1.45]">
                    Plot No. 802, Bari Co-operative,
                    <br />
                    Bokaro, Jharkhand – 827012
                  </address>
                </div>
              </div>

              {/* Information Block 2: EMAIL */}
              <div className="group flex items-start gap-3.5 mb-5 pb-5 border-b border-[#F0F4F8]">
                <div className="w-9 h-9 rounded-xl bg-[#F0F7FE] group-hover:bg-[#1688E8]/10 text-[#1688E8] flex items-center justify-center shrink-0 border border-[#DCE7F2]/50 transition-colors duration-200 mt-0.5">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11px] font-bold text-[#082E57] uppercase tracking-wider mb-1">
                    EMAIL INQUIRY
                  </div>
                  <a
                    href="mailto:info@thermogenprojects.com"
                    className="font-body text-[13.5px] text-[#1688E8] hover:text-[#082E57] font-medium transition-colors duration-150 block truncate"
                  >
                    info@thermogenprojects.com
                  </a>
                </div>
              </div>

              {/* Information Block 3: PHONE */}
              <div className="group flex items-start gap-3.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#F0F7FE] group-hover:bg-[#1688E8]/10 text-[#1688E8] flex items-center justify-center shrink-0 border border-[#DCE7F2]/50 transition-colors duration-200 mt-0.5">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11px] font-bold text-[#082E57] uppercase tracking-wider mb-1">
                    DIRECT CONTACT
                  </div>
                  <a
                    href="tel:+918210775670"
                    className="font-body text-[13.5px] text-[#082E57] hover:text-[#FF7A00] font-semibold transition-colors duration-150 block"
                  >
                    +91 82107 75670
                  </a>
                </div>
              </div>
            </div>

            {/* Visual Badge at the bottom */}
            <div className="relative z-10 pt-4 border-t border-[#F0F4F8] flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E6EBF2]">
              <ShieldCheck className="w-4 h-4 text-[#1688E8] shrink-0" />
              <span className="font-mono text-[11px] font-bold text-[#082E57] tracking-wide uppercase">
                SINGLE POINT ENGINEERING RESPONSIBILITY
              </span>
            </div>
          </motion.div>

          {/* ------------------------------------------------ */}
          {/* RIGHT COLUMN (60% / 7 cols): INQUIRY FORM        */}
          {/* ------------------------------------------------ */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="xl:col-span-7 p-6 sm:p-7 rounded-[18px] bg-white border border-[#DCE7F2] shadow-[0_4px_20px_rgba(8,46,87,0.04)] flex flex-col justify-between"
          >
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center my-auto">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-[20px] text-[#082E57] mb-2">
                  Inquiry Transmitted Successfully
                </h3>
                <p className="font-body text-[14px] text-[#5F6F82] max-w-[440px] leading-relaxed mb-6">
                  Thank you. Your inquiry has been submitted successfully. Our team will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#082E57] hover:bg-[#FF7A00] text-white text-[13px] font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="project-inquiry-form">
                {/* Hidden Honeypot field for bot spam prevention */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="form-website">Website (Leave blank)</label>
                  <input
                    type="text"
                    id="form-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submission Error Banner */}
                {submitError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-[11px] bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-[13px] leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="font-bold shrink-0">Notice:</span>
                    <p className="flex-1 m-0">{submitError}</p>
                  </div>
                )}

                {/* Row 1: Name & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-[12.5px] font-heading font-semibold text-[#082E57] mb-1.5"
                    >
                      Your Name <span className="text-[#FF7A00]">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#F7FAFD] border border-[#DCE7F2] text-[#082E57] placeholder-[#94A3B8] text-[13.5px] focus:outline-none focus:border-[#1688E8] focus:bg-white focus:ring-2 focus:ring-[#1688E8]/10 transition-all duration-200 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-[12.5px] font-heading font-semibold text-[#082E57] mb-1.5"
                    >
                      Business Email <span className="text-[#FF7A00]">*</span>
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#F7FAFD] border border-[#DCE7F2] text-[#082E57] placeholder-[#94A3B8] text-[13.5px] focus:outline-none focus:border-[#1688E8] focus:bg-white focus:ring-2 focus:ring-[#1688E8]/10 transition-all duration-200 disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-phone"
                      className="block text-[12.5px] font-heading font-semibold text-[#082E57] mb-1.5"
                    >
                      Phone Number <span className="text-[#FF7A00]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="form-phone"
                      name="phone"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#F7FAFD] border border-[#DCE7F2] text-[#082E57] placeholder-[#94A3B8] text-[13.5px] focus:outline-none focus:border-[#1688E8] focus:bg-white focus:ring-2 focus:ring-[#1688E8]/10 transition-all duration-200 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="form-company"
                      className="block text-[12.5px] font-heading font-semibold text-[#082E57] mb-1.5"
                    >
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="form-company"
                      name="company"
                      disabled={isSubmitting}
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Steel / Refractory Works"
                      className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#F7FAFD] border border-[#DCE7F2] text-[#082E57] placeholder-[#94A3B8] text-[13.5px] focus:outline-none focus:border-[#1688E8] focus:bg-white focus:ring-2 focus:ring-[#1688E8]/10 transition-all duration-200 disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Service Requirement */}
                <div>
                  <label
                    htmlFor="form-service"
                    className="block text-[12.5px] font-heading font-semibold text-[#082E57] mb-1.5"
                  >
                    Service Requirement
                  </label>
                  <select
                    id="form-service"
                    name="service"
                    disabled={isSubmitting}
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#F7FAFD] border border-[#DCE7F2] text-[#082E57] text-[13.5px] focus:outline-none focus:border-[#1688E8] focus:bg-white focus:ring-2 focus:ring-[#1688E8]/10 transition-all duration-200 disabled:opacity-60"
                  >
                    <option value="Industrial Combustion Systems">Industrial Combustion Systems</option>
                    <option value="Techno-Commercial Feasibility Studies">
                      Techno-Commercial Feasibility Studies
                    </option>
                    <option value="Engineering Consultancy">Engineering Consultancy</option>
                    <option value="Facility Development">Facility Development</option>
                    <option value="High Pressure Gas Handling Systems">
                      High Pressure Gas Handling Systems
                    </option>
                    <option value="Decanting Facilities">Decanting Facilities</option>
                    <option value="Pipeline Design & Installation">Pipeline Design &amp; Installation</option>
                    <option value="Utility Engineering">Utility Engineering</option>
                  </select>
                </div>

                {/* Project Scope / Details (textarea min-height 120px) */}
                <div>
                  <label
                    htmlFor="form-message"
                    className="block text-[12.5px] font-heading font-semibold text-[#082E57] mb-1.5"
                  >
                    Project Scope / Details <span className="text-[#FF7A00]">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your utility requirements, plant capacity, fuel specifications, or installation scope..."
                    className="w-full min-h-[120px] px-3.5 py-2.5 rounded-[11px] bg-[#F7FAFD] border border-[#DCE7F2] text-[#082E57] placeholder-[#94A3B8] text-[13.5px] focus:outline-none focus:border-[#1688E8] focus:bg-white focus:ring-2 focus:ring-[#1688E8]/10 transition-all duration-200 resize-y disabled:opacity-60"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-inquiry-button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#E06B00] text-white font-heading font-semibold text-[13.5px] tracking-wide uppercase transition-all duration-200 shadow-[0_3px_14px_rgba(255,122,0,0.28)] hover:shadow-[0_5px_18px_rgba(255,122,0,0.38)] hover:-translate-y-[2px] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <span>SUBMIT INQUIRY →</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* ================================================== */}
        {/* 3. FULL-WIDTH LOCATION MAP                         */}
        {/* ================================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-4"
        >
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1688E8]" />
              <span className="font-heading text-[12px] font-bold text-[#082E57] tracking-wider uppercase">
                REGISTERED OFFICE &amp; TECHNICAL HEADQUARTERS
              </span>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#5F6F82]">
              Plot No. 802, Bari Co-operative, Bokaro Steel City, Jharkhand
            </span>
          </div>

          {/* Genuine Interactive Leaflet Map */}
          <InteractiveLocationMap reducedMotion={shouldReduceMotion ?? false} />
        </motion.div>

        {/* ================================================== */}
        {/* 4. SMALL LOCATION / ADDRESS STRIP                 */}
        {/* ================================================== */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#DCE7F2] shadow-[0_2px_8px_rgba(8,46,87,0.02)] flex flex-wrap items-center justify-between gap-y-2 text-[11.5px] text-[#5F6F82]">
          <div className="flex items-center gap-2 font-medium text-[#082E57]">
            <Compass className="w-3.5 h-3.5 text-[#1688E8]" />
            <span>Plot No. 802, Bari Co-operative, Bokaro, Jharkhand – 827012</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[#94A3B8]">•</span>
            <span>
              Direct:{' '}
              <a href="tel:+918210775670" className="text-[#082E57] font-semibold hover:text-[#1688E8]">
                +91 82107 75670
              </a>
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span>
              Email:{' '}
              <a href="mailto:info@thermogenprojects.com" className="text-[#1688E8] font-medium hover:underline">
                info@thermogenprojects.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
