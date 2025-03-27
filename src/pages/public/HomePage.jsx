import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiHeart,
  FiDollarSign,
  FiClock,
  FiSearch,
  FiCheckSquare,
  FiAward,
  FiChevronRight,
  FiArrowRight,
  FiCheck,
  FiUsers,
  FiStar,
  FiSmile,
  FiCalendar,
  FiThumbsUp,
} from "react-icons/fi";
import {
  TbArrowRight,
  TbAward,
  TbCalendarSmile,
  TbCheck,
  TbCheckbox,
  TbCoins,
  TbSearch,
  TbShield,
  TbShieldCheckFilled,
  TbShieldHalfFilled,
} from "react-icons/tb";
import {
  PiSmileyDuotone,
  PiSmileyStickerDuotone,
  PiThumbsUpDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { FaShieldAlt } from "react-icons/fa";
import { insuranceCompanies } from "../../mockData/insuranceData";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  // Feature carousel state
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      icon: TbShieldCheckFilled,
      text: "Comprehensive Coverage Plans",
    },
    {
      icon: TbCalendarSmile,
      text: "Age-Appropriate Benefits",
    },
    {
      icon: PiThumbsUpDuotone,
      text: "Trusted by Thousands",
    },
  ];

  // Auto-rotate feature carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="bg-neutral-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[44rem] pt-32 md:pt-14 flex items-center bg-neutral-500 pb-20 md:pb-32 overflow-hidden"
        id="hero"
      >
        {/* Full overlay for the hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/seniors.jpg"
            alt="Senior couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/75"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Modified grid layout for better small screen display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-8 items-center">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium font-outfit bg-white/10 backdrop-blur-sm text-white border border-white/20">
                    <span className="flex h-2 w-2 rounded-full bg-secondary-400 mr-2"></span>
                    Senior Insurance Simplified
                  </span>
                </div>

                <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white">
                    Your Health.
                    <br className="hidden sm:block" /> Your Security.
                    <span className="text-secondary-400"> Your Choice.</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 font-outfit max-w-3xl">
                    Discover{" "}
                    <span className="text-primary-400">
                      tailored insurance plans
                    </span>{" "}
                    designed specifically for seniors' unique healthcare needs.
                    Secure your golden years{" "}
                    <span className="text-primary-500">with confidence</span>.
                  </p>
                </div>

                <div className="flex space-x-4 font-lexend">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to="/compare"
                      className="btn bg-secondary-500 text-white font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-2 sm:py-2.5 rounded-lg text-base sm:text-lg group"
                    >
                      <motion.span
                        className="inline-flex items-center"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        Compare Plans
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <FiChevronRight className="ml-2" />
                        </motion.div>
                      </motion.span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to="/about"
                      className="btn border-2 border-white/50 text-secondary-500 hover:bg-white/20 hover:text-secondary-600 transition-all duration-300 px-8 py-2 sm:py-2.5 rounded-lg text-base sm:text-lg"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Quick Quote section */}
            <div className="lg:col-span-4 order-1 lg:order-2 mb-8 lg:mb-0 hidden lg:block">
              <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">
                {/* Add decorative border */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-3xl transform rotate-3 translate-x-4 translate-y-4 hidden lg:block"></div>

                {/* Main card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30 ">
                  {/* Card header with visual elements */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-secondary-400 animate-pulse"></div>
                      <span className="text-white font-medium font-lexend">
                        Quick Quote
                      </span>
                    </div>
                    <div className="flex space-x-1.5">
                      <div className="h-3 w-3 rounded-full bg-white/20"></div>
                      <div className="h-3 w-3 rounded-full bg-white/20"></div>
                      <div className="h-3 w-3 rounded-full bg-white/20"></div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-primary-500">
                      See how much you could save today
                    </h3>
                    <p className="text-white/80 text-sm font-lexend font-normal mb-4">
                      Our easy-to-use comparison tool finds the best plans for
                      your budget. Get started in just 2 minutes.
                    </p>

                    {/* Call to action button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to="/compare"
                        className="block w-full py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-center font-bold rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 shadow-lg mt-4 sm:mt-6 group"
                      >
                        <motion.span
                          className="inline-flex items-center font-lexend font-semibold justify-center"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Start My Quote
                          <motion.div
                            whileHover={{ x: 6 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FiArrowRight className="ml-2" />
                          </motion.div>
                        </motion.span>
                      </Link>
                    </motion.div>

                    {/* Features Carousel */}
                    <div className="mt-6 relative">
                      <div className="h-11 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {features.map(
                            (feature, index) =>
                              index === activeFeature && (
                                <motion.div
                                  key={index}
                                  className="flex items-center justify-center w-full px-4"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-3">
                                    <feature.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <span className="text-white/70 font-outfit">
                                    {feature.text}
                                  </span>
                                </motion.div>
                              )
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Feature carousel indicators */}
                      <div className="flex justify-center space-x-1.5 mt-2">
                        {features.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveFeature(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              index === activeFeature
                                ? "w-4 bg-secondary-400"
                                : "w-1.5 bg-white/30"
                            }`}
                            aria-label={`Go to feature ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#f9f7f5"
              fillOpacity="1"
              d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,80C840,96,960,96,1080,88C1200,80,1320,64,1380,56L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Partnership Logos Section */}
      <section className="pt-4 sm:pt-0 bg-gradient-to-b from-neutral-100 to-neutral-50">
        <div className="px-4 md:px-14">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-600">
              Partners with Top Insurance Providers
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
            {[
              "jubilee.png",
              "icea.png",
              "britam.png",
              "cic.png",
              "aar.png",
              "madison.png",
            ].map((logo, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-lg rounded-xl p-4 transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={`/${logo}`}
                  alt={`Insurance provider ${index + 1}`}
                  className="h-14 object-contain mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works section - Redesigned for premium look */}
      <section className="py-24 bg-neutral-50 font-outfit" id="how-it-works">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-14">
            <div className="inline-block rounded-full bg-secondary-50 px-5 py-1 mb-3 sm:mb-6 border border-secondary-200">
              <span className="text-secondary-700 text-xs sm:text-sm font-medium">
                Our Process
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6 text-secondary-600">
              Experience <span className="text-primary-500">Simplified</span>{" "}
              Insurance
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-500">
              We've reimagined how seniors discover, compare, and select
              insurance plans for a seamless experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-secondary-300 hidden lg:block"></div>

            {[
              {
                step: "01",
                icon: TbSearch,
                title: "Share Your Needs",
                description:
                  "Tell us about your health preferences, requirements and budget using our intelligent form.",
                color: "primary",
                highlight: "2-minute process",
              },
              {
                step: "02",
                icon: TbCheckbox,
                title: "Review Tailored Options",
                description:
                  "Our AI-assisted comparison tool matches you with personalized plans from top providers.",
                color: "secondary",
                highlight: "Side-by-side comparison",
              },
              {
                step: "03",
                icon: TbAward,
                title: "Select With Confidence",
                description:
                  "Choose the perfect coverage knowing you've explored all your best options. One of our insurance specialists will be in touch with details on what's next.",
                color: "primary",
                highlight: "Zero pressure decision",
              },
            ].map((item, index) => (
              <div key={index} className="relative z-10">
                <div className="h-full bg-white rounded-xl shadow-xl p-8 border border-gray-100 transition duration-300 hover:shadow-2xl hover:translate-y-[-8px] overflow-hidden group">
                  {/* Step indicator */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-end justify-start pb-3 pl-3 text-xl font-bold text-neutral-600 opacity-50 group-hover:opacity-80 transition-opacity">
                    {item.step}
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4 mb-2 sm:mb-3 md:mb-4">
                    <div
                      className={`inline-block p-3 sm:p-4 rounded-xl  bg-${item.color}-100`}
                    >
                      <item.icon className={`h-8 w-8 text-${item.color}-500`} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-700">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[0.9rem] sm:text-base text-gray-600 mb-6">{item.description}</p>

                  <div
                    className={`inline-block px-5 py-1 rounded-xl text-[0.82rem] sm:text-sm font-medium bg-${item.color}-100 text-${item.color}-700`}
                  >
                    {item.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/compare"
                className="inline-flex items-center px-10 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium font-lexend text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Let's Get Started</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Redesigned with cards and premium styling */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden font-outfit">
        {/* Decorative elements */}
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-50 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-secondary-50 rounded-full opacity-70 blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <div className="inline-block rounded-full bg-primary-50 px-5 py-1 mb-3 sm:mb-4 md:mb-6 border border-primary-100">
              <span className="text-primary-700 text-xs sm:text-sm font-medium">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-primary-600">
              Insurance <span className="text-secondary-500">Reimagined</span>{" "}
              for Seniors
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-500">
              We've designed our service around the unique needs and challenges
              that seniors face when seeking quality healthcare coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: TbShieldHalfFilled,
                title: "Complete Protection",
                description:
                  "Coverage plans designed specifically for seniors' comprehensive healthcare needs and concerns.",
                color: "primary",
                features: [
                  "Prescription drug coverage",
                  "Specialized care access",
                  "Emergency services",
                ],
              },
              {
                icon: TbCoins,
                title: "Affordable Options",
                description:
                  "Find the perfect balance between comprehensive coverage and cost-effective monthly premiums.",
                color: "secondary",
                features: [
                  "Flexible payment plans",
                  "Premium assistance options",
                  "No hidden fees",
                ],
              },
              {
                icon: PiUsersDuotone,
                title: "Senior-First Approach",
                description:
                  "Every aspect of our service is built around the unique health challenges that come with aging.",
                color: "primary",
                features: [
                  "Age-specific benefits",
                  "Simplified enrollment",
                  "Easy-to-understand terms",
                ],
              },
              {
                icon: PiSmileyDuotone,
                title: "Concierge Support",
                description:
                  "Our dedicated team of insurance specialists is always ready to assist and guide you through decisions.",
                color: "secondary",
                features: [
                  "One-on-one consultations",
                  "Ongoing policy support",
                  "Claims assistance",
                ],
              },
            ].map((benefit, index) => (
              <div key={index} className="group">
                <div
                  className={`h-full bg-white rounded-xl py-5 sm:py-8 px-6 shadow-lg border border-gray-100 relative z-10 transition-all duration-300 group-hover:shadow-xl group-hover:border-${benefit.color}-100 overflow-hidden`}
                >
                  {/* Subtle background pattern */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-${benefit.color}-50 rounded-full opacity-0 group-hover:opacity-20 -translate-y-20 translate-x-20 group-hover:translate-y-[-50px] group-hover:translate-x-[50px] transition-all duration-500 ease-out`}
                  ></div>
                  <div className="flex items-center gap-4 mb-2 sm:mb-4">
                    <div
                      className={`relative z-10 w-10 sm:w-16 h-10 sm:h-[3.3rem] rounded-2xl bg-${benefit.color}-100 flex items-center justify-center`}
                    >
                      <benefit.icon
                        className={`h-6 sm:h-8 w-6 sm:w-8 text-${benefit.color}-500`}
                      />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-neutral-700 relative z-10">
                      {benefit.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-6 relative z-10">
                    {benefit.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 relative z-10">
                    {benefit.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div
                          className={`flex-shrink-0 h-5 w-5 rounded-full bg-${benefit.color}-100 flex items-center justify-center mt-0.5 mr-3`}
                        >
                          <TbCheck
                            className={`h-3 sm:h-3.5 w-3 sm:w-3.5 text-${benefit.color}-600`}
                          />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-neutral-50 font-outfit">
        <div className="container mx-auto px-2 sm:px-4 lg:px-12">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 backdrop-blur-xl rounded-l-full transform translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-white/5 backdrop-blur-xl rounded-tr-full transform -translate-x-1/2 translate-y-1/4"></div>
              <div className="absolute top-1/4 left-1/3 h-16 w-16 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute bottom-1/3 right-1/4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
            </div>

            <div className="relative z-10 px-6 sm:px-12 py-10 md:p-16">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-col space-y-4">
                    <div className="inline-block mb-2">
                      <span className="bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full">
                        Start Today
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Secure Your Health Future{" "}
                      <br className="hidden lg:block" />
                      <span className="text-secondary-500">
                        With Confidence
                      </span>
                    </h2>
                    <p className="text-white/90 text-base sm:text-lg md:text-xl font-light max-w-2xl">
                      Take the first step toward finding the perfect insurance
                      coverage tailored specifically to your needs and
                      preferences.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-2 md:mt-4">
                      {[
                        "Fast Comparison",
                        "Top Providers",
                        "Expert Support",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-lg"
                        >
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-secondary-500 flex items-center justify-center mr-2">
                            <FiCheck className="text-white h-2 sm:h-2.5 w-2 sm:w-2.5" />
                          </div>
                          <span className="text-white text-xs sm:text-sm">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to="/compare"
                      className="group flex flex-col items-center justify-center bg-white rounded-xl py-6 px-8 shadow-2xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-50 flex items-center justify-center mb-2 sm:mb-4">
                        <TbArrowRight className="h-6 sm:h-7 w-6 sm:w-7 text-primary-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-lg sm:text-xl font-bold text-secondary-600 mb-1">
                        Compare Plans
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        Takes only 2 minutes
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
