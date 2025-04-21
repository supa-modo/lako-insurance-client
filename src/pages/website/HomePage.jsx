import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TbCheck,
  TbArrowRight,
  TbPhone,
  TbMail,
  TbHome,
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandInstagram,
  TbBrandLinkedin,
} from "react-icons/tb";
import Navigation from "../../components/website/Navigation";
import Footer from "../../components/website/Footer";

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Sample features data
  const features = [
    {
      id: 1,
      title: "We are dedicated to support you",
      description:
        "You deserve care that's simple, personalized, and hassle-free. Safe Insurance that's designed to help you thrive. At Lako, everything works together for one very important cause. You.",
      icon: <TbCheck className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "All Encompassing Coverage",
      description:
        "From everyday health needs, to unforeseen travel issues. Lako provides a full spectrum of insurance solutions.",
      icon: <TbCheck className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Flexible and Affordable Plans",
      description:
        "Choose from a range of plans that suit your medical needs and budget perfectly without compromising on quality care.",
      icon: <TbCheck className="h-6 w-6" />,
    },
    {
      id: 4,
      title: "Awesome Support!",
      description:
        "Our contact form is the quickest way to get in touch with us. But if you're having difficulty using the form, please don't hesitate to call us!",
      icon: <TbCheck className="h-6 w-6" />,
    },
    {
      id: 5,
      title: "Tailored Solutions",
      description:
        "We believe in creating insurance plans that fit your specific needs because one size doesn't fit all.",
      icon: <TbCheck className="h-6 w-6" />,
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="bg-neutral-50 min-h-screen overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative h-[44rem] pt-32 md:pt-14 flex items-center bg-neutral-500 pb-20 md:pb-32 overflow-hidden"
        id="hero"
      >
        {/* Full overlay for the hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/seniors.jpg"
            alt="Lako Insurance"
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
                    Safeguarding What's Truly Yours
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold font-outfit text-white leading-tight">
                  We proudly serve <br />
                  <span className="text-secondary-400">our members</span> &
                  families
                </h1>
                <p className="text-white/90 text-lg max-w-xl font-outfit">
                  Since 2015, we have stood by our members. We are your go-to
                  source for a wide range of insurance products.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  .
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
              <div className="w-[80%] lg:w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl transform hover:scale-[1.01] transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    Welcome to Lako
                  </h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.id}
                        animate={{
                          scale: activeFeature === index ? 1.05 : 1,
                          opacity: activeFeature === index ? 1 : 0.7,
                        }}
                        className={`flex p-4 rounded-xl transition-all duration-300 ${
                          activeFeature === index
                            ? "bg-primary-600/60 border border-primary-400/30"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div className="mt-1 mr-3 text-secondary-400">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-lg">
                            {feature.title}
                          </h4>
                          <p className="text-white/75 text-sm mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-16 md:py-24 bg-white relative overflow-hidden"
        id="services"
      >
        <div className="container-custom">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium font-outfit bg-primary-50 text-primary-600 border border-primary-100"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-outfit text-primary-900 mt-3"
            >
              We give many services in{" "}
              <span className="text-secondary-500">different fields</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl mx-auto mt-4 text-neutral-600 font-outfit"
            >
              We develop the relationships that underpin the next phase in your
              growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Service 1 - Motor Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/motor-insurance.jpg"
                  alt="Motor Insurance"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Motor Insurance
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Drive confidently with comprehensive coverage. Financial
                  protection, third-party liability, personal accident coverage
                  and expert support for hassle-free claims.
                </p>
                <Link
                  to="/motor-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Service 2 - Property Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/property-insurance.jpg"
                  alt="Property Insurance"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Property Insurance
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Comprehensive protection, covering a wide range of risks,
                  including damage, theft, or unforeseen disasters. We tailor
                  our insurance solutions to meet your specific needs.
                </p>
                <Link
                  to="/property-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Service 3 - Health Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/health-insurance.jpg"
                  alt="Health Insurance"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Health Insurance
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Rest easy, knowing that we safeguard your health and financial
                  security. Wide-ranging coverage, access to premier healthcare
                  and affordable premiums and flexible plans.
                </p>
                <Link
                  to="/health-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Service 4 - Life Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/life-insurance.jpg"
                  alt="Life Insurance"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Life Insurance
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Income replacement, debt protection, estate planning for
                  wealth transfer, peace of mind for your loved ones' financial
                  security, and flexible coverage plans.
                </p>
                <Link
                  to="/life-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            {/* Service 4 - Life Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/education-policy.png"
                  alt="Education Policy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Education Policy
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Empowering your education journey. Coverage for all
                  educational levels, customizable options, peace of mind for
                  parents, and expert guidance for your educational success.
                </p>
                <Link
                  to="/life-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            {/* Service 4 - Life Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/seniors.jpg"
                  alt="Seniors Cover"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Seniors Cover
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Protect Your Golden Years with Confidence. Our Seniors Cover
                  is uniquely crafted for those aged 65 to 85, offering lifelong
                  peace of mind with renewable plans.
                </p>
                <Link
                  to="/life-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            {/* Service 4 - Life Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/wiba.png"
                  alt="WIBA"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  WIBA
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Legal compliance under Workers Injury Benefits Act,
                  comprehensive financial protection, dedicated claims
                  management, proactive risk assessment, and tailored coverage
                  for your organization.
                </p>
                <Link
                  to="/life-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            {/* Service 4 - Life Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src="/travel-insurance.png"
                  alt="Travel Insurance"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-800 mb-2">
                  Travel Insurance
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Comprehensive coverage for your adventures, be they for
                  business or leisure. We're here to safeguard your trips
                  against unforeseen challenges, from trip cancellations to
                  medical emergencies.
                </p>
                <Link
                  to="/life-insurance"
                  className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-500 transition-colors"
                >
                  Learn More
                  <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-lg hover:bg-primary-700 transition-all duration-200 group"
              >
                View All Services
                <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden"
        id="features"
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 rounded-full bg-secondary-100 blur-3xl opacity-40"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Side - Feature Tabs */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-outfit bg-secondary-50 text-secondary-600 border border-secondary-100 mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                    Why Choose us?
                  </span>

                  <h2 className="text-2xl md:text-3xl font-bold font-outfit text-primary-900 mb-6">
                    The right protection to keep you moving forward
                  </h2>

                  <div className="space-y-5">
                    {features.map((feature, index) => (
                      <div
                        key={feature.id}
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          activeFeature === index
                            ? "bg-primary-50 border border-primary-100"
                            : "hover:bg-primary-50/50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`mt-1 mr-3 p-2 rounded-lg ${
                              activeFeature === index
                                ? "bg-primary-500 text-white"
                                : "bg-primary-100 text-primary-600"
                            }`}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-primary-900 text-lg">
                              {feature.title}
                            </h4>
                            <p className="text-neutral-600 text-sm mt-1">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 transition-all duration-300 hover:rotate-0 border-8 border-white">
                <img
                  src="/slider01.png"
                  alt="Insurance Features"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-primary-900/0"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="text-white">
                    <p className="text-white/90 mb-2 text-sm">
                      We've been in the insurance industry for nearly
                    </p>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      10 Years
                    </h3>
                    <p className="text-white/80 text-sm">
                      We've got you covered from Medical Plans, Travel,
                      International Coverage, Liability Plans, Property
                      Insurance, Motor Coverage, and various General Insurance
                      options.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-[280px] transform rotate-3 hover:rotate-0 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 mr-3">
                    <TbCheck className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-primary-800">
                    Trusted Insurance
                  </h4>
                </div>
                <p className="text-neutral-600 text-sm">
                  Join thousands of satisfied customers who trust Lako Insurance
                  for their protection needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 md:py-24 bg-primary-900 relative overflow-hidden"
        id="testimonials"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/30 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium font-outfit bg-white/10 backdrop-blur-sm text-white border border-white/20"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary-400 mr-2"></span>
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-outfit text-white mt-3"
            >
              Our clients are very happy to{" "}
              <span className="text-secondary-400">work with us</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-5 flex-grow">
                  "Lako Insurance is my trusted partner in safeguarding my
                  future. Their tailored solutions and professional service make
                  all the difference!"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    S
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      Shadrack Kiprotich
                    </h4>
                    <p className="text-white/60 text-sm">Customer Since 2020</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-5 flex-grow">
                  "Lako's seamless claims process and reliable coverage exceeded
                  my expectations. I wouldn't trust anyone else with my
                  insurance needs."
                </p>
                <div className="flex items-center mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    G
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Grace Mwarania</h4>
                    <p className="text-white/60 text-sm">Customer Since 2018</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-5 flex-grow">
                  "Lako's innovative solutions and commitment to integrity make
                  them stand out. Their life insurance gave me peace of mind for
                  my family."
                </p>
                <div className="flex items-center mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    L
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Luke Kibiku</h4>
                    <p className="text-white/60 text-sm">Customer Since 2019</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-5 flex-grow">
                  "Lako Insurance redefines customer care. Their health plans
                  are transparent and reliable—I always feel supported!"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                    L
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Lilian Tracy</h4>
                    <p className="text-white/60 text-sm">Customer Since 2021</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="inline-block text-white/90 font-semibold font-outfit">
                Safeguarding What's Truly Yours: Lako
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24 bg-white relative overflow-hidden"
        id="cta"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CTA 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-xl relative"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-primary-400/30 blur-3xl"></div>
                <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
              </div>
              <div className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row items-center">
                <div className="md:w-3/5 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Prepare for the Unexpected
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    You can never be fully prepared for a major illness. But
                    with critical illness insurance, you can be financially
                    prepared.
                  </p>
                </div>
                <div className="md:w-2/5 flex justify-center md:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/get-quote"
                      className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:bg-primary-50 transition-all duration-200 text-center"
                    >
                      Get a quote now
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* CTA 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-6 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-2xl overflow-hidden shadow-xl relative"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-400/30 blur-3xl"></div>
                <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-secondary-600/40 blur-3xl"></div>
              </div>
              <div className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row items-center">
                <div className="md:w-3/5 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Compare Insurance Quotes
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    Get an insurance quote – typically in 2 minutes or less.
                    Switch to Lako for an insurance policy from a brand you can
                    trust.
                  </p>
                </div>
                <div className="md:w-2/5 flex justify-center md:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/compare"
                      className="inline-flex items-center px-6 py-3 bg-white text-secondary-700 font-medium rounded-lg shadow-lg hover:bg-secondary-50 transition-all duration-200 text-center"
                    >
                      Compare Now
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 text-center p-6 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
            <p className="text-neutral-700 mb-2">
              Facing any problem to get a quote?
            </p>
            <a
              href="tel:+254720636363"
              className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Call: +254 720 636363
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
