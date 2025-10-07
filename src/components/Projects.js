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
    <div className="card card-hover">
      <div className="w-10 h-10 mb-3 text-primary">
        {IconComponent && <IconComponent className="w-full h-full" />}
      </div>
      <h3 className="text-sm font-medium mb-2 text-text-primary dark:text-dark-text">{title}</h3>
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
        // Ensure we have a full URL
        let apiUrl = config.API_URL;
        if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
          apiUrl = `https://${apiUrl}`;
        }
        const fullUrl = `${apiUrl}/api/projects?category=main`;
        
        console.log('Config API_URL:', config.API_URL);
        console.log('Processed API_URL:', apiUrl);
        console.log('Full fetch URL:', fullUrl);
        
        const response = await fetch(fullUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error('Server returned non-JSON response');
        }
        
        const data = await response.json();
        console.log('Projects data:', data);
        setProjects(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        // Set some sample data as fallback
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
    <section className="py-6 bg-background dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-6">
          <p className="text-base text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Мэргэжлийн баг маань хийсэн амжилттай төслүүд болон шийдлүүд
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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