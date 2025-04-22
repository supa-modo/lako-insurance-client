import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TbArrowRight,
  TbCheck,
  TbBuildingCommunity,
  TbUsers,
  TbAward,
  TbHeartHandshake,
  TbMapPin,
  TbMail,
  TbPhone,
  TbQuote,
  TbChevronRight,
  TbClock,
  TbBrandLinkedin,
  TbMailFilled,
  TbBrandTwitter,
  TbBrandFacebook,
  TbPhoneCall,
} from "react-icons/tb";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { PiMapPinAreaDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";

const AboutPage = () => {
  // Values of the company
  const values = [
    {
      icon: <TbHeartHandshake className="h-6 w-6" />,
      title: "Client-Centered",
      description:
        "Our clients are at the heart of everything we do. We listen to your needs and tailor our services to ensure you receive personalized solutions.",
    },
    {
      icon: <TbAward className="h-6 w-6" />,
      title: "Excellence",
      description:
        "We strive for excellence in all aspects of our business, from the quality of our insurance products to the level of service we provide.",
    },
    {
      icon: <TbCheck className="h-6 w-6" />,
      title: "Integrity",
      description:
        "We conduct our business with honesty, transparency, and ethical standards. You can trust us to always act in your best interest.",
    },
    {
      icon: <TbBuildingCommunity className="h-6 w-6" />,
      title: "Community",
      description:
        "We believe in giving back to the community and making a positive impact beyond our business operations.",
    },
  ];

  // Team members
  const team = [
    {
      name: "Yvonne Kola",
      position: "CEO & Founder",
      image: "/kola.jpg",
      bio: "With over a decade of experience in insurance, Yvonne leads with vision and expertise, ensuring Lako delivers exceptional service and innovative solutions to all clients.",
      social: {
        linkedin: "https://www.linkedin.com/in/yvonne-kola-mba-83b50611a/",
        email: "ykola@lako.co.ke",
        twitter: "",
        facebook: "https://www.facebook.com/yvone.kola",
      },
    },
    {
      name: "Grace Mwarania",
      position: "Digital Marketing Consultant",
      image: "grace.jpg",
      bio: "Grace brings creative marketing strategies that connect our services with clients who need them most, building our digital presence and brand awareness across platforms.",
      social: {
        linkedin: "",
        email: "gmwarania@lako.co.ke",
        twitter: "https://twitter.com/gracemwarania",
        facebook: "",
      },
    },
    {
      name: "Josephine Adoli",
      position: "Customer Experience Manager",
      image: "/adoli.png",
      bio: "Healthcare and insurance professional with 20+ years of experience in claims & risk management, and provider relations with proven success at AAR Insurance.",
      social: {
        linkedin: "",
        email: "jadoli@lako.co.ke",
        twitter: "",
        facebook: "",
      },
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
      <section className="pb-16 lg:py-20 bg-white">
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
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary-50 text-secondary-600 border border-secondary-200 mb-4"
              >
                <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                Our Story
              </motion.span>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-3 lg:mb-6">
                A decade of excellence in{" "}
                <span className="text-secondary-500">insurance solutions</span>
              </h2>

              <p className="text-gray-600 mb-6  text-base lg:text-[1.1rem]">
                Founded in 2015, Lako Insurance Agency began with a simple
                mission: to provide affordable, accessible insurance products
                that truly serve the needs of our community. What started as a
                small office with three dedicated professionals has grown into a
                trusted insurance partner with a team of experts serving clients
                across Kenya.
              </p>

              <p className="text-gray-600 mb-6  text-base lg:text-[1.1rem]">
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
                    <span className="text-primary-700 text-[0.8rem] lg:text-[0.85rem]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg shadow-xl hover:shadow-2xl group"
                >
                  <span>Get in Touch Today</span>
                  <TbChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
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
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-600 border border-primary-300 mb-4"
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
                    To safeguard what's 'Lako' in every way possible. In the
                    pages that follow, you'll discover how we turn promises into
                    realities, how we make insurance a partnership, and how,
                    together, we secure a brighter future
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

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="lg:container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium font-outfit bg-secondary-100 text-secondary-600 border border-secondary-200 mb-4"
            >
              Our Core Values
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary-600 font-outfit mb-4"
            >
              The <span className="text-secondary-500">principles</span> that
              guide our business
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-base lg:text-[1.1rem]"
            >
              At Lako, our values shape everything we do. They define how we
              serve our clients, interact with our partners, and contribute to
              our community.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 group"
              >
                <div className="flex items-start">
                  <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mr-5 group-hover:bg-primary-200 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-700 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-base lg:text-[1.05rem]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="lg:container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium font-outfit bg-primary-100 text-primary-600 border border-primary-200 mb-4"
            >
              Our Experts Team
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary-600 font-outfit mb-4"
            >
              Meet the <span className="text-secondary-500">experts</span>{" "}
              behind Lako
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-base lg:text-[1.1rem]"
            >
              Our dedicated team of insurance professionals brings years of
              experience and a passion for service to every client interaction.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card with shadow and subtle border */}
                <div className="relative overflow-hidden bg-white rounded-xl shadow-xl">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-10"></div>

                  {/* Circular image container */}
                  <div className="relative h-64 flex items-center justify-center p-6 bg-gradient-to-b from-primary-50 to-white">
                    <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-md z-10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="px-6 lg:px-8 pt-6 pb-8 text-center relative z-20">
                    <h3 className="text-2xl font-bold text-primary-700 mb-1">
                      {member.name}
                    </h3>

                    <p className="text-secondary-600 font-medium mb-4 inline-block px-4 py-1 bg-secondary-50 rounded-full text-sm">
                      {member.position}
                    </p>

                    <p className="text-gray-600 text-[0.9rem] md:text-base leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Social links */}
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-600 to-sky-700 flex items-center justify-center text-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1"
                          aria-label={`LinkedIn profile of ${member.name}`}
                        >
                          <FaLinkedinIn className="h-4 w-4" />
                        </a>
                      )}

                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-black  flex items-center justify-center text-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1"
                          aria-label={`Twitter profile of ${member.name}`}
                        >
                          <FaXTwitter className="h-4 w-4" />
                        </a>
                      )}

                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1"
                          aria-label={`Facebook profile of ${member.name}`}
                        >
                          <FaFacebookF className="h-4 w-4" />
                        </a>
                      )}

                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1"
                          aria-label={`Email ${member.name}`}
                        >
                          <FaEnvelope className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtle card shadow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-200/50 to-secondary-200/50 transform translate-y-0.5 scale-[0.98] opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:bg-primary-50 transition-all duration-200 w-full sm:w-auto inline-block"
                >
                  Contact Us
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/compare"
                  className="px-8 py-3 bg-secondary-500 text-white font-medium rounded-lg shadow-lg hover:bg-secondary-600 transition-all duration-200 w-full sm:w-auto inline-block"
                >
                  Compare Plans
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
                    <p className="text-gray-600">Real Towers, 3rd Floor</p>
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
