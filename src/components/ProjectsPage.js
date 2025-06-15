import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
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

const SCREENSHOT_API_KEY = '7BA4VEY-BM6M59T-ME7DGMQ-YCZWQZG';
const getScreenshotUrl = (url) =>
  `https://shot.screenshotapi.net/screenshot?token=${SCREENSHOT_API_KEY}&url=${encodeURIComponent(url)}&width=600&output=image&file_type=png`;

const ProjectsPage = () => {
  const [mainProjects, setMainProjects] = useState([]);
  const [webProjects, setWebProjects] = useState([]);
  const [networkProjects, setNetworkProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        
        // Filter projects by category
        setMainProjects(data.filter(project => project.category === 'main'));
        setWebProjects(data.filter(project => project.category === 'web'));
        setNetworkProjects(data.filter(project => project.category === 'network'));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderProjectCard = (project) => {
    const IconComponent = iconMap[project.icon];
    return (
      <div key={project._id} className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg shadow-neon-green/5 hover:shadow-neon-green/20 transition-all">
        {IconComponent && <IconComponent className="w-12 h-12 text-neon-green mb-4" />}
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 text-base">{project.description}</p>
      </div>
    );
  };

  // WebProjectCard component for web projects
  const WebProjectCard = ({ project }) => {
    const [ogImage, setOgImage] = React.useState(null);
    const [ogLoading, setOgLoading] = React.useState(true);
    const [showScreenshot, setShowScreenshot] = React.useState(false);
    const [screenshotError, setScreenshotError] = React.useState(false);
    const [retryScreenshot, setRetryScreenshot] = React.useState(false);
    const [showGlobe, setShowGlobe] = React.useState(false);

    React.useEffect(() => {
      let isMounted = true;
      setShowScreenshot(false);
      setScreenshotError(false);
      setRetryScreenshot(false);
      setShowGlobe(false);
      if (project.link) {
        setOgLoading(true);
        fetch(`${config.API_URL}/api/projects/og-image?url=${encodeURIComponent(project.link)}`)
          .then(res => res.json())
          .then(data => {
            if (isMounted && data.image) setOgImage(data.image);
            if (isMounted && !data.image) setShowScreenshot(true);
          })
          .catch(() => { if (isMounted) setShowScreenshot(true); })
          .finally(() => { if (isMounted) setOgLoading(false); });
      } else {
        setOgLoading(false);
        setShowScreenshot(true);
      }
      return () => { isMounted = false; };
    }, [project.link]);

    React.useEffect(() => {
      let timer;
      if (screenshotError && !retryScreenshot) {
        timer = setTimeout(() => setRetryScreenshot(true), 1000);
      } else if (screenshotError && retryScreenshot) {
        timer = setTimeout(() => setShowGlobe(true), 1000);
      }
      return () => clearTimeout(timer);
    }, [screenshotError, retryScreenshot]);

    const handleOgImageError = () => {
      console.warn('og:image failed to load for', project.link);
      setShowScreenshot(true);
    };
    const handleScreenshotError = () => {
      console.warn('Screenshot failed to load for', project.link);
      setScreenshotError(true);
    };

    return (
      <div className="relative bg-[#181818] rounded-2xl p-0 flex flex-col items-center text-center shadow-lg shadow-neon-green/5 hover:shadow-neon-green/20 transition-all group overflow-hidden">
        <div className="w-full h-56 bg-white flex items-center justify-center overflow-hidden">
          {ogLoading ? (
            <div className="w-12 h-12 animate-spin border-t-2 border-b-2 border-neon-green rounded-full" />
          ) : ogImage && !showScreenshot ? (
            <img
              src={ogImage}
              alt="website main preview"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              style={{ minHeight: '100%', minWidth: '100%' }}
              onError={handleOgImageError}
            />
          ) : project.link && !showGlobe ? (
            <img
              src={getScreenshotUrl(project.link)}
              alt="website preview"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              style={{ minHeight: '100%', minWidth: '100%' }}
              onError={handleScreenshotError}
            />
          ) : (
            <FaGlobe className="w-20 h-20 text-neon-green mx-auto my-auto" />
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="px-6 py-3 bg-neon-green text-darker font-bold rounded-lg text-lg shadow-lg hover:bg-neon-green/90 transition">Очих</span>
            </a>
          )}
        </div>
        <h3 className="text-xl font-bold mt-4 mb-2 text-white">{project.title}</h3>
      </div>
    );
  };

  // NetworkProjectCard component for network projects
  const NetworkProjectCard = ({ project }) => {
    // Fix image URL if needed
    let imageUrl = project.image;
    if (imageUrl && imageUrl.startsWith('/uploads/')) {
      imageUrl = `${config.API_URL}${imageUrl}`;
    }
    return (
      <div className="bg-[#181818] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg shadow-neon-green/5 hover:shadow-neon-green/20 transition-all">
        {imageUrl && (
          <div className="w-40 h-40 bg-white flex items-center justify-center rounded mb-4 overflow-hidden">
            <img src={imageUrl} alt={project.title} className="max-w-full max-h-full object-contain" />
          </div>
        )}
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 text-base">{project.description}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-darker text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-darker text-white flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-darker text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-neon-green">БИДНИЙ ХИЙСЭН</span> ТОМООХОН АЖЛУУД
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {mainProjects.filter(p => p.icon).slice(0, 4).map(renderProjectCard)}
          </div>

          <h2 className="text-2xl font-bold text-neon-green mb-8 text-center">ДУУСГАССАН WEB АЖЛУУД</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {webProjects.map(project => <WebProjectCard key={project._id} project={project} />)}
          </div>

          <h2 className="text-2xl font-bold text-neon-green mb-8 text-center">ШИЙДСЭН СҮЛЖЭЭНИЙ АЖЛУУД</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networkProjects.map(project => <NetworkProjectCard key={project._id} project={project} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage; 