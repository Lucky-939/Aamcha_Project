import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { FiMail, FiUser, FiBriefcase, FiDownload } from 'react-icons/fi';

function Profile() {
  const { user } = useUser();
  const [postedProjects, setPostedProjects] = useState([]);
  const [purchasedProjects, setPurchasedProjects] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/projects/posted/${user._id}`)
        .then(res => setPostedProjects(res.data))
        .catch(console.error);

      axios.get(`http://localhost:5000/api/projects/purchased/${user._id}`)
        .then(res => setPurchasedProjects(res.data))
        .catch(console.error);
    }
  }, [user]);

  if (!user) return <div className="profile-wrapper">Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-left">
        <div className="profile-card">
          <h2><FiUser /> {user.name}</h2>
          <p><FiMail /> {user.email}</p>
          <p><FiBriefcase /> Role: {user.role || 'Member'}</p>
        </div>
      </div>

      <div className="profile-right">
        <div className="activity-section">
          <h3>📤 My Posted Projects</h3>
          {postedProjects.length > 0 ? (
            postedProjects.map(proj => (
              <div key={proj._id} className="project-card">
                <h4>{proj.title}</h4>
                <p>{proj.description}</p>
              </div>
            ))
          ) : <p className="empty-note">No projects posted.</p>}
        </div>

        <div className="activity-section">
          <h3>📥 Projects I Purchased</h3>
          {purchasedProjects.length > 0 ? (
            purchasedProjects.map(proj => (
              <div key={proj._id} className="project-card">
                <h4>{proj.title}</h4>
                <p>{proj.description}</p>
              </div>
            ))
          ) : <p className="empty-note">No purchases yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;