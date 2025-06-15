import React, { useState } from 'react';
import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { 
  FaNewspaper,
  FaBars,
  FaTimes,
  FaProjectDiagram,
  FaHandshake,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaClock,
  FaUsers
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to /admin/news if we're at /admin exactly
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/news" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/news', icon: FaNewspaper, label: 'Мэдээ' },
    { path: '/admin/partners', icon: FaHandshake, label: 'Хамтрагчид' },
    { path: '/admin/quotes', icon: FaFileInvoiceDollar, label: 'Үнийн санал' },
    { path: '/admin/project-management', icon: FaProjectDiagram, label: 'Project Management' },
    { path: '/admin/schedule', icon: FaClock, label: 'Цагийн хуваарь' },
    { path: '/admin/team', icon: FaUsers, label: 'Манай баг' },
    { path: '/admin/workers', icon: FaUsers, label: 'Ажилчдийн бүртгэл' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out flex-shrink-0`}>
          <div className="p-4 flex justify-between items-center">
            <h2 className={`${!sidebarOpen && 'hidden'} font-bold text-xl`}>Удирдлага</h2>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <nav className="mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-4 hover:bg-gray-700 transition-colors ${
                  location.pathname === item.path ? 'bg-gray-700' : ''
                }`}
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                {sidebarOpen && <span className="ml-4">{item.label}</span>}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-4 hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300"
            >
              <FaSignOutAlt className="w-6 h-6 flex-shrink-0" />
              {sidebarOpen && <span className="ml-4">Гарах</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-100">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="px-4 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Удирдлага'}
                </h1>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Гарах</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 