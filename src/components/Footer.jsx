import React from 'react';
import { Phone, Mail, Instagram, Youtube, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    /* pb-24: Mobile navigation bar ke liye extra space | md:pb-8: Desktop ke liye normal space */
    <footer className="bg-[#D2D9E8] pt-16 pb-24 md:pb-8 px-6 rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Help & Contact Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-[#4A3434] uppercase tracking-tighter">Need Help?</h3>
            <p className="text-sm text-[#4A3434]/70 leading-relaxed font-medium">
              We're here to make your experience smooth and joyful. Reach out for orders or custom requests! 💛
            </p>
            <div className="space-y-3">
              <a href="tel:+918780406864" className="flex items-center gap-3 text-[#4A3434] hover:text-[#2B5BA9] transition-colors font-bold text-sm">
                <div className="bg-white p-2 rounded-lg shadow-sm"><Phone size={16} /></div>
                +91 8780406864
              </a>
              <a href="mailto:contact@knotsnco.in" className="flex items-center gap-3 text-[#4A3434] hover:text-[#2B5BA9] transition-colors font-bold text-sm">
                <div className="bg-white p-2 rounded-lg shadow-sm"><Mail size={16} /></div>
                contact@knotsnco.in
              </a>
            </div>
            <div className="pt-2">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3434]/50">Support Hours:</p>
               <p className="text-xs font-bold text-[#4A3434]">Mon - Sun | 09:00 AM – 07:00 PM</p>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-[#4A3434] uppercase tracking-widest">Customer Care</h3>
            <ul className="space-y-3">
              {['Shipping Policy', 'Refund & Returns', 'Terms & Conditions', 'Privacy Policy', 'FAQs', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#4A3434]/70 hover:text-[#2B5BA9] transition-all flex items-center gap-2 group font-medium">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-[#2B5BA9] transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-[#4A3434] uppercase tracking-widest">About Us</h3>
            <ul className="space-y-3">
              {['Our Story', 'Meet the Maker', 'Crafting Process', 'Sustainability Promise'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#4A3434]/70 hover:text-[#2B5BA9] transition-all flex items-center gap-2 group font-medium">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-[#2B5BA9] transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-[#4A3434] uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              {['Shop All', 'New Arrivals', 'Best Sellers', 'Custom Orders', 'Gift Sets'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#4A3434]/70 hover:text-[#2B5BA9] transition-all flex items-center gap-2 group font-medium">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-[#2B5BA9] transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4A3434]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Socials */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4A3434]/40">Follow us:</span>
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#4A3434] hover:bg-[#2B5BA9] hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-[10px] font-bold text-[#4A3434]/60 uppercase tracking-widest">
                Copyright 2025 © The Crochet Land. All rights reserved.
              </p>
              <p className="text-[9px] text-[#4A3434]/40 mt-1">
                Powered by <span className="font-black text-[#2B5BA9]">Mithun halder</span>
              </p>
            </div>

            {/* Payments */}
            <div className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}