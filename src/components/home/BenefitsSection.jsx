import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TbCheck,
  TbShieldHalfFilled,
  TbCoins,
  TbAward,
  TbArrowRight,
  TbChevronRight,
  TbPhoneCall,
} from "react-icons/tb";
import { PiSmileyDuotone } from "react-icons/pi";
import contactService from "../../services/contactService";
import { useToast } from "../../hooks/useToast";
import { BiSupport } from "react-icons/bi";
import { GrEmptyCircle } from "react-icons/gr";

const BenefitsSection = () => {
  const { toast } = useToast();
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const benefitsRef = useRef(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    emailPhone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle contact form changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate contact form
  const validateContactForm = () => {
    if (!contactForm.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!contactForm.emailPhone.trim()) {
      toast.error("Email or phone number is required");
      return false;
    }
    if (!contactForm.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    return true;
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    setIsSubmitting(true);

    try {
      // Determine if emailPhone is email or phone
      const isEmail = contactForm.emailPhone.includes("@");

      const messageData = {
        name: contactForm.name.trim(),
        email: isEmail ? contactForm.emailPhone.trim() : "",
        phone: !isEmail ? contactForm.emailPhone.trim() : "",
        subject: "General Inquiry from Benefits Section",
        message: contactForm.message.trim(),
        type: "contact",
        priority: "medium",
      };

      // Remove empty email/phone fields to avoid validation issues
      if (!messageData.email) {
        delete messageData.email;
      }
      if (!messageData.phone) {
        delete messageData.phone;
      }

      console.log("Sending contact message data:", messageData);

      const response = await contactService.createContactMessage(messageData);

      if (response.success !== false) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setContactForm({
          name: "",
          emailPhone: "",
          message: "",
        });
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Auto-rotate benefits
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => (current + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Benefits data with images
  const benefits = [
    {
      id: 1,
      title: "All Encompassing Tailored Solutions",
      description:
        "From everyday health needs, to unforeseen travel issues. Lako provides a full spectrum of personalized insurance covers.",
      icon: <TbShieldHalfFilled className="h-6 w-6" />,
      color: "primary",
    },
    {
      id: 2,
      title: "Flexible & Affordable Options",
      description:
        "Find the perfect balance between comprehensive coverage and cost-effective insurance premiums without compromizing on quality.",
      icon: <TbCoins className="h-6 w-6" />,
      color: "secondary",
    },
    {
      id: 3,
      title: "Expert Client-Focused Guidance",
      description:
        "Our experienced team provides professional advice to help you make informed decisions about your insurance coverage.",
      icon: <BiSupport className="h-6 w-6" />,
      color: "primary",
    },
    {
      id: 4,
      title: "Quick Claims Processing",
      description:
        "Fast, efficient claims processing with dedicated 24/7 support to get you back on your feet when you need it most.",
      icon: <PiSmileyDuotone className="h-6 w-6" />,
      color: "secondary",
    },
  ];

  return (
    <section
      className="py-8 lg:py-12 bg-neutral-50 relative overflow-hidden font-outfit"
      id="features"
    >
      <div className="lg:container mx-auto px-0 lg:px-12 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:hidden inline-flex items-center ml-6 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-secondary-50 text-secondary-600 border border-secondary-200 mb-4"
        >
          <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
          Why Choose Us
        </motion.span>
        <div className="text-center mb-8 lg:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-primary-600"
          >
            The right <span className="text-secondary-500">protection</span> to
            keep you moving forward
          </motion.h2>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left side - Interactive benefit cards */}
            <div className="col-span-5">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary-50 text-secondary-600 border border-secondary-200 mb-4"
              >
                <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                Why Choose Us
              </motion.span>
              <div className="space-y-4" ref={benefitsRef}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    animate={{
                      scale: activeFeature === index ? 1.01 : 1,
                      boxShadow:
                        activeFeature === index
                          ? benefit.color === "primary"
                            ? "0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.05)"
                            : "0 20px 25px -5px rgba(236, 72, 153, 0.15), 0 10px 10px -5px rgba(236, 72, 153, 0.1), 0 0 0 1px rgba(236, 72, 153, 0.05)"
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    transition={{
                      opacity: { duration: 0.8, delay: index * 0.1 },
                      y: { duration: 0.7, delay: index * 0.1 },
                      scale: { duration: 0.6 },
                      boxShadow: { duration: 0.8 },
                      default: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                    }}
                    className={`relative p-5 rounded-xl cursor-pointer group overflow-hidden ${
                      activeFeature === index
                        ? benefit.color === "primary"
                          ? "bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200 border-primary-200"
                          : "bg-gradient-to-br from-secondary-100 via-secondary-50 to-secondary-200 border-secondary-200"
                        : "bg-gradient-to-br from-neutral-100 via-white to-neutral-200 border-neutral-200 hover:from-neutral-100 hover:to-neutral-50"
                    } border-2`}
                    onClick={() => setActiveFeature(index)}
                  >
                    {/* Animated background overlay */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: activeFeature === index ? 0.1 : 0,
                        scale: activeFeature === index ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`absolute inset-0 rounded-xl ${
                        benefit.color === "primary"
                          ? "bg-gradient-to-r from-primary-300 to-primary-400"
                          : "bg-gradient-to-r from-secondary-300 to-secondary-400"
                      }`}
                    />

                    {/* Glowing border effect */}
                    {activeFeature === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 rounded-xl border-2 ${
                          benefit.color === "primary"
                            ? "border-primary-300"
                            : "border-secondary-300"
                        } blur-sm opacity-40`}
                      />
                    )}

                    <div className="flex items-start relative z-10">
                      <motion.div
                        animate={{
                          scale: activeFeature === index ? 1.15 : 1,
                          rotate: activeFeature === index ? 5 : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1],
                          scale: { duration: 0.8 },
                          rotate: { duration: 0.9 },
                        }}
                        className={`flex-shrink-0 p-3 rounded-xl mr-4 relative overflow-hidden  ease-out ${
                          activeFeature === index
                            ? benefit.color === "primary"
                              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                              : "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg"
                            : benefit.color === "primary"
                            ? "bg-gradient-to-r from-primary-200 to-primary-100 text-primary-600"
                            : "bg-gradient-to-r from-secondary-200 to-secondary-100 text-secondary-600"
                        }`}
                      >
                        {/* Icon glow effect */}
                        {activeFeature === index && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`absolute inset-0 rounded-xl ${
                              benefit.color === "primary"
                                ? "bg-primary-500"
                                : "bg-secondary-500"
                            } blur-md`}
                          />
                        )}
                        <motion.div
                          animate={{
                            scale: activeFeature === index ? 1.15 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                          className="relative z-10"
                        >
                          {benefit.icon}
                        </motion.div>
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3
                          animate={{
                            color:
                              activeFeature === index
                                ? benefit.color === "primary"
                                  ? "#247f7c" // primary-700
                                  : "#e07b13" // secondary-700
                                : "#4b5563", // gray-600
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-xl font-bold mb-2 transition-all duration-500"
                        >
                          {benefit.title}
                        </motion.h3>
                        <motion.p
                          animate={{
                            color:
                              activeFeature === index ? "#374151" : "#6b7280",
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-base leading-relaxed transition-colors duration-500"
                        >
                          {benefit.description.length > 120
                            ? `${benefit.description.substring(0, 120)}...`
                            : benefit.description}
                        </motion.p>
                      </div>
                    </div>

                    {/* Subtle sparkle effect for active card */}
                    {activeFeature === index && (
                      <>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
                            benefit.color === "primary"
                              ? "bg-primary-400"
                              : "bg-secondary-400"
                          } opacity-60`}
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          className={`absolute top-6 right-6 w-1 h-1 rounded-full ${
                            benefit.color === "primary"
                              ? "bg-primary-300"
                              : "bg-secondary-300"
                          } opacity-40`}
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                          className={`absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full ${
                            benefit.color === "primary"
                              ? "bg-primary-500"
                              : "bg-secondary-500"
                          } opacity-30`}
                        />
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[560px]"
              >
                {/* First Image - Main background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 left-0 w-[80%] h-[350px] bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transform -rotate-3"
                  style={{ transformOrigin: "center center" }}
                >
                  <div className="relative h-full">
                    <img
                      src="/slider02.png"
                      alt="Insurance Team"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
                  </div>
                </motion.div>

                {/* Second Image - Overlapping bottom right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20, y: 20, rotate: 6 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute bottom-[-30px] right-[-30px] w-[65%] h-[350px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 z-20 transform rotate-3"
                  style={{ transformOrigin: "center center" }}
                >
                  <div className="relative h-full">
                    <img
                      src="/slider09.png"
                      alt="Professional Consultation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          {/* Mobile Benefits */}
          <div className="space-y-4 px-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className=""
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 p-3 rounded-xl mr-4 ${
                      benefit.color === "primary"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-secondary-100 text-secondary-600"
                    }`}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        benefit.color === "primary"
                          ? "text-primary-700"
                          : "text-secondary-700"
                      }`}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Hero Images Section */}
          <div className="mt-8 px-2 md:px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[260px] md:h-[450px]"
            >
              {/* Main image */}
              <div
                className="absolute top-0 left-0 w-[80%] h-[180px] md:h-[300px] bg-white rounded-xl overflow-hidden shadow-lg transform -rotate-3"
                style={{ transformOrigin: "center center" }}
              >
                <img
                  src="/slider02.png"
                  alt="Insurance Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
              </div>

              {/* Overlapping image */}
              <div
                className="absolute bottom-0 right-0 w-[60%] h-[160px] md:h-[280px] bg-white rounded-xl overflow-hidden shadow-xl z-10 transform rotate-3"
                style={{ transformOrigin: "center center" }}
              >
                <img
                  src="/slider09.png"
                  alt="Professional Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Experience Section */}
          <div className="mt-12 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Experience That{" "}
                <span className="text-secondary-500">Matters</span>
              </h2>

              <div className="border-l-4 border-secondary-400 pl-4 text-[0.9rem] md:text-base text-left mb-6">
                <p className="text-gray-600 leading-relaxed">
                  Our notable years of operation signify a journey filled with
                  success stories, where we've seamlessly navigated the
                  complexities of insurance dynamics. Through dedication and
                  innovation, we've been instrumental in sculpting coverage
                  solutions that foster growth, security, and peace of mind.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    10+
                  </div>
                  <div className="text-xs text-gray-600">
                    Years of Excellence
                  </div>
                </div>
                <div className="bg-secondary-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">
                    5000+
                  </div>
                  <div className="text-xs text-gray-600">Policies Sold</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile CTA Section */}
          <div className="mt-4 md:mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Mobile CTA Image */}
              <div className="relative h-[240px] md:h-[450px] mb-4 md:mb-5">
                <img
                  src="/group1.png"
                  alt="Professional Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mx-2.5 md:mx-4 border-r-4 border-secondary-400 text-[0.9rem] md:text-base text-left mb-6">
                <p className="text-gray-600 leading-relaxed">
                  At Lako, expertise is not just a word; it's the cornerstone of
                  our service. Our seasoned professionals possess a wealth of
                  industry knowledge, strategic acumen, and hands-on experience.
                  This amalgamation of skills allows us to stay ahead of
                  industry trends, offering cutting-edge solutions that redefine
                  insurance standards.
                </p>
              </div>

              <div className="flex gap-3 mx-2.5 md:mx-4">
                <Link
                  to="/compare"
                  className="inline-flex items-center justify-center text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 transition-all duration-200"
                >
                  Talk to an Expert
                      <TbArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3 border-2 border-secondary-500 text-secondary-600 font-semibold rounded-lg hover:bg-secondary-50 transition-all duration-200"
                >
                  <GrEmptyCircle
                    size={18}
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Buy Insurance Online
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Experience Section - Desktop Only */}
        <div className="hidden lg:block mt-28">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left side - Image */}
            <div className="col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Decorative pattern boxes - Top right */}
                <div className="absolute -top-4 -right-4 z-10 grid grid-cols-2 gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`top-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className={`w-4 h-4 ${
                        i < 2 ? "bg-primary-600" : "bg-secondary-500"
                      } rounded-sm`}
                    />
                  ))}
                </div>

                {/* Decorative pattern boxes - Bottom left */}
                <div className="absolute -bottom-4 -left-4 z-10 grid grid-cols-2 gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`bottom-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      className={`w-4 h-4 ${
                        i < 2 ? "bg-secondary-500" : "bg-primary-600"
                      } rounded-sm`}
                    />
                  ))}
                </div>

                {/* Main Image */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative">
                  <img
                    src="/group1.png"
                    alt="Professional Team Experience"
                    className="w-full h-[350px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Content */}
            <div className="col-span-7 pl-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                  Experience That{" "}
                  <span className="text-secondary-500">Matters</span>
                </h2>

                <div className="border-l-4 border-secondary-400 pl-6 mb-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our notable years of operation signify a journey filled with
                    success stories, where we've seamlessly navigated the
                    complexities of insurance dynamics. Through dedication and
                    innovation, we've been instrumental in sculpting coverage
                    solutions that foster growth, security, and peace of mind.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center p-4 bg-primary-100 rounded-xl"
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      10+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years of Excellence
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center p-4 bg-secondary-100 rounded-xl"
                  >
                    <div className="text-3xl font-bold text-secondary-600 mb-2">
                      5000+
                    </div>
                    <div className="text-sm text-gray-600">Policies Sold</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Cards */}
        <div className="hidden lg:block lg:mt-20 lg:px-1.5">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            {/* Text Content with CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="w-full">
                <div className="border-l-4 border-secondary-400 pl-6 mb-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    At Lako, expertise is not just a word; it's the cornerstone
                    of our service. Our seasoned professionals possess a wealth
                    of industry knowledge, strategic acumen, and hands-on
                    experience. This amalgamation of skills allows us to stay
                    ahead of industry trends, offering cutting-edge solutions
                    that redefine insurance standards.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 transition-all duration-200 group"
                    >
                      Talk to an Expert
                      <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/buy-online"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-secondary-500 text-secondary-600 font-semibold rounded-lg hover:bg-secondary-50 transition-all duration-200 group"
                    >
                      <GrEmptyCircle
                        size={20}
                        className="mr-2 group-hover:scale-110 transition-transform"
                      />
                      Buy Insurance Online
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 mx-1.5 lg:mx-0 bg-white rounded-2xl shadow-lg overflow-hidden relative transition-all duration-500 border border-gray-100"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-secondary-100 blur-xl opacity-70 transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-primary-100 blur-xl opacity-70 transform -translate-x-1/3 translate-y-1/3"></div>
              </div>
              <div className="p-4 lg:p-6 relative z-10">
                <div className="text-left mb-4">
                  <p className="text-gray-700 text-base">
                    Have any questions? We're here to help you find the perfect
                    insurance solution.
                  </p>
                </div>

                {/* Contact Form */}
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Your Name"
                        className="w-full px-3.5 lg:px-4 py-2.5 text-[0.95rem] md:text-base text-neutral-800 bg-neutral-100 rounded-lg border border-neutral-400 focus:border-secondary-600 focus:ring-1 focus:ring-secondary-600 focus:outline-none transition-all outline-none"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        name="emailPhone"
                        value={contactForm.emailPhone}
                        onChange={handleContactChange}
                        placeholder="Email/Phone Number"
                        className="w-full px-3 lg:px-4 py-2.5 text-[0.95rem] md:text-base text-neutral-800 bg-neutral-100 rounded-lg border border-neutral-400 focus:border-secondary-600 focus:ring-1 focus:ring-secondary-600 focus:outline-none transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Your Message"
                      rows="3"
                      className="w-full px-3.5 lg:px-4 py-2.5 text-[0.95rem] md:text-base text-neutral-800 bg-neutral-100 rounded-lg border border-neutral-400 focus:border-secondary-600 focus:ring-1 focus:ring-secondary-600 focus:outline-none transition-all outline-none"
                      required
                    ></textarea>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-2 px-6 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <TbChevronRight className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
