import React, { useState, useRef } from 'react';
import { Star, Quote, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { id: 1, name: "Ananya Sharma", role: "Verified Buyer", text: "The Sunflower bouquet is even more beautiful in person! Tanisha's attention to detail is mind-blowing.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
  { id: 2, name: "Rahul Verma", role: "Gifted to someone", text: "Ordered a custom cactus pot. The quality of yarn and the stitching is top-notch. My sister loved it!", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: 3, name: "Sneha Kapoor", role: "Flower Enthusiast", text: "Finally, flowers that don't die! The Gulab-e-ishq bouquet looks so aesthetic in my room.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
  { id: 4, name: "Ishaan Malhotra", role: "Collector", text: "The Crochet Land is doing something unique. The craftsmanship is very clean and professional.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
  { id: 5, name: "Priya Das", role: "Home Decorator", text: "I decorated my balcony with their hanging pots. Everyone asks where I got them from!", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" },
  { id: 6, name: "Arjun Mehta", role: "Valentine's Gift", text: "Best decision to buy crochet roses for my girlfriend. She was shocked by how real they look.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
  { id: 7, name: "Megha Gupta", role: "Repeat Customer", text: "This is my 4th purchase from Tanisha. The quality is consistent every single time. 10/10 recommend.", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150" },
  { id: 8, name: "Karan Singh", role: "Art Lover", text: "Love the Blue Lagoon bouquet. The colors are so vibrant. It's truly a piece of art on my desk.", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150" },
  { id: 9, name: "Riya Roy", role: "Influencer", text: "Perfect for my aesthetic reels. The texture and finish of the crochet work is very photogenic.", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150" },
  { id: 10, name: "Vikram Batra", role: "Birthday Present", text: "Sturdy and cute. My mom loved the tulip arrangement. Delivery was fast and packaging was secure.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // Swipe Logic
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => (touchEnd.current = e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B5BA9]/5 rounded-full">
            <Heart size={12} className="text-[#2B5BA9] fill-[#2B5BA9]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2B5BA9]">Happy Community</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#4A3434] uppercase tracking-tighter">
            What Our <span className="text-[#FFB1B1]">Customers Say</span>
          </h2>
        </div>

        <div className="relative group">
          {/* Arrows (Desktop Only) */}
          <button onClick={prevSlide} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#4A3434] hover:bg-[#2B5BA9] hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#4A3434] hover:bg-[#2B5BA9] hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>

          {/* Slider Viewport */}
          <div 
            className="overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * (typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 33.333)}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="min-w-full md:min-w-[33.333%] px-2 md:px-4">
                  <div className="bg-[#FCFAFA] p-8 rounded-[2.5rem] border border-gray-100 h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="flex justify-between mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#FFB1B1] text-[#FFB1B1]" />)}
                      </div>
                      <Quote size={24} className="text-gray-100" fill="currentColor" />
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 flex-grow">"{review.text}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                      <img src={review.image} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt={review.name} />
                      <div>
                        <h4 className="text-sm font-black text-[#4A3434] uppercase tracking-tight">{review.name}</h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-12">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${activeIndex === idx ? "w-8 bg-[#2B5BA9]" : "w-2 bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}