import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya & Aakash',
      location: 'Delhi',
      text: 'ShaadiSeva made our dream Punjabi wedding come true in Bangalore. The vendors they connected us with understood our traditions perfectly, and the cultural setup was authentic and beautiful.',
      image: 'https://images.unsplash.com/photo-1605979257913-1704eb7b6246',
      rating: 5
    },
    {
      id: 2,
      name: 'Meera & Karthik',
      location: 'Mumbai',
      text: 'We had a Tamil-Bengali fusion wedding, and ShaadiSeva found the perfect professionals who respected both cultures. The attention to detail in the ceremonies was exceptional!',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      rating: 5
    },
    {
      id: 3,
      name: 'Raj & Simran',
      location: 'Jaipur',
      text: 'Finding vendors who could travel to our destination wedding in Udaipur was a challenge until we discovered ShaadiSeva. They arranged everything from caterers to decorators who delivered beyond our expectations.',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Happy Couples</h2>
        <p className="section-subtitle">
          Hear from couples who found their perfect wedding vendors and cultural setups through our platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Start Planning Your Dream Wedding?</h3>
            <p className="text-gray-600 mb-8">Join thousands of happy couples who found their perfect wedding vendors through ShaadiSeva.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">
                Find Vendors
              </button>
              <button className="btn-secondary">
                Explore Cultural Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;