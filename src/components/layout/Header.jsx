import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { TbArrowRight, TbChevronDown, TbPhoneCall } from "react-icons/tb";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Always set scrolled to true on results and compare pages
      if (
        location.pathname === "/results" ||
        location.pathname === "/buy-online" ||
        location.pathname === "/compare"
      ) {
        setScrolled(true);
      } else if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Initial check when component mounts or route changes
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Desktop navigation link
  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`relative px-4 py-2 text-[1.05rem] ${
        scrolled ? "text-neutral-800 font-semibold " : "text-white font-medium"
      } hover:text-secondary-600  transition-colors duration-300 rounded-lg  overflow-hidden group`}
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  );

  // Mobile navigation link
  const MobileNavLink = ({ to, label, onClick }) => (
    <Link
      to={to}
      className="flex items-center px-2 py-2 text-neutral-900 hover:text-primary-500 font-medium font-outfit border-b border-neutral-100"
      onClick={onClick}
    >
      <span className="text-sm">{label}</span>
      <div className="ml-auto">
        <FiChevronDown className="h-4 w-4 rotate-[-90deg] text-neutral-700" />
      </div>
    </Link>
  );

  // Mobile dropdown navigation
  const MobileDropdownLink = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-neutral-100">
        <button
          className="flex items-center justify-between w-full px-2 py-2 text-neutral-900 hover:text-primary-500 font-medium font-outfit"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm">{label}</span>
          <FiChevronDown
            className={`h-4 w-4 text-neutral-700 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="pl-4 bg-neutral-50/50">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center px-2 py-2 text-neutral-700 hover:text-primary-500 font-medium font-outfit border-b border-neutral-100/50"
              >
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Services submenu
  const services = [
    { name: "Motor Insurance", path: "/services/motor-insurance" },
    { name: "Property Insurance", path: "/services/property-insurance" },
    { name: "Health Insurance", path: "/services/health-insurance" },
    { name: "Life Insurance", path: "/services/life-insurance" },
    { name: "Education Policy", path: "/services/education-policy" },
    { name: "Seniors Cover", path: "/services/seniors-cover" },
    { name: "WIBA", path: "/services/wiba" },
    { name: "Travel Insurance", path: "/services/travel-insurance" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-0" : "bg-transparent  py-1 md:py-2"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="">
            <div className="w-24">
              <img
                src="/logo.png"
                alt="logo"
                className="w-full h-full object-cover "
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden -mr-24 lg:flex items-center space-x-1 font-outfit font-medium pt-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/compare" label="Compare Plans" />

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-lg group flex items-center font-semibold hover:text-secondary-500  ${
                  scrolled ? "text-neutral-800 " : "text-white "
                } transition-colors`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Insurance
                <TbChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div className="absolute left-0 mt-2 w-60 rounded-xl bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="p-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-2 rounded-lg text-neutral-800 hover:bg-secondary-50 hover:text-secondary-500 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <NavLink to="/about" label="About Us" />
            <NavLink to="/buy-online" label="Buy Online " />
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className={`flex items-center ${
                scrolled ? "text-neutral-800" : "text-white"
              } hover:text-primary-500 transition-all duration-300 group`}
            >
              <TbPhoneCall className="mr-2 h-5 w-5 z-10" />

              <div>
                <span className="font-semibold tracking-wide font-outfit text-sm">
                  +254 720 6363638
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-primary-500 transition-all duration-300"></div>
              </div>
            </a>

            <Link
              to="/compare"
              className="relative overflow-hidden px-6 py-2.5 font-medium rounded-lg bg-secondary-500 text-white hover:text-white hover:bg-primary-600 border-0 shadow-lg hover:shadow-xl group  transition-all duration-300 hover:translate-y-[-2px]"
            >
              <span className="relative z-10 flex items-center font-outfit">
                Get Started
                <TbArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-500 transform translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
              scrolled ? "text-neutral-800" : "text-white"
            }`}
            onClick={() => {
              setScrolled(true);
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-7 w-7 " />
            ) : (
              <FiMenu className="h-7 w-7 " />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transform transition-all duration-300 origin-top ${
          isMenuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="container-custom pb-4 space-y-3">
          <nav className="flex flex-col">
            <MobileNavLink
              to="/"
              label="Home"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/compare"
              label="Compare Plans"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileDropdownLink
              label="Insurance"
              items={services.map((service) => ({
                to: service.path,
                label: service.name,
              }))}
            />

            <MobileNavLink
              to="/faq"
              label="FAQs"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/about"
              label="About Us"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/contact"
              label="Contact Us"
              onClick={() => setIsMenuOpen(false)}
            />
          </nav>

          <div className="pt-4 border-t border-neutral-200">
            <a
              href="tel:+1234567890"
              className="flex items-center text-gray-700 hover:text-primary-500 transition mb-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                <TbPhoneCall className="h-5 w-5 text-primary-500" />
              </div>
              <span className="font-semibold tracking-wide font-outfit text-sm">
                +254 720 636363
              </span>
            </a>
            <Link
              to="/compare"
              className="block w-full mb-2.5 py-2 px-4 bg-white/20 border-2 border-primary-500 text-primary-600 text-center font-medium rounded-lg shadow-md transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center justify-center">
                <span className="text-sm font-outfit">Get a Quote</span>
                <TbArrowRight className="ml-2" />
              </div>
            </Link>
            <Link
              to="/buy-online"
              className="block w-full  py-2 px-4 bg-secondary-500 border-2 border-secondary-500 text-white hover:text-white text-center font-medium rounded-lg shadow-md transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center justify-center">
                <span className="text-sm font-outfit">Buy Plan Online</span>
                <TbArrowRight className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
