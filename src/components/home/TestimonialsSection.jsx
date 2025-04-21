import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Auto-rotate testimonials on mobile
    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 7000);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (interval) clearInterval(interval);
    };
  }, [isMobile]);

  // Handle navigation
  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonials = [
    {
      name: "Shadrack Kiprotich",
      since: "2020",
      text: "Lako Insurance is my trusted partner in safeguarding my future. Their tailored solutions and professional service make all the difference!",
      imageUrl: "/shadrack.jpg",
    },
    {
      name: "Grace Mwarania",
      since: "2018",
      text: "Lako's seamless claims process and reliable coverage exceeded my expectations. I wouldn't trust anyone else with my insurance needs.",
      imageUrl: "/grace.jpg",
    },
    {
      name: "Luke Kibiku",
      since: "2019",
      text: "Lako's innovative solutions and commitment to integrity make them stand out. Their life insurance gave me peace of mind for my family.",
      imageUrl: "/kibiku.jpg",
    },
    {
      name: "Lilian Tracy",
      since: "2021",
      text: "Lako Insurance redefines customer care. Their health plans are transparent and reliable—I always feel supported!",
      imageUrl: "/lilian.jpg",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-neutral-200 relative overflow-hidden font-outfit"
      id="testimonials"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-secondary-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-primary-600/30 blur-3xl"></div>
      </div>

      <div className="lg:container mx-auto px-2 sm:px-4 lg:px-12 relative z-10">
        <div className="text-center mb-6 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1 lg:py-1.5 mb-4 rounded-full text-[0.78rem] lg:text-sm font-medium bg-primary-50 text-primary-600 border border-primary-100"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-primary-600  "
          >
            Hear What Our Clients{" "}
            <span className="text-secondary-600">Have To Say</span>
          </motion.h2>
        </div>

        {/* Desktop view - grid layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>

        {/* Mobile view - carousel */}
        <div className="lg:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <TestimonialCard
                testimonial={testimonials[activeIndex]}
                delay={0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex justify-between mt-6">
            <div className="flex items-center justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary-500 scale-125"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={goToPrev}
                className="w-8 h-8  flex items-center justify-center rounded-full bg-white shadow-md text-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <TbArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md text-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Next testimonial"
              >
                <TbArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-12 text-center">
          <div>
            <span className="inline-block text-primary-600 font-semibold font-outfit">
              Safeguarding What's Truly Yours:{" "}
              <span className="text-secondary-600">Lako Insurance</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full "
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-secondary-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-500  font-medium mb-5 flex-grow">
          "{testimonial.text}"
        </p>
        <div className="flex items-center mt-auto">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg mr-3">
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h4 className="font-semibold text-[1.1rem] lg:text-lg text-primary-600">
              {testimonial.name}
            </h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
