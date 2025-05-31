import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TbCheck,
  TbShieldHalfFilled,
  TbCoins,
  TbAward,
  TbPremiumRights,
  TbArrowRight,
  TbArrowLeft,
  TbArrowNarrowRight,
  TbArrowNarrowLeft,
  TbHeartHandshake,
  TbBuildingBank,
  TbLifebuoy,
  TbMessageShare,
  TbChevronRight,
  TbPhoneCall,
} from "react-icons/tb";
import {
  PiUsersDuotone,
  PiSmileyDuotone,
  PiShieldCheckDuotone,
} from "react-icons/pi";
import contactService from "../../services/contactService";
import { useToast } from "../../hooks/useToast";

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
      title: "All Encompassing Coverage",
      description:
        "From everyday health needs, to unforeseen travel issues. Lako provides a full spectrum of insurance solutions.",
      icon: <TbShieldHalfFilled className="h-6 w-6" />,
      color: "primary",
    },
    {
      id: 2,
      title: "Flexible & Affordable Options",
      description:
        "Find the perfect balance between comprehensive coverage and cost-effective insurance premiums witout compromizing on quality.",
      icon: <TbCoins className="h-6 w-6" />,
      color: "secondary",
    },
    {
      id: 3,
      title: "Customer-First Approach",
      description:
        "We prioritize your needs with personalized service and support. Our dedicated team of insurance specialists is always ready to assist and guide you through decisions.",
      icon: <PiUsersDuotone className="h-6 w-6" />,
      color: "primary",
    },
    {
      id: 4,
      title: "Tailored Solutions",
      description:
        "We provide personalized insurance solutions to meet your unique needs and challenges.",
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
          className="lg:hidden inline-flex items-center ml-6 px-4 py-1.5 rounded-full text-sm font-medium bg-secondary-50 text-secondary-600 border border-secondary-200 mb-4"
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
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-5 rounded-xl cursor-pointer group ${
                      activeFeature === index
                        ? `bg-gradient-to-r ${
                            benefit.color === "primary"
                              ? "from-primary-50 to-primary-100"
                              : "from-secondary-50 to-secondary-100"
                          } border ${
                            benefit.color === "primary"
                              ? "border-primary-200"
                              : "border-secondary-200"
                          }`
                        : "bg-gradient-to-r from-neutral-100 to-neutral-50 border border-neutral-200"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 p-3 rounded-xl ${
                          activeFeature === index
                            ? benefit.color === "primary"
                              ? "bg-primary-500 text-white"
                              : "bg-secondary-500 text-white"
                            : benefit.color === "primary"
                            ? "bg-primary-100 text-primary-600"
                            : "bg-secondary-100 text-secondary-600"
                        } group-hover:scale-110 transition-all duration-300 mr-4`}
                      >
                        {benefit.icon}
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-bold ${
                            activeFeature === index
                              ? benefit.color === "primary"
                                ? "text-primary-700"
                                : "text-secondary-700"
                              : "text-gray-600"
                          } mb-2`}
                        >
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-base">
                          {benefit.description.length > 120
                            ? `${benefit.description.substring(0, 120)}...`
                            : benefit.description}
                        </p>
                      </div>
                    </div>
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
                className="bg-white rounded-2xl mt-6 overflow-hidden shadow-xl border border-gray-100 h-full relative"
              >
                <div className="h-[560px] overflow-hidden">
                  <img
                    src="/slider01.png"
                    alt="Insurance Experience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-primary-900/0"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-white">
                      <div className="flex items-center mb-3">
                        <TbAward className="h-10 w-10 text-secondary-500 mr-2" />
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary-500">
                          10+ Years of Excellence
                        </h3>
                      </div>
                      <p className="text-white/90 md:text-[1.25rem]">
                        We've been in the insurance industry for over a decade,
                        providing comprehensive coverage solutions across a wide
                        variety of insurance products.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {[
                          "Medical Covers",
                          "Travel Insurance",
                          "Property Insurance",
                          "Motor Coverage",
                          "Life Insurance",
                        ].map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[0.83rem] px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white"
                          >
                            <TbCheck className="mr-1 h-4 w-4" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          {/* Mobile Benefits */}

          <div className=" space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className=" px-4 py-1 shadow-sm rounded-xl"
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
                      className={`text-lg font-bold mb-1 ${
                        benefit.color === "primary"
                          ? "text-primary-700"
                          : "text-secondary-700"
                      }`}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-[0.9rem] mb-2">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Experience Banner */}
          <div className="">
            <div className="bg-white overflow-hidden shadow-lg relative">
              <img
                src="/slider01.png"
                alt="Insurance Experience"
                className="w-full h-[20rem] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-white">
                  <div className="flex items-center mb-3">
                    <TbAward className="h-8 w-8 text-secondary-500 mr-2" />

                    <h3 className="text-2xl font-bold text-secondary-500">
                      10+ Years of Excellence
                    </h3>
                  </div>
                  <p className="text-white/90 text-[0.89rem]">
                    We've got you covered from Medical Plans, Travel,
                    International Coverage, Liability Plans, Property Insurance,
                    Motor Coverage, and various General Insurance options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Cards */}
        <div className="lg:mt-20 lg:px-1.5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* CTA 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 bg-gradient-to-br from-primary-600 to-primary-800 lg:rounded-2xl overflow-hidden shadow-xl relative group hover:shadow-2xl"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-primary-400/30 blur-3xl group-hover:w-44 group-hover:h-44 transition-all duration-700"></div>
                <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl group-hover:w-64 group-hover:h-64 transition-all duration-700"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl transform translate-x-1/2 translate-y-1/2"></div>
              </div>
              <div className="p-5 lg:p-8 md:p-10 relative z-10 flex flex-col lg:flex-row items-center">
                <div className="lg:w-[75%] mb-6 lg:mb-0 lg:pr-8">
                  <div className="hidden lg:inline-block mb-4">
                    <span className="bg-white/10 backdrop-blur-sm text-secondary-100 text-sm px-4 py-1.5 rounded-full">
                      Comprehensive Coverage
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-300 mb-3">
                    Prepare for the Unexpected
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    Families have gone bankrupt paying for unplanned bills. With
                    a comprehensive insurance cover, you can be financially
                    prepared for what comes your way.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">
                    {[
                      "Financial Security",
                      "Peace of Mind",
                      "Expert Support",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg"
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-secondary-600 flex items-center justify-center mr-2">
                          <TbCheck className="text-white h-2.5 w-2.5" />
                        </div>

                        <span className="text-white text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-[26%] w-full flex flex-col gap-2 lg:gap-3 justify-center lg:justify-end">
                  
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/compare"
                      className="w-full md:w-auto justify-center inline-flex items-center px-6 py-2 lg:py-3.5 bg-white text-primary-700 font-medium rounded-lg shadow-xl hover:bg-primary-50 transition-all duration-200 text-center group"
                    >
                      Get a quote now
                      <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/contact"
                      className="w-full md:w-auto justify-center inline-flex items-center px-5 py-2 lg:py-3.5 bg-secondary-500 text-white font-medium rounded-lg shadow-xl hover:bg-secondary-600 transition-all duration-200 text-center group"
                    >
                      <TbPhoneCall size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                      Talk to an expert
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
                <div className="text-left mb-6">
                  <p className="text-gray-700 text-base">
                    Have questions? We're here to help you find the perfect
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
                      className="w-full py-2 px-6 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
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
