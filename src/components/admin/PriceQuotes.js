import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';

const PriceQuotes = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      name: 'Б. Бат-Эрдэнэ',
      company: 'Tech Solutions LLC',
      email: 'bat@example.com',
      phone: '99119911',
      description: 'Вэб систем хийлгэх',
      status: 'pending',
      date: '2024.03.15'
    },
    {
      id: 2,
      name: 'Д. Болд',
      company: 'Digital Agency',
      email: 'bold@example.com',
      phone: '99229922',
      description: 'Мобайл апп хийлгэх',
      status: 'processed',
      date: '2024.03.14'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setQuotes(quotes.map(quote => 
      quote.id === id ? { ...quote, status: newStatus } : quote
    ));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Хүлээгдэж буй';
      case 'processed':
        return 'Боловсруулсан';
      case 'rejected':
        return 'Татгалзсан';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Үнийн саналын жагсаалт</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Огноо</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Нэр</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Байгууллага</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Холбоо барих</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тайлбар</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Төлөв</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{quote.email}</div>
                  <div>{quote.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{quote.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(quote.status)}`}>
                    {getStatusText(quote.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {quote.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(quote.id, 'processed')}
                        className="text-green-600 hover:text-green-900 mr-3 transition-colors"
                        title="Зөвшөөрөх"
                      >
                        <FaCheck className="inline" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(quote.id, 'rejected')}
                        className="text-red-600 hover:text-red-900 mr-3 transition-colors"
                        title="Татгалзах"
                      >
                        <FaTimes className="inline" />
                      </button>
                    </>
                  )}
                  <a
                    href={`mailto:${quote.email}`}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    title="Имэйл илгээх"
                  >
                    <FaEnvelope className="inline" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceQuotes; 