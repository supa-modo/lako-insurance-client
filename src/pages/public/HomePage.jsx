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
      image: "/slider02.png",
      title: "Personalized Solutions",
      titleBreak: "For",
      titleHighlight: "Every Stage of Life",
      description:
        "From health and life insurance to property protection, our experts provide plans that evolve with your changing needs.",
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
      image: "/workplaceaccident.png",
       
    },
  ];

  // Auto-rotate hero slider
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 9000);
    return () => clearInterval(heroInterval);
  }, [heroSlides.length]);

  return (
    <>
      <div className="bg-neutral-50 min-h-screen overflow-hidden">
        <Header />

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
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-6"
                >
                  Expanding Across{" "}
                  <span className="text-secondary-500">Eastern Africa</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-600 text-base lg:text-lg mb-6"
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
                  className="text-gray-600 text-base lg:text-lg mb-8"
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
                    { name: "Kenya", code: "KE", colors: "bg-black" },
                    { name: "Uganda", code: "UG", colors: "bg-yellow-400" },
                    { name: "Tanzania", code: "TZ", colors: "bg-blue-500" },
                    { name: "South Sudan", code: "SS", colors: "bg-blue-600" },
                    { name: "Rwanda", code: "RW", colors: "bg-blue-500" },
                  ].map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white text-gray-500 rounded-lg px-3 py-2 border border-gray-200 shadow-sm"
                    >
                      <div className="relative mr-3">
                        <img
                          src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                          alt={`${country.name} flag`}
                          className="w-6 h-4 rounded-sm"
                          onError={(e) => {
                            // Fallback to colored circle if flag image fails to load
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "block";
                          }}
                        />
                        <div
                          className={`w-6 h-4 rounded-sm ${country.colors} `}
                          style={{ display: "none" }}
                        ></div>
                      </div>
                      <span className="text-gray-600 text-[0.9rem] md:text-base font-medium">
                        {country.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Map */}
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
