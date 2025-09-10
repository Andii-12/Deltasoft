import React from 'react';

const About = () => {
  const services = [
    "Байгууллагын мэдээлэл технологийн зөвлөх болон дэмжлэг үзүүлэх үйлчилгээ",
    "Байгууллагын дотоод гадаад сүлжээ, камер, холбоо дохиололын нэгдсэн систем, хяналтын үйлчилгээ",
    "Байгууллагын МТ-ийн бүх төрлийн суурилуулалт хийх үйлчилгээ",
    "Байгууллагын программ хангамж хөгжүүлэх үйлчилгээ"
  ];

  return (
    <section id="about" className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            Бидний <span className="text-primary">тухай</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Main text */}
          <div className="space-y-4">
            <p className="text-text-secondary leading-relaxed">
              Дельтасофт компани нь 2012 онд байгуулагдсан цагаасаа хойш мэдээллийн технологийн салбарт тасралтгүй үйл ажиллагаа явуулж байна. Бид салбартаа олон жил ажилласан дадлага туршлагатай инженерүүдээр багаа бүрдүүлэн ажиллаж байна.
            </p>
          </div>

          {/* Right side - Services list */}
          <div className="card">
            <h3 className="text-lg font-medium text-primary mb-4">
              Манайх:
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-text-secondary text-sm">{service}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-secondary text-sm mt-4">
              хийж гүйцэтгэн ажиллаж байна.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 