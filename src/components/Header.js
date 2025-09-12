import React, { useState } from 'react';
import { FaBars, FaTimes, FaGamepad } from 'react-icons/fa';

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'certificates', label: 'Certificates' }
  ];

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 pixel-border mr-3 flex items-center justify-center">
            <FaGamepad className="text-white text-sm md:text-base" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 pixel-font hidden sm:block">Nakhalan Atqiya</h1>
          <FaGamepad className="text-white text-sm md:text-base" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-3">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`px-3 py-2 text-sm transition-all pixel-button ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-800 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center pixel-border bg-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes className="text-gray-800" /> : <FaBars className="text-gray-800" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="container mx-auto px-4 py-3">
            {menuItems.map(item => (
              <li key={item.id} className="mb-2 last:mb-0">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-all pixel-button ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-800 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;