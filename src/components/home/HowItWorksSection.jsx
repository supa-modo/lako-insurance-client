import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { TbSearch, TbCheckbox, TbCoins, TbAward } from "react-icons/tb";

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-primary-700 font-outfit" id="how-it-works">
      <div className="lg:container mx-auto px-1.5 sm:px-4 lg:px-12">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1 lg:py-1.5 mb-4 lg:mb-6 rounded-full text-[0.78rem] lg:text-sm font-medium font-outfit bg-secondary-50 text-secondary-600 border border-secondary-200"
          >
            <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
            Plan Comparison Process
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 lg:mb-4 text-white">
            Experience <span className="text-secondary-500">Simplified</span>{" "}
            Insurance
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            We've reimagined how you discover, compare, and select insurance
            plans for a seamless experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-8 relative">
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
                "Our expert comparison tool matches you with personalized plans from top insurance providers giving you a comparison table of their rates and benefits.",
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
              <div className="h-full bg-white rounded-xl shadow-xl p-5 lg:p-8 border border-gray-100 transition duration-300 hover:shadow-2xl hover:translate-y-[-8px] overflow-hidden group">
                {/* Step indicator */}
                <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-end justify-start pb-3 pl-3 text-xl font-bold text-neutral-600 opacity-50 group-hover:opacity-80 transition-opacity overflow-hidden">
                  {item.step}
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-start gap-4 mb-2 sm:mb-3 md:mb-4">
                  <div
                    className={`inline-block p-3 sm:p-4 rounded-xl ${
                      item.color === "primary"
                        ? "bg-primary-100"
                        : "bg-secondary-100"
                    }`}
                  >
                    <item.icon
                      className={`h-8 w-8 ${
                        item.color === "primary"
                          ? "text-primary-500"
                          : "text-secondary-500"
                      }`}
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-700">
                    {item.title}
                  </h3>
                </div>

                <p className="text-[0.9rem] sm:text-base text-gray-600 mb-6">
                  {item.description}
                </p>

                <div
                  className={`inline-block px-5 py-1 rounded-xl text-[0.82rem] sm:text-sm font-medium ${
                    item.color === "primary"
                      ? "bg-primary-100 text-primary-700"
                      : "bg-secondary-100 text-secondary-700"
                  }`}
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
              className="inline-flex items-center px-10 py-3.5 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium font-lexend text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <span>Let's Get Started</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
