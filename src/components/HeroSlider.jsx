import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const images = [
  "./slide1.png",
  "./slide2.png",
  "./slide3.jpeg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Pure White ya Off-white background for a simple look
    <section className="bg-[#FCFAFA] pt-4 pb-8"> 

      <div className="max-w-6xl mx-auto px-4">

        <div className="
          relative 
          h-[45vh] 
          sm:h-[55vh] 
          rounded-3xl 
          overflow-hidden 
          bg-white
          shadow-sm
        ">

          {/* Sliding Images */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="crochet"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === current ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
          ))}

          {/* Very Light Overlay - Not too dark */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center px-8 md:px-16">
            <div className="max-w-md">
              <p className="text-[#FFB1B1] font-bold text-[10px] tracking-[0.3em] uppercase mb-2 drop-shadow-sm">
                Handmade with care
              </p>
              <h1 className="text-3xl md:text-5xl font-medium text-white leading-tight mb-6 drop-shadow-md">
                Luxury Crochet <br />
                <span className="italic font-light opacity-90">For Your Home</span>
              </h1>

              <button className="
                group
                bg-white 
                text-[#4A3434] 
                px-6 py-3 
                rounded-full 
                text-sm font-bold
                flex items-center gap-2 
                hover:bg-[#FFB1B1] 
                hover:text-white 
                transition-all 
                duration-300
                shadow-md
              ">
                Explore Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Simple Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  current === i ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}