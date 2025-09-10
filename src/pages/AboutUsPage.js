import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaLightbulb, FaUsers, FaHandshake, FaRocket, FaChartLine, FaCode, FaAward, FaShieldAlt, FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  const services = [
    "Байгууллагын мэдээлэл технологийн зөвлөх болон дэмжлэг үзүүлэх үйлчилгээ",
    "Байгууллагын дотоод гадаад сүлжээ, камер, холбоо дохиололын нэгдсэн систем, хяналтын үйлчилгээ",
    "Байгууллагын МТ-ийн бүх төрлийн суурилуулалт хийх үйлчилгээ",
    "Байгууллагын программ хангамж хөгжүүлэх үйлчилгээ"
  ];

  const values = [
    {
      title: "Мэргэжлийн баталгаа",
      description: "12+ жилийн туршлагатай мэргэжлийн баг",
      icon: <FaAward className="text-4xl text-primary" />
    },
    {
      title: "Шинэлэг технологи",
      description: "Орчин үеийн технологийн шийдэл",
      icon: <FaLightbulb className="text-4xl text-primary" />
    },
    {
      title: "Хэрэглэгчийн сэтгэл ханамж",
      description: "Хэрэглэгчдийн хэрэгцээг хангах",
      icon: <FaHeart className="text-4xl text-primary" />
    },
    {
      title: "Найдвартай үйлчилгээ",
      description: "24/7 техникийн дэмжлэг",
      icon: <FaShieldAlt className="text-4xl text-primary" />
    }
  ];

  const timeline = [
    {
      year: "2012",
      title: "Компани байгуулагдсан",
      description: "Дельтасофт ХХК-г мэдээллийн технологийн салбарт үйл ажиллагаа эхлүүлсэн"
    },
    {
      year: "2015",
      title: "Анхны томоохон төсөл",
      description: "Монголын томоохон байгууллагуудтай хамтран ажиллаж эхэлсэн"
    },
    {
      year: "2018",
      title: "Хөгжүүлэлтийн төв нээгдсэн",
      description: "Программ хангамж хөгжүүлэлтийн төв нээж, баг нэмэгдсэн"
    },
    {
      year: "2020",
      title: "Дижитал шийдэл",
      description: "COVID-19-ийн үед дижитал шийдлийн чиглэлээр тэлсэн"
    },
    {
      year: "2024",
      title: "Орчин үеийн технологи",
      description: "AI, Cloud, IoT технологийг ашиглаж эхэлсэн"
    }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
              <FaCode className="text-3xl text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary dark:text-dark-text mb-6 leading-tight">
              Бидний <span className="text-primary bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">тухай</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
              Мэдээллийн технологийн салбарт 12+ жилийн туршлагатай мэргэжлийн баг
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-primary" />
                <span>12+ жилийн туршлага</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-primary" />
                <span>Мэргэжлийн баг</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRocket className="text-primary" />
                <span>Шинэлэг шийдэл</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text mb-6">
              Бидний <span className="text-primary">түүх</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text mb-3">
                    12+ жилийн туршлага
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    Дельтасофт компани нь 2012 онд байгуулагдсан цагаасаа хойш мэдээллийн технологийн салбарт тасралтгүй үйл ажиллагаа явуулж байна.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text mb-3">
                    Мэргэжлийн баг
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    Бид салбартаа олон жил ажилласан дадлага туршлагатай инженерүүдээр багаа бүрдүүлэн ажиллаж байна.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaRocket className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text mb-3">
                    Бидний зорилго
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    Байгууллагуудад мэдээллийн технологийн оновчтой шийдэл санал болгож, тэдний бизнесийг амжилттай урагшлуулахад туслах явдал юм.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <FaCode className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text">
                  Манай үйлчилгээ
                </h3>
              </div>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <FaCheckCircle className="text-primary text-sm" />
                    </div>
                    <span className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-text-secondary dark:text-dark-text-secondary text-sm text-center">
                  хийж гүйцэтгэн ажиллаж байна.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-surface to-background dark:from-dark-surface dark:to-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text mb-6">
              Бидний <span className="text-primary">үнэт зүйлс</span>
            </h2>
            <p className="text-xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Бидний ажиллах арга барил, зарчмууд
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-white dark:bg-dark-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-dark-border">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text mb-6">
              Хөгжлийн <span className="text-primary">түүх</span>
            </h2>
            <p className="text-xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Компанийн хөгжлийн чухал үе шатууд
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/20 rounded-full"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background dark:border-dark-bg shadow-lg"></div>
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} w-full md:w-1/2`}>
                    <div className="bg-white dark:bg-dark-bg rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl transition-all duration-300">
                      <div className="text-3xl font-bold text-primary mb-3">{item.year}</div>
                      <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-3">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-surface to-background dark:from-dark-surface dark:to-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text mb-6">
              Манай <span className="text-primary">баг</span>
            </h2>
            <p className="text-xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Мэргэжлийн баг нь таны бизнесийн хэрэгцээг хангах шийдлийг бүтээхэд бэлэн байна
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full mb-8">
              <FaUsers className="text-6xl text-primary" />
            </div>
            <div className="bg-white dark:bg-dark-bg rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-border max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-4">
                Манай баг удахгүй нэмэгдэнэ...
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                Бид мэргэжлийн багтайгаа хамт таны бизнесийн хэрэгцээг хангах шилдэг шийдлүүдийг бүтээхэд бэлэн байна.
              </p>
              <Link 
                to="/admin/team" 
                className="btn btn-primary px-8 py-3 text-lg hover:scale-105 transition-transform duration-300"
              >
                Багийн гишүүдийг харах
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
            <FaHandshake className="text-3xl text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Бидэнтэй хамтран ажиллахыг хүсэж байна уу?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Бид таны бизнесийн хэрэгцээнд нийцсэн шилдэг шийдлүүдийг санал болгоно.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/quote" 
              className="bg-white text-primary px-10 py-4 text-lg font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Үнийн санал авах
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-10 py-4 text-lg font-semibold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Холбоо барих
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
