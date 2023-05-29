// export default WordCloudComponent;
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

//the word cloud component
const WordCloudComponent = ({ words, options }) => {
  const width = options.width || 1000;
  const height = options.height || 1000;

  const wordCloudRef = useRef();

  const drawWordCloud = () => {
    // Clear the previous word cloud
    d3.select(wordCloudRef.current).selectAll("*").remove();

    const svg = d3
      .select(wordCloudRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    /*Added a size scaling function using the square root of word frequencies:
    To normalize the word sizes and reduce the huge difference between the most 
    frequent word and others, I introduced a size scaling function using the square 
    root of the frequencies. This is done using D3's scaleSqrt() function. */
    const maxFrequency = d3.max(words, (d) => d.value);
    const sizeScale = d3.scaleSqrt().domain([0, maxFrequency]).range([10, 100]);

    const layout = cloud()
      .size([width, height])
      // Updated the size of words with the new size scaling function:
      // The size attribute in the words array for the word cloud layout 
      // is now set using the sizeScale() function that we created earlier. 
      // This will assign the square root-scaled size to the words.
      .words(words.map(({ text, value }) => ({ text, size: sizeScale(value) })))
      .padding(5) // Adjust padding
      .rotate(0) // Set rotation angle to 0 or a fixed angle
      .font(options.fontFamily || "Times, serif")
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    //draw the data 
    function draw(words) {
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => d.size + "px")
        .style("font-family", options.fontFamily || "Times, serif")
        .style("fill", (d, i) => color(i))
        .attr("text-anchor", "middle")
        .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
        .text((d) => d.text);
    }
  };

  useEffect(() => {
    if (wordCloudRef.current) {
      drawWordCloud();
    }
  }, [wordCloudRef, words, { ...options, width, height }]);

  return <div ref={wordCloudRef} style={{ width: "100%", height: "100%" }} />;
};

export default WordCloudComponent;
