import React, { useEffect, useState } from 'react';
import config from '../config';

const API_URL = `${config.API_URL}/api/team`;

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
    <section className="py-16 bg-background dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text mb-4">
            Манай <span className="text-primary">баг</span>
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Мэргэжлийн баг нь таны бизнесийн хэрэгцээг хангах шийдлийг бүтээхэд бэлэн байна
          </p>
        </div>

        {loading ? (
          <div className="text-center text-text-secondary dark:text-dark-text-secondary">Уншиж байна...</div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center text-text-light dark:text-dark-text-secondary">Манай баг удахгүй нэмэгдэнэ...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member._id || index}
                className="card text-center"
              >
                <div className="relative aspect-square overflow-hidden rounded mb-4">
                  {member.animeImage ? (
                    <img
                      src={member.animeImage.startsWith('data:') ? member.animeImage : `data:image/jpeg;base64,${member.animeImage}`}
                      alt={member.name + ' anime'}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface dark:bg-dark-surface flex items-center justify-center text-text-light dark:text-dark-text-secondary">No Image</div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-primary dark:text-dark-text">{member.name}</h3>
                  <p className="text-primary text-sm mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team; 