import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TbChevronLeft,
  TbChevronRight,
  TbInfoCircle,
  TbCheck,
  TbArrowRight,
} from "react-icons/tb";
import { Link } from "react-router-dom";

// Mock data for accident insurance plans based on accident type
const mockAccidentPlans = {
  workplace: [
    {
      company: "Jubilee Insurance",
      plans: [
        {
          id: "jubilee-workplace-basic",
          name: "Workplace Shield Basic",
          premium: 12000,
          coverage: "Ksh. 1,000,000",
        },
        {
          id: "jubilee-workplace-plus",
          name: "Workplace Shield Plus",
          premium: 20000,
          coverage: "Ksh. 2,000,000",
        },
      ],
    },
    {
      company: "AAR Insurance",
      plans: [
        {
          id: "aar-workplace-essential",
          name: "Workplace Essential",
          premium: 10000,
          coverage: "Ksh. 750,000",
        },
        {
          id: "aar-workplace-premium",
          name: "Workplace Premium",
          premium: 18000,
          coverage: "Ksh. 1,500,000",
        },
      ],
    },
  ],
  student: [
    {
      company: "Jubilee Insurance",
      plans: [
        {
          id: "jubilee-student-basic",
          name: "Student Shield Basic",
          premium: 5000,
          coverage: "Ksh. 500,000",
        },
        {
          id: "jubilee-student-plus",
          name: "Student Shield Plus",
          premium: 8000,
          coverage: "Ksh. 1,000,000",
        },
      ],
    },
    {
      company: "CIC Insurance",
      plans: [
        {
          id: "cic-student-basic",
          name: "Student Care Basic",
          premium: 4500,
          coverage: "Ksh. 400,000",
        },
        {
          id: "cic-student-gold",
          name: "Student Care Gold",
          premium: 7500,
          coverage: "Ksh. 800,000",
        },
      ],
    },
  ],
  travel: [
    {
      company: "Jubilee Insurance",
      plans: [
        {
          id: "jubilee-travel-basic",
          name: "Travel Shield Basic",
          premium: 8000,
          coverage: "Ksh. 1,000,000",
        },
        {
          id: "jubilee-travel-plus",
          name: "Travel Shield Plus",
          premium: 15000,
          coverage: "Ksh. 2,000,000",
        },
      ],
    },
    {
      company: "AAR Insurance",
      plans: [
        {
          id: "aar-travel-essential",
          name: "Travel Essential",
          premium: 7000,
          coverage: "Ksh. 750,000",
        },
        {
          id: "aar-travel-premium",
          name: "Travel Premium",
          premium: 13000,
          coverage: "Ksh. 1,500,000",
        },
      ],
    },
  ],
  personal: [
    {
      company: "Jubilee Insurance",
      plans: [
        {
          id: "jubilee-personal-basic",
          name: "Personal Shield Basic",
          premium: 10000,
          coverage: "Ksh. 1,000,000",
        },
        {
          id: "jubilee-personal-plus",
          name: "Personal Shield Plus",
          premium: 18000,
          coverage: "Ksh. 2,000,000",
        },
      ],
    },
    {
      company: "CIC Insurance",
      plans: [
        {
          id: "cic-personal-basic",
          name: "Personal Care Basic",
          premium: 9000,
          coverage: "Ksh. 800,000",
        },
        {
          id: "cic-personal-gold",
          name: "Personal Care Gold",
          premium: 16000,
          coverage: "Ksh. 1,800,000",
        },
      ],
    },
  ],
};

const AccidentPlanSelectionStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(
    formData.selectedPlan || null
  );
  const [expandedCompany, setExpandedCompany] = useState(null);

  // Get plans based on accident type
  const getPlans = () => {
    return mockAccidentPlans[formData.accidentType] || [];
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    updateFormData("selectedPlan", plan);
  };

  const toggleCompany = (company) => {
    if (expandedCompany === company) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(company);
    }
  };

  const handleContinue = () => {
    if (selectedPlan) {
      nextStep();
    }
  };

  // Get accident type label
  const getAccidentTypeLabel = () => {
    const accidentType = formData.accidentType;

    if (!accidentType) return "";

    switch (accidentType) {
      case "workplace":
        return "Workplace Accidents";
      case "student":
        return "Student Personal Accidents";
      case "travel":
        return "Travel Accidents";
      case "personal":
        return "Personal Accidents";
      default:
        return "";
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-4">
        Select Insurance Plan
      </h2>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <p className="text-slate-600 text-[0.9rem] md:text-[1.1rem]">
          Choose from our available plans for{" "}
          <span className="font-semibold">{getAccidentTypeLabel()}</span>
        </p>

        <div className="flex items-center mt-2 md:mt-0">
          <Link
            to="/compare"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
          >
            Not sure which plan to choose? Use our comparison tool
            <TbArrowRight className="ml-1" />
          </Link>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 mb-8">
        {getPlans().map((companyPlans) => (
          <div
            key={companyPlans.company}
            className={`border border-slate-200 ${
              expandedCompany === companyPlans.company ? "rounded-[0.8rem]" : "rounded-lg"
            }  overflow-hidden`}
          >
            <div
              className="bg-slate-100 border-b p-3 md:p-4 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => toggleCompany(companyPlans.company)}
            >
              <h3 className="text-lg font-semibold text-slate-800">
                {companyPlans.company} Plans
              </h3>
              <div
                className={`transform transition-transform ${
                  expandedCompany === companyPlans.company ? "rotate-180" : ""
                }`}
              >
                <TbChevronRight className="h-5 w-5 text-slate-500" />
              </div>
            </div>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedCompany === companyPlans.company
                  ? "max-h-[1000px]"
                  : "max-h-0"
              }`}
            >
              <div className="p-2.5 md:p-4 space-y-4">
                {companyPlans.plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg py-4 px-2 md:p-4 ${
                      selectedPlan && selectedPlan.id === plan.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-slate-200 hover:border-primary-300 bg-white"
                    } transition-all cursor-pointer`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="flex justify-between w-full md:w-auto">
                        <div className="">
                          <h4
                            className={`font-semibold ${
                              selectedPlan && selectedPlan.id === plan.id
                                ? "text-primary-700"
                                : "text-secondary-700"
                            }`}
                          >
                            {plan.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              selectedPlan && selectedPlan.id === plan.id
                                ? "text-primary-600"
                                : "text-slate-600"
                            }`}
                          >
                            Coverage: {plan.coverage}
                          </p>
                        </div>

                        <div
                          className={`md:hidden  text-right mr-4 ${
                            selectedPlan && selectedPlan.id === plan.id
                              ? "text-primary-700"
                              : "text-slate-700"
                          }`}
                        >
                          <span className="font-bold text-lg">
                            Ksh. {plan.premium.toLocaleString()}
                          </span>
                          <p className="text-xs">per year</p>
                        </div>
                      </div>

                      <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-center w-full md:w-auto">
                        <div
                          className={`hidden md:block text-right mr-4 ${
                            selectedPlan && selectedPlan.id === plan.id
                              ? "text-primary-700"
                              : "text-slate-700"
                          }`}
                        >
                          <span className="font-bold text-lg">
                            Ksh. {plan.premium.toLocaleString()}
                          </span>
                          <p className="text-xs">per year</p>
                        </div>

                        <button
                          type="button"
                          className={`px-4 py-2 rounded-lg w-full md:w-auto text-sm font-medium border ${
                            selectedPlan && selectedPlan.id === plan.id
                              ? "bg-primary-600 text-white"
                              : "bg-secondary-500 text-white   hover:bg-secondary-600"
                          } transition-colors focus:outline-none`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPlan(plan);
                          }}
                        >
                          {selectedPlan && selectedPlan.id === plan.id ? (
                            <span className="flex items-center justify-center">
                              <TbCheck className="mr-1" /> Selected
                            </span>
                          ) : (
                            "Buy This Plan"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div> 

      <div className="mt-6 px-2 py-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-start mb-8">
        <TbInfoCircle className="text-primary-600 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-primary-700 text-sm">
            Not sure which plan to choose?{" "}
            <Link to="/contact" className="font-medium underline">
              Talk to an agent
            </Link>{" "}
            for personalized advice or use our{" "}
            <Link to="/compare" className="font-medium underline">
              comparison tool
            </Link>{" "}
            to view detailed benefits for each plan.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={prevStep}
          className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center transition-all duration-200 font-medium"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>

        <motion.button
          whileHover={selectedPlan ? { scale: 1.03 } : {}}
          whileTap={selectedPlan ? { scale: 0.97 } : {}}
          onClick={handleContinue}
          className={`px-8 py-3 rounded-lg flex items-center transition-all duration-200 font-medium shadow-md ${
            selectedPlan
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!selectedPlan}
        >
          Continue
          <TbChevronRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default AccidentPlanSelectionStep;
