export async function d3drawchord(){
var chord = d3.chordDirected()
	.padAngle(12 / innerRadius)
	.sortSubgroups(d3.descending)
	.sortChords(d3.descending)

const chords = chord(matrix);

var arc = d3.arc()
	.innerRadius(innerRadius)
	.outerRadius(outerRadius)

var ribbon = d3.ribbon()
	.radius(innerRadius - 0.5)
	.padAngle(1 / innerRadius)

const textId_id = "mytext";
const textId_href = "#mytext";

// null out the html 
d3.select("#ohwow").html(null)

var svg = d3.create("svg")
	.attr("id", "chord_diagram")
	.attr("viewBox", [-width / 2, -height / 2, width, height]);

svg.append("path")
		.attr("id", textId_id)
		.attr("fill", "none")
		.attr("d", d3.arc()({outerRadius: textRadius, startAngle: 0, endAngle: 2 * Math.PI}));

window.hover_chord = function(index) {
	svg = d3.select("#chord_diagram")
	d3.select("#chords").selectAll("path")
		.transition()
		.style("fill", "black")
		.style("fill-opacity", "0.25")
		.style("opacity", "0.25")
	d3.select("#chords").selectAll(".chord_source"+index)
		.transition()
		.style("fill", color(data["labels"][index]))
		.style("fill-opacity", "0.9")
		.style("opacity", "0.9")
	d3.select("#chords").selectAll(".chord_target"+index)
		.transition()
		.style("fill", color(data["labels"][index]))
		.style("fill-opacity", "0.9")
		.style("opacity", "0.9")
};

window.unhighlight_chord = function(index) {
	svg = d3.select("#chord_diagram")
	d3.select("#chords").selectAll("path")
		.transition()
		.style("fill", "black")
		.style("fill-opacity", "0.25")
		.style("opacity", "0.25")
};

svg.append("g")
		.attr("id", "chords")
		.attr("fill-opacity", 0.25)
	.selectAll("g")
	.data(chords)
	.join("path")
		.attr("class", d => "chord_source"+d.source.index+" chord_target"+d.target.index)
		.attr("d", ribbon)
		.attr("fill", d => color(data["labels"][d.source.index]))
		//.style("mix-blend-mode", "normal")
	.append("title")
		.text(d => `${data["labels"][d.source.index]} believes also in ${data["labels"][d.target.index]} ${formatValue(d.source.value)}`);


svg.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 15)
	.selectAll("g")
	.data(chords.groups)
	.join("g")
		.call(g => g.append("path")
			.attr("d", arc)
			.attr("fill", d => color(data["labels"][d.index]))
			.attr("stroke", "#fff"))
		.call(g => g.append("text")
			.attr("dy", -3)
		.append("textPath")
			.attr("href", textId_href)
			.attr("startOffset", d => d.startAngle * outerRadius)
			.text(d => data["labels"][d.index].join(" ")))
		.call(g => g.append("title")
			.text(d => `${data["labels"][d.index]}
			believes ${formatValue(d3.sum(matrix[d.index]))}
			is believed ${formatValue(d3.sum(matrix, row => row[d.index]))}`));


var arc = d3.arc().innerRadius(0).outerRadius(outerRadius);
var pie = d3.pie()(data)

svg.append("g")
	.selectAll("g")
	.data(chords.groups)
	.join("path")
		.attr("fill", (data, i) => { return d3.schemeSet3[i]; })
		.attr("opacity", "0")
		.attr("d", arc)
		.attr("class", "consp")
		.attr("conspid", (data, i) => i)

document.getElementById("ohwow").appendChild(svg.node());
window.chord_drawn = true;

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
