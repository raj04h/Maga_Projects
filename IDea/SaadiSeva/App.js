import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedVendors from './components/FeaturedVendors';
import CulturalServices from './components/CulturalServices';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleBookNow = (vendor) => {
    setSelectedVendor(vendor);
    setIsBookingOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero onBookNow={() => setIsBookingOpen(true)} />
        <FeaturedVendors onBookNow={handleBookNow} />
        <CulturalServices onBookNow={handleBookNow} />
        <Testimonials />
        {isBookingOpen && (
          <BookingForm 
            vendor={selectedVendor} 
            onClose={closeBookingForm} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;