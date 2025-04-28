import React from 'react';

const VendorCard = ({ vendor, onBookNow }) => {
  const { name, rating, reviewCount, image, location, priceRange, description, tags } = vendor;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="ml-1 text-sm font-semibold">{rating}</span>
          <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <div className="flex items-center text-[var(--primary)]">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-sm">{location}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-2">{priceRange}</p>
          <p className="text-gray-700">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onBookNow}
            className="btn-primary flex-grow"
          >
            Book Now
          </button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;