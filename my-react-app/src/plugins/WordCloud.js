import React from "react";
import WordCloudComponent from "./WordCloudComponent";

//word cloud module
const WordCloud = ({jsonData}) => {
    console.log('jsonData:', jsonData);
    jsonData = jsonData || {};
    console.log('jsonData2:', jsonData);

  const options = {
    width: 1500,
    height: 1000,
    fontFamily: "Times, serif",
    backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
  };

  const wordArray = Object.entries(jsonData).map(([text, value]) => ({ text, value }));

  return (
    <div>
    
      <WordCloudComponent words={wordArray} options={options} />
    </div>
  );
};

export default WordCloud;
