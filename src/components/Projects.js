import React, { useState, useEffect } from 'react';
import { FaGlobe, FaVideo, FaPaperPlane, FaDesktop, FaCode, FaCloud, FaMobileAlt, FaNetworkWired, FaServer, FaWifi } from 'react-icons/fa';
import config from '../config';

const iconMap = {
  'fa-globe': FaGlobe,
  'fa-video': FaVideo,
  'fa-paper-plane': FaPaperPlane,
  'fa-desktop': FaDesktop,
  'fa-code': FaCode,
  'fa-cloud': FaCloud,
  'fa-mobile-alt': FaMobileAlt,
  'fa-network-wired': FaNetworkWired,
  'fa-server': FaServer,
  'fa-wifi': FaWifi
};

const ProjectCard = ({ title, description, icon }) => {
  const IconComponent = iconMap[icon];
  return (
    <div className="bg-[#111111] rounded-2xl p-8 hover:bg-opacity-80 transition-all transform hover:-translate-y-1 border border-neon-green/5">
      <div className="w-16 h-16 mb-6 text-neon-green">
        {IconComponent && <IconComponent className="w-full h-full" />}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 text-base leading-relaxed">{description}</p>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/projects?category=main`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-darker relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
              <span className="text-neon-green">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-darker relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
              <span className="text-neon-green">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
            </h2>
          </div>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
            <span className="text-neon-green">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects
            .filter(project => project.category === 'main' && project.icon)
            .map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
    </section>
  );
};

export default Projects; 