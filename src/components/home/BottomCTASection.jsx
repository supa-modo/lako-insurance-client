import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

const BottomCTASection = () => {
  return (
    <section className="pb-10 bg-neutral-200 font-outfit">
      <div className="lg:container mx-auto px-1.5 sm:px-4 lg:px-12">
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
                  <div className="inline-block">
                    <span className="bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full">
                      Start Today
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Secure Your Future <br className="hidden lg:block" />
                    <span className="text-secondary-500">With Confidence</span>
                  </h2>
                  <p className="text-white/90 text-base sm:text-lg md:text-xl font-light max-w-2xl">
                    Take the first step toward finding the perfect insurance
                    coverage tailored specifically to your needs and
                    preferences.
                  </p>

                  <div className="flex lg:hidden flex-wrap gap-3 mt-2 md:mt-4">
                    {["Fast Comparison", "Top Providers", "Expert Support"].map(
                      (item, i) => (
                        <div key={i} className="flex items-center ">
                          <FiCheckCircle className="text-secondary-400 mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-white text-[0.8rem] sm:text-sm">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="hidden md:flex flex-wrap gap-3 mt-2 md:mt-4">
                    {["Fast Comparison", "Top Providers", "Expert Support"].map(
                      (item, i) => (
                        <div
                          key={i}
                          className="flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-lg"
                        >
                          <FiCheckCircle className="text-secondary-400 mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-white text-[0.8rem] sm:text-sm">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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

        <div className="mt-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-700 text-sm md:text-base lg:text-lg mb-6"
          >
            Facing any problems getting a quote? Call Us
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 md:gap-3 lg:gap-4 justify-center items-center"
          >
            {["+254 720 636363", "+254 769 868686", "+254 726 581487"].map(
              (phone, index) => (
                <motion.a
                  key={index}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.98 }}
                  className="text-[0.8rem] sm:text-[0.9rem] md:text-base lg:text-lg border-r pr-4 border-primary-600 font-semibold text-primary-600 hover:text-primary-700 "
                >
                  {phone}
                </motion.a>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTASection;
