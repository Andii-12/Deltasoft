import React from 'react';

const About = () => {
  const services = [
    "Байгууллагын мэдээлэл технологийн зөвлөх болон дэмжлэг үзүүлэх үйлчилгээ",
    "Байгууллагын дотоод гадаад сүлжээ, камер, холбоо дохиололын нэгдсэн систем, хяналтын үйлчилгээ",
    "Байгууллагын МТ-ийн бүх төрлийн суурилуулалт хийх үйлчилгээ",
    "Байгууллагын программ хангамж хөгжүүлэх үйлчилгээ"
  ];

  return (
    <section id="about" className="py-16 bg-background dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text mb-4">
            Бидний <span className="text-primary">тухай</span>
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Мэдээллийн технологийн салбарт 12+ жилийн туршлагатай мэргэжлийн баг
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Main text */}
          <div className="animate-slide-up">
            <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg">
              Дельтасофт компани нь 2012 онд байгуулагдсан цагаасаа хойш мэдээллийн технологийн салбарт тасралтгүй үйл ажиллагаа явуулж байна. Бид салбартаа олон жил ажилласан дадлага туршлагатай инженерүүдээр багаа бүрдүүлэн ажиллаж байна.
            </p>
          </div>

          {/* Right side - Services list */}
          <div className="card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-primary mb-6">
              Манайх:
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-text-secondary dark:text-dark-text-secondary">{service}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-secondary dark:text-dark-text-secondary text-sm mt-4">
              хийж гүйцэтгэн ажиллаж байна.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 