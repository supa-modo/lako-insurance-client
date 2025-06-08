import React from "react";
import { motion } from "framer-motion";
import { TbChevronRight, TbUser, TbCheck, TbInfoCircle } from "react-icons/tb";

const coverTypes = [
  {
    id: "student",
    name: "Student Cover",
    description:
      "Special coverage for students during their internships and industrial attachments",

    eligibility: "Students aged 18-30",
    premium: "From KSh 492 annually",
  },
  {
    id: "individual",
    name: "Individual(s) Cover",
    icon: <TbUser className="h-8 w-8" />,
    description:
      "Comprehensive personal accident coverage for individuals and families",

    eligibility: "Individuals aged 18-65",
    premium: "From KSh 1,200 annually",
  },
];

const CoverTypeSelection = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleSelectCoverType = (coverType) => {
    updateFormData("coverType", coverType);
    nextStep();
  };

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold text-primary-700/90 mb-2">
          <span className="block lg:hidden mr-1">1.</span>{" "}
          <span className="">Choose Your Coverage Type</span>
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Select the type of personal accident coverage you are looking for.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
        {coverTypes.map((coverType) => (
          <motion.div
            key={coverType.id}
            className={`relative rounded-xl border-2 p-3 lg:p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              formData.coverType === coverType.id
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 bg-white hover:border-primary-300"
            }`}
            onClick={() => handleSelectCoverType(coverType.id)}
          >
            {formData.coverType === coverType.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <TbCheck className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            <div className="flex items-start space-x-4 mb-2.5 lg:mb-4">
              <div className="flex-1">
                <h4 className="text-[1.05rem] md:text-lg font-semibold text-secondary-600 mb-1">
                  {coverType.name}
                </h4>
                <p className="text-[0.83rem] md:text-sm text-gray-600">
                  {coverType.description}
                </p>
              </div>
            </div>

            <div className="">
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-[0.83rem] md:text-sm">
                  <span className="text-gray-600">Eligibility:</span>
                  <span className="font-medium text-neutral-800">
                    {coverType.eligibility}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[0.83rem] md:text-sm mt-1">
                  <span className="text-gray-600">Premiums starting:</span>
                  <span className="font-semibold text-primary-600">
                    {coverType.premium}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full mt-3 md:mt-4 lg:mt-6 flex items-center ">
              <button
                type="button"
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.coverType === coverType.id
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-600 font-medium hover:bg-gray-200"
                }`}
              >
                {formData.coverType === coverType.id
                  ? "Selected. Click to continue"
                  : "Select This Cover"}
                <TbChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <p className="text-[0.83rem] md:text-sm text-gray-500 text-center flex items-start gap-1 md:gap-2">
          <TbInfoCircle className="w-5 md:w-6 h-5 md:h-6 text-primary-600" />
          You can compare detailed plans and pricing in the next step
        </p>
      </div>
    </div>
  );
};

export default CoverTypeSelection;
