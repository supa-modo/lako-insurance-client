import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TbPhone,
  TbMail,
  TbMapPin,
  TbSend,
  TbCheck,
  TbAlertCircle,
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbClock,
  TbChevronRight,
  TbMessageCircle,
  TbMailFilled,
  TbPhoneCall,
} from "react-icons/tb";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { PiMapPinAreaDuotone } from "react-icons/pi";
import SEOHelmet from "../../components/SEO/SEOHelmet";
import {
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from "../../components/SEO/structuredData";
import contactService from "../../services/contactService";
import ToastContainer from "../../components/ui/ToastContainer";
import { useToast } from "../../hooks/useToast";

const ContactPage = () => {
  const { toasts, toast, removeToast } = useToast();

  const [formState, setFormState] = useState({
    name: "",
    emailPhone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    status: null, // null, 'success', 'error', 'submitting'
    message: "",
  });

  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];

  // Contact page structured data
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      breadcrumbSchema(breadcrumbs),
      {
        "@type": "ContactPage",
        "@id": "https://lako.co.ke/contact#contactpage",
        url: "https://lako.co.ke/contact",
        name: "Contact Lako Insurance Agency",
        description:
          "Get in touch with Lako Insurance Agency. Contact us for insurance quotes, claims support, or general inquiries. We're here to help with all your insurance needs.",
        mainEntity: organizationSchema,
      },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formState.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formState.emailPhone.trim()) {
      toast.error("Email or phone number is required");
      return false;
    }
    if (!formState.subject.trim()) {
      toast.error("Subject is required");
      return false;
    }
    if (!formState.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormStatus({ status: "submitting", message: "" });

    try {
      // Determine if emailPhone is email or phone
      const isEmail = formState.emailPhone.includes("@");

      const messageData = {
        name: formState.name.trim(),
        email: isEmail ? formState.emailPhone.trim() : "",
        phone: !isEmail ? formState.emailPhone.trim() : "",
        subject: formState.subject.trim(),
        message: formState.message.trim(),
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
        setFormStatus({
          status: "success",
          message:
            "Your message has been sent successfully. We will get back to you soon!",
        });
        toast.success("Message sent successfully!");
        setFormState({
          name: "",
          emailPhone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error response:", error.response?.data);
      setFormStatus({
        status: "error",
        message:
          "There was an error sending your message. Please try again or contact us directly.",
      });
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <SEOHelmet
        title="Contact Lako Insurance Agency - Get Your Free Insurance Quote"
        description="Get in touch with Lako Insurance Agency for insurance quotes, claims support, or general inquiries. We're here to help with all your insurance needs in Kenya and East Africa."
        keywords="contact Lako Insurance, insurance quotes Kenya, insurance agency contact, get insurance quote, insurance claims support, Kenya insurance contact, insurance consultation"
        canonical="/contact"
        ogImage="/lako.png"
        structuredData={contactStructuredData}
      />

      <div className="bg-neutral-50 min-h-screen overflow-hidden font-outfit">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-gradient-to-bl from-primary-700 to-primary-800 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-primary-400/30 blur-3xl"></div>
            <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="lg:container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] md:text-sm lg:text-[0.9rem] font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4"
              >
                <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                Get In Touch
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                We're here to{" "}
                <span className="text-secondary-500">help you👍</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/90 text-[0.95rem] md:text-lg mb-8"
              >
                Have any questions about our insurance services? Need a quote?
                Our team is ready to assist you with personalized solutions.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="py-10 md:py-20 bg-white">
          <div className="lg:container mx-auto px-1 lg:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="lg:bg-gray-100 lg:border border-neutral-300 lg:rounded-2xl p-6 md:p-8 h-full relative overflow-hidden lg:shadow-inner">
                  <div className="relative z-10">
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center px-4 py-1 lg:py-1.5 rounded-full text-[0.78rem] lg:text-sm font-medium bg-primary-100 backdrop-blur-sm text-primary-600 border border-primary-300 mb-4"
                    >
                      <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
                      Contact Details
                    </motion.span>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-3 lg:mb-6">
                      Get in touch with our team
                    </h2>

                    <p className="text-gray-700 text-[0.95rem] lg:text-[1.1rem] mb-8">
                      Feel free to contact us using any of the methods below. We
                      aim to respond to all inquiries within 24 hours.
                    </p>

                    <div className="space-y-4 lg:space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className=" hidden lg:block text-primary-600 mr-4">
                            <PiMapPinAreaDuotone className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-secondary-600 font-semibold mb-1">
                              Our Office
                            </h3>
                            <p className="text-gray-600 text-[0.95rem] lg:text-base">
                              SNDBX Office, Ground Floor, Nairobi, Kenya
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className=" hidden lg:block text-primary-600 mr-4">
                            <TbMailFilled className="h-6 w-6" />
                          </div>
                          <div className="text-gray-600 text-[0.95rem] lg:text-base">
                            <h3 className="text-secondary-600 font-semibold mb-1">
                              Email Us
                            </h3>
                            <p className="">
                              <a
                                href="mailto:info@lako.co.ke"
                                className="hover:text-gray-600 transition-colors"
                              >
                                info@lako.co.ke
                              </a>
                            </p>
                            <p className="">
                              <a
                                href="mailto:ykola@lako.co.ke"
                                className="hover:text-gray-600 transition-colors"
                              >
                                ykola@lako.co.ke
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-3 justify-between items-start">
                        <div className="flex items-start">
                          <div className=" hidden lg:block text-primary-600 mr-4">
                            <TbPhoneCall className="h-6 w-6" />
                          </div>
                          <div className="text-gray-600 text-[0.95rem] lg:text-base">
                            <h3 className="text-secondary-600 font-semibold mb-1">
                              Call Us
                            </h3>
                            <p className="text-gray-600 text-[0.95rem] lg:text-base">
                              <a
                                href="tel:+254720636363"
                                className="hover:text-gray-600 transition-colors"
                              >
                                +254 720 636363
                              </a>
                            </p>
                            <p className="">
                              <a
                                href="tel:+254769868686"
                                className="hover:text-gray-600 transition-colors"
                              >
                                +254 769 868686
                              </a>
                            </p>
                            <p className="">
                              <a
                                href="tel:+254726581487"
                                className="hover:text-gray-600 transition-colors"
                              >
                                +254 726 581487
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className="">
                          <h3 className="text-secondary-600 font-semibold mb-2">
                            Connect With Us
                          </h3>
                          <div className="flex space-x-3">
                            <a
                              href="https://web.facebook.com/lakoinsuranceagency?_rdc=1&_rdr"
                              target="_blank"
                              className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-600 hover:bg-gray-600/20 transition-colors"
                            >
                              <FaFacebookF className="h-5 w-5 text-white" />
                            </a>
                            <a
                              href="https://x.com/lakoinsurance"
                              target="_blank"
                              className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-600/20 transition-colors"
                            >
                              <FaXTwitter className="h-5 w-5" />
                            </a>
                            <a
                              href="https://www.instagram.com/lakoinsurance"
                              target="_blank"
                              className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center text-white hover:bg-gray-600/20 transition-colors"
                            >
                              <FaInstagram className="h-5 w-5" />
                            </a>
                            <a
                              href="https://www.linkedin.com/company/lako-insurance/"
                              target="_blank"
                              className="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center text-white hover:bg-gray-600/20 transition-colors"
                            >
                              <FaLinkedinIn className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-start">
                      <div className=" hidden lg:block text-primary-600 mr-4">
                        <TbClock className="h-6 w-6" />
                      </div>
                      <div className="text-gray-600 text-[0.95rem] lg:text-base">
                        <h3 className="text-secondary-600 font-semibold mb-1">
                          Our Business Hours
                        </h3>
                        <p className="">Monday - Friday: 8:00 AM - 5:00 PM</p>
                        <p className="">Saturday: 9:00 AM - 1:00 PM</p>
                        <p className="">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7"
              >
                <div className="bg-neutral-100 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-100 blur-xl opacity-70 transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-secondary-100 blur-xl opacity-70 transform -translate-x-1/3 translate-y-1/3"></div>
                  </div>

                  <div className="relative z-10">
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary-50 text-secondary-600 border border-secondary-200 mb-3 lg:mb-4"
                    >
                      <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                      Send Us a Message
                    </motion.span>

                    <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-2 lg:mb-4">
                      How can we{" "}
                      <span className="text-secondary-500">help you</span>?
                    </h2>

                    <p className="text-gray-600 text-[0.9rem] lg:text-[1.1rem] mb-4 lg:mb-8">
                      Have a question or need assistance? Fill out the form
                      below and our team will get back to you as soon as
                      possible.
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-3 lg:space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 lg:gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white text-gray-600 text-[0.95rem] md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="emailPhone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address/Phone
                          </label>
                          <input
                            type="text"
                            id="emailPhone"
                            name="emailPhone"
                            value={formState.emailPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white text-gray-600 text-[0.95rem] md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white text-gray-600 text-[0.95rem] md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-white text-gray-600 text-[0.95rem] md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                          required
                        ></textarea>
                      </div>

                      <AnimatePresence>
                        {formStatus.status && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`p-4 rounded-lg ${
                              formStatus.status === "success"
                                ? "bg-green-50 text-green-800"
                                : formStatus.status === "error"
                                ? "bg-red-50 text-red-800"
                                : ""
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                {formStatus.status === "success" ? (
                                  <TbCheck className="h-5 w-5 text-green-500" />
                                ) : formStatus.status === "error" ? (
                                  <TbAlertCircle className="h-5 w-5 text-red-500" />
                                ) : (
                                  <div className=""></div>
                                )}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm">{formStatus.message}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={formStatus.status === "submitting"}
                          className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                        >
                          {formStatus.status === "submitting" ? (
                            <>
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <TbChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pt-16 lg:pt-20 bg-neutral-50">
          <div className=" mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold text-secondary-600 mb-4"
              >
                Visit Our <span className="text-primary-600">Office</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-700 max-w-3xl mx-auto mb-8 lg:mb-12"
              >
                We're conveniently located in Kilimani - SNDBX Office, Ground
                Floor, Nairobi. Visit us during our office hours for one on one
                consultations with our insurance experts.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className=" overflow-hidden lg:shadow-2xl h-[450px] lg:h-[550px] mx-auto relative"
            >
              <div className="bg-neutral-200 w-full h-full flex items-center justify-center relative overflow-hidden">
                {/* Google Maps iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3988.7999027532646!2d36.789854999999996!3d-1.2945929999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwMTcnNDAuNSJTIDM2wrA0NycyMy41IkU!5e0!3m2!1sen!2ske!4v1750147901897!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lako Insurance Office Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-primary-400/30 blur-3xl"></div>
            <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 backdrop-blur-xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="lg:container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.78rem] md:text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4"
                >
                  <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                  Insurance Comparison
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                >
                  Ready to find the{" "}
                  <span className="text-secondary-500">perfect insurance</span>{" "}
                  plan?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-white/90 text-[0.95rem] md:text-lg mb-8"
                >
                  Use our comparison tool to discover insurance plans tailored
                  to your unique needs and budget. Get started today and find
                  the coverage that's right for you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/compare"
                    className="inline-flex items-center justify-center px-6 py-2 lg:py-3 bg-secondary-500 text-[0.89rem] md:text-base text-white font-medium rounded-lg shadow-xl hover:bg-secondary-600 transition-all duration-300"
                  >
                    Compare Plans
                    <TbChevronRight className="ml-2" />
                  </Link>

                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center px-6 py-2 lg:py-3 bg-white/10 backdrop-blur-sm text-[0.89rem] md:text-base text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 hidden lg:block"
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-secondary-400/20 blur-2xl"></div>

                  {/* Card 1 */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: -10 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl relative z-20 max-w-sm ml-auto"
                  >
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-secondary-500/20 flex items-center justify-center text-secondary-300 mr-3">
                        <TbMessageCircle className="h-5 w-5" />
                      </div>
                      <div className="transition-all">
                        <h3 className="font-medium text-white">
                          Insurance Comparison
                        </h3>
                        <p className="text-white/70 text-sm">
                          Find the best coverage
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-secondary-500 mr-2"></div>
                        <div className="flex-1 h-2 bg-white/30 rounded-full"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-secondary-500 mr-2"></div>
                        <div className="flex-1 h-2 bg-white/30 rounded-full"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-secondary-500 mr-2"></div>
                        <div className="flex-1 h-2 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 10 }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl absolute -bottom-10 -left-5 z-10 max-w-[200px]"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-8 w-8 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-300">
                        <TbCheck className="h-4 w-4" />
                      </div>
                      <div className="text-white/90 text-sm font-medium">
                        Premium
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/20 rounded-full w-full"></div>
                      <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </>
  );
};

export default ContactPage;
