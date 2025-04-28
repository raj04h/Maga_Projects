import React from 'react';

const Hero = ({ onBookNow }) => {
  return (
    <section className="relative gradient-bg pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741347686-c1e331c5994e')] bg-cover bg-center mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find Perfect <span className="text-[var(--accent)]">Wedding Services</span> Across India
            </h1>
            <p className="text-lg text-white opacity-90 mb-8 max-w-xl">
              Discover and book the best local vendors for your dream wedding. From traditional to modern, we help you create memorable celebrations that honor your culture and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBookNow}
                className="bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Book Now
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--primary)] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                Explore Services
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Local Wedding Vendors</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select id="service" className="input-field">
                    <option value="" disabled selected>Select service type</option>
                    <option value="photography">Photography</option>
                    <option value="catering">Catering</option>
                    <option value="venue">Venue</option>
                    <option value="decoration">Decoration</option>
                    <option value="mehendi">Mehendi Artists</option>
                    <option value="makeup">Makeup Artists</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select id="location" className="input-field">
                    <option value="" disabled selected>Select city</option>
                    <option value="delhi">Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="chennai">Chennai</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="jaipur">Jaipur</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input type="date" id="date" className="input-field" />
                </div>
                <button className="w-full btn-primary py-3">
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Search Vendors
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl font-bold text-white">2500+</p>
            <p className="text-sm text-white">Trusted Vendors</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl font-bold text-white">120+</p>
            <p className="text-sm text-white">Cities Covered</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl font-bold text-white">15K+</p>
            <p className="text-sm text-white">Happy Couples</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-3xl font-bold text-white">28+</p>
            <p className="text-sm text-white">Cultural Styles</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;