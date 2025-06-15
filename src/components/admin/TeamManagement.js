import React, { useEffect, useState } from 'react';
import config from '../../config';

const API_URL = `${config.API_URL}/api/team`;

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', normalImage: null, animeImage: null });
  const [normalImagePreview, setNormalImagePreview] = useState(null);
  const [animeImagePreview, setAnimeImagePreview] = useState(null);

  const fetchTeam = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setTeam(data);
      } else {
        setError(data.message || 'Failed to fetch team');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
    console.log('TeamManagement mounted');
  }, []);

  useEffect(() => {
    console.log('Current team:', team);
  }, [team]);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [type]: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'normalImage') setNormalImagePreview(reader.result);
        else setAnimeImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      if (type === 'normalImage') setNormalImagePreview(null);
      else setAnimeImagePreview(null);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const form = new FormData();
      form.append('name', formData.name);
      form.append('role', formData.role);
      if (formData.normalImage && typeof formData.normalImage !== 'string') {
        form.append('normalImage', formData.normalImage);
      }
      if (formData.animeImage && typeof formData.animeImage !== 'string') {
        form.append('animeImage', formData.animeImage);
      }
      let response, data;
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'x-auth-token': token },
          body: form
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'x-auth-token': token },
          body: form
        });
      }
      data = await response.json();
      if (response.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', role: '', normalImage: null, animeImage: null });
        setNormalImagePreview(null);
        setAnimeImagePreview(null);
        fetchTeam();
      } else {
        setError(data.message || 'Failed to save team member');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setFormData({ name: member.name, role: member.role, normalImage: null, animeImage: null });
    setNormalImagePreview(member.normalImage);
    setAnimeImagePreview(member.animeImage);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        setTeam(team.filter(m => m._id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Манай баг</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setFormData({ name: '', role: '', normalImage: null, animeImage: null });
            setNormalImagePreview(null);
            setAnimeImagePreview(null);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          + Гишүүн нэмэх
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Зураг</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Нэр</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Албан тушаал</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="text-center text-gray-400 py-8">Уншиж байна...</td></tr>
            ) : team.length === 0 ? (
              <tr><td colSpan={4} className="text-center text-gray-400 py-8">Манай баг удахгүй нэмэгдэнэ...</td></tr>
            ) : (
              team.map((member) => (
                <tr key={member._id}>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative group">
                      {member.normalImage ? (
                        <img 
                          src={member.normalImage.startsWith('data:') ? member.normalImage : `data:image/jpeg;base64,${member.normalImage}`} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                      )}
                      {member.animeImage && (
                        <img 
                          src={member.animeImage.startsWith('data:') ? member.animeImage : `data:image/jpeg;base64,${member.animeImage}`} 
                          alt={member.name + ' anime'} 
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100" 
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-gray-900">{member.role}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(member)} className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 mr-2">Засах</button>
                    <button onClick={() => handleDelete(member._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Устгах</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Гишүүн засах' : 'Гишүүн нэмэх'}</h3>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Нэр</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Албан тушаал</label>
                <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Энгийн зураг</label>
                <input type="file" accept="image/*" onChange={e => handleImageChange(e, 'normalImage')} className="mt-1 block w-full" />
                {normalImagePreview && <img src={normalImagePreview} alt="preview" className="mt-2 h-24 object-contain rounded border" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Анимэ зураг</label>
                <input type="file" accept="image/*" onChange={e => handleImageChange(e, 'animeImage')} className="mt-1 block w-full" />
                {animeImagePreview && <img src={animeImagePreview} alt="preview" className="mt-2 h-24 object-contain rounded border" />}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-700 hover:text-gray-900">Цуцлах</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{editingId ? 'Хадгалах' : 'Нэмэх'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement; 