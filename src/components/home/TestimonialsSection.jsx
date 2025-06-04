import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbArrowLeft, TbArrowRight, TbQuote } from "react-icons/tb";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, []);

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
      name: "Miriam",
      position: "EPZ Authority",
      since: "2020",
      text: "Yvonne has been managing our medical, for the last three years, through the AAR Insurance. Yvonne is reachable 24/7, she has hands-on experience with insurance issues – there is no time you present a challenge that she fails to respond to. And she doesn’t stop until the client is sorted. Thanks for the service, Yvonne, we are happy and wish you will",
      imageUrl: "",
    },
    {
      name: "Florence Oyolla",
      position: "Client",
      since: "2018",
      text: "I have had a fantastic experience with Lako Insurance Agency. The team is aways professional, knowledgeable and incredibly responsive. Whether I had a question about coverage options or needed help filling a claim form, they were there every step of the way and clarify everything. Somehow, they manage to make these processes that seem confusing, easy and stress-free. I feel confident knowing my health coverage is in very good hands",
      imageUrl: "",
    },
    {
      name: "Valarie Kemmey",
      position: "Finance - The Safari & Conservation",
      since: "2019",
      text: "I have had a fantastic experience with Lako Insurance Agency. The team is aways professional, knowledgeable and incredibly responsive. Whether I had a question about coverage options or needed help filling a claim form, they were there every step of the way and clarify everything. Somehow, they manage to make these processes that seem confusing, easy and stress-free. I feel confident knowing my health coverage is in very good hands”",
      imageUrl: "",
    },
    {
      name: "Meshak Mulwa",
      position: "HR Manager, Ten Senses EPZ",
      since: "2021",
      text: "I am a proud customer of Lako Insurance Agency and excited to share reasons why Lako is the best choice for your insurance needs: 24-HOUR AVAILABILITY – Life doesn’t follow a nine-to-five schedule and neither does Lako. Whether it is a question about your policy at midnight or an urgent claim over the weekend, you will find their Customer Service team responsive, genuinely caring and skilled at what they do. INTEGRITY – In a world where trust can be hard to come by, Lako shines as a beacon of integrity. I have always felt that Lako has always had my best interests at heart. CONFIDENTIALITY – Lako takes confidentiality seriously. Treating your information with utmost care and respect. EXPERTISE – Lako is made up of a knowledgeable and passionate team who stay ahead of the game in insurance. Their insights have helped me make smart choices and I know.",
      imageUrl: "",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-neutral-200 font-outfit"
      id="testimonials"
    >
      <div className="lg:container mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1 lg:py-1.5 mb-4 rounded-full text-[0.78rem] lg:text-sm font-medium bg-primary-50 text-primary-600 border border-primary-100"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Client Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600  "
          >
            Here's What Our Clients{" "}
            <span className="text-secondary-600">Say About Us</span>
          </motion.h2>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Featured Testimonial */}
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary-100">
                  <TbQuote className="w-16 h-16" />
                </div>

                {/* Testimonial Content */}
                <div className="relative z-10">
                  <blockquote className="text-[0.95rem] md:text-base lg:text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                    "{testimonials[activeIndex].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonials[activeIndex].name
                        .trim()
                        .split(" ")
                        .filter((name) => name.length > 0) // Remove empty strings
                        .map((name) => name.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[activeIndex].position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Testimonial Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary-500 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={goToPrev}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <TbArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-all duration-200"
                aria-label="Next testimonial"
              >
                <TbArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mini Testimonial Previews */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 mt-10">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-left p-4 rounded-lg border ${
                  activeIndex === index
                    ? "bg-primary-50 border-primary-200 shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {testimonial.name
                      .trim()
                      .split(" ")
                      .filter((name) => name.length > 0) // Remove empty strings
                      .map((name) => name.charAt(0).toUpperCase())
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800">
                      {testimonial.name}
                    </h5>
                    <p className="text-xs text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {testimonial.text}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
