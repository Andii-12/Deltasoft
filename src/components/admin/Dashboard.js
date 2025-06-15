import React from 'react';
import { FaUsers, FaNewspaper, FaProjectDiagram, FaHandshake } from 'react-icons/fa';

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
        </p>
      </div>
      <div className="p-3 bg-gray-100 rounded-full">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    {
      icon: FaUsers,
      title: 'Total Visitors',
      value: '1,234',
      change: 12.5
    },
    {
      icon: FaNewspaper,
      title: 'News Articles',
      value: '45',
      change: 8.3
    },
    {
      icon: FaProjectDiagram,
      title: 'Active Projects',
      value: '23',
      change: -2.4
    },
    {
      icon: FaHandshake,
      title: 'Partners',
      value: '18',
      change: 5.7
    }
  ];

  const recentNews = [
    { title: 'Шинэ технологийн шийдэл', date: '2024.03.15', status: 'Нийтлэгдсэн' },
    { title: 'Амжилттай хэрэгжүүлсэн төсөл', date: '2024.03.10', status: 'Нийтлэгдсэн' },
    { title: 'Шинэ түншлэл', date: '2024.03.05', status: 'Ноорог' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Хянах самбар</h1>
        <button className="px-4 py-2 bg-neon-green text-darker font-medium rounded-lg hover:bg-opacity-90 transition-all">
          + Шинэ мэдээ нэмэх
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent News Table */}
      <div className="bg-dark rounded-xl border border-neon-green/10 overflow-hidden">
        <div className="p-6 border-b border-neon-green/10">
          <h2 className="text-lg font-semibold text-white">Сүүлийн мэдээнүүд</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-darker">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Гарчиг</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Огноо</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Төлөв</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neon-green/10">
              {recentNews.map((news, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{news.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{news.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      news.status === 'Нийтлэгдсэн' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {news.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-neon-green hover:text-neon-green/80 mr-3">Засах</button>
                    <button className="text-red-500 hover:text-red-400">Устгах</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex items-center py-2 border-b last:border-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    New project added: Project {index + 1}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {index + 1} hour{index !== 0 ? 's' : ''} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FaNewspaper className="w-6 h-6 mx-auto text-gray-600" />
              <span className="block mt-2 text-sm text-gray-600">Add News</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FaProjectDiagram className="w-6 h-6 mx-auto text-gray-600" />
              <span className="block mt-2 text-sm text-gray-600">New Project</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FaHandshake className="w-6 h-6 mx-auto text-gray-600" />
              <span className="block mt-2 text-sm text-gray-600">Add Partner</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FaUsers className="w-6 h-6 mx-auto text-gray-600" />
              <span className="block mt-2 text-sm text-gray-600">View Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 