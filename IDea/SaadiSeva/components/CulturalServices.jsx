import React from 'react';

const CulturalServices = ({ onBookNow }) => {
  const culturalServices = [
    {
      id: 1,
      title: 'Bengali Wedding',
      description: 'Experience authentic Bengali wedding rituals with traditional Gaye Holud ceremony, Shubho Drishti, and more.',
      image: 'https://images.unsplash.com/photo-1626196340858-9379e783ee8a',
      specialists: 17,
      locations: ['Kolkata', 'Delhi', 'Mumbai', 'Bangalore']
    },
    {
      id: 2,
      title: 'South Indian Wedding',
      description: 'Traditional Tamil, Telugu, Kannada or Malayalam wedding ceremonies with authentic rituals and decorations.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a',
      specialists: 23,
      locations: ['Chennai', 'Hyderabad', 'Bangalore', 'Kochi']
    },
    {
      id: 3,
      title: 'Punjabi Wedding',
      description: 'Vibrant celebrations with Sangeet, Mehndi, Chooda ceremony, Anand Karaj, and energetic Bhangra performances.',
      image: 'https://images.unsplash.com/photo-1517840545241-b951d45e8533',
      specialists: 29,
      locations: ['Chandigarh', 'Delhi', 'Amritsar', 'Mumbai']
    },
    {
      id: 4,
      title: 'Gujarati Wedding',
      description: 'Traditional Garba nights, Pithi ceremony, and authentic Gujarati wedding customs with colorful decorations.',
      image: 'https://images.unsplash.com/photo-1622219479084-062ebe58109d',
      specialists: 15,
      locations: ['Ahmedabad', 'Vadodara', 'Mumbai', 'Surat']
    }
  ];

  return (
    <section id="cultural-services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Cultural Wedding Setups</h2>
        <p className="section-subtitle">
          Our skilled professionals can travel across India to create authentic cultural wedding experiences, no matter where you're hosting your celebration.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {culturalServices.map(service => (
            <div key={service.id} className="flex flex-col md:flex-row bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="md:w-2/5">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                    <span className="ml-2 text-sm font-medium">{service.specialists} Specialists Available</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Available In:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.locations.map((location, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => onBookNow(service)}
                  className="btn-primary self-start"
                >
                  Book This Experience
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[var(--secondary)] bg-opacity-10 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Custom Cultural Wedding Package</h3>
              <p className="text-gray-700 mb-6">
                Can't find your specific cultural tradition? We can create a custom package for any regional or community-specific wedding ceremony. Our professionals are trained in diverse cultural practices across India.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Customized rituals and ceremonies</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Traditional decorations and setups</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Cultural food specialists</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 text-center">
              <button 
                onClick={() => onBookNow({id: 'custom', title: 'Custom Cultural Package'})}
                className="bg-[var(--secondary)] hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Request Custom Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalServices;