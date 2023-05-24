export async function d3drawlineplot(type){
	console.log("d3 draw lineplot type: ", type);
// set the dimensions and margins of the graph

var container = document.getElementById('scalethis');
			
var containerWidth = container.getBoundingClientRect().width;
			
var svgWidth = 1300;
var svgHeight = 400;
			
var scale = containerWidth / svgWidth;
					
console.log("scaling", containerWidth, svgWidth, scale);
svgWidth =  svgWidth * scale;
svgHeight = svgHeight * scale

var margin = {top: 20, right: 30, bottom: 40, left: 90},
width = svgWidth - margin.left - margin.right,
height = svgHeight - margin.top - margin.bottom;

// remove all previous data
d3.select("#lineplot").html(null);
// append the svg object to the body of the page
var svg = d3.select("#lineplot")
	.append("svg")
		.attr("id", "lineplotsvg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
var data_lineplot = await d3.csv("assets/data/timeline.csv")

var timedata = data_lineplot.map(function(d) { 
	var dict = {}
	dict["date"] = d3.timeParse("%Y-%m")(d.date);
	data["labels"].forEach(x => {dict[x.join(" ")] = d[x.join(" ")]});
	return dict;
})

var max_y = 0
data["labels"].forEach(label => {
	max_y = Math.max(max_y, d3.max(timedata, function(d) { return +d[label.join(" ")]; }))
})

// Add X axis --> it is a date format
var x = d3.scaleTime()
	.domain(d3.extent(timedata, function(d) { return d["date"]; }))
	.range([ 0, width ]);

// Add Y axis
var y = d3.scaleLinear()
	.domain([0, max_y])
	.range([ height, 0 ]);

// Add the line
data["labels"].forEach((label, i) => {
	svg.append("path")
		.datum(timedata)
		.attr("fill", "none")
		.attr("stroke", color(label))
		.attr("stroke-width", 1.5)
		.attr("class", "lineplot"+i)
		.attr("opacity", "0.2")
		.attr("d", d3.line()
			.x(function(d) { return x(d["date"]) })
			.y(function(d) { 
				return y(d[label.join(" ")]) 
			})
		)
})

svg.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(d3.axisBottom(x));
svg.append("g")
	.call(d3.axisLeft(y));
import("./descbox.js").then((module) => {
	// Call the async function after import is resolved
	module.initdescbox();
	})
	.catch((error) => {
	console.error('Error occurred while importing module:', error);
	});

window.hover_lineplot = function(index) {
	svg = d3.select("#chord_diagram")
	d3.select("#lineplot").selectAll("path")
		.transition()
		.style("opacity", "0.2")
	d3.select("#lineplot").selectAll(".lineplot"+index)
		.transition()
		.style("opacity", "1")
}

window.unhighlight_lineplot = function(index) {
	svg = d3.select("#chord_diagram")
	d3.select("#lineplot").selectAll("path")
		.transition()
		.style("opacity", "0.2")
}

}