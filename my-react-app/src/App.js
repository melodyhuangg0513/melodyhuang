import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import InterviewHome from './pages/InterviewHome';
import PresentationHome from './pages/PresentationHome';
import InterviewFeedback from './pages/InterviewFeedback';
import PresentationFeedback from './pages/PresentationFeedback';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import React from 'react';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/interviewhome" element={<InterviewHome />} />
        <Route path="/presentationhome" element={<PresentationHome />} />
        <Route path="/interviewfeedback" element={<InterviewFeedback />} />
        <Route path="/presentationfeedback" element={<PresentationFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
