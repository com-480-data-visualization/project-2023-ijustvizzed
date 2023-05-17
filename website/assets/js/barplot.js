// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 90},
		width = 1300 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barplot")
.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
.append("g")
	.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");


// Parse the Data
var data_barplot = await d3.csv("assets/data/barplot.csv");

// Add X axis
var x = d3.scaleLinear()
	.domain([0, 13000])
	.range([ 0, width]);
svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x))
	.selectAll("text")
		.attr("transform", "translate(-10,0)rotate(-45)")
		.style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
	.range([ 0, height ])
	.domain(data_barplot.map(function(d) { return d.label; }))
	.padding(.1);
svg.append("g")
	.call(d3.axisLeft(y))

//Bars
svg.selectAll("myRect")
	.data(data_barplot)
	.enter()
	.append("rect")
	.attr("x", x(0) )
	.attr("y", function(d) { return y(d.label); })
	.attr("width", function(d) { return x(d.value); })
	.attr("height", y.bandwidth() )
	.attr("fill", d => color(d.label))
