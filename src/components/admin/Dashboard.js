import React, { useState, useEffect } from 'react';
import { FaUsers, FaEye, FaNewspaper, FaProjectDiagram, FaQuoteLeft, FaClock, FaChartLine, FaServer, FaGlobe } from 'react-icons/fa';
import config from '../../config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    totalNews: 0,
    totalProjects: 0,
    totalQuotes: 0,
    totalTeamMembers: 0,
    totalWorkers: 0,
    systemUptime: '0 days',
    lastUpdate: new Date().toLocaleString()
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    // Update data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch all data in parallel
      const [newsRes, projectsRes, quotesRes, teamRes, workersRes, analyticsRes, realTimeRes, systemRes, activityRes] = await Promise.all([
        fetch(`${config.API_URL}/api/news`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/projects`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/quotes`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/team`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/workers`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/analytics/visitors`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/analytics/visitors/realtime`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/analytics/system/health`, { headers: { 'x-auth-token': token } }),
        fetch(`${config.API_URL}/api/analytics/activity`, { headers: { 'x-auth-token': token } })
      ]);

      const [news, projects, quotes, team, workers, analytics, realTime, systemHealth, activities] = await Promise.all([
        newsRes.json(),
        projectsRes.json(),
        quotesRes.json(),
        teamRes.json(),
        workersRes.json(),
        analyticsRes.json(),
        realTimeRes.json(),
        systemRes.json(),
        activityRes.json()
      ]);

      // Use real analytics data
      setStats({
        totalVisitors: analytics.totalVisitors || 0,
        todayVisitors: analytics.todayVisitors || 0,
        totalNews: news.length || 0,
        totalProjects: projects.length || 0,
        totalQuotes: quotes.length || 0,
        totalTeamMembers: team.length || 0,
        totalWorkers: workers.length || 0,
        systemUptime: systemHealth?.server?.uptimeFormatted || 'Unknown',
        lastUpdate: new Date().toLocaleString(),
        // Additional real-time data
        currentVisitors: realTime.currentVisitors || 0,
        last5MinVisitors: realTime.last5MinVisitors || 0,
        lastHourVisitors: realTime.lastHourVisitors || 0,
        uniqueVisitors: analytics.uniqueVisitors || 0,
        systemStatus: systemHealth?.database?.status || 'Unknown'
      });

      // Use real activity data
      setRecentActivity(activities || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to basic data if analytics fail
      try {
        const token = localStorage.getItem('adminToken');
        const [newsRes, projectsRes, quotesRes, teamRes, workersRes] = await Promise.all([
          fetch(`${config.API_URL}/api/news`, { headers: { 'x-auth-token': token } }),
          fetch(`${config.API_URL}/api/projects`, { headers: { 'x-auth-token': token } }),
          fetch(`${config.API_URL}/api/quotes`, { headers: { 'x-auth-token': token } }),
          fetch(`${config.API_URL}/api/team`, { headers: { 'x-auth-token': token } }),
          fetch(`${config.API_URL}/api/workers`, { headers: { 'x-auth-token': token } })
        ]);

        const [news, projects, quotes, team, workers] = await Promise.all([
          newsRes.json(),
          projectsRes.json(),
          quotesRes.json(),
          teamRes.json(),
          workersRes.json()
        ]);

        setStats({
          totalVisitors: 0,
          todayVisitors: 0,
          totalNews: news.length || 0,
          totalProjects: projects.length || 0,
          totalQuotes: quotes.length || 0,
          totalTeamMembers: team.length || 0,
          totalWorkers: workers.length || 0,
          systemUptime: 'Unknown',
          lastUpdate: new Date().toLocaleString()
        });
      } catch (fallbackError) {
        console.error('Fallback data fetch failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };


  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-dark-text-light">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-dark-surface rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 dark:bg-dark-surface rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-dark-text-secondary">
          Welcome back! Here's what's happening with your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value={stats.totalVisitors.toLocaleString()}
          icon={FaUsers}
          color="text-blue-500"
          subtitle="All time"
        />
        <StatCard
          title="Today's Visitors"
          value={stats.todayVisitors}
          icon={FaEye}
          color="text-green-500"
          subtitle="Last 24 hours"
        />
        <StatCard
          title="Current Visitors"
          value={stats.currentVisitors || 0}
          icon={FaGlobe}
          color="text-emerald-500"
          subtitle="Online now"
        />
        <StatCard
          title="Unique Visitors"
          value={stats.uniqueVisitors || 0}
          icon={FaUsers}
          color="text-teal-500"
          subtitle="Distinct sessions"
        />
        <StatCard
          title="News Articles"
          value={stats.totalNews}
          icon={FaNewspaper}
          color="text-purple-500"
          subtitle="Published"
        />
        <StatCard
          title="Projects"
          value={stats.totalProjects}
          icon={FaProjectDiagram}
          color="text-orange-500"
          subtitle="Completed"
        />
        <StatCard
          title="Quote Requests"
          value={stats.totalQuotes}
          icon={FaQuoteLeft}
          color="text-indigo-500"
          subtitle="Received"
        />
        <StatCard
          title="Team Members"
          value={stats.totalTeamMembers}
          icon={FaUsers}
          color="text-pink-500"
          subtitle="Active"
        />
        <StatCard
          title="Workers"
          value={stats.totalWorkers}
          icon={FaClock}
          color="text-cyan-500"
          subtitle="Registered"
        />
        <StatCard
          title="System Uptime"
          value={stats.systemUptime}
          icon={FaServer}
          color="text-red-500"
          subtitle="Current"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center">
            <FaChartLine className="w-5 h-5 mr-2 text-blue-500" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 dark:text-dark-text-light text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                  <div className={`p-2 rounded-full ${activity.color} bg-opacity-10`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-light">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center">
            <FaServer className="w-5 h-5 mr-2 text-green-500" />
            System Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Server Status</span>
              <span className={`text-sm font-medium ${stats.systemStatus === 'Connected' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stats.systemStatus || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Database</span>
              <span className={`text-sm font-medium ${stats.systemStatus === 'Connected' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stats.systemStatus || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Last Update</span>
              <span className="text-sm font-medium text-gray-900 dark:text-dark-text">{stats.lastUpdate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Version</span>
              <span className="text-sm font-medium text-gray-900 dark:text-dark-text">v1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Environment</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Production</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Real-time Tracking</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white dark:bg-dark-surface rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center">
          <FaGlobe className="w-5 h-5 mr-2 text-indigo-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
            <FaNewspaper className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-dark-text">Add News Article</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-light">Create a new news post</p>
          </button>
          <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
            <FaProjectDiagram className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-dark-text">Add Project</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-light">Showcase new work</p>
          </button>
          <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
            <FaUsers className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-dark-text">Manage Team</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-light">Update team members</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;