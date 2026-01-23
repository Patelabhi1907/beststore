import React from 'react';
import { Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#999999] py-16 font-sans text-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Contact */}
          <div>
            <h3 className="text-white font-medium mb-6">Contact</h3>
            <div className="space-y-4">
              <p>01234 567 890</p>
              <p className="hover:text-white cursor-pointer transition-colors">
                info@loremipsum.co.uk
              </p>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-white font-medium mb-6">Shop</h3>
            <ul className="space-y-4">
              {["Tops", "Bottoms", "Outerwear", "New In", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white font-medium mb-6">Company</h3>
            <ul className="space-y-4">
              {["Cookies", "Payments", "Terms & Conditions", "Privacy Policy", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-6">Newsletter</h3>
            <p className="mb-6">Be the first to hear about our latest offers</p>
            
            {/* Email Input Box matching screenshot */}
            <div className="flex border border-gray-700 hover:border-gray-500 transition-colors">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="bg-transparent text-white w-full px-4 py-3 text-xs tracking-wider outline-none placeholder-gray-500 uppercase"
              />
              <button className="px-4 text-gray-500 hover:text-white transition-colors border-l border-gray-700">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            Copyright © 2016 Lorem Ipsum Ltd
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}