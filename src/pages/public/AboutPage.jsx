import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TbArrowRight,
  TbCheck,
  TbAward,
  TbHeartHandshake,
  TbQuote,
  TbChevronRight,
  TbClock,
  TbMailFilled,
  TbPhoneCall,
  TbShieldCheck,
  TbMessage,
  TbCoins,
} from "react-icons/tb";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { PiMapPinAreaDuotone, PiUsersDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiUserCommunityLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

const AboutPage = () => {
  // Values of the company
  const values = [
    {
      icon: <TbHeartHandshake className="h-8 w-8" />,
      title: "Client-Centered",
      description:
        "Our clients are at the heart of everything we do. We listen to your needs and tailor our services to ensure you receive personalized solutions.",
    },
    {
      icon: <TbAward className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We strive for excellence in all aspects of our business, from the quality of our insurance products to the level of service we provide.",
    },
    {
      icon: <TbCheck className="h-8 w-8" />,
      title: "Integrity",
      description:
        "We conduct our business with honesty, transparency, and ethical standards. You can trust us to always act in your best interest.",
    },
    {
      icon: <RiUserCommunityLine className="h-8 w-8" />,
      title: "Community",
      description:
        "We believe in giving back to the community and making a positive impact beyond our business operations.",
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen overflow-hidden font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 md:pt-36 lg:pb-14 bg-gradient-to-bl from-primary-700 to-primary-800 overflow-hidden">
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
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              About Lako Insurance
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              We've been safeguarding{" "}
              <span className="text-secondary-500">what matters</span> since
              2015
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-base lg:text-lg mb-8"
            >
              Lako Insurance Agency provides tailored insurance solutions to
              protect what's most important to you. Our mission is to deliver
              peace of mind through comprehensive coverage and exceptional
              service.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="pb-14 lg:pt-20 bg-white">
        <div className="lg:container mx-auto lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="relative lg:rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/slider01.png"
                    alt="Lako Insurance Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-white px-4 py-2 lg:p-4 rounded-xl shadow-lg border border-primary-100 max-w-[280px]">
                  <div className="flex items-center mb-0.5 lg:mb-1">
                    <PiUsersThreeDuotone className="h-6 lg:h-7 w-6 lg:w-7 text-secondary-500 mr-2" />
                    <h4 className="font-semibold text-primary-700">
                      Trusted by thousands
                    </h4>
                  </div>
                  <p className="text-neutral-700 text-[0.9rem] lg:text-sm">
                    We've served thousands of clients since our founding.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="px-4 lg:px-0"
            >

              <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-3 lg:mb-6">
                A decade of excellence in{" "}
                <span className="text-secondary-500">insurance solutions</span>
              </h2>

              <p className="text-gray-600 mb-6  text-[0.97rem] lg:text-[1.1rem]">
                Founded in 2015, Lako Insurance Agency began with a simple
                mission: to provide affordable, accessible insurance products
                that truly serve the needs of our community. What started as a
                small office with three dedicated professionals has grown into a
                trusted insurance partner with a team of experts serving clients
                across Kenya.
              </p>

              <p className="text-gray-600 mb-6  text-[0.97rem] lg:text-[1.1rem]">
                Our growth is a testament to the trust our clients place in us
                and our dedication to exceeding expectations.
              </p>

              <div className="flex flex-wrap gap-3 mt-5 mb-6">
                {[
                  "Financial Security",
                  "Peace of Mind",
                  "Expert Support",
                  "Personalized Solutions",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-primary-100 border border-primary-300 px-3 py-1 lg:py-2 rounded-lg"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center mr-2">
                      <TbCheck className="text-white h-2.5 w-2.5" />
                    </div>
                    <span className="text-primary-700 text-xs lg:text-[0.85rem]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="w-full md:w-auto inline-flex px-6 py-3 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-secondary-100 rounded-lg shadow-xl hover:shadow-2xl group"
                > 
                <div className="flex items-center mx-auto">
                  <span className="text-white">Get in Touch With Us </span>
                  <TbArrowRight size={18} className="text-white ml-1 group-hover:translate-x-1 transition-transform" />
                  <TbPhoneCall size={20} className="ml-2 animate-pulse-fast group-hover:translate-x-1 transition-transform" />
                  <TbMessage size={20} className="ml-2 animate-pulse-fast group-hover:translate-x-1 transition-transform" />
                </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-6 bg-white">
        <div className="lg:container mx-auto px-4">
          <div className="text-center md:text-left max-w-4xl mb-6 md:mb-8">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] md:text-sm font-medium bg-secondary-50 text-secondary-600 border border-secondary-200 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Our Core Values
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 md:mb-4"
            >
              What <span className="text-secondary-500">drives us</span> forward
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-[0.97rem] lg:text-[1.1rem]"
            >
              Our values are the foundation of everything we do. They guide our
              decisions, shape our culture, and define how we serve our clients
              every day.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex md:flex-col gap-4 md:gap-3 bg-neutral-100 border border-neutral-300 rounded-xl p-3 md:p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-12 md:w-14 h-12 md:h-14 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
                  <div className="text-primary-600">{value.icon}</div>
                </div>
                <div className="w-[80%] md:w-auto">
                <h3 className="text-lg font-bold text-primary-700 mb-1 md:mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-[0.95rem] md:text-base md:leading-relaxed">
                  {value.description}
                </p>
                </div>
               
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="lg:container mx-auto px-2 lg:px-4">
          <div className="bg-white rounded-2xl border-t border-neutral-200 overflow-hidden shadow-lg relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-primary-100 blur-xl opacity-70 transform -translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-secondary-100 blur-xl opacity-70 transform translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
              <div className="lg:col-span-4 relative">
                <div className="h-64 lg:h-full relative">
                  <img
                    src="/kola.jpg"
                    alt="CEO of Lako Insurance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 idden">
                    <h3 className="text-xl font-bold text-white">
                      Yvonne Kola
                    </h3>
                    <p className="text-white/80 text-sm">CEO & Founder</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 lg:p-10">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] md:text-sm font-medium bg-primary-100 text-primary-600 border border-primary-300 mb-4"
                >
                  Message from the CEO
                </motion.span>

                <div className="hidden lg:block mb-4">
                  <h3 className="text-2xl font-bold text-primary-700">
                    Yvonne Kola
                  </h3>
                  <p className="text-neutral-600">CEO & Founder</p>
                </div>

                <div className="relative text-base lg:text-[1.1rem]">
                  <TbQuote className="absolute -top-2 -left-2 h-8 w-8 text-secondary-500 opacity-60" />

                  <p className="text-gray-600  mb-4 relative z-10 pl-6">
                    With over a decade of experience in the insurance industry,
                    I've witnessed the ever-evolving needs of our clients. Lako
                    is here to provide safety, reliability, and convenience. Our
                    commitment to you is unwavering, and our promise is simple:
                    To safeguard what's 'Lako' in every way possible. As you explore our services, you'll discover how we turn promises into
                    realities, how we make insurance a partnership, and how,
                    together, we secure a brighter future.
                  </p>

                  <p className="text-gray-600 mb-4 pl-6">
                    We've grown significantly, but our commitment to
                    personalized service remains unchanged. We believe in
                    building lasting relationships with our clients,
                    understanding their unique needs, and delivering solutions
                    that truly protect what matters most to them.
                  </p>
                </div>

                <div className="mt-6 flex items-center">
                  <img
                    src="/signature.png"
                    alt="CEO Signature"
                    className="h-16 mr-4"
                  />
                  <div>
                    <div className="h-10 w-px bg-gray-300 mx-4"></div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      href="https://www.linkedin.com/in/yvonne-kola-mba-83b50611a/"
                      target="_blank"
                      className="h-9 w-9 rounded-lg bg-sky-600 flex items-center justify-center text-white hover:bg-blue-500   transition-colors"
                    >
                      <FaLinkedinIn className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      target="_blank"
                      href="mailto:ykola@lako.co.ke"
                      className="h-9 w-9 rounded-lg bg-secondary-500 flex items-center justify-center text-white hover:bg-secondary-600   transition-colors"
                    >
                      <TbMailFilled className="h-6 w-6" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="lg:container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] md:text-sm font-medium bg-primary-100 text-primary-600 border border-primary-300 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
              Why Choose Lako
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary-600 mb-4 md:mb-6"
            >
              Your <span className="text-secondary-500">trusted partner</span>{" "}
              in protection
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-base lg:text-[1.1rem]"
            >
              We go beyond just providing insurance coverage. We build lasting
              relationships, offer personalized solutions, and ensure your peace
              of mind every step of the way.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[
              {
                icon: <TbHeartHandshake className="h-8 w-8" />,
                title: "Personalized Service",
                description:
                  "Every client receives tailored attention and customized insurance solutions that fit their unique needs and budget.",
                highlight: "One-on-one consultations",
              },
              {
                icon: <TbClock className="h-8 w-8" />,
                title: "Quick Claims Processing",
                description:
                  "Fast, efficient claims processing with dedicated support to get you back on your feet when you need it most.",
                highlight: "24/7 claims support",
              },
              {
                icon: <BiSupport className="h-8 w-8" />,
                title: "Expert Guidance",
                description:
                  "Our experienced team provides professional advice to help you make informed decisions about your insurance coverage.",
                highlight: "10+ years experience",
              },
              {
                icon: <TbShieldCheck className="h-8 w-8" />,
                title: "Comprehensive Coverage",
                description:
                  "Wide range of insurance products from top-rated providers to ensure complete protection for you and your family.",
                highlight: "15+ insurance partners",
              },
              {
                icon: <TbCoins className="h-8 w-8" />,
                title: "Competitive Pricing",
                description:
                  "Best value insurance solutions with transparent pricing and no hidden fees. We help you save while staying protected.",
                highlight: "Best rates guaranteed",
              },
              {
                icon: <TbAward className="h-8 w-8" />,
                title: "Award-Winning Service",
                description:
                  "Recognized for excellence in customer service and client satisfaction. Your trust is our greatest achievement.",
                highlight: "98% satisfaction rate",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl px-4 py-6 lg:p-8 shadow-sm border border-neutral-200 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center justify-center mb-2 md:mb-3">
 {/* Icon */}
 <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl md:rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary-600">{feature.icon}</div>
                  </div>

                  
                  <h3 className="text-lg md:text-xl font-bold text-primary-700">
                    {feature.title}
                  </h3>
                  </div>
                 

                  <p className="text-gray-600 text-[0.95rem] lg:text-base leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-flex items-center px-3 py-1.5 bg-secondary-50 text-secondary-700 rounded-full text-[0.8rem] md:text-sm font-medium border border-secondary-200">
                    <TbCheck className="h-4 w-4 mr-1.5" />
                    {feature.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>

              <div className="relative z-10">
               

                <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/contact"
                      className="w-full md:w-auto inline-flex justify-center items-center px-6 py-3 bg-white text-primary-700 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                    >
                      <BiSupport className="mr-2 h-5 w-5" />
                      Speak to an Expert
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/buy-online"
                      className="w-full md:w-auto inline-flex justify-center items-center px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium"
                    >
                      <TbChevronRight className="mr-2 h-5 w-5" />
                      Buy Cover Online
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics & Achievements Section */}
      <section className="py-16 md:py-20 bg-primary-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-500/40 blur-3xl"></div>
        </div>

        <div className="lg:container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] md:text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Our Achievements
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              <span className="text-secondary-400">Numbers</span> that speak for
              themselves
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-base lg:text-[1.1rem]"
            >
              Over the years, we've built a legacy of trust and excellence.
              Here's what we've accomplished together with our valued clients.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {[
              {
                number: "10+",
                label: "Years of Excellence",
                description: "Serving clients since 2015",
              },
              {
                number: "5000+",
                label: "Happy Clients",
                description: "Trusted by families and businesses",
              },
              {
                number: "15+",
                label: "Insurance Partners",
                description: "Top-rated insurance companies",
              },
              {
                number: "98%",
                label: "Client Satisfaction",
                description: "Consistently high ratings",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-2 py-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <h3 className="text-3xl lg:text-4xl font-bold text-secondary-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-white font-semibold text-lg mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white/70 text-sm">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-700 to-primary-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/40 blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white font-outfit mb-6"
            >
              Ready to protect what matters most?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/90 text-lg mb-8"
            >
              Connect with our team today to discover how we can help safeguard
              your future with tailored insurance solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:bg-primary-50 transition-all duration-200 w-full sm:w-auto inline-block"
                >
                  Get an Expert Quote
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/buy-online"
                  className="px-8 py-3 bg-secondary-500 text-white font-medium rounded-lg shadow-lg hover:bg-secondary-600 transition-all duration-200 w-full sm:w-auto inline-block"
                >
                  Compare Insurance Plans
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section with Google Maps */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="lg:container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1 lg:py-1.5 rounded-full text-[0.8rem] lg:text-sm font-medium bg-secondary-100 text-secondary-600 border border-secondary-200 mb-4"
            >
              Visit Our Office
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary-600 mb-4 lg:mb-6"
            >
              Our <span className="text-secondary-500">Location</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-base lg:text-[1.1rem] mb-8"
            >
              We're conveniently located in the heart of Nairobi's Upper Hill
              district. Feel free to visit us during business hours or schedule
              an appointment.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="lg:bg-white lg:rounded-2xl lg:p-8 lg:shadow-xl lg:border border-neutral-100">
                <div className="flex items-start mb-6">
                  <div className=" flex items-center justify-center text-primary-600 mr-5">
                    <PiMapPinAreaDuotone className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-xl font-lexend font-bold text-primary-600 mb-1.5 lg:mb-2">
                      Our Office
                    </h3>
                    <p className="text-gray-600">Upper Hill, Nairobi</p>
                    <p className="text-gray-600">Kenya</p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className=" flex items-center justify-center text-primary-600 mr-5">
                    <TbPhoneCall className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-xl font-lexend font-bold text-primary-600 mb-1.5 lg:mb-2">
                      Contact Information
                    </h3>
                    <p className="text-gray-600 flex items-center mb-2">
                      <span className="font-medium text-primary-800 mr-2">
                        Phone:
                      </span>{" "}
                      +254 720 636363
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="font-medium text-primary-800 mr-2">
                        Email:
                      </span>{" "}
                      info@lako.co.ke
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className=" flex items-center justify-center text-primary-600 mr-5">
                    <TbClock className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-xl font-lexend font-bold text-primary-600 mb-1.5 lg:mb-2">
                      Business Hours
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium text-primary-800">
                        Monday - Friday:
                      </span>{" "}
                      8:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium text-primary-800">
                        Saturday:
                      </span>{" "}
                      9:00 AM - 1:00 PM
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-primary-800">
                        Sunday:
                      </span>{" "}
                      Closed
                    </p>
                  </div>
                </div>

                <div className="mt-4 lg:mt-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-2.5 lg:py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-[0.9rem] lg:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group w-full justify-center font-medium"
                  >
                    <span>Schedule a Visit</span>
                    <TbChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[520px] border border-neutral-100">
                {/* Google Maps iframe */}
                <iframe
                  src="https://maps.google.com/maps?q=Real%20Towers&#038;t=m&#038;z=14&#038;output=embed&#038;iwloc=near"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lako Insurance Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
