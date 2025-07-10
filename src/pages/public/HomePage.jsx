import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/home/HeroSection";
import PartnershipLogos from "../../components/home/PartnershipLogos";
import ServicesSection from "../../components/home/ServicesSection";
import HowItWorksSection from "../../components/home/HowItWorksSection";
import BenefitsSection from "../../components/home/BenefitsSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import BottomCTASection from "../../components/home/BottomCTASection";
import SEOHelmet from "../../components/SEO/SEOHelmet";
import SocialMediaBar from "../../components/common/SocialMediaBar";
import {
  organizationSchema,
  localBusinessSchema,
  reviewSchema,
} from "../../components/SEO/structuredData";
import { motion } from "framer-motion";

const HomePage = () => {
  // Hero slider state
  const [activeSlide, setActiveSlide] = useState(0);

  // hero slides content
  const heroSlides = [
    {
      image: "/slider01.png",
      title: "We proudly serve",
      titleBreak: "our",
      titleHighlight: `members & families`,
      description:
        "Since 2015, we have stood by our members. We are your go-to source for a wide range of insurance products.",
    },
    {
      image: "/seniors.jpg",
      title: "Your Future.",
      titleBreak: "Your Security.",
      titleHighlight: "Your Choice.",
      description:
        "Discover tailored insurance plans designed specifically for your needs. Secure your future with confidence.",
    },
    {
      image: "/workplace.png",
      title: "Because Safety",
      titleBreak: "Isn't Optional.",
      titleHighlight: "Protect Your Workforce.",
      description:
        "Empower your workforce with the confidence that they're covered. Support your team where it matters most, because a secure team is a stronger team.",
    },

    {
      image: "/slider03.png",
      title: "Investments.",
      titleBreak: "Retirement.",
      titleHighlight: "Health Insurance",
      description:
        "We can help you with that. With our 10 years plus of experience dealing with insurance options, we've got you covered.",
    },
    {
      image: "/slider02.png",
      title: "Personalized Solutions",
      titleBreak: "For",
      titleHighlight: "Every Stage of Life",
      description:
        "From health and life insurance to property protection, our experts provide plans that evolve with your changing needs.",
    },
  ];

  // Auto-rotate hero slider
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 9000);
    return () => clearInterval(heroInterval);
  }, [heroSlides.length]);

  // Combined structured data for homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      reviewSchema,
      {
        "@type": "WebPage",
        "@id": "https://lako.co.ke#webpage",
        url: "https://lako.co.ke",
        name: "Lako Insurance Agency - Comprehensive Insurance Solutions in Kenya",
        description:
          "Leading insurance agency in Kenya providing health, life, motor, property, travel, and business insurance. Expert guidance, competitive rates, and exceptional service since 2015.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://lako.co.ke#website",
          url: "https://lako.co.ke",
          name: "Lako Insurance Agency",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://lako.co.ke/compare?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
        mainEntity: organizationSchema,
      },
    ],
  };

  return (
    <>
      <SEOHelmet
        title="Lako Insurance Agency - Comprehensive Insurance Solutions in Kenya"
        description="Leading insurance agency in Kenya providing health, life, motor, property, travel, and business insurance. Expert guidance, competitive rates, and exceptional service since 2015. Get your free quote today."
        keywords="insurance Kenya, health insurance Kenya, motor insurance Kenya, property insurance Kenya, life insurance Kenya, travel insurance Kenya, business insurance Kenya, insurance quotes Kenya, insurance agency Nairobi, insurance broker Kenya, comprehensive insurance coverage, best insurance rates Kenya, IRA licensed insurance agency"
        canonical="/"
        ogImage="/lako.png"
        ogType="website"
        structuredData={homepageStructuredData}
      />

      <div className="bg-neutral-50 min-h-screen overflow-hidden">
        <Header />

        {/* Social Media Bar */}
        <SocialMediaBar />

        {/* Hero Section */}
        <HeroSection activeSlide={activeSlide} heroSlides={heroSlides} />

        {/* Partnership Logos Section */}
        <PartnershipLogos />

        {/* Services Section */}
        <ServicesSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Geographic Footprint Section */}
        <section className="py-16 md:py-20 bg-neutral-50 font-outfit">
          <div className="lg:container mx-auto px-4 lg:px-10">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="lg:col-span-6">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-primary-100 text-primary-600 border border-primary-200 mb-4"
                >
                  <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
                  Our Growing Footprint
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-3 md:mb-4 lg:mb-6"
                >
                  Expanding Across{" "}
                  <span className="text-secondary-500">Eastern Africa</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-600 text-[0.9rem] md:text-base lg:text-lg mb-6"
                >
                  Lako Insurance Agency is based in Kenya but with adequate
                  footprint in four countries within the Eastern Africa region,
                  including Uganda, Tanzania, South Sudan - Juba and Rwanda.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-600 text-[0.9rem] md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8"
                >
                  We are continuously expanding and hope to cover more regions
                  within the continent.
                </motion.p>

                {/* Countries List */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 gap-2 md:gap-3"
                >
                  {[
                    { name: "Kenya", code: "ke" },
                    { name: "Uganda", code: "ug" },
                    { name: "Tanzania", code: "tz" },
                    { name: "Rwanda", code: "rw" },
                    { name: "South Sudan", code: "ss" },
                  ].map((country, index) => (
                    <motion.div
                      key={country.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3 p-1 md:p-2 lg:p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${country.code}.png`}
                        alt={`${country.name} flag`}
                        className="w-6 h-auto rounded-sm shadow-sm"
                        loading="lazy"
                      />
                      <span className="text-gray-700 text-[0.9rem] md:text-base font-medium">
                        {country.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Image Section */}
              <div className="lg:col-span-6 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative max-w-lg mx-auto"
                >
                  <div className="">
                    <img
                      src="/footprint.png"
                      alt="Lako Insurance Geographic Footprint in Eastern Africa"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>

                  {/* Simple stat badges */}
                  <div className="absolute top-6 right-6 bg-secondary-500 text-white px-3 py-2 rounded-lg shadow-md">
                    <div className="text-center">
                      <div className="text-lg font-bold">5</div>
                      <div className="text-xs">Countries</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Bottom CTA Section */}
        <BottomCTASection />

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
