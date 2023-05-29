import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import '../App.css';
import InterviewImage from '../images/interview.jpg';
import PresentationImage from '../images/presentation.jpg';
import React from 'react';

//This module displays the home page
function Home() {
  //load navigation
  const navigate = useNavigate();

  //handle the click for the interview service
  const handleClickInterviewHome = () => {
    navigate('/interviewhome');
  };

  //handle the lcick for the presentation service
  const handleClickPresentationHome = () => {
    navigate('/presentationhome');
  };

  return (
    <>
      <div className="App">
        <NavBar />
        <div className="Title">Tartan-prep</div>
        <div className="Sub-title">Your Interviews & Presentations Prepper</div>
        <a href="#" onClick={handleClickInterviewHome}>
          <Card
            title="Service 1 : Interview Preparation"
            description="We help you hone your interviews skills for different job positions."
            img={InterviewImage}
          />
        </a>

        <a href="#" onClick={handleClickPresentationHome}>
          <Card
            title="Service 2 : Presentation Preparation"
            description="We help you show your best presentation skills."
            img={PresentationImage}
          />
        </a>
      </div>
    </>
  );
}

export default Home;
