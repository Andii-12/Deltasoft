import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import StartupAnimation from './components/StartupAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Projects from './components/Projects';
import News from './components/News';
import Team from './components/Team';
import Logos from './components/Logos';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import ResetPassword from './components/admin/ResetPassword';
import QuoteForm from './components/QuoteForm';
import QuotesDashboard from './components/admin/QuotesDashboard';
import NewsManagement from './components/admin/NewsManagement';
import NewsSingle from './components/NewsSingle';
import ProjectsPage from './components/ProjectsPage';
import WorkerRoutes from './components/worker/WorkerRoutes';
import NewsPage from './pages/NewsPage';
import Dashboard from './components/admin/Dashboard';
import { FaGlobe, FaVideo, FaPaperPlane, FaDesktop, FaCode, FaCloud, FaMobileAlt, FaNetworkWired, FaServer, FaWifi, FaTrash, FaTimes } from 'react-icons/fa';
import TeamManagement from './components/admin/TeamManagement';
import WorkerManagement from './components/admin/WorkerManagement';
import * as XLSX from 'xlsx';
import config from './config';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function HomeWithScroll() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const params = new URLSearchParams(location.search);
    const scroll = params.get('scroll');
    if (scroll) {
      setTimeout(() => {
        const el = document.getElementById(scroll);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={`min-h-screen bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Projects />
        <News />
        <Team />
        <Logos />
        <Footer />
      </main>
    </div>
  );
}

function AdminProjects() {
  return <div className="text-gray-700 text-xl">Төслүүдийн мэдээлэл удахгүй нэмэгдэнэ...</div>;
}

function AdminPartners() {
  return <div className="text-gray-700 text-xl">Хамтрагчдын мэдээлэл удахгүй нэмэгдэнэ...</div>;
}

function AdminProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [webProjects, setWebProjects] = useState([]);
  const [networkProjects, setNetworkProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', icon: '' });
  const [newWebProject, setNewWebProject] = useState({ title: '', link: '' });
  const [newNetworkProject, setNewNetworkProject] = useState({ title: '', description: '' });
  const [networkImageFile, setNetworkImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [webLoading, setWebLoading] = useState(false);
  const [networkLoading, setNetworkLoading] = useState(false);
  const [error, setError] = useState('');
  const [webError, setWebError] = useState('');
  const [networkError, setNetworkError] = useState('');

  const icons = [
    { value: 'fa-globe', label: 'Globe', icon: <FaGlobe /> },
    { value: 'fa-video', label: 'Video', icon: <FaVideo /> },
    { value: 'fa-paper-plane', label: 'Paper Plane', icon: <FaPaperPlane /> },
    { value: 'fa-desktop', label: 'Desktop', icon: <FaDesktop /> },
    { value: 'fa-code', label: 'Code', icon: <FaCode /> },
    { value: 'fa-cloud', label: 'Cloud', icon: <FaCloud /> },
    { value: 'fa-mobile-alt', label: 'Mobile', icon: <FaMobileAlt /> },
    { value: 'fa-network-wired', label: 'Network', icon: <FaNetworkWired /> },
    { value: 'fa-server', label: 'Server', icon: <FaServer /> },
    { value: 'fa-wifi', label: 'WiFi', icon: <FaWifi /> }
  ];

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/projects`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data.filter(p => p.category === 'main'));
      setWebProjects(data.filter(p => p.category === 'web'));
      setNetworkProjects(data.filter(p => p.category === 'network'));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleWebInputChange = (e) => {
    const { name, value } = e.target;
    setNewWebProject({ ...newWebProject, [name]: value });
  };

  const handleNetworkInputChange = (e) => {
    const { name, value } = e.target;
    setNewNetworkProject({ ...newNetworkProject, [name]: value });
  };

  const handleNetworkImageChange = (e) => {
    setNetworkImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          ...newProject,
          category: 'main'
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      const data = await response.json();
      setProjects([...projects, data]);
      setNewProject({ title: '', description: '', icon: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWebSubmit = async (e) => {
    e.preventDefault();
    setWebLoading(true);
    setWebError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          ...newWebProject,
          category: 'web'
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add web project');
      }
      const data = await response.json();
      setWebProjects([...webProjects, data]);
      setNewWebProject({ title: '', link: '' });
    } catch (err) {
      setWebError(err.message);
    } finally {
      setWebLoading(false);
    }
  };

  const handleNetworkSubmit = async (e) => {
    e.preventDefault();
    setNetworkLoading(true);
    setNetworkError('');
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('title', newNetworkProject.title);
      formData.append('description', newNetworkProject.description);
      formData.append('category', 'network');
      if (networkImageFile) {
        formData.append('image', networkImageFile);
      }
      const response = await fetch(`${config.API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to add network project');
      }
      const data = await response.json();
      setNetworkProjects([...networkProjects, data]);
      setNewNetworkProject({ title: '', description: '' });
      setNetworkImageFile(null);
    } catch (err) {
      setNetworkError(err.message);
    } finally {
      setNetworkLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter(project => project._id !== projectId));
      setWebProjects(webProjects.filter(project => project._id !== projectId));
      setNetworkProjects(networkProjects.filter(project => project._id !== projectId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Бидний хийсэн томоохон ажлууд</h2>
        {/* Add New Project Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Гарчиг</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Тайлбар</label>
            <textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon</label>
            <div className="mt-1 grid grid-cols-5 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => setNewProject({ ...newProject, icon: icon.value })}
                  className={`p-2 rounded-lg border ${
                    newProject.icon === icon.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xl text-gray-600">{icon.icon}</span>
                    <span className="text-xs mt-1 text-gray-500">{icon.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Хадгалаж байна...' : 'Төсөл нэмэх'}
          </button>
        </form>
        {/* Projects List */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Одоогийн төслүүд</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl text-gray-600">
                    {icons.find(icon => icon.value === project.icon)?.icon}
                  </span>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <h4 className="font-semibold text-gray-800">{project.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Дуусгасан web ажлууд</h2>
        {/* Add New Web Project Form */}
        <form onSubmit={handleWebSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="web-title" className="block text-sm font-medium text-gray-700">Гарчиг</label>
            <input
              type="text"
              id="web-title"
              name="title"
              value={newWebProject.title}
              onChange={handleWebInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="web-link" className="block text-sm font-medium text-gray-700">Линк</label>
            <input
              type="url"
              id="web-link"
              name="link"
              value={newWebProject.link}
              onChange={handleWebInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          {webError && (
            <div className="text-red-500 text-sm">{webError}</div>
          )}
          <button
            type="submit"
            disabled={webLoading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {webLoading ? 'Хадгалаж байна...' : 'Web төсөл нэмэх'}
          </button>
        </form>
        {/* Web Projects List */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Web төслүүд</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {webProjects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                    {project.title}
                  </a>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-1 break-all">{project.link}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Шийдсэн сүлжээний ажлууд</h2>
        {/* Add New Network Project Form */}
        <form onSubmit={handleNetworkSubmit} className="space-y-4 mb-8" encType="multipart/form-data">
          <div>
            <label htmlFor="network-title" className="block text-sm font-medium text-gray-700">Гарчиг</label>
            <input
              type="text"
              id="network-title"
              name="title"
              value={newNetworkProject.title}
              onChange={handleNetworkInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="network-description" className="block text-sm font-medium text-gray-700">Тайлбар</label>
            <textarea
              id="network-description"
              name="description"
              value={newNetworkProject.description}
              onChange={handleNetworkInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="network-image" className="block text-sm font-medium text-gray-700">Зураг (файл)</label>
            <input
              type="file"
              id="network-image"
              name="image"
              accept="image/*"
              onChange={handleNetworkImageChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          {networkError && (
            <div className="text-red-500 text-sm">{networkError}</div>
          )}
          <button
            type="submit"
            disabled={networkLoading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {networkLoading ? 'Хадгалаж байна...' : 'Сүлжээний төсөл нэмэх'}
          </button>
        </form>
        {/* Network Projects List */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Сүлжээний төслүүд</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkProjects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded" />
                  )}
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <h4 className="font-semibold text-gray-800">{project.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminSchedule() {
  const [workers, setWorkers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [savingId, setSavingId] = React.useState(null);
  const [error, setError] = React.useState('');
  const [schedules, setSchedules] = React.useState({});
  const [allTimeEntries, setAllTimeEntries] = React.useState([]);
  const [deletingId, setDeletingId] = React.useState(null);

  const days = [
    { key: 'monday', label: 'Даваа' },
    { key: 'tuesday', label: 'Мягмар' },
    { key: 'wednesday', label: 'Лхагва' },
    { key: 'thursday', label: 'Пүрэв' },
    { key: 'friday', label: 'Баасан' }
  ];

  React.useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${config.API_URL}/api/workers`, {
          headers: { 'x-auth-token': token }
        });
        const data = await response.json();
        if (response.ok) {
          setWorkers(data);
          // Initialize schedules state
          const initial = {};
          data.forEach(w => {
            initial[w._id] = {
              monday: w.schedule?.monday || '',
              tuesday: w.schedule?.tuesday || '',
              wednesday: w.schedule?.wednesday || '',
              thursday: w.schedule?.thursday || '',
              friday: w.schedule?.friday || ''
            };
          });
          setSchedules(initial);
          console.log('DEBUG after fetchWorkers schedules:', initial);
        } else setWorkers([]);
      } catch {
        setWorkers([]);
      }
      setLoading(false);
    };
    fetchWorkers();

    // Fetch all time entries for admin
    const fetchAllTimeEntries = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${config.API_URL}/api/workers/all-time-entries`, {
          headers: { 'x-auth-token': token }
        });
        const data = await response.json();
        if (response.ok) setAllTimeEntries(data);
        else setAllTimeEntries([]);
      } catch {
        setAllTimeEntries([]);
      }
    };
    fetchAllTimeEntries();
  }, []);

  const handleChange = (workerId, dayKey, value) => {
    setSchedules(s => ({
      ...s,
      [workerId]: {
        ...s[workerId],
        [dayKey]: value
      }
    }));
  };

  const handleSave = async (workerId) => {
    setSavingId(workerId);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/workers/${workerId}/schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ schedule: schedules[workerId] })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Хадгалах үед алдаа гарлаа');
      } else {
        // Re-fetch workers to update UI
        const response2 = await fetch(`${config.API_URL}/api/workers`, {
          headers: { 'x-auth-token': token }
        });
        const data2 = await response2.json();
        if (response2.ok) {
          setWorkers(data2);
          // Update schedules state
          const initial = {};
          data2.forEach(w => {
            initial[w._id] = {
              monday: w.schedule?.monday || '',
              tuesday: w.schedule?.tuesday || '',
              wednesday: w.schedule?.wednesday || '',
              thursday: w.schedule?.thursday || '',
              friday: w.schedule?.friday || ''
            };
          });
          setSchedules(initial);
        }
      }
    } catch {
      setError('Хадгалах үед алдаа гарлаа');
    }
    setSavingId(null);
  };

  // Delete a time entry
  const handleDeleteEntry = async (entryId) => {
    if (!window.confirm('Устгахдаа итгэлтэй байна уу?')) return;
    setDeletingId(entryId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/workers/time-entry/${entryId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        // Refresh all time entries
        const res = await fetch(`${config.API_URL}/api/workers/all-time-entries`, {
          headers: { 'x-auth-token': token }
        });
        const data = await res.json();
        setAllTimeEntries(data);
      }
    } catch {}
    setDeletingId(null);
  };

  // Excel export handler
  const handleExportExcel = () => {
    // Flatten all time entries for export
    const rows = [];
    allTimeEntries.forEach(group => {
      group.entries.forEach(entry => {
        rows.push({
          Worker: group.worker.name,
          Username: group.worker.username,
          Date: new Date(entry.clockIn).toLocaleDateString(),
          'Clock In': new Date(entry.clockIn).toLocaleTimeString(),
          'Clock Out': entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : '-',
          Duration: entry.duration ? formatDuration(entry.duration) : '-',
          Company: entry.company || '-'
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TimeEntries');
    XLSX.writeFile(wb, 'time_entries.xlsx');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Цагийн хуваарь</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto mb-12">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ажилтан</th>
              {days.map(day => (
                <th key={day.key} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">{day.label}</th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={7} className="text-center text-gray-400 py-8">Уншиж байна...</td></tr>
            ) : workers.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-gray-400 py-8">Ажилтан алга...</td></tr>
            ) : (
              workers.map(worker => (
                <tr key={worker._id}>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{worker.name || worker.email}</td>
                  {days.map(day => (
                    <td key={day.key} className="px-4 py-2 text-gray-900">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          className="w-full rounded border border-gray-300 px-2 py-1 text-gray-900 pr-8"
                          placeholder={day.label}
                          value={schedules[worker._id]?.[day.key] || ''}
                          onChange={e => handleChange(worker._id, day.key, e.target.value)}
                        />
                        {schedules[worker._id]?.[day.key] && (
                          <button
                            type="button"
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                            onClick={() => handleChange(worker._id, day.key, '')}
                            tabIndex={-1}
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleSave(worker._id)}
                      disabled={savingId === worker._id}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {savingId === worker._id ? 'Хадгалж байна...' : 'Хадгалах'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Ажилчдын цагийн бүртгэл</h2>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          onClick={handleExportExcel}
        >
          Excel Format
        </button>
      </div>
      {allTimeEntries.length === 0 ? (
        <div className="text-gray-500">Бүртгэл олдсонгүй</div>
      ) : (
        allTimeEntries.map(group => (
          <div key={group.worker._id} className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{group.worker.name} ({group.worker.username})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Огноо</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Устгах</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {group.entries.length === 0 ? (
                    <tr><td colSpan={5} className="text-center text-gray-400 py-4">Бүртгэл алга</td></tr>
                  ) : (
                    group.entries.map(entry => (
                      <tr key={entry._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(entry.clockIn).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(entry.clockIn).toLocaleTimeString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.duration ? formatDuration(entry.duration) : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.company || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs disabled:opacity-50"
                            onClick={() => handleDeleteEntry(entry._id)}
                            disabled={deletingId === entry._id}
                          >
                            {deletingId === entry._id ? 'Устгаж байна...' : 'Устгах'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function formatDuration(duration) {
  if (!duration || isNaN(duration)) return '-';
  const totalSeconds = Math.floor(duration * 3600);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    `${seconds}s`
  ].filter(Boolean).join(' ');
}

function App() {
  const [showStartup, setShowStartup] = useState(true);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  if (showStartup) {
    return <StartupAnimation onComplete={handleStartupComplete} />;
  }

  return (
    <DarkModeProvider>
      <Router>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeWithScroll />} />
        <Route path="/quote" element={<QuoteForm />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="quotes" element={<QuotesDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="project-management" element={<AdminProjectManagement />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="workers" element={<WorkerManagement />} />
        </Route>
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsSingle />} />
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Worker Routes */}
        <Route path="/worker/*" element={<WorkerRoutes />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App; 