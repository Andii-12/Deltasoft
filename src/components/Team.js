import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5001/api/team';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (response.ok) {
          setTeamMembers(data);
        } else {
          setTeamMembers([]);
        }
      } catch (err) {
        setTeamMembers([]);
      }
      setLoading(false);
    };
    fetchTeam();
  }, []);

  return (
    <section className="py-20 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Манай <span className="text-neon-green">баг</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мэргэжлийн баг нь таны бизнесийн хэрэгцээг хангах шийдлийг бүтээхэд бэлэн байна
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Уншиж байна...</div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center text-gray-400">Манай баг удахгүй нэмэгдэнэ...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member._id || index}
                className="group relative overflow-hidden rounded-xl bg-[#111111] p-6 transition-all duration-300 hover:shadow-glow"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  {member.animeImage ? (
                    <img
                      src={member.animeImage.startsWith('data:') ? member.animeImage : `data:image/jpeg;base64,${member.animeImage}`}
                      alt={member.name + ' anime'}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:opacity-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {member.normalImage && (
                    <img
                      src={member.normalImage.startsWith('data:') ? member.normalImage : `data:image/jpeg;base64,${member.normalImage}`}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-contain opacity-0 transition-all duration-500 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-neon-green mt-2">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
    </section>
  );
};

export default Team; 