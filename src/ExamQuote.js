// ExamQuote.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamQuote.css'; // Import the CSS file

const ExamQuote = () => {
  const [examOptions, setExamOptions] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  useEffect(() => {
    fetchExamOptions();
  }, []);

  const fetchExamOptions = async () => {
    try {
      const response = await axios.get('https://api.whenisthenextboardexam.com/exams');
      setExamOptions(response.data);
      fetchRandomExam();
    } catch (error) {
      console.error('Error fetching exam options:', error);
    }
  };

  const fetchRandomExam = () => {
    const randomIndex = Math.floor(Math.random() * examOptions.length);
    setCurrentExam(examOptions[randomIndex]);
  };

  const handleGenerateRandomExam = () => {
    fetchRandomExam();
  };

  return (
    <div className="exam-container">
      <h2 className="exam-header">Random Exam</h2>
      {currentExam && (
        <div className="exam-details">
          <p><strong>ID:</strong> {currentExam._id}</p>
          <p><strong>Name:</strong> {currentExam.name}</p>
          <p><strong>Date:</strong> {currentExam.dates}</p>
        </div>
      )}
      <button className="generate-button" onClick={handleGenerateRandomExam}>Generate Random Exam</button>
    </div>
  );
};

export default ExamQuote;
