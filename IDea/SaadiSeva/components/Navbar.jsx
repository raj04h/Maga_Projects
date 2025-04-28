import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[var(--primary)]">
            <span className="text-[var(--secondary)]">Shaadi</span>Seva
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <a href="#" className="text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300">Home</a>
          </li>
          <li>
            <a href="#vendors" className="text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300">Vendors</a>
          </li>
          <li>
            <a href="#cultural-services" className="text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300">Cultural Services</a>
          </li>
          <li>
            <a href="#testimonials" className="text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300">Testimonials</a>
          </li>
          <li>
            <button className="btn-primary">Login / Register</button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40 border-t">
          <div className="container mx-auto px-6 py-4">
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="block text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#vendors" 
                  className="block text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vendors
                </a>
              </li>
              <li>
                <a 
                  href="#cultural-services" 
                  className="block text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cultural Services
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="block text-gray-800 hover:text-[var(--primary)] font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
              </li>
              <li className="pt-2">
                <button className="btn-primary w-full">
                  Login / Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;