// Structured Data Schemas for Lako Insurance Agency

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Lako Insurance Agency",
  alternateName: "Lako Insurance",
  url: "https://lako.co.ke",
  logo: "https://lako.co.ke/logo.png",
  image: "https://lako.co.ke/lako.png",
  description:
    "Leading insurance agency in Kenya providing comprehensive insurance solutions including health, life, motor, property, travel, and business insurance since 2015.",
  foundingDate: "2015",
  founder: {
    "@type": "Person",
    name: "Lako Insurance Founders",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+254-722-345-678",
      contactType: "customer service",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
    {
      "@type": "ContactPoint",
      email: "info@lako.co.ke",
      contactType: "customer service",
      areaServed: "KE",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nairobi Office",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Kenya",
    },
    {
      "@type": "Country",
      name: "Uganda",
    },
    {
      "@type": "Country",
      name: "Tanzania",
    },
    {
      "@type": "Country",
      name: "Rwanda",
    },
    {
      "@type": "Country",
      name: "South Sudan",
    },
  ],
  serviceType: [
    "Health Insurance",
    "Life Insurance",
    "Motor Insurance",
    "Property Insurance",
    "Travel Insurance",
    "Business Insurance",
    "Personal Accident Insurance",
    "WIBA Insurance",
    "Education Policy",
    "Seniors Cover",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "License",
    recognizedBy: {
      "@type": "Organization",
      name: "Insurance Regulatory Authority (IRA) Kenya",
    },
  },
  slogan: "Safeguarding What Matters Most",
  keywords:
    "insurance Kenya, health insurance, personal accident insurance, motor insurance, property insurance, life insurance, travel insurance",
  priceRange: "$$",
  currenciesAccepted: "KES",
  paymentAccepted: ["Cash", "M-Pesa", "Bank Transfer", "Credit Card"],
  openingHours: "Mo-Fr 08:00-17:00",
  sameAs: [
    "https://www.linkedin.com/company/lako-insurance",
    "https://twitter.com/lakoinsurance",
    "https://www.facebook.com/lakoinsurance",
  ],
};

export const createServiceSchema = (serviceData) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceData.title,
  description: serviceData.description,
  provider: {
    "@type": "InsuranceAgency",
    name: "Lako Insurance Agency",
    url: "https://lako.co.ke",
  },
  areaServed: {
    "@type": "Country",
    name: "Kenya",
  },
  serviceType: "Insurance",
  category: serviceData.category || "Insurance Services",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "KES",
      price: "Contact for Quote",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${serviceData.title} Plans`,
    itemListElement:
      serviceData.features?.map((feature, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: feature,
        description: `${serviceData.title} - ${feature}`,
      })) || [],
  },
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://lako.co.ke${item.url}`,
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lako Insurance Agency",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Customer Review",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Excellent service and comprehensive insurance coverage. Highly recommend Lako Insurance for all your insurance needs.",
    },
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://lako.co.ke#organization",
  name: "Lako Insurance Agency",
  image: "https://lako.co.ke/lako.png",
  url: "https://lako.co.ke",
  telephone: "+254-722-345-678",
  email: "info@lako.co.ke",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SNDBX Building, Ground Floor",
    addressLocality: "Kilimani, Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "Kenya",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  servedCuisine: "Insurance Services",
  hasMap: "https://maps.google.com/maps?q=Nairobi,Kenya",
};

// Specific service schemas
export const healthInsuranceSchema = createServiceSchema({
  title: "Health Insurance",
  description:
    "Comprehensive health insurance coverage including inpatient, outpatient, dental, and optical care for individuals and families in Kenya.",
  category: "Health Insurance",
  features: [
    "Inpatient Coverage",
    "Outpatient Coverage",
    "Dental Care",
    "Optical Care",
    "Maternity Coverage",
    "Emergency Services",
  ],
});

export const motorInsuranceSchema = createServiceSchema({
  title: "Motor Insurance",
  description:
    "Complete motor vehicle insurance coverage including comprehensive, third-party, and specialized commercial vehicle insurance in Kenya.",
  category: "Motor Insurance",
  features: [
    "Comprehensive Coverage",
    "Third Party Insurance",
    "Commercial Vehicle Insurance",
    "24/7 Roadside Assistance",
    "Quick Claim Settlement",
  ],
});

export const propertyInsuranceSchema = createServiceSchema({
  title: "Property Insurance",
  description:
    "Protect your home, office, and valuable assets with comprehensive property insurance coverage against fire, theft, and natural disasters.",
  category: "Property Insurance",
  features: [
    "Fire and Perils Coverage",
    "Theft Protection",
    "Natural Disaster Coverage",
    "Contents Insurance",
    "Building Insurance",
  ],
});

export const lifeInsuranceSchema = createServiceSchema({
  title: "Life Insurance",
  description:
    "Secure your family's financial future with comprehensive life insurance policies including term life, whole life, and group life insurance.",
  category: "Life Insurance",
  features: [
    "Term Life Insurance",
    "Whole Life Insurance",
    "Group Life Insurance",
    "Education Insurance",
    "Retirement Planning",
  ],
});

export const travelInsuranceSchema = createServiceSchema({
  title: "Travel Insurance",
  description:
    "Comprehensive travel insurance coverage for domestic and international trips including medical emergencies, trip cancellation, and baggage protection.",
  category: "Travel Insurance",
  features: [
    "Medical Emergency Coverage",
    "Trip Cancellation Protection",
    "Baggage Insurance",
    "Flight Delay Coverage",
    "Emergency Evacuation",
  ],
});
