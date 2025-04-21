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

const HomePage = () => {
  // Hero slider state
  const [activeSlide, setActiveSlide] = useState(0);

  // Define hero slides
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
  ];

  // Auto-rotate hero slider
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);
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
