import React from "react";
import { motion } from "framer-motion";
import { TbChevronLeft, TbArrowRight, TbEdit, TbShieldCheck, TbCoin, TbPlus } from "react-icons/tb";
import { FaUserTie, FaUserClock } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";

// Helper function to get display values
const getDisplayValue = (field, value) => {
  switch (field) {
    case "insuranceType":
      return value === "seniors" ? "Seniors Cover" : value;
    case "age":
      return value;
    case "budget":
      const budgetMap = {
        "0-25000": "Ksh. 0 - 25,000",
        "25000-50000": "Ksh. 25,000 - 50,000",
        "50000-75000": "Ksh. 50,000 - 75,000",
        "75000-100000": "Ksh. 75,000 - 100,000",
        "100000-150000": "Ksh. 100,000 - 150,000",
        "150000-plus": "Ksh. 150,000+",
      };
      return budgetMap[value] || value;
    case "coverageLimit":
      const coverageMap = {
        "basic": "Basic (0 - 300K)",
        "standard": "Standard (300K - 1M)",
        "enhanced": "Enhanced (1M - 2M)",
        "premium": "Premium (2M - 3M)",
        "executive": "Executive (3M - 5M)",
        "elite": "Elite (5M+)",
      };
      return coverageMap[value] || value;
    // case "optionalCovers":
    //   const coverNames = {
    //     "outpatient": "Outpatient Cover",
    //     "dental": "Dental Cover",
    //     "optical": "Optical Cover",
    //     "chronic": "Chronic Condition Management",
    //   };
    //   if (Array.isArray(value) && value.length > 0) {
    //     return value.map(cover => coverNames[cover] || cover).join(", ");
    //   }
    //   return "None selected";
    default:
      return value;
  }
};

const SummaryStep = ({ formData, submitForm, prevStep }) => {
  // Summary items to display
  const summaryItems = [
    {
      field: "insuranceType",
      label: "Insurance Type",
      value: formData.insuranceType,
      icon: <FaUserTie className="h-5 w-5" />,
      color: "bg-blue-500/20 text-blue-300",
    },
    {
      field: "age",
      label: "Age Range",
      value: formData.age,
      icon: <FaUserClock className="h-5 w-5" />,
      color: "bg-green-500/20 text-green-300",
    },
    {
      field: "budget",
      label: "Budget Range",
      value: formData.budget,
      icon: <TbCoin className="h-5 w-5" />,
      color: "bg-yellow-500/20 text-yellow-300",
    },
    // {
    //   field: "coverageLimit",
    //   label: "Coverage Limit",
    //   value: formData.coverageLimit,
    //   icon: <TbShieldCheck className="h-5 w-5" />,
    //   color: "bg-purple-500/20 text-purple-300",
    // },
    {
      field: "optionalCovers",
      label: "Optional Covers",
      value: formData.optionalCovers,
      icon: <TbPlus className="h-5 w-5" />,
      color: "bg-pink-500/20 text-pink-300",
    },
  ];

  return (
    <div>
      <h3 className="text-white text-xl font-medium mb-6">
        Review Your Selections
      </h3>
      
      <div className="space-y-4 mb-8">
        {summaryItems.map((item) => (
          <div 
            key={item.field}
            className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center mr-4`}>
                {item.icon}
              </div>
              
              <div className="flex-grow">
                <h4 className="text-white/70 text-sm">{item.label}</h4>
                <p className="text-white text-lg font-medium">
                  {getDisplayValue(item.field, item.value)}
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                onClick={() => {
                  // Calculate which step to go back to based on the field
                  const fieldToStepMap = {
                    "insuranceType": 1,
                    "age": 2,
                    "budget": 3,
                    "coverageLimit": 4,
                    "optionalCovers": 5,
                  };
                  const targetStep = fieldToStepMap[item.field] || 1;
                  // Go back to that step (implementation would need to be added to parent component)
                }}
              >
                <TbEdit className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-all duration-300"
        >
          <TbChevronLeft className="mr-2" />
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submitForm}
          className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg flex items-center shadow-lg transition-all duration-300"
        >
          <BiGitCompare className="h-5 w-5 mr-2" />
          Compare Plans
          <TbArrowRight className="ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default SummaryStep;
