import React, { useState } from 'react';
import VendorCard from './VendorCard';

const FeaturedVendors = ({ onBookNow }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Vendors' },
    { id: 'photographers', name: 'Photographers' },
    { id: 'venues', name: 'Venues' },
    { id: 'caterers', name: 'Caterers' },
    { id: 'decorators', name: 'Decorators' },
    { id: 'makeup', name: 'Makeup Artists' }
  ];

  const vendors = [
    {
      id: 1,
      name: 'Royal Captures Photography',
      category: 'photographers',
      rating: 4.9,
      reviewCount: 127,
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74',
      location: 'Delhi',
      priceRange: '₹30,000 - ₹50,000',
      description: 'Award-winning wedding photographers capturing your special moments with artistic excellence.',
      tags: ['Pre-Wedding', 'Candid', 'Traditional']
    },
    {
      id: 2,
      name: 'Grand Marriott Banquet Hall',
      category: 'venues',
      rating: 4.8,
      reviewCount: 215,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
      location: 'Mumbai',
      priceRange: '₹2,50,000 - ₹5,00,000',
      description: 'Luxurious venue with elegant décor and world-class amenities for your dream wedding.',
      tags: ['Indoor', 'Outdoor', 'Poolside']
    },
    {
      id: 3,
      name: 'Spice Delight Caterers',
      category: 'caterers',
      rating: 4.7,
      reviewCount: 183,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      location: 'Bangalore',
      priceRange: '₹1,200 - ₹2,000 per plate',
      description: 'Authentic multi-cuisine catering service specializing in regional delicacies and international menu.',
      tags: ['North Indian', 'South Indian', 'Continental']
    },
    {
      id: 4,
      name: 'Glam Makeovers',
      category: 'makeup',
      rating: 4.9,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626',
      location: 'Chennai',
      priceRange: '₹25,000 - ₹40,000',
      description: 'Expert bridal makeup artists creating stunning looks tailored to your style and preference.',
      tags: ['HD Makeup', 'Airbrush', 'Traditional']
    },
    {
      id: 5,
      name: 'Floral Fantasy Decorators',
      category: 'decorators',
      rating: 4.8,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
      location: 'Hyderabad',
      priceRange: '₹1,00,000 - ₹3,00,000',
      description: 'Creative decorators transforming venues with stunning floral arrangements and themed setups.',
      tags: ['Traditional', 'Contemporary', 'Themed']
    },
    {
      id: 6,
      name: 'Moments in Motion Films',
      category: 'photographers',
      rating: 4.7,
      reviewCount: 98,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
      location: 'Kolkata',
      priceRange: '₹75,000 - ₹1,50,000',
      description: 'Cinematic wedding films and photography that tell your unique love story.',
      tags: ['Cinematic', 'Drone', 'Same-Day Edit']
    }
  ];

  const filteredVendors = activeCategory === 'all' 
    ? vendors 
    : vendors.filter(vendor => vendor.category === activeCategory);

  return (
    <section id="vendors" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Featured Wedding Vendors</h2>
        <p className="section-subtitle">
          Discover top-rated wedding service providers from across India to make your special day perfect.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map(vendor => (
            <VendorCard 
              key={vendor.id} 
              vendor={vendor} 
              onBookNow={() => onBookNow(vendor)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary hover:shadow-md group">
            View All Vendors
            <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;