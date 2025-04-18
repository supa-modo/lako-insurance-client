import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-[30%] -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-secondary-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      
      <main className="flex-grow relative z-10">
      <Header />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
