/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureHighlights } from './components/FeatureHighlights';
import { WhoWeAreSection } from './components/WhoWeAreSection';
import { OurServicesSection } from './components/OurServicesSection';
import { OurTeamSection } from './components/OurTeamSection';
import { OurProjectsSection } from './components/OurProjectsSection';
import { IndustriesWeServeSection } from './components/IndustriesWeServeSection';
import { FuelsAndUtilitiesSection } from './components/FuelsAndUtilitiesSection';
import { OurCustomersSection } from './components/OurCustomersSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { CommitmentCtaSection } from './components/CommitmentCtaSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#031B35] text-white selection:bg-[#FF7900] selection:text-white flex flex-col">
      {/* Sticky Main Navigation */}
      <Header />

      {/* Main Single-Page Sequential Sections */}
      <main id="main-content" className="flex-1 w-full flex flex-col">
        {/* 01. Hero */}
        <HeroSection />

        {/* 02. Feature Highlights */}
        <FeatureHighlights />

        {/* 03. Who We Are + Our Expertise */}
        <WhoWeAreSection />

        {/* 04. Our Services */}
        <OurServicesSection />

        {/* 05. Our Team */}
        <OurTeamSection />

        {/* 06. Our Projects */}
        <OurProjectsSection />

        {/* 07. Industries We Serve */}
        <IndustriesWeServeSection />

        {/* 06. Fuels & Utilities We Handle */}
        <FuelsAndUtilitiesSection />

        {/* 07. Our Customers */}
        <OurCustomersSection />

        {/* 08. Why Choose Us */}
        <WhyChooseUsSection />

        {/* 09. Our Commitment / Final CTA */}
        <CommitmentCtaSection />

        {/* 10. Contact */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <FooterSection />
    </div>
  );
}
