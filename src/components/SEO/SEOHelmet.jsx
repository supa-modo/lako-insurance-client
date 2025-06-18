import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHelmet = ({
  title = "Lako Insurance Agency - Comprehensive Insurance Solutions in Kenya",
  description = "Leading insurance agency in Kenya providing health, life, motor, property, travel, and business insurance. Expert guidance, competitive rates, and exceptional service since 2015.",
  keywords = "insurance Kenya, health insurance Kenya, motor insurance, property insurance, life insurance, travel insurance, business insurance, insurance quotes Kenya, insurance agency Nairobi, comprehensive insurance coverage",
  canonical,
  ogImage = "/lako.png",
  ogType = "website",
  structuredData,
  alternateLanguages,
  noindex = false,
  nofollow = false,
}) => {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://lako.co.ke";
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : siteUrl;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : currentUrl;
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots Meta Tags */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? "noindex" : "index"},${
            nofollow ? "nofollow" : "follow"
          }`}
        />
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Lako Insurance Agency" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Lako Insurance Agency" />
      <meta name="publisher" content="Lako Insurance Agency" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Geographic Tags */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Kenya" />
      <meta name="ICBM" content="-1.2921, 36.8219" />

      {/* Business Tags */}
      <meta name="rating" content="5" />
      <meta name="distribution" content="global" />
      <meta name="language" content="English" />
      <meta name="coverage" content="Worldwide" />

      {/* Alternate Language Tags */}
      {alternateLanguages &&
        alternateLanguages.map((lang, index) => (
          <link
            key={index}
            rel="alternate"
            hrefLang={lang.hrefLang}
            href={`${siteUrl}${lang.href}`}
          />
        ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
