import React from "react";

const Modal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100] animate-fadeIn">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-11/12 max-w-md transform animate-scaleIn relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-[#1A2E44] mb-4 text-center">
          Add New Car
        </h2>
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Car Model" className="border p-2 rounded-lg" />
          <input type="text" placeholder="Brand" className="border p-2 rounded-lg" />
          <input type="number" placeholder="Year" className="border p-2 rounded-lg" />
          <input type="number" placeholder="Price (₱)" className="border p-2 rounded-lg" />
          <textarea placeholder="Description" className="border p-2 rounded-lg resize-none" />
          <button className="bg-[#1A2E44] text-white py-2 rounded-lg hover:bg-[#243b55] transition">
            Save Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
