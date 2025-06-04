import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TbArrowRight,
  TbCheck,
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbCalendar,
  TbChevronRight,
  TbInfoCircle,
  TbHeartHandshake,
  TbBuildingBank,
  TbLifebuoy,
  TbMessageShare,
  TbArrowLeft,
} from "react-icons/tb";
import {BiSupport} from "react-icons/bi";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { serviceDetails } from "../../data/serviceDetails";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [serviceNotFound, setServiceNotFound] = useState(false);

  useEffect(() => {
    console.log("Service ID from URL:", serviceId);
    console.log("Available services:", Object.keys(serviceDetails));

    // Get the service data based on the serviceId from URL params
    if (serviceId && serviceDetails[serviceId]) {
      console.log("Found service:", serviceId);
      setService(serviceDetails[serviceId]);
      setServiceNotFound(false);
    } else {
      console.log("Service not found");
      setServiceNotFound(true);
      setService(null);
    }
  }, [serviceId]);

  // If service is not loaded yet, show loading
  if (!service && !serviceNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading service details...</p>
      </div>
    );
  }

  // If service is not found, display error message
  if (serviceNotFound) {
    return (
      <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 min-h-screen overflow-hidden font-outfit relative">
        <Header />
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="text-red-500 text-4xl md:text-6xl mb-2 md:mb-6">
              <TbInfoCircle className="mx-auto" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-primary-700 mb-4">
              Service Not Found
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
              Sorry, the service you're looking for doesn't exist or is no
              longer available.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 md:py-3 bg-primary-600 text-white font-medium rounded-lg shadow-lg hover:bg-primary-700 transition-all duration-200 flex items-center justify-center mx-auto"
            >
              <TbArrowLeft className="mr-2" />
              Go Back
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen overflow-hidden font-outfit relative">
      <Header />

      {/* Hovering Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        onClick={() => navigate(-1)}
        className="fixed left-4 top-24 md:left-8 md:top-28 z-50 bg-white/90 hover:bg-white backdrop-blur-sm text-primary-600 hover:text-primary-700 p-2 md:p-3 rounded-full shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl group"
        aria-label="Go back to previous page"
      >
        <TbArrowLeft className="text-xl md:text-2xl group-hover:-translate-x-0.5 transition-transform" />
      </motion.button>

      {/* Hero Section */}
      <section className="relative pt-28 pb-6 lg:pt-36 lg:pb-12 bg-gradient-to-bl from-primary-700 to-primary-800 overflow-hidden">
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
              className="inline-flex items-center px-2.5 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-normal md:font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Insurance Solutions
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-5"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-base md:text-lg mb-8"
            >
              {service.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 lg:py-10">
        <div className="lg:container mx-auto px-2.5 lg:px-4">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12 border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "overview"
                  ? "text-primary-600 border-b-2 border-primary-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "coverage"
                  ? "text-primary-600 border-b-2 border-primary-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("coverage")}
            >
              Coverage Details
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "faqs"
                  ? "text-primary-600 border-b-2 border-primary-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("faqs")}
            >
              FAQs
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto ">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="px-2 lg:px-0"
                >
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 mb-3 md:mb-4">
                    About This Coverage
                  </h2>
                  <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-500 mb-2 md:mb-4">
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md::gap-4">
                      {service.keyFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-gray-700"
                        >
                          <TbCheck className="text-primary-500 flex-shrink-0" />
                          <span className="text-[0.93rem] md:text-base">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-6 mt-6 font-medium">
                    <Link
                      to="/compare "
                      className="inline-flex items-center px-6 py-3 text-sm md:text-base bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Get a Quote
                      <TbArrowRight className="ml-2" />
                    </Link>
                    <Link
                      to="/buy-online "
                      className="inline-flex items-center px-6 py-3 text-sm md:text-base bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                    >
                      Buy Plan Online
                      <TbArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === "coverage" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {service.coverageDetails.map((coverage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-5 md:p-6 shadow-lg border border-gray-100"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-primary-600 mb-2 md:mb-4">
                      {coverage.title}
                    </h3>
                    <ul className="space-y-2 md:space-y-3">
                      {coverage.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <TbCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 text-[0.9rem] md:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="max-w-3xl mx-auto">
                <div className="space-y-3 md:space-y-4 lg:space-y-5">
                  {service.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-primary-600 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-[0.9rem] md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-16 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 relative overflow-hidden">
        <div className="lg:container mx-auto px-2 md:px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to get started?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8">
              Speak with our insurance experts today and find the perfect
              coverage for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 text-[0.9rem] md:text-base justify-center">
              
              <Link
                  to="/contact"
                  className="flex items-center px-8 py-3 bg-white text-primary-700 font-medium rounded-lg shadow-xl hover:bg-primary-50 transition-all duration-200"
              >
                  <BiSupport className="mr-2 h-5 w-5" />
                  Get an Expert Quote
                </Link>
                <Link
                to="/get-quote"
                className="px-8 py-3 bg-primary-500 text-white font-medium rounded-lg shadow-xl hover:bg-primary-600 transition-all duration-200"
              >
                <div className="flex items-center justify-center">
                  <span>Compare Plans</span>
                  <TbArrowRight className="ml-2" />
                </div>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
