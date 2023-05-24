export async function d3drawwordcloud(type){
  console.log("d3 draw wcloud type: ", type)
  var data_lineplot = await d3.csv("assets/data/timeline.csv")
  var data = await d3.json("assets/data/dataset.json");

  console.log("data_lineplot", data_lineplot);
  console.log(data);

  function sumColumn(csvData, columnName) {
      var values = csvData.map(function(d) {
        return +d[columnName];
      });
    
      var sum = d3.sum(values);
      return sum;
    }

  function getColumnSums(csvData) {
    var columnSums = {};

    // Get the column names from the first row of the CSV data
    var columnNames = Object.keys(csvData[0]);

    // Calculate the sum for each column
    columnNames.forEach(function(columnName) {
          var values = csvData.map(function(d) {
              return +d[columnName];
            });
      var sum = d3.sum(values);
      columnSums[columnName] = sum;
    });

    return columnSums;
  }

  var column2sums  = getColumnSums(data_lineplot);
  console.log("console2sums", column2sums);
  delete column2sums.date;
  /*
  Need to adjust the proportions of this
  */

  var myWords = []
  var i = 0;
  for (var key in column2sums) {
        var obj = {};
        obj["word"] = key;
        obj["size"] = column2sums[key];
        obj["id"] = i;
        i = i+1;
        myWords.push(obj);
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
              .domain([min*200, max])
              .range([10, 100]);

  function mapcolor(color) {
    return colormap[color];
  }

  // append the svg object to the body of the page
  d3.select("#conspwcloud").html(null);
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
    .padding(10)        //space between words
    .rotate(function() { return 0; })
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
          .style("fill", (d) => color(d.text))
          .attr("text-anchor", "middle")
          .style("font-family", "Helvetica Neue")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });    

          import("./descbox.js");
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
}
