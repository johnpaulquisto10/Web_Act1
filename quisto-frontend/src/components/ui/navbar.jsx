import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../image/logo.png";
import homeIcon from "../../image/home.png";
import carsIcon from "../../image/cars.png";
import ordersIcon from "../../image/orders.png";
import contactsIcon from "../../image/contacts.png";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav
        className={`
          fixed
          w-full
          ${window.innerWidth >= 768 ? "top-0" : "bottom-0"}
          bg-[#1A2E44]  /* ✅ solid background to remove glass effect */
          border-t md:border-t-0 md:border-b border-gray-700
          text-white
          z-40  /* ✅ lower z-index to allow page behind to show */
        `}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="FCars Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {["/", "/cars", "/order", "/contacts"].map((path, i) => (
              <Link
                key={path}
                to={path}
                className={`hover:text-white transition ${
                  location.pathname === path ? "text-white" : "text-gray-300"
                }`}
              >
                {["Home", "Cars", "Orders", "Contact"][i]}
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 bg-gray-800 rounded-lg text-white text-xs hover:bg-gray-700 transition"
            >
              Add Car
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-3 py-1 bg-gray-800 rounded-lg text-white text-xs hover:bg-gray-700 transition"
            >
              Company Stats
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/">
              <img
                src={homeIcon}
                alt="Home"
                className={`h-5 w-5 ${
                  location.pathname === "/" ? "opacity-100" : "opacity-60"
                }`}
              />
            </Link>
            <Link to="/cars">
              <img
                src={carsIcon}
                alt="Cars"
                className={`h-5 w-5 ${
                  location.pathname === "/cars" ? "opacity-100" : "opacity-60"
                }`}
              />
            </Link>
            <Link to="/order">
              <img
                src={ordersIcon}
                alt="Orders"
                className={`h-5 w-5 ${
                  location.pathname === "/order" ? "opacity-100" : "opacity-60"
                }`}
              />
            </Link>
            <Link to="/contacts">
              <img
                src={contactsIcon}
                alt="Contacts"
                className={`h-5 w-5 ${
                  location.pathname === "/contacts" ? "opacity-100" : "opacity-60"
                }`}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Independent Modal & Sidebar */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
