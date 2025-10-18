import React from 'react';

export default function Card({ car, onAddToCart }) {
  return (
    <div className="bg-black/80 border border-silver/30 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(192,192,192,0.25)] hover:shadow-[0_0_30px_rgba(192,192,192,0.5)] hover:scale-105 transition-all duration-300 ease-out cursor-pointer group overflow-hidden">
      <img
        src={
          car.image ||
          "https://cdn.motor1.com/images/mgl/0xWZq/s1/lamborghini-veneno.jpg"
        }
        alt={car.title}
        className="w-full h-40 sm:h-52 object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-display font-semibold text-silver group-hover:text-white transition-colors duration-300 tracking-wide">
          {car.title}
        </h3>
        <p className="text-sm text-darkSilver/90">{car.info}</p>
        <div className="flex flex-col gap-3 sm:gap-4">
          <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight drop-shadow-[0_0_5px_rgba(192,192,192,0.6)]">
            ${car.price.toLocaleString()}
          </span>
          <div className="flex gap-3 justify-center">
            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(car)}
              className="bg-gradient-to-r from-silver to-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-display text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(192,192,192,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Add to Cart
            </button>

            {/* Buy Now Button */}
            <button className="bg-black border border-silver text-silver px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-display text-xs sm:text-sm font-semibold hover:bg-silver hover:text-black hover:shadow-[0_0_25px_rgba(192,192,192,0.7)] hover:scale-105 active:scale-95 transition-all duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
