import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const PartnershipLogos = () => {
  const controls = useAnimation();

  const partners = [
    "jubilee.png",
    "icea.png",
    "britam.png",
    "cic.png",
    "aar.png",
    "madison.png",
    "germinia.png"
  ];

  // Start infinite animation on component mount
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section className="pt-12 lg:pt-0 bg-gradient-to-b from-neutral-100 to-neutral-50">
      <div className="max-w-screen-2xl mx-auto ">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-600">
            Partners with Top Insurance Providers
          </h2>
        </div>

        {/* Logo slider container  */}
        <div className="relative overflow-hidden w-full">
          {/* Infinite carousel container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center"
              animate={controls}
              style={{ width: "fit-content" }}
            >
              {/* First set of logos */}
              {partners.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="lg:mx-8 flex-shrink-0 group"
                >
                  <div className="w-36 h-24 sm:w-44 sm:h-28 bg-neutral-50 rounded-lg  transition-all duration-300 flex items-center justify-center p-5">
                    <img
                      src={`/${logo}`}
                      alt={`Insurance provider ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              ))}

              {/* Duplicate set for seamless infinite loop */}
              {partners.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="mx-8 flex-shrink-0 group"
                >
                  <div className="w-36 h-24 sm:w-44 sm:h-28 bg-neutral-50 rounded-lg flex items-center justify-center p-5 ">
                    <img
                      src={`/${logo}`}
                      alt={`Insurance provider ${index + 1}`}
                      className="max-h-full max-w-full object-contain "
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipLogos;
