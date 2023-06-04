export async function d3drawlineplot_publications(type){
	if (type >= data['labels'].length) {return};
	type = data['labels'][type].join(" ");

var publications = [
["infowars"],
["axios"],
["business insider"],
["buzzfeed news"],
["cnbc"],
["cnn"],
["economist"],
["fox news"],
["gizmodo"],
["hyperallergic"],
["mashable"],
["new","republic"],
["new","yorker"],
["people"],
["politico"],
["refinery","29"],
["reuters"],
["tmz"],
["techcrunch"],
["the","hill"],
["the","new","york","times"],
["the","verge"],
["vice"],
["vice","news"],
["vox"],
["washington","post"],
["wired"]]

var container = document.getElementById('scalethis');
			
var containerWidth = container.getBoundingClientRect().width;
			
var svgWidth = 1300;
var svgHeight = 400;
			
var scale = containerWidth / svgWidth;
					
//console.log("scaling", containerWidth, svgWidth, scale);
svgWidth =  svgWidth * scale;
svgHeight = svgHeight * scale

var margin = {top: 20, right: 30, bottom: 40, left: 90},
width = svgWidth - margin.left - margin.right,
height = svgHeight - margin.top - margin.bottom;

// remove all previous data
//d3.select("#lineplot_publications").html(null);
// append the svg object to the body of the page
var svg = d3.select("#lineplot_publications")
	.append("svg")
		.attr("id", "lineplotsvg_pub_"+type.replaceAll(" ", "_"))
		.style("display", "none")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

var data_lineplot = await d3.csv("assets/data/timeline_pub_"+type+".csv")
console.log(type, data_lineplot);


var timedata = data_lineplot.map(function(d) { 
	var dict = {}
	dict["date"] = d3.timeParse("%Y-%m")(d.date);
	publications.forEach(x => {dict[x.join(" ")] = d[x.join(" ")]});
	return dict;
})

svg.append("text")
		.attr("class", "y label")
		.attr("text-anchor", "end")
		.attr("y", 3)
		.attr("dy", "-4.5em")
		.attr("dx", "-5em")
		.style("font-size","60%")
		.attr("transform", "rotate(-90)")
		.text("popularity %");

var max_y = 0
publications.forEach(label => {
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
publications.forEach((label, i) => {
	svg.append("path")
		.datum(timedata)
		.attr("fill", "none")
		.attr("stroke", color(label))
		.attr("stroke-width", 1.5)
		.attr("class", "lineplot_pub_"+label.join("_"))
		.attr("opacity", "0")
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

	window.timeline_drawn = true;

	if(window.wcloud_drawn && window.chord_drawn && window.timeline_drawn && window.drawn_checkbox){
		import("./descbox.js").then((module) => {
		// Call the async function after import is resolved
		module.initdescbox();
		})
		.catch((error) => {
		console.error('Error occurred while importing module:', error);
		});
	}
}


window.highlight_source = function (x) {
	var a = d3.select(".lineplot_pub_"+x)
	d3.selectAll(".lineplot_pub_"+x)
		.transition()
		.style("opacity", "1")
	d3.select("#checkbox_label_"+x)
		.transition()
		.style("font-weight", "400")
	d3.select("#checkbox_label_after_"+x)
		.transition()
		.style("background-color", color(x))
}
window.unhighlight_source = function (x) {
	d3.selectAll(".lineplot_pub_"+x)
		.transition()
		.style("opacity", "0")
	d3.select("#checkbox_label_"+x)
		.transition()
		.style("font-weight", "200")
	d3.select("#checkbox_label_after_"+x)
		.transition()
		.style("background-color", "white")
}
