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
    <section className="py-12 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">
            <span className="text-primary">ХАМТРАГЧ ТҮНШ</span> БАЙГУУЛЛАГУУД
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="card flex items-center justify-center p-4"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners; 