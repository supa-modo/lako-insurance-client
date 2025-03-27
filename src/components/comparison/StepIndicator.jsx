import React from "react";
import { FiCheckCircle, FiUser, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import { PiUserDuotone } from "react-icons/pi";
import { TbShieldCheckFilled } from "react-icons/tb";
const StepIndicator = ({ currentStep }) => {
  const steps = [
    {
      number: 1,
      label: "Personal Details",
      icon: PiUserDuotone,
      description: "Your information",
    },
    {
      number: 2,
      label: "Insurance Preferences",
      icon: TbShieldCheckFilled,
      description: "Coverage & budget",
    },
  ];

  return (
    <div className="mb-8 sm:mb-9 relative">
      <div className="flex items-center justify-center relative max-w-3xl mx-auto">
        {/* Progress Line - Connects the midpoints of the circular icons */}
        <div className="absolute left-0 right-0 mx-10 sm:mx-6 top-1/3 transform -translate-y-1/2 h-1.5 bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-full z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary-300 to-secondary-500 rounded-full glow-secondary"
            initial={{ width: "0%" }}
            animate={{
              width: currentStep === 1 ? "40%" : "82%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.2,
            }}
          ></motion.div>
        </div>

        {/* Steps */}
        <div className="flex flex-row w-full justify-between px-14 items-center z-10">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: step.number * 0.2,
              }}
              className="flex flex-col items-center relative"
            >
              {/* Step Circle with Icon */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(138, 75, 255, 0.4)",
                }}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{
                  scale: currentStep >= step.number ? 1 : 0.95,
                  opacity: currentStep >= step.number ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`relative h-12 w-12 sm:h-16 sm:w-16 md:h-22 md:w-22 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  currentStep >= step.number
                    ? "bg-gradient-to-br from-secondary-400 to-secondary-600 text-white"
                    : "bg-white/10 backdrop-blur-sm border border-white/30 text-white/80"
                }`}
              >
                {/* Animated ripple effect for current step */}
                {currentStep === step.number && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-secondary-400/30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-secondary-400/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0.2, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 0.2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}

                {/* Step Number Badge with Glow Effect */}
                <motion.div
                  className={`absolute -top-1 -right-1 h-5 w-5 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg border ${
                    currentStep >= step.number
                      ? "border-secondary-300 bg-secondary-500 text-white"
                      : "border-white/20 bg-white/90 text-neutral-700"
                  }`}
                  animate={{
                    boxShadow:
                      currentStep >= step.number
                        ? [
                            "0 0 0px rgba(138, 75, 255, 0.3)",
                            "0 0 10px rgba(138, 75, 255, 0.6)",
                            "0 0 0px rgba(138, 75, 255, 0.3)",
                          ]
                        : "none",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Icon with Animation */}
                {currentStep > step.number ? (
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <FiCheckCircle className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      scale: currentStep === step.number ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: currentStep === step.number ? Infinity : 0,
                      repeatType: "reverse",
                    }}
                  >
                    <step.icon className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                  </motion.div>
                )}
              </motion.div>

              {/* Step Label with Animation */}
              <div className="text-center mt-2 sm:mt-4">
                <motion.p
                  className={`font-medium text-sm md:text-base mb-0.5 sm:mb-1 ${
                    currentStep >= step.number ? "text-white" : "text-white/70"
                  } font-outfit`}
                  animate={{
                    color:
                      currentStep >= step.number
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.7)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.label}
                </motion.p>
                <motion.p
                  className="text-xs text-white/70 font-outfit hidden sm:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StepIndicator;
