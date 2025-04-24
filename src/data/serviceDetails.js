import {
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbCalendar,
  TbBuildingBank,
  TbCar,
  TbHome,
  TbHeartHandshake,
  TbSchool,
  TbPlane,
  TbBriefcase,
} from "react-icons/tb";

export const serviceDetails = {
  "seniors-cover": {
    title: "Seniors Cover",
    subtitle: "Comprehensive Healthcare for Your Golden Years",
    description:
      "Our Seniors Cover is specially designed to provide comprehensive healthcare coverage for individuals aged 50 and above. We understand the unique healthcare needs that come with aging, and our plans are tailored to ensure you receive the best possible care.",
    image: "/seniors.jpg",
    keyFeatures: [
      "Comprehensive inpatient and outpatient coverage",
      "Chronic condition management",
      "Dental and optical care",
      "Emergency medical services",
      "Regular health check-ups",
      "Prescription medication coverage",
    ],
    benefits: [
      {
        title: "Comprehensive Coverage",
        description: "Full coverage for both inpatient and outpatient services",
        icon: TbShieldCheck,
      },
      {
        title: "Flexible Plans",
        description: "Choose from various coverage levels to suit your needs",
        icon: TbCurrencyDollar,
      },
      {
        title: "Family Coverage",
        description: "Option to include spouse in the coverage",
        icon: TbUsers,
      },
      {
        title: "Quick Claims Process",
        description: "Hassle-free claims with minimal paperwork",
        icon: TbCalendar,
      },
    ],
    coverageDetails: [
      {
        title: "Inpatient Coverage",
        items: [
          "Hospital accommodation",
          "ICU/HDU care",
          "Surgery costs",
          "Doctor's fees",
          "Prescribed medications",
        ],
      },
      {
        title: "Outpatient Coverage",
        items: [
          "Consultations",
          "Diagnostic tests",
          "Prescribed medications",
          "Specialist referrals",
          "Physiotherapy",
        ],
      },
      {
        title: "Additional Benefits",
        items: [
          "Annual health check-ups",
          "Dental care",
          "Optical services",
          "Emergency ambulance",
          "Chronic condition management",
        ],
      },
    ],
    faqs: [
      {
        question: "What age groups are eligible for the Seniors Cover?",
        answer:
          "Our Seniors Cover is designed for individuals aged 50 and above. We offer various plans tailored to different age brackets within this range.",
      },
      {
        question: "Are pre-existing conditions covered?",
        answer:
          "Yes, pre-existing conditions may be covered after a waiting period, subject to medical underwriting. Each case is evaluated individually.",
      },
      {
        question: "What is the maximum entry age?",
        answer:
          "The maximum entry age for our Seniors Cover is 75 years. Once enrolled, coverage can continue as long as the policy is maintained.",
      },
      {
        question: "How are premiums calculated?",
        answer:
          "Premiums are calculated based on age, medical history, chosen coverage level, and any optional benefits selected.",
      },
    ],
  },
  "motor-insurance": {
    title: "Motor Insurance",
    subtitle: "Comprehensive Protection for Your Vehicle",
    description:
      "Our motor insurance provides complete coverage for your vehicle against accidents, theft, and third-party liability. With flexible plans and quick claim processing, we ensure your peace of mind on the road.",
    image: "/motor-insurance.jpg",
    keyFeatures: [
      "Comprehensive accident coverage",
      "Third-party liability protection",
      "24/7 roadside assistance",
      "Quick claim settlement",
      "No-claims bonus",
      "Optional add-ons available",
    ],
    benefits: [
      {
        title: "Comprehensive Protection",
        description: "Coverage for accidents, theft, and third-party liability",
        icon: TbCar,
      },
      {
        title: "Quick Settlement",
        description: "Fast and efficient claims processing",
        icon: TbCurrencyDollar,
      },
      {
        title: "24/7 Support",
        description: "Round-the-clock roadside assistance",
        icon: TbHeartHandshake,
      },
      {
        title: "Flexible Options",
        description: "Customizable coverage with optional add-ons",
        icon: TbShieldCheck,
      },
    ],
    coverageDetails: [
      {
        title: "Accident Coverage",
        items: [
          "Collision damage",
          "Fire and explosion",
          "Natural disasters",
          "Theft protection",
          "Vandalism coverage",
        ],
      },
      {
        title: "Third-Party Coverage",
        items: [
          "Property damage liability",
          "Bodily injury protection",
          "Legal defense costs",
          "Emergency medical expenses",
          "Personal accident cover",
        ],
      },
      {
        title: "Additional Services",
        items: [
          "24/7 roadside assistance",
          "Towing services",
          "Alternative transport",
          "Repair network access",
          "Car replacement option",
        ],
      },
    ],
    faqs: [
      {
        question: "What types of motor insurance do you offer?",
        answer:
          "We offer comprehensive, third-party, and third-party fire & theft coverage. Each type can be customized with additional benefits to suit your needs.",
      },
      {
        question: "How do I make a claim?",
        answer:
          "Claims can be filed through our 24/7 hotline, mobile app, or online portal. Our team will guide you through the process and ensure quick settlement.",
      },
      {
        question: "What affects my premium rate?",
        answer:
          "Premium rates are based on factors like vehicle type, age, value, usage, driver's experience, and claims history.",
      },
      {
        question: "Is roadside assistance included?",
        answer:
          "Yes, 24/7 roadside assistance is included in our comprehensive coverage plans. It includes towing, battery jump-start, fuel delivery, and more.",
      },
    ],
  },
  "property-insurance": {
    title: "Property Insurance",
    subtitle: "Protect Your Home and Valuable Assets",
    description:
      "Our property insurance provides comprehensive protection for your home, business premises, and valuable assets against various risks including fire, theft, natural disasters, and more.",
    image: "/property-insurance.jpg",
    keyFeatures: [
      "Building and contents coverage",
      "Natural disaster protection",
      "Theft and burglary coverage",
      "Liability protection",
      "Emergency accommodation",
      "Quick claims processing",
    ],
    benefits: [
      {
        title: "Complete Protection",
        description: "Coverage for building and contents",
        icon: TbHome,
      },
      {
        title: "Disaster Coverage",
        description: "Protection against natural calamities",
        icon: TbShieldCheck,
      },
      {
        title: "Liability Shield",
        description: "Third-party liability coverage",
        icon: TbBuildingBank,
      },
      {
        title: "Quick Response",
        description: "24/7 emergency assistance",
        icon: TbHeartHandshake,
      },
    ],
    coverageDetails: [
      {
        title: "Building Coverage",
        items: [
          "Structural damage",
          "Fire and explosion",
          "Natural disasters",
          "Plumbing issues",
          "Electrical damage",
        ],
      },
      {
        title: "Contents Coverage",
        items: [
          "Furniture and appliances",
          "Personal belongings",
          "Valuable items",
          "Electronic equipment",
          "Art and collectibles",
        ],
      },
      {
        title: "Additional Protection",
        items: [
          "Alternative accommodation",
          "Liability coverage",
          "Emergency repairs",
          "Garden and outdoor items",
          "Business equipment",
        ],
      },
    ],
    faqs: [
      {
        question: "What types of properties can be insured?",
        answer:
          "We cover residential homes, commercial buildings, rental properties, and vacant properties. Each type has specific coverage options.",
      },
      {
        question: "How is the premium calculated?",
        answer:
          "Premiums are based on factors like property value, location, construction type, security measures, and claims history.",
      },
      {
        question: "What's not covered by property insurance?",
        answer:
          "General wear and tear, gradual deterioration, and intentional damage are typically not covered. Some natural disasters may require additional coverage.",
      },
      {
        question: "How do I assess the right coverage amount?",
        answer:
          "We help you evaluate your property's reconstruction cost and contents value to ensure adequate coverage. Regular reviews are recommended.",
      },
    ],
  },
  "education-policy": {
    title: "Education Policy",
    subtitle: "Secure Your Child's Academic Future",
    description:
      "Our education policy helps you plan and save for your child's future education expenses. With flexible payment options and guaranteed returns, we ensure your child's academic dreams are protected.",
    image: "/education-policy.png",
    keyFeatures: [
      "Guaranteed education fund",
      "Flexible payment options",
      "Life insurance coverage",
      "Bonus accumulation",
      "Tax benefits",
      "Partial withdrawal facility",
    ],
    benefits: [
      {
        title: "Secure Future",
        description: "Guaranteed education fund for your child",
        icon: TbSchool,
      },
      {
        title: "Flexible Savings",
        description: "Customizable premium payment terms",
        icon: TbCurrencyDollar,
      },
      {
        title: "Added Protection",
        description: "Life insurance coverage included",
        icon: TbShieldCheck,
      },
      {
        title: "Tax Benefits",
        description: "Tax advantages on premiums and returns",
        icon: TbBuildingBank,
      },
    ],
    coverageDetails: [
      {
        title: "Education Fund",
        items: [
          "Guaranteed maturity benefit",
          "Annual bonus additions",
          "Milestone payments",
          "Higher education support",
          "Professional course funding",
        ],
      },
      {
        title: "Insurance Benefits",
        items: [
          "Life coverage for parent",
          "Premium waiver benefit",
          "Accidental death benefit",
          "Critical illness cover",
          "Monthly income benefit",
        ],
      },
      {
        title: "Additional Features",
        items: [
          "Flexible premium payment",
          "Partial withdrawal option",
          "Loan facility",
          "Tax benefits",
          "Policy revival option",
        ],
      },
    ],
    faqs: [
      {
        question: "When should I start an education policy?",
        answer:
          "The earlier you start, the better. Ideally, start when your child is young to accumulate sufficient funds for higher education.",
      },
      {
        question: "What happens if I can't pay premiums?",
        answer:
          "The policy provides a grace period and revival options. Premium waiver benefit ensures policy continuation in case of unfortunate events.",
      },
      {
        question: "Can I withdraw funds before maturity?",
        answer:
          "Yes, partial withdrawal is allowed after a lock-in period, subject to certain conditions and maintaining minimum fund value.",
      },
      {
        question: "What are the tax benefits?",
        answer:
          "Premiums paid and maturity benefits enjoy tax benefits under applicable sections of the Income Tax Act.",
      },
    ],
  },
  "travel-insurance": {
    title: "Travel Insurance",
    subtitle: "Worry-Free Travel Worldwide",
    description:
      "Our travel insurance provides comprehensive coverage for your journeys, whether for business or leisure. From medical emergencies to trip cancellations, we ensure you're protected wherever you go.",
    image: "/travel-insurance.png",
    keyFeatures: [
      "Medical emergency coverage",
      "Trip cancellation protection",
      "Lost baggage compensation",
      "Flight delay coverage",
      "24/7 worldwide assistance",
      "Adventure sports coverage",
    ],
    benefits: [
      {
        title: "Global Coverage",
        description: "Worldwide medical emergency protection",
        icon: TbPlane,
      },
      {
        title: "Trip Protection",
        description: "Coverage for cancellations and delays",
        icon: TbShieldCheck,
      },
      {
        title: "Quick Assistance",
        description: "24/7 emergency support worldwide",
        icon: TbHeartHandshake,
      },
      {
        title: "Baggage Security",
        description: "Protection for lost or delayed baggage",
        icon: TbCurrencyDollar,
      },
    ],
    coverageDetails: [
      {
        title: "Medical Coverage",
        items: [
          "Emergency medical expenses",
          "Hospital daily allowance",
          "Emergency evacuation",
          "Dental emergencies",
          "Pre-existing conditions",
        ],
      },
      {
        title: "Travel Protection",
        items: [
          "Trip cancellation",
          "Trip interruption",
          "Flight delays",
          "Missed connections",
          "Travel document loss",
        ],
      },
      {
        title: "Additional Benefits",
        items: [
          "Baggage loss/delay",
          "Personal liability",
          "Adventure sports cover",
          "Hijack allowance",
          "Home protection",
        ],
      },
    ],
    faqs: [
      {
        question: "What types of trips are covered?",
        answer:
          "We cover both international and domestic travel, for single trips or multiple trips within a year.",
      },
      {
        question: "How do I make a claim while abroad?",
        answer:
          "Contact our 24/7 assistance hotline. We have a network of service providers worldwide and can arrange cashless hospitalization where available.",
      },
      {
        question: "Are pre-existing conditions covered?",
        answer:
          "Acute episodes of pre-existing conditions are covered for emergency treatment. Terms and conditions apply.",
      },
      {
        question: "What's not covered?",
        answer:
          "Intentional self-injury, alcohol/drug abuse, war zones, and certain high-risk activities are typically excluded.",
      },
    ],
  },
  wiba: {
    title: "WIBA Insurance",
    subtitle: "Comprehensive Workplace Injury Protection",
    description:
      "Our Work Injury Benefits Act (WIBA) insurance provides comprehensive coverage for employees against work-related injuries and occupational diseases, ensuring compliance with legal requirements and protecting both employers and employees.",
    image: "/wiba.png",
    keyFeatures: [
      "Legal compliance coverage",
      "Workplace injury protection",
      "Occupational disease coverage",
      "Death benefits",
      "Medical expense coverage",
      "Rehabilitation support",
    ],
    benefits: [
      {
        title: "Legal Compliance",
        description: "Full compliance with WIBA regulations",
        icon: TbBriefcase,
      },
      {
        title: "Employee Protection",
        description: "Comprehensive injury coverage",
        icon: TbShieldCheck,
      },
      {
        title: "Quick Settlement",
        description: "Efficient claims processing",
        icon: TbCurrencyDollar,
      },
      {
        title: "Support Services",
        description: "Rehabilitation and return-to-work assistance",
        icon: TbHeartHandshake,
      },
    ],
    coverageDetails: [
      {
        title: "Injury Coverage",
        items: [
          "Workplace accidents",
          "Occupational diseases",
          "Medical expenses",
          "Temporary disability",
          "Permanent disability",
        ],
      },
      {
        title: "Death Benefits",
        items: [
          "Funeral expenses",
          "Dependents' compensation",
          "Death gratuity",
          "Survivors' benefits",
          "Educational support",
        ],
      },
      {
        title: "Additional Services",
        items: [
          "Rehabilitation services",
          "Return-to-work programs",
          "Risk assessment",
          "Safety training",
          "Claims management",
        ],
      },
    ],
    faqs: [
      {
        question: "Who needs WIBA insurance?",
        answer:
          "All employers in Kenya are legally required to have WIBA insurance for their employees.",
      },
      {
        question: "What injuries are covered?",
        answer:
          "Any injury or occupational disease arising out of and in the course of employment is covered.",
      },
      {
        question: "How are claims processed?",
        answer:
          "Claims should be reported immediately. Our team guides employers through the documentation and settlement process.",
      },
      {
        question: "What benefits are provided?",
        answer:
          "Benefits include medical expenses, compensation for disability or death, rehabilitation costs, and lost wages during recovery.",
      },
    ],
  },
};
