import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-black via-gray-900 to-[#1A2E44] text-white">
      {/* ✅ Navbar stays fixed */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="pt-24 sm:pt-28 w-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 gap-8 relative z-10 animate-on-scroll transition-all duration-1000">
        <div className="w-full">
          <img
            src="https://nypost.com/wp-content/uploads/sites/2/2017/04/170423-auto-show-women-feature.jpg?resize=878,585&quality=75&strip=all"
            alt="Premium luxury car showcase"
            className="rounded-2xl shadow-lg w-full h-48 sm:h-64 md:h-96 lg:h-[500px] object-cover"
            loading="lazy"
          />
        </div>

        <div className="w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Wanna Ride?{" "}
            <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent">
              I Have a Classy Car for You
            </span>
          </h1>

          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Choose from our premium selection of luxury cars, SUVs, and sports
            models. Order online in minutes and drive your dream car tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/cars")}
              className="bg-[#1A2E44] text-white px-8 py-3 rounded-full shadow-lg hover:ring-4 ring-white/20 hover:scale-105 transition-all duration-300 font-semibold"
            >
              Start Your Order →
            </button>
            <button
              onClick={() => navigate("/cars")}
              className="bg-white text-[#1A2E44] px-8 py-3 rounded-full shadow-lg hover:ring-4 ring-gray-300 hover:scale-105 transition-all duration-300 font-semibold"
            >
              Browse Cars
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Optional More Sections */}
      <section className="px-8 py-16 text-center text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Why Choose jerjerCars?</h2>
        <p className="max-w-3xl mx-auto">
          We redefine the experience of luxury car rentals — with premium service,
          transparent pricing, and vehicles that speak class and performance.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
