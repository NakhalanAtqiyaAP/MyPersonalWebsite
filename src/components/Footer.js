import React from 'react';
import { FaGithub, FaInstagram, FaEnvelope, FaLinkedin, FaGamepad } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 pixel-border mr-3 flex items-center justify-center">
              <FaGamepad className="text-white text-sm md:text-base" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold pixel-font">Nakhalan Atqiya</h3>
              <p className="text-gray-400 text-xs md:text-sm">Live to be useful to others, the environment and the universe</p>
            </div>
          </div>
          
          <div className="flex space-x-2 md:space-x-4">
            <a href="https://github.com/NakhalanAtqiyaAP" target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <FaGithub className="text-sm md:text-base" />
            </a>
            <a href="https://www.instagram.com/orangejahad/" target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
              <FaInstagram className="text-sm md:text-base" />
            </a>
            <a href="mailto:nakhalanatqiyaarifin@gmail.com" 
               className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
              <FaEnvelope className="text-sm md:text-base" />
            </a>
            <a href="https://www.linkedin.com/in/nakhalan-atqiya-arifin-putra-4b5b082a3/" target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
              <FaLinkedin className="text-sm md:text-base" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">© 2024 Nakhalan Atqiya Arifin Putra. All rights reserved.</p>
          <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2">Live here in the moment</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;