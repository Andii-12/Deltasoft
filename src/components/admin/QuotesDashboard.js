import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaSpinner, FaEye, FaSort, FaSearch, FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';

const QuotesDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/quotes', {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch quotes');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id, status) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/quotes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        await fetchQuotes();
        setShowConfirmModal(false);
        setPendingAction(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update quote status');
      }
    } catch (err) {
      setError('Failed to update quote status');
    } finally {
      setLoading(false);
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Та энэ үнийн саналын хүсэлтийг устгахдаа итгэлтэй байна уу?')) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/api/quotes/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
      if (response.ok) {
        setQuotes(quotes.filter(q => q._id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete quote');
      }
    } catch (err) {
      setError('Failed to delete quote');
    } finally {
      setLoading(false);
    }
  };

  const filterQuotes = (quotes) => {
    return quotes.filter(quote => {
      const matchesSearch = 
        quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processed':
        return 'Хүлээн авсан';
      case 'rejected':
        return 'Татгалзсан';
      default:
        return 'Хүлээгдэж буй';
    }
  };

  const filteredQuotes = filterQuotes(quotes);
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const paginatedQuotes = filteredQuotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Үнийн саналын хүсэлтүүд</h2>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        >
          <option value="all">Бүх төлөв</option>
          <option value="pending">Хүлээгдэж буй</option>
          <option value="processed">Хүлээн авсан</option>
          <option value="rejected">Татгалзсан</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Quote Details Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">Дэлгэрэнгүй мэдээлэл</h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4 text-gray-900">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Нэр:</span>
                  <span className="ml-2">{selectedQuote.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Байгууллага:</span>
                  <span className="ml-2">{selectedQuote.company}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">И-мэйл:</span>
                  <span className="ml-2">{selectedQuote.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Утас:</span>
                  <span className="ml-2">{selectedQuote.phone}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Тайлбар:</span>
                  <p className="mt-2 whitespace-pre-wrap bg-gray-50 p-4 rounded text-gray-800">{selectedQuote.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Төлөв:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full ${getStatusColor(selectedQuote.status)}`}>
                    {getStatusText(selectedQuote.status)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Огноо:</span>
                  <span className="ml-2">{new Date(selectedQuote.date).toLocaleDateString('mn-MN')}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && pendingAction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Баталгаажуулах</h3>
            <p className="mb-6 text-gray-900">
              {pendingAction.status === 'processed' 
                ? 'Та энэ хүсэлтийг хүлээн авахдаа итгэлтэй байна уу?' 
                : 'Та энэ хүсэлтийг татгалзахдаа итгэлтэй байна уу?'}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingAction(null);
                }}
                className="px-4 py-2 text-gray-900 hover:text-gray-900"
              >
                Үгүй
              </button>
              <button
                onClick={() => updateQuoteStatus(pendingAction.id, pendingAction.status)}
                className={`px-4 py-2 rounded ${
                  pendingAction.status === 'processed'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                Тийм
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Огноо
                  <FaSort className="ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Нэр
                  <FaSort className="ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Байгууллага
                  <FaSort className="ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Холбоо барих
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Төлөв
                  <FaSort className="ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedQuotes.map((quote) => (
              <tr key={quote._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(quote.date).toLocaleDateString('mn-MN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {quote.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {quote.company}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>И-мэйл: {quote.email}</div>
                  <div>Утас: {quote.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                    {getStatusText(quote.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Дэлгэрэнгүй"
                    >
                      <FaEye className="text-xl" />
                    </button>
                    {quote.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            setPendingAction({ id: quote._id, status: 'processed' });
                            setShowConfirmModal(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                          title="Хүлээн авах"
                        >
                          <FaCheck className="text-xl" />
                        </button>
                        <button
                          onClick={() => {
                            setPendingAction({ id: quote._id, status: 'rejected' });
                            setShowConfirmModal(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Татгалзах"
                        >
                          <FaTimes className="text-xl" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteQuote(quote._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Устгах"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-900">
            Нийт {filteredQuotes.length} хүсэлтээс {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredQuotes.length)} харуулж байна
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-900 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-900 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesDashboard; 