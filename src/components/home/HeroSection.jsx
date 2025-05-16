import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbArrowRight, TbCalendarSmile, TbPremiumRights, TbShieldCheckFilled } from "react-icons/tb";
import { PiThumbsUpDuotone } from "react-icons/pi";

const HeroSection = ({ activeSlide, heroSlides }) => {
  const navigate = useNavigate();
  
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
      icon: TbPremiumRights,
      text: "Flexible Premium Options",
    },

    {
      icon: PiThumbsUpDuotone,
      text: "Trusted by Thousands",
    },
  ];

    // Auto-rotate feature carousel
    useEffect(() => {
      const featureInterval = setInterval(() => {
        setActiveFeature((current) => (current + 1) % features.length);
      }, 4500);
      return () => clearInterval(featureInterval);
    }, [features.length]);

  return (
    <section
    className="relative h-[36rem] lg:h-[51rem] pt-32 flex items-center bg-neutral-500 pb-20 md:pb-32 overflow-"
    id="hero"
  >
    {/* Hero Slider */}
    <AnimatePresence>
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 z-0 ${
            index === activeSlide ? "" : "pointer-events-none"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === activeSlide ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/75"></div>
        </motion.div>
      ))}
    </AnimatePresence>

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
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] lg:text-sm font-normal lg:font-medium font-outfit bg-white/10 backdrop-blur-sm text-white border border-white/20">
                <span className="flex h-2 w-2 rounded-full bg-secondary-400 mr-2"></span>
                Safeguarding what's truly yours
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl lg:text-[3.9rem] font-extrabold mb-4 lg:mb-6 text-white">
                  {heroSlides[activeSlide].title}
                  <br className="hidden sm:block" />{" "}
                  {heroSlides[activeSlide].titleBreak}
                  {heroSlides[activeSlide].titleHighlight && (
                    <span className="text-secondary-500/90">
                      {" "}
                      {heroSlides[activeSlide].titleHighlight}
                    </span>
                  )}
                </h1>
                <p className="text-base md:text-2xl lg:text-[1.35rem] text-white/90 mb-8 font-outfit max-w-3xl">
                  {heroSlides[activeSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 font-lexend">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/compare")}
                className="px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:bg-gradient-to-r hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg shadow-lg  transition-all duration-200 flex items-center justify-center group"
              >
                Compare Insurance Plans
                <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/buy-online"
                  className="btn w-full border-2 border-white/50 text-secondary-500 hover:bg-white/20 hover:text-secondary-600 transition-all duration-300 px-8 py-2 sm:py-2.5 rounded-lg text-base sm:text-lg"
                >
                  Buy Plan Online
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
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30 ">
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
                <h3 className="text-lg sm:text-xl font-bold mb-2 md:mb-4 text-primary-500">
                  See how much you could save today
                </h3>
                <p className="text-white/80 text-sm font-lexend font-normal mb-4">
                  Our easy-to-use comparison tool finds the best plans for
                  your budget. Get started in just 2 minutes.
                </p>

                {/* Call to action button */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    // to="/compare"
                    className="block w-full py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-center font-bold rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 shadow-lg mt-4 sm:mt-6 group"
                  >
                    <motion.span
                      className="inline-flex items-center font-lexend font-semibold justify-center"
                      whileHover={{ x: 5 }}
                    >
                      Get a Quote
                      <motion.div
                        whileHover={{ x: 6 }}
                      >
                        <TbArrowRight className="ml-2" />
                      </motion.div>
                    </motion.span>
                  </Link>
                </motion.div>

                {/* Features Carousel */}
                <div className="mt-3 relative">
                  <div className="h-11 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {features.map(
                        (feature, index) =>
                          index === activeFeature && (
                            <motion.div
                              key={index}
                              className="flex items-center justify-center w-full px-2"
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
    <div className="absolute -bottom-1 left-0 right-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        className="w-full h-auto"
        preserveAspectRatio="none"
        
      >
        <path
          fill="#f9f7f5"
          fillOpacity="1"
          d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,80C840,96,960,96,1080,88C1200,80,1320,64,1380,56L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
        ></path>
      </svg>
    </div>
  </section>
  );
};

export default HeroSection;
