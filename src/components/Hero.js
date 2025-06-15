import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center bg-darker overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative z-10 flex flex-col w-full flex-1">
        {/* Centered Heading and Subtitle */}
        <div className="flex flex-1 flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Welcome to </span>
            <span className="text-neon-green animate-glow">Deltasoft LLC</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Transforming ideas into powerful digital solutions with cutting-edge technology
          </p>
        </div>
        {/* Service Cards Section at the bottom */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto w-full">
          {/* Card 1 */}
          <div className="relative bg-dark rounded-3xl p-8 shadow-glow flex flex-col items-center transform transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up delay-0 hover:scale-105 hover:shadow-glow-lg">
            <div className="absolute -top-6 left-[40%] -translate-x-[40%] w-14 h-14 flex items-center justify-center rounded-full bg-neon-green text-2xl font-bold text-darker shadow-lg transition-transform duration-300 hover:scale-110 animate-float-y z-10">
              1
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center mt-8">Managed IT Support <span className='text-sm'>(Бүрэн IT дэмжлэгийн үйлчилгээ)</span></h3>
            <ul className="text-white text-left space-y-2 text-base">
              <li>• 24/7 Helpdesk, Remote IT Support</li>
              <li>• Алсын зайнаас системийн засвар, програм хангамжийн асуудал шийдвэрлэх</li>
            </ul>
          </div>
          {/* Card 2 */}
          <div className="relative bg-dark rounded-3xl p-8 shadow-glow flex flex-col items-center transform transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up delay-150 hover:scale-105 hover:shadow-glow-lg">
            <div className="absolute -top-6 left-[40%] -translate-x-[40%] w-14 h-14 flex items-center justify-center rounded-full bg-neon-green text-2xl font-bold text-darker shadow-lg transition-transform duration-300 hover:scale-110 animate-float-y z-10">
              2
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center mt-8">Cloud & Infrastructure Management</h3>
            <ul className="text-white text-left space-y-2 text-base">
              <li>• Microsoft 365, AWS, Google Cloud үйлчилгээ</li>
              <li>• Server, Network, Firewall тохиргоо, удирдлага</li>
              <li>• Камер, Дэд бүтцийн шийдэл</li>
            </ul>
          </div>
          {/* Card 3 */}
          <div className="relative bg-dark rounded-3xl p-8 shadow-glow flex flex-col items-center transform transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up delay-300 hover:scale-105 hover:shadow-glow-lg">
            <div className="absolute -top-6 left-[40%] -translate-x-[40%] w-14 h-14 flex items-center justify-center rounded-full bg-neon-green text-2xl font-bold text-darker shadow-lg transition-transform duration-300 hover:scale-110 animate-float-y z-10">
              3
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center mt-8">Cybersecurity & Compliance</h3>
            <ul className="text-white text-left space-y-2 text-base">
              <li>• ISO 27001, GDPR, NIST стандартын аудит, зөвлөгөө</li>
              <li>• Zero Trust Security Consulting</li>
            </ul>
          </div>
          {/* Card 4 */}
          <div className="relative bg-dark rounded-3xl p-8 shadow-glow flex flex-col items-center transform transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up delay-500 hover:scale-105 hover:shadow-glow-lg">
            <div className="absolute -top-6 left-[40%] -translate-x-[40%] w-14 h-14 flex items-center justify-center rounded-full bg-neon-green text-2xl font-bold text-darker shadow-lg transition-transform duration-300 hover:scale-110 animate-float-y z-10">
              4
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center mt-8">IT Consulting & Digital Transformation</h3>
            <ul className="text-white text-left space-y-2 text-base">
              <li>• Байгууллагын дижитал шилжилт</li>
              <li>• IT зөвлөгөө, консалтинг үйлчилгээ</li>
              <li>• Програм хангамж хөгжүүлэх, нэвтрүүлэх</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-darker to-transparent" />
      <div className="absolute -left-10 top-1/4 w-40 h-40 bg-neon-green/20 rounded-full filter blur-3xl" />
      <div className="absolute -right-10 bottom-1/4 w-40 h-40 bg-neon-green/20 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero; 