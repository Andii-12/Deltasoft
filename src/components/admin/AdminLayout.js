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
  FaUsers,
  FaTachometerAlt,
  FaImages
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to /admin/dashboard if we're at /admin exactly
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/news', icon: FaNewspaper, label: 'Мэдээ' },
    { path: '/admin/logos', icon: FaImages, label: 'Logo Management' },
    { path: '/admin/partners', icon: FaHandshake, label: 'Хамтрагчид' },
    { path: '/admin/quotes', icon: FaFileInvoiceDollar, label: 'Үнийн санал' },
    { path: '/admin/project-management', icon: FaProjectDiagram, label: 'Project Management' },
    { path: '/admin/schedule', icon: FaClock, label: 'Цагийн хуваарь' },
    { path: '/admin/team', icon: FaUsers, label: 'Манай баг' },
    { path: '/admin/workers', icon: FaUsers, label: 'Ажилчдийн бүртгэл' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-background border-r border-border transition-all duration-200 flex-shrink-0`}>
          <div className="p-4 flex justify-between items-center border-b border-border">
            <h2 className={`${!sidebarOpen && 'hidden'} font-semibold text-text-primary`}>Admin</h2>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-accent rounded transition-colors text-text-secondary hover:text-primary"
            >
              {sidebarOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
            </button>
          </div>
          <nav className="mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 hover:bg-accent transition-colors ${
                  location.pathname === item.path ? 'bg-accent text-primary' : 'text-text-secondary hover:text-primary'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 hover:bg-red-50 transition-colors text-red-500 hover:text-red-600 mt-2"
            >
              <FaSignOutAlt className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3 text-sm">Гарах</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-surface">
          {/* Header */}
          <header className="bg-background border-b border-border">
            <div className="px-6 py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium text-text-primary">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
                </h1>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 text-sm transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                </button>
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