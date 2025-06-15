import React from 'react';

const About = () => {
  const services = [
    "Байгууллагын мэдээлэл технологийн зөвлөх болон дэмжлэг үзүүлэх үйлчилгээ",
    "Байгууллагын дотоод гадаад сүлжээ, камер, холбоо дохиололын нэгдсэн систем, хяналтын үйлчилгээ",
    "Байгууллагын МТ-ийн бүх төрлийн суурилуулалт хийх үйлчилгээ",
    "Байгууллагын программ хангамж хөгжүүлэх үйлчилгээ"
  ];

  return (
    <section id="about" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Бидний <span className="text-neon-green">тухай</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main text */}
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              Дельтасофт компани нь 2012 онд байгуулагдсан цагаасаа хойш мэдээллийн технологийн салбарт тасралтгүй үйл ажиллагаа явуулж байна. Бид салбартаа олон жил ажилласан дадлага туршлагатай инженерүүдээр багаа бүрдүүлэн ажиллаж байна.
            </p>
          </div>

          {/* Right side - Services list */}
          <div className="bg-darker rounded-2xl p-8 shadow-lg shadow-neon-green/5">
            <h3 className="text-xl font-semibold text-neon-green mb-6">
              Манайх:
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-neon-green mt-1">•</span>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 mt-6">
              хийж гүйцэтгэн ажиллаж байна.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-20 w-40 h-40 bg-neon-green/5 rounded-full filter blur-3xl" />
      <div className="absolute right-0 w-40 h-40 bg-neon-green/10 rounded-full filter blur-3xl" />
    </section>
  );
};

export default About; 