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
      <div className="w-10 h-10 mb-3 text-primary">
        {IconComponent && <IconComponent className="w-full h-full" />}
      </div>
      <h3 className="text-base font-medium mb-2 text-text-primary dark:text-dark-text">{title}</h3>
      <p className="text-text-secondary dark:text-dark-text-secondary text-xs leading-relaxed">{description}</p>
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
      <section className="py-12 bg-background dark:bg-dark-bg relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-background dark:bg-dark-bg relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-background dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-base text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Мэргэжлийн баг маань хийсэн амжилттай төслүүд болон шийдлүүд
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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