import React, { useState } from 'react';

const BookingForm = ({ vendor = {}, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guestCount: '',
    location: '',
    additionalInfo: '',
    agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the data to your backend here
    alert('Booking request submitted successfully! We will contact you shortly.');
    onClose();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-xl w-full p-6 md:p-8">
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {vendor.name ? `Book ${vendor.name}` : 'Book Wedding Service'}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {step === 1 ? 'Personal Details' : step === 2 ? 'Event Details' : 'Confirm Booking'}
              </span>
              <div className="flex-grow h-0.5 bg-gray-200">
                <div 
                  className="h-0.5 bg-[var(--primary)] transition-all duration-300" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      className="input-field" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      className="input-field" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    className="input-field" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                  <input 
                    type="date" 
                    name="date" 
                    id="date" 
                    className="input-field" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
                    <select 
                      name="guestCount" 
                      id="guestCount" 
                      className="input-field" 
                      value={formData.guestCount} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="" disabled>Select guest count</option>
                      <option value="Less than 50">Less than 50</option>
                      <option value="50-100">50-100</option>
                      <option value="100-200">100-200</option>
                      <option value="200-500">200-500</option>
                      <option value="More than 500">More than 500</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Event Location *</label>
                    <input 
                      type="text" 
                      name="location" 
                      id="location" 
                      className="input-field" 
                      placeholder="City, State" 
                      value={formData.location} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea 
                    name="additionalInfo" 
                    id="additionalInfo" 
                    rows="3" 
                    className="input-field" 
                    placeholder="Any specific requirements or preferences..." 
                    value={formData.additionalInfo} 
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Booking Summary</h3>
                  <dl className="space-y-2">
                    {vendor.name && (
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Service:</dt>
                        <dd className="text-sm font-medium">{vendor.name}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Name:</dt>
                      <dd className="text-sm font-medium">{formData.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Contact:</dt>
                      <dd className="text-sm font-medium">{formData.email}, {formData.phone}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Event Date:</dt>
                      <dd className="text-sm font-medium">{formData.date}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Guests:</dt>
                      <dd className="text-sm font-medium">{formData.guestCount}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Location:</dt>
                      <dd className="text-sm font-medium">{formData.location}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="agreed" 
                    id="agreed" 
                    className="mt-1" 
                    checked={formData.agreed} 
                    onChange={handleChange} 
                    required
                  />
                  <label htmlFor="agreed" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-[var(--primary)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--primary)] hover:underline">Privacy Policy</a>. I understand that my booking is subject to vendor availability and confirmation.
                  </label>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={prevStep}
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  className="btn-primary ml-auto" 
                  onClick={nextStep}
                >
                  Continue
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn-primary ml-auto"
                  disabled={!formData.agreed}
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;