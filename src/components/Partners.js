import React from 'react';

const Partners = () => {
  const partners = [
    { name: "NUBIA", image: "/images/partners/nubia.png" },
    { name: "KTM", image: "/images/partners/cosmos.png" },
    { name: "IDL", image: "/images/partners/idl.png" },
    { name: "MONBAKERY", image: "/images/partners/mon.png" },
    { name: "TOUS LES JOURS", image: "/images/partners/tous.png" },
    { name: "EMUN NAST", image: "/images/partners/zuun.png" },
    { name: "SAIN ELECTRONICS", image: "/images/partners/sain.png" },
    { name: "MONKHIIN TUN", image: "/images/partners/munh.png" },
    { name: "NTG", image: "/images/partners/ntg.png" },
    { name: "CENTRAL CAPITAL", image: "/images/partners/central.png" }
  ];

  return (
    <section className="py-20 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
            <span className="text-neon-green">ХАМТРАГЧ ТҮНШ</span> БАЙГУУЛЛАГУУД
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="p-6 bg-[#111111] rounded-xl hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
    </section>
  );
};

export default Partners; 