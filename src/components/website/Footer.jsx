import React from "react";
import { Link } from "react-router-dom";
import {
  TbArrowRight,
  TbPhone,
  TbMail,
  TbHome,
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandInstagram,
  TbBrandLinkedin,
} from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-outfit">
              Lako Insurance Agency
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Safeguarding What's Truly Yours: LAKO. We've been in the insurance
              industry for nearly 10 years, providing tailored solutions to our
              clients.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-primary-700 hover:bg-secondary-600 flex items-center justify-center transition-colors"
              >
                <TbBrandFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-primary-700 hover:bg-secondary-600 flex items-center justify-center transition-colors"
              >
                <TbBrandTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-primary-700 hover:bg-secondary-600 flex items-center justify-center transition-colors"
              >
                <TbBrandInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-primary-700 hover:bg-secondary-600 flex items-center justify-center transition-colors"
              >
                <TbBrandLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-outfit">
              Insurance Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/motor-insurance"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Motor Insurance
                </Link>
              </li>
              <li>
                <Link
                  to="/property-insurance"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Property Insurance
                </Link>
              </li>
              <li>
                <Link
                  to="/health-insurance"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Health Insurance
                </Link>
              </li>
              <li>
                <Link
                  to="/life-insurance"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Life Insurance
                </Link>
              </li>
              <li>
                <Link
                  to="/education-policy"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Education Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/seniors-cover"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Seniors Cover
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-outfit">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Services
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Compare Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                >
                  <TbArrowRight className="mr-2 h-4 w-4" /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-outfit">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <TbHome className="h-5 w-5 mr-3 mt-0.5 text-secondary-400" />
                <span className="text-white/70">
                  Real Towers, Upper Hill, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-start">
                <TbMail className="h-5 w-5 mr-3 mt-0.5 text-secondary-400" />
                <div className="text-white/70">
                  <a
                    href="mailto:info@lako.co.ke"
                    className="hover:text-white transition-colors block"
                  >
                    info@lako.co.ke
                  </a>
                  <a
                    href="mailto:ykola@lako.co.ke"
                    className="hover:text-white transition-colors block"
                  >
                    ykola@lako.co.ke
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <TbPhone className="h-5 w-5 mr-3 mt-0.5 text-secondary-400" />
                <div className="text-white/70">
                  <a
                    href="tel:+254720636363"
                    className="hover:text-white transition-colors block"
                  >
                    +254 720 636363
                  </a>
                  <a
                    href="tel:+254726581487"
                    className="hover:text-white transition-colors block"
                  >
                    +254 726 581487
                  </a>
                  <a
                    href="tel:+254784581487"
                    className="hover:text-white transition-colors block"
                  >
                    +254 784 581487
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-white/70 mb-1">Open Hours:</p>
              <p className="text-white/70">Mon – Friday: 8 am – 5 pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/60 text-sm">
            {new Date().getFullYear()} © All rights reserved by Lako Insurance
            Agency
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
