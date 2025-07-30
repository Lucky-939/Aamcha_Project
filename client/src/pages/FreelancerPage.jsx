import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './FreelancerPage.css';

const FreelancerPage = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Portfolio Website for Designer',
      description: 'Need a personal website built using React and Tailwind. Must include blog and contact form.',
      budget: '₹3000 - ₹5000',
    },
    {
      id: 2,
      title: 'AI Chatbot for Customer Support',
      description: 'Looking to create a chatbot using Python/NLP for handling queries on a website.',
      budget: '₹8000',
    }
  ]);

  return (
    <div className="freelancer-page">
      <h1>Available Projects</h1>
      <p className="subtitle">Browse and send proposals to clients who need your skills.</p>

      {projects.length === 0 ? (
        <p className="no-projects">No projects available at the moment.</p>
      ) : (
        <div className="project-list">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ '--animation-order': index }}
            >
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span className="budget">Budget: {project.budget}</span>
              <Link to={`/proposal/${project.id}`}>
                <button className="apply-btn">Send Proposal</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreelancerPage;

