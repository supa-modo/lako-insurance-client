import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { PiUserDuotone } from "react-icons/pi";
import { TbShieldCheckFilled } from "react-icons/tb";

// Steps data definition
const steps = [
  {
    number: 1,
    label: "Personal Details",
    icon: PiUserDuotone,
    description: "Your information & contacts",
  },
  {
    number: 2,
    label: "Insurance Preferences",
    icon: TbShieldCheckFilled,
    description: "Coverage options & budget",
  },
];

// Desktop vertical stepper (for md screens and up)
const DesktopStepper = ({ currentStep }) => {
  return (
    <div className="h-full w-full flex flex-col justify-start items-start pl-4 pt-1 hidden md:flex">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`step relative w-full flex ${
            currentStep >= step.number ? "text-secondary-400" : "text-white/60"
          } ${index > 0 ? "mt-24" : ""}`}
        >
          {/* Circle with icon */}
          <div className="relative">
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
              className={`z-10 circle relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg
                ${
                  currentStep >= step.number
                    ? "bg-gradient-to-br from-secondary-400 to-secondary-600 text-white"
                    : "bg-white/10 backdrop-blur-sm border border-white/30 text-white/80"
                }
                ${currentStep === step.number ? "step-active" : ""}`}
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
                className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shadow-lg border ${
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
                  <FiCheckCircle className="h-6 w-6" />
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
                  <step.icon className="h-6 w-6" />
                </motion.div>
              )}
            </motion.div>

            {/* Connecting vertical line */}
            {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-full w-[3px] h-[6em] -translate-x-1/2 z-0">
                <div className="w-full h-full bg-white/20"></div>
                <motion.div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-secondary-400 to-secondary-600"
                  initial={{ height: 0 }}
                  animate={{
                    height: currentStep > step.number ? "100%" : "50%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
              </div>
            )}
          </div>

          {/* Step content */}
          <div className="ml-5 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * step.number }}
              className="text-left"
            >
              <motion.p
                className={`title font-medium text-lg ${
                  currentStep >= step.number ? "text-primary-400" : "text-primary-400/70"
                } font-outfit`}
                animate={{
                  color:
                    currentStep >= step.number
                      ? "#75c9c9"
                      : "rgba(255, 255, 255, 0.7)",
                }}
                transition={{ duration: 0.3 }}
              >
                {step.label}
              </motion.p>
              <motion.p
                className="caption text-sm text-white/70 font-outfit mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Mobile horizontal stepper (for smaller than md screens)
const MobileStepper = ({ currentStep }) => {
  return (
    <div className="w-full flex flex-col items-center md:hidden">
      <div className="relative w-full px-5">
        {/* Horizontal connecting line */}
        <div className="absolute top-7 left-[20%] right-[20%] h-[3px] bg-white/20 z-0">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-400 to-secondary-600"
            initial={{ width: 0 }}
            animate={{
              width: currentStep > 1 ? "100%" : "50%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
        </div>

        {/* Step circles container */}
        <div className="flex justify-between items-center relative z-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              {/* Step circle with icon */}
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
                className={`circle relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg mb-2
                  ${
                    currentStep >= step.number
                      ? "bg-gradient-to-br from-secondary-400 to-secondary-600 text-white"
                      : "bg-white/10 backdrop-blur-sm border border-white/30 text-white/80"
                  }
                  ${currentStep === step.number ? "step-active" : ""}`}
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
                  className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shadow-lg border ${
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
                    <FiCheckCircle className="h-6 w-6" />
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
                    <step.icon className="h-6 w-6" />
                  </motion.div>
                )}
              </motion.div>

              {/* Step label */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * step.number }}
                className="text-center"
              >
                <motion.p
                  className={`title font-medium text-sm ${
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
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component that combines both steppers
const StepIndicator = ({ currentStep }) => {
  return (
    <>
      <DesktopStepper currentStep={currentStep} />
      <MobileStepper currentStep={currentStep} />
    </>
  );
};

export default StepIndicator;
