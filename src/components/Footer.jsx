import React from 'react';
import { Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    // Responsive Padding: py-10 on mobile, py-16 on desktop
    <footer className="bg-[#1a1a1a] text-[#999999] py-10 lg:py-16 font-sans text-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Responsive Grid:
           - grid-cols-1 (Mobile): Stack vertical
           - sm:grid-cols-2 (Tablet): 2x2 grid
           - lg:grid-cols-4 (Desktop): 4 columns side-by-side
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Column 1: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2 lg:mb-6 uppercase tracking-wider">Contact</h3>
            <div className="space-y-1 lg:space-y-4 text-xs lg:text-sm">
              <p>01234 567 890</p>
              <p className="hover:text-white cursor-pointer transition-colors wrap-break-word">
                info@loremipsum.co.uk
              </p>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2 lg:mb-6 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 lg:space-y-4 text-xs lg:text-sm">
              {['Tops', 'Bottoms', 'Outerwear', 'New In', 'About', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors block w-max">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-medium mb-2 lg:mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 lg:space-y-4 text-xs lg:text-sm">
              {['Cookies', 'Payments', 'Terms & Conditions', 'Privacy Policy', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors block w-max">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-medium mb-2 lg:mb-6 uppercase tracking-wider">Newsletter</h3>
            <p className="mb-4 text-xs lg:text-sm">Be the first to hear about our latest offers</p>
            
            {/* Input Box: Full width on mobile/tablet */}
            <div className="flex border border-gray-700 hover:border-gray-500 transition-colors w-full max-w-sm">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="bg-transparent text-white w-full px-4 py-3 text-xs tracking-wider outline-none placeholder-gray-500 uppercase min-w-0"
              />
              <button className="px-4 text-gray-500 hover:text-white transition-colors border-l border-gray-700 bg-[#222]">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Stack vertically on mobile, row on desktop */}
        <div className="border-t border-[#333333] pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-center md:text-left">
            Copyright © 2016 Lorem Ipsum Ltd
          </p>
          
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}