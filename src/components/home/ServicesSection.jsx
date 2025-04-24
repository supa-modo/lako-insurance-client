import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowRight } from "react-icons/tb";

const ServicesSection = () => {
  // Define all services in an array to map through
  const services = [
    {
      id: "seniors-cover",
      title: "Seniors Cover",
      image: "/seniors.jpg",
      description:
        "Specialized health insurance designed for seniors. Comprehensive coverage, age-appropriate benefits, and tailored solutions for your unique healthcare needs in your golden years.",
      delay: 0.1,
      isNew: true,
      featured: true,
    },
    {
      id: "motor-insurance",
      title: "Motor Insurance",
      image: "/motor-insurance.jpg",
      description:
        "Drive confidently with comprehensive coverage. Financial protection, third-party liability, personal accident coverage and expert support for hassle-free claims.",
      delay: 0.2,
    },
    {
      id: "property-insurance",
      title: "Property Insurance",
      image: "/property-insurance.jpg",
      description:
        "Comprehensive protection, covering a wide range of risks, including damage, theft, or unforeseen disasters. We tailor our insurance solutions to meet your specific needs.",
      delay: 0.3,
    },
    {id: "health-insurance",
    title: "Health Insurance",
    image: "/health-insurance.jpg",
    description:
      "Rest easy, knowing that we safeguard your health and financial security. Wide-ranging coverage, access to premier healthcare, affordable premiums and flexible plans.",
    
    delay: 0.4,
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    image: "/life-insurance.jpg",
    description:
      "Income replacement, debt protection, estate planning for wealth transfer, peace of mind for your loved ones' financial security, and flexible coverage plans.",
    
    delay: 0.5,
  },
    {
      id: "education-policy",
      title: "Education Policy",
      image: "/education-policy.png",
      description:
        "Empowering your education journey. Coverage for all educational levels, customizable options, peace of mind for parents, and expert guidance for your educational success.",
      delay: 0.6,
    },
    {
      id: "wiba",
      title: "WIBA",
      image: "/wiba.png",
      description:
        "Legal compliance under Workers Injury Benefits Act, comprehensive financial protection, dedicated claims management, proactive risk assessment, and tailored coverage for your organization.",
      delay: 0.6,
    },
    {
      id: "travel-insurance",
      title: "Travel Insurance",
      image: "/travel-insurance.png",
      description:
        "Comprehensive coverage for your adventures, be they for business or leisure. We're here to safeguard your trips against unforeseen challenges, from trip cancellations to medical emergencies.",
      delay: 0.6,
    },
  ];

  return (
    <section className="py-10 lg:py-24 bg-neutral-50 font-outfit" id="services">
      <div className="lg:container mx-auto px-1.5 sm:px-4 lg:px-12">
        <div className="text-center mb-10 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1 lg:py-1.5 rounded-full text-[0.78rem] lg:text-sm font-medium font-outfit bg-primary-50 text-primary-600 border border-primary-100"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Our Insurance Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold font-outfit text-primary-600 mt-3"
          >
            We offer various services across{" "}
            <span className="text-secondary-600">different fields</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-4 text-base lg:text-lg text-neutral-800 font-outfit"
          >
            Developing the relationships that underpin the next phase in your
            growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Map through services array to create service cards */}
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-gray-700 text-base lg:text-[1.2rem]">
            Feel free to{" "}
            <Link
              to="/contact"
              className="text-secondary-600 font-semibold underline underline-offset-4 px-1"
            >
              Contact Us
            </Link>{" "}
            if you can't find what you are looking for.
          </p>
        </div>
      </div>
    </section>
  );
};

// Separate component for service card to improve readability
const ServiceCard = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: service.delay }}
      className={`${
        service.featured
          ? "bg-gradient-to-br from-white to-secondary-50 ring-2 ring-secondary-200"
          : "bg-white"
      } rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 group relative`}
    >
      {service.isNew && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-secondary-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
            NEW
          </div>
        </div>
      )}

      <div className="h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3
          className={`text-lg md:text-xl font-bold ${
            service.featured ? "text-secondary-700" : "text-primary-700"
          } mb-2 flex items-center`}
        >
          {service.title}
          {service.featured && (
            <span className="ml-2 text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </h3>
        <p className="text-neutral-800 text-[0.95rem] lg:text-base mb-4">
          {service.description}
        </p>
        <Link
          to={`/services/${service.id}`}
          className={`inline-flex items-center ${
            service.featured
              ? "text-secondary-700 font-bold"
              : "text-secondary-600 font-semibold"
          } text-sm lg:text-[0.95rem] hover:text-primary-600 transition-colors`}
        >
          Learn More
          <TbArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
