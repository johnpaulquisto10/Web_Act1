import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/navbar";

const Contacts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "Order Inquiry", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-silver relative">
      <Navbar />

      {/* Header */}
      <header className="text-center py-16 px-6">
        <h1 className="text-4xl font-display font-bold text-white mb-3 tracking-wide">
          Get in Touch
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Reach out to us for inquiries, support, or feedback about your car orders.
        </p>
      </header>

      {/* Contact Information */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 md:px-16 lg:px-24 py-10">
        {[
          {
            icon: "https://images.icon-icons.com/656/PNG/512/pin_gps_location_find_map_search_icon-icons.com_59982.png",
            title: "Address",
            text: "123 Car Street, Auto City, AC 12345",
            href: "https://maps.google.com/?q=123,AC12345"
          },
          {
            icon: "https://images.icon-icons.com/614/PNG/512/phone-call-auricular-symbol-in-black_icon-icons.com_56483.png",
            title: "Phone",
            text: "1-800-CAR-ORDER",
            href: "tel:1-800-CAR-ORDER"
          },
          {
            icon: "https://images.icon-icons.com/656/PNG/512/mail_email_message_electronic_online_web_icon-icons.com_59986.png",
            title: "Email",
            text: "orders@jerjercars.com",
            href: "mailto:orders@fernandezcars.com"
          },
          {
            icon: "https://images.icon-icons.com/3982/PNG/512/time_alarm_stopwatch_watch_hour_timer_clock_icon_252109.png",
            title: "Business Hours",
            text: "Mon–Fri: 9 AM – 6 PM\nSat: 10 AM – 4 PM"
          }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-900 to-black border border-silver/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(192,192,192,0.2)]"
          >
            <img src={item.icon} alt={item.title} className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-silver hover:text-white transition"
              >
                {item.text}
              </a>
            ) : (
              <p className="text-sm text-silver whitespace-pre-line">{item.text}</p>
            )}
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 md:px-20">
        
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-silver/20 mt-8">
        <div className="flex flex-wrap justify-center gap-6 mb-3 text-sm">
          <button onClick={() => navigate("/")} className="hover:text-white transition">Home</button>
          <button onClick={() => navigate("/cars")} className="hover:text-white transition">Car Listings</button>
          <button onClick={() => navigate("/order")} className="hover:text-white transition">Order</button>
          <button onClick={() => navigate("/privacy")} className="hover:text-white transition">Privacy Policy</button>
        </div>
        <p className="text-gray-500 text-sm">
          © 2025 jerjer Cars. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Contacts;
