import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-darker">
        <div className="absolute inset-0 opacity-30">
          {/* Animated grid */}
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `
                   linear-gradient(to right, rgba(46, 255, 0, 0.1) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(46, 255, 0, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px',
                 animation: 'grid-move 20s linear infinite'
               }}>
          </div>
          
          {/* Glowing orbs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-neon-green/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Moving lines */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 background: `
                   repeating-linear-gradient(
                     45deg,
                     transparent,
                     transparent 100px,
                     rgba(46, 255, 0, 0.1) 100px,
                     rgba(46, 255, 0, 0.1) 200px
                   )
                 `,
                 animation: 'lines-move 10s linear infinite'
               }}>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Холбоо барих</h2>
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} 
                className="space-y-6 bg-darker/70 p-8 rounded-xl backdrop-blur-xl border border-neon-green/20 shadow-2xl shadow-neon-green/10
                         hover:shadow-neon-green/20 transition-all duration-500
                         animate-form-entrance">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Нэр</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-darker/80 border border-neon-green/20 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent 
                         text-gray-100 placeholder-gray-500 transition-all duration-300
                         hover:border-neon-green/40"
                required
                placeholder="Таны нэр"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">И-мэйл</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-darker/80 border border-neon-green/20 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent 
                         text-gray-100 placeholder-gray-500 transition-all duration-300
                         hover:border-neon-green/40"
                required
                placeholder="И-мэйл хаяг"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Мессеж</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-darker/80 border border-neon-green/20 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent 
                         text-gray-100 placeholder-gray-500 transition-all duration-300
                         hover:border-neon-green/40"
                required
                placeholder="Та мессежээ энд бичнэ үү"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-neon-green text-darker font-semibold py-3 px-6 rounded-lg 
                       hover:bg-opacity-90 transition-all transform hover:scale-105 
                       shadow-lg shadow-neon-green/20 hover:shadow-neon-green/40"
            >
              Илгээх
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes lines-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 100px;
          }
        }

        .animate-form-entrance {
          animation: form-entrance 0.6s ease-out;
        }

        @keyframes form-entrance {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact; 