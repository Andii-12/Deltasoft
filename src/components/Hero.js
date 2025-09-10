import React from 'react';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">
          Deltasoft LLC
        </h1>
        <p className="text-text-secondary text-lg mb-12 max-w-2xl mx-auto">
          IT Solutions & Digital Services
        </p>
        
        {/* Simple Service List */}
        <div className="space-y-8">
          <div className="text-left max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Our Services</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-text-primary">Managed IT Support</h3>
                  <p className="text-text-secondary text-sm">24/7 Helpdesk & Remote Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-text-primary">Cloud & Infrastructure</h3>
                  <p className="text-text-secondary text-sm">Microsoft 365, AWS, Google Cloud</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-text-primary">Cybersecurity</h3>
                  <p className="text-text-secondary text-sm">ISO 27001, GDPR Compliance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium text-text-primary">IT Consulting</h3>
                  <p className="text-text-secondary text-sm">Digital Transformation & Software Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 