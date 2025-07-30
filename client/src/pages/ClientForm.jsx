import React, { useState } from 'react';
import './ClientForm.css';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Submitted:', formData);
    alert('Project posted successfully!');
  };

  return (
    <div className="client-form-wrapper">
      <div className="client-form-box">
        <h2>Post Your Project</h2>
        <p className="form-subtext">Connect with skilled freelancers by sharing your project details.</p>

        <form onSubmit={handleSubmit} className="client-form">
          <label>Project Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Project Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Other">Other</option>
          </select>

          <label>Budget (₹):</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />

          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          <label>File Upload (optional):</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit Project</button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;