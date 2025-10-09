import React, { useState, useEffect } from 'react';
import { FaGlobe, FaVideo, FaPaperPlane, FaDesktop, FaCode, FaCloud, FaMobileAlt, FaNetworkWired, FaServer, FaWifi } from 'react-icons/fa';
import config from '../config';

// Debug: Log the config immediately
console.log('Projects component - config loaded:', config);
console.log('Projects component - API_URL:', config.API_URL);

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
    <div className="card card-hover p-3 h-full">
      <div className="w-10 h-10 mb-2 text-primary mx-auto">
        {IconComponent && <IconComponent className="w-full h-full" />}
      </div>
      <h3 className="text-sm font-medium mb-1.5 text-text-primary dark:text-dark-text text-center">{title}</h3>
      <p className="text-text-secondary dark:text-dark-text-secondary text-xs leading-relaxed text-center">{description}</p>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fullUrl = `${config.API_URL}/api/projects?category=main`;
        
        console.log('📡 Fetching projects from:', fullUrl);
        
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Projects data loaded:', data.length, 'projects');
        setProjects(data);
      } catch (err) {
        console.error('❌ Fetch error:', err.message);
        // Set fallback data so page still renders
        setProjects([
          {
            _id: '1',
            title: 'Веб хөгжүүлэлт',
            description: 'Орчин үеийн вэбсайт болон аппликешн хөгжүүлэлт',
            icon: 'fa-globe',
            category: 'main'
          },
          {
            _id: '2', 
            title: 'Мэдээллийн аюулгүй байдал',
            description: 'Мэдээллийн аюулгүй байдлын шийдэл',
            icon: 'fa-server',
            category: 'main'
          },
          {
            _id: '3',
            title: 'Техникийн дэмжлэг',
            description: '24/7 техникийн дэмжлэг үйлчилгээ',
            icon: 'fa-wifi',
            category: 'main'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="flex-1 py-12 bg-background dark:bg-dark-bg relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 py-4 bg-background dark:bg-dark-bg flex flex-col">
      <div className="max-w-6xl mx-auto px-6 flex-1 flex flex-col">
        <div className="text-center mb-3">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Мэргэжлийн баг маань хийсэн амжилттай төслүүд болон шийдлүүд
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 content-start">
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