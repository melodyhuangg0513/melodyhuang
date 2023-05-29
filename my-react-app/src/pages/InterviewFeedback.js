import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import LineChart from '../plugins/LineChart';
import RadarChart from '../plugins/RadarChart';
import WordCloud from '../plugins/WordCloud';
import './InterviewFeedback.css'

//load the interview feedback page
function InterviewFeedback (){
    //load the location for navigating page
    const location = useLocation();
    //load the data from the backend thru the home page
    const data1 = location.state.data1 ?? {};
    const data2 = location.state.data2 ?? {};
    const data3 = location.state.data3 ?? {};
    const data4 = location.state.data4 ?? {};

    //display the page
    return(
       
        <div>
             <NavBar/>
             <div className='Title'>Feedback Page</div>
             <div className='Sub-title-time'>1.Your Text Feedback</div>
             <div className='Text'>{data4.text}</div>
             <div className='Sub-title-time'>2.Your Time Series Chart</div>
             <div className='Sub-title-time-des1'>We evaluate your answer effectiveness for the interview prompt based on time stamps.</div>
             <div  className='Sub-title-time-des2'>The following graph shows how the degrees of your answer effectivess are changed throughout the process.</div>
             <div  className='Sub-title-time-des2'>(If your graph is empty,please make sure there are '.' in your text file.)</div>
             <div className="linechart">
                <LineChart  jsonData={data1} />
             </div>
             <div className='Sub-title-radar'>3.Your Radar Chart</div>
             <div className="Sub-title-time-des1">We prepare five dimensions for you to visually reflect on your strength and weekness.</div>
             <div className="radarchart">
                <RadarChart jsonData={data2} />
             </div>
             <div className='Sub-title-wordcloud'>4.Your Word Cloud Chart</div>
             <div className="Sub-title-time-des1">We create a word cloud which keeps track of the frequency of the common words you said.</div>
             <div className="wordcloud">
                 <WordCloud jsonData={data3} />
            </div>

             

        </div>
    );
}

export default InterviewFeedback;