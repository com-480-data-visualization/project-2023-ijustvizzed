// List of words
var myWords = [
    {word: "Running", size: 50, color: "trump", url: "http://example.com", id: "1"},
    {word: "PAIN", size: 200, color: "alex", url: "http://example.com", id: "2"}
]

var colormap = {
    "alex" : "#0000ff",
    "trump" : "#ffa500"
}

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

const max = d3.max(myWords, d => d.size)
const min = d3.min(myWords, d => d.size)
console.log(max);
console.log(min);
const scale = d3.scaleLinear()
            .domain([0, max])
            .range([0, 70]);

function mapcolor(color) {
  return colormap[color];
}

// append the svg object to the body of the page
var svg = d3.select("#conspwcloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size, color:d.color, id:d.id}; }))
  .padding(3)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(d => scale(d.size))      // font size of words
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
        .attr("class", "consp wcloud")
        .attr("conspid", (d) => d.id)
        .style("font-size", (d) => d.size + "px")
        .style("fill", (d) => mapcolor(d.color))
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });    
}

/*
Add event handler to highlight wordcloud elements
*/
var elements = document.querySelectorAll('.wcloud');
elements.forEach(function(element) {
  element.addEventListener('mouseover', handleMouseOver);
  element.addEventListener('mouseout', handleMouseOut);
});
function handleMouseOver(event) {
  event.target.style.backgroundColor = 'green';
}
function handleMouseOut(event) {
  event.target.style.backgroundColor = 'black';
}