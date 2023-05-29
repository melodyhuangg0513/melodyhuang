import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './InterviewHome.css'
import '../processShim';
import { useNavigate } from 'react-router-dom';

//display the home page for presentation
function PresentationHome() {
    const navigate = useNavigate();
    //Initialize the two states
    const [name, setName] = useState('');
    const [graduationyear, setGraduationYear] = useState('');
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [company, setCompany] = useState('');
    const [prompt, setPrompt] = useState('');
    const [filePath, setFilePath] = useState('');
    const [i, setFileType] = useState('');
    const  [loading, setLoading] = useState(false);
    let convertInput = {}

    /* 0- txt
       1- pdf
       2- audio
       -1 unvalid/*/
    //update the file type each time the user uploads a file
    const returnFileType=async(filepath)=>{
        if (filepath.slice(-3)==='txt') setFileType(0)
        else if (filepath.slice(-3)==='pdf') setFileType(1)
        else if (filepath.slice(-3)==='mp3'||filepath.slice(-3)==='mp4'||filepath.slice(-4)==='mpeg'
        ||filepath.slice(-3)==='m4a'||filepath.slice(-3)==='wav'||filepath.slice(-4)==='webm') setFileType(2)
        else {
            setFileType(-1)
            alert('Please enter file type that is pdf/txt/mp3/mp4/mpeg/mpga/m4a/wav/webm');}
    }

    //handle changes in the input fields by updating the correspondingsate variables
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
    
        //check the state
        if (name === 'name') {
            setName(value);
        } else if (name === 'school') {
            setSchool(value);
        } else if (name==='graduationyear'){
            setGraduationYear(value);
        } else if (name==='major'){
            setMajor(value);
        } else if (name==='company'){
            setCompany(value);
        } else if (name==='prompt'){
            setPrompt(value);
        } else if (name==='filePath'){
            setFilePath(value);
            returnFileType(value);
        } 
    };

    //check if the form is complete
    const isFormComplete = () => {
        return (
            name !== '' &&
            graduationyear !== '' &&
            school !== '' &&
            major !== '' &&
            company !== '' &&
            prompt !== '' &&
            filePath !== ''
        );
    };

    //handle the submit action of user, sends the updated state to the backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Check if the form is complete
        if (!isFormComplete()) {
            alert('Please fill out all required fields to continue.');
        return;
    }
        if (i === -1) {
            alert('Please enter a file type that is pdf/txt/mp3/mp4/mpeg/mpga/m4a/wav/webm');
            return;
        }

        //set the loader
        setLoading(true);

        //pass the state object to the backend thru the server
        try 
        {
            const mode = 'presentation';
            const response = await fetch(`http://localhost:8080/generateFeedback?name=${name}&graduationyear=${graduationyear}&school=${school}&major=${major}&company=${company}&prompt=${prompt}&filePath=${filePath}&i=${i}&mode=${mode}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }, 
              body: JSON.stringify({ postData: { name, graduationyear, school, major, company, prompt, filePath, i ,mode} }),
              timeout: 20000
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            //prepare data that is to be sent to backend
            const visualizationData = await response.json();
                convertInput = {
                    data1: visualizationData[2],
                    data2: visualizationData[1],
                    data3: visualizationData[0],
                    data4: visualizationData[3],
                }
            

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setLoading(false);        
            
        } catch (error) {
            console.error('Error:', error);
        }

        //naviage the the feedback page
        navigate('/interviewfeedback',{
            state:convertInput
        });
        
    };
    

    return(
        <div>
            <NavBar/>
            <div className="title">Interview Preparation Page</div>
            <div className="sub-title">Please type in your personal information:</div>
            <div className="sub-title">(Note:once you submit your form,please patiently wait until the response comes out.The process might be a bit slow)</div>

            {loading ? (
                <div
                className="loader">
                Loading, please wait...</div>
            ) : null }
            
            <form className="was-validated" onSubmit={handleSubmit}>

                <div className="input-group">
                    <span className="input-group-text instruction" id="addon-wrapping-1">Name</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="addon-wrapping-1"
                        id="validationTextarea"
                        required
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <span className="input-group-text instruction" id="addon-wrapping-1">Graduation Year</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Year (202x)" 
                        aria-label="Name" 
                        aria-describedby="addon-wrapping-1" 
                        id="validationTextarea" 
                        required
                        name='graduationyear'
                        value={graduationyear}
                        onChange={handleInputChange}/>
                </div>

                <div className="input-group">
                    <span className="input-group-text instruction" id="addon-wrapping-1">School</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="School"
                        aria-label="Name"
                        aria-describedby="addon-wrapping-1"
                        id="validationTextarea"
                        required
                        name="school"
                        value={school}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <span className="input-group-text instruction" id="addon-wrapping-1">Major</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Major" 
                        aria-label="Name" 
                        aria-describedby="addon-wrapping-1" 
                        id="validationTextarea" 
                        required
                        name='major'
                        value={major}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <span className="input-group-text instruction" id="addon-wrapping-1">Occasion</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Describe the occasion of your speech" 
                        aria-label="Name" 
                        aria-describedby="addon-wrapping-1" 
                        id="validationTextarea" 
                        required
                        name='company'
                        value={company}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-text instruction" id="addon-wrapping-1">FilePath</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="The local path of your answer file(can be audio/pdf/doc)" 
                        aria-label="Name" 
                        aria-describedby="addon-wrapping-1" 
                        id="validationTextarea" 
                        required
                        name='filePath'
                        value={filePath}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <textarea 
                        className="form-control" 
                        id="validationTextarea" 
                        placeholder="Enter your presentation topic here" 
                        required
                        name='prompt'
                        value={prompt}
                        onChange={handleInputChange}>
                    </textarea>
                    <div className="invalid-feedback">
                    Please enter a message in the textarea.
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-warning button-style" 
                    type="submit" 
                    onClick={handleSubmit}
                    >Generate My Personal Feedback!</button>
                </div>

            </form>
       </div>
    );

}

export default PresentationHome;
