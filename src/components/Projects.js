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
    <div className="card card-hover">
      <div className="w-12 h-12 mb-4 text-primary">
        {IconComponent && <IconComponent className="w-full h-full" />}
      </div>
      <h3 className="text-lg font-medium mb-3 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
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
      <section className="py-12 bg-background relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
              <span className="text-primary">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-background relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
              <span className="text-primary">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
            </h2>
          </div>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            <span className="text-primary">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
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

    </section>
  );
};

export default Projects; 