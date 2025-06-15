import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const API_BASE = config.API_URL;

const WorkerDashboard = () => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [workerName, setWorkerName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalCompany, setModalCompany] = useState('');
  const [modalTime, setModalTime] = useState(new Date());
  const [allCompanies, setAllCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('workerToken');
    if (!token) {
      navigate('/worker/login');
      return;
    }

    // Fetch worker info and schedule
    const fetchWorker = async () => {
      try {
        // Get worker info from token (decode or backend endpoint)
        // We'll call a backend endpoint to get the worker's info
        const res = await axios.get(`${API_BASE}/api/workers/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Worker /api/workers/me response:', res.data);
        setSchedule(res.data.schedule || {});
        setWorkerName(res.data.name || '');
      } catch (err) {
        // fallback: just ignore
      }
    };
    fetchWorker();

    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch time entries
    fetchTimeEntries();

    // Fetch all companies for modal dropdown
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/workers/schedule-companies`);
        setAllCompanies(res.data);
        setModalCompany(res.data[0] || '');
      } catch (err) {
        setAllCompanies([]);
      }
    };
    fetchCompanies();

    let modalTimer;
    if (showModal) {
      modalTimer = setInterval(() => setModalTime(new Date()), 1000);
    }
    return () => {
      clearInterval(timer);
      clearInterval(modalTimer);
    };
  }, [navigate, showModal]);

  const fetchTimeEntries = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/workers/time-entries`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('workerToken')}`,
        },
      });
      setTimeEntries(response.data);
      // Set isClockedIn based on whether there is an open entry for today
      const today = new Date().toDateString();
      const openEntry = response.data.find(entry => new Date(entry.clockIn).toDateString() === today && !entry.clockOut);
      setIsClockedIn(!!openEntry);
    } catch (error) {
      console.error('Error fetching time entries:', error);
    }
  };

  const handleClockIn = async () => {
    try {
      const company = getTodayCompany();
      await axios.post(
        `${API_BASE}/api/workers/clock-in`,
        { company },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('workerToken')}`,
          },
        }
      );
      setIsClockedIn(true);
      fetchTimeEntries();
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  const handleClockOut = async () => {
    try {
      const company = getTodayCompany();
      await axios.post(
        `${API_BASE}/api/workers/clock-out`,
        { company },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('workerToken')}`,
          },
        }
      );
      setIsClockedIn(false);
      fetchTimeEntries();
    } catch (error) {
      console.error('Error clocking out:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('workerToken');
    navigate('/worker/login');
  };

  // Get today's company name
  const getTodayCompany = () => {
    if (!schedule) return '';
    const dayMap = [
      'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
    ];
    const todayKey = dayMap[new Date().getDay()];
    return schedule[todayKey] || '';
  };

  const formatDuration = (duration) => {
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
  };

  const handleModalClockIn = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/workers/clock-in`,
        { company: modalCompany },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('workerToken')}`,
          },
        }
      );
      setShowModal(false);
      setIsClockedIn(true);
      fetchTimeEntries();
    } catch (error) {
      alert('Error clocking in: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {workerName ? `Welcome, ${workerName}` : 'Worker Dashboard'}
              </h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>

            <div className="mb-8">
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                  {currentTime.toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-indigo-700">
                  {getTodayCompany() || 'No company assigned for today'}
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleClockIn}
                  disabled={isClockedIn}
                  className={`px-6 py-3 rounded-md text-white font-medium ${
                    isClockedIn
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Clock In
                </button>
                <button
                  onClick={handleClockOut}
                  disabled={!isClockedIn}
                  className={`px-6 py-3 rounded-md text-white font-medium ${
                    !isClockedIn
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Clock Out
                </button>
              </div>
              {/* Emergency Section */}
              <div className="flex flex-col items-center mt-6">
                <button
                  className="px-6 py-3 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700"
                  onClick={() => setShowModal(true)}
                >
                  Custom Action
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Time Entries</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clock In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clock Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeEntries.filter(entry => new Date(entry.clockIn).toDateString() === new Date().toDateString()).map((entry) => (
                      <tr key={entry._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(entry.clockIn).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(entry.clockIn).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.clockOut
                            ? new Date(entry.clockOut).toLocaleTimeString()
                            : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(entry.duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.company || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-black">Custom Clock In</h2>
            <div className="mb-4 text-center">
              <div className="text-3xl font-bold text-black">{modalTime.toLocaleTimeString()}</div>
              <div className="text-gray-800">{modalTime.toLocaleDateString()}</div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Company</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                value={modalCompany}
                onChange={e => setModalCompany(e.target.value)}
              >
                {allCompanies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              className="w-full py-3 rounded-md bg-green-600 text-white font-bold hover:bg-green-700"
              onClick={handleModalClockIn}
            >
              Clock In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard; 