import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-gray-700 to-white min-h-screen w-full relative">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 sm:py-20 md:py-32 gap-8 sm:gap-12 relative z-10 animate-on-scroll opacity-0 transition-all duration-1000">
        <div className="w-full">
          <img
            src="https://nypost.com/wp-content/uploads/sites/2/2017/04/170423-auto-show-women-feature.jpg?resize=878,585&quality=75&strip=all"
            alt="Premium luxury car showcase"
            className="rounded-2xl shadow-apple w-full h-48 sm:h-64 md:h-96 lg:h-[500px] object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-full text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sf-pro font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Wanna Ride?{" "}
            <span className="bg-gradient-to-r from-black via-gray-500 to-white bg-clip-text text-transparent">
              I Have a Classy Car for you
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
            Choose from our premium selection of luxury cars, SUVs, and sports models. Order online in minutes and drive your dream car tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/cars')}
              className="bg-[#1A2E44] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:ring-4 ring-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-300 ease-out font-sf-pro font-semibold text-sm sm:text-base active:bg-white active:text-[#1A2E44] active:scale-95"
            >
              Start Your Order →
            </button>
            <button
              onClick={() => navigate('/cars')}
              className="bg-[#1A2E44] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:ring-4 ring-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-300 ease-out font-sf-pro font-semibold text-sm sm:text-base active:bg-white active:text-[#1A2E44] active:scale-95"
            >
              Browse Cars
            </button>
          </div>
        </div>
      </section>

      {/* Other sections unchanged */}
      {/* Keep all other code as-is */}
    </div>
  );
};  

export default LandingPage;
