var descbox = document.getElementById("descbox")

var elements = document.querySelectorAll('.consp');

console.log(elements);

/*
TODO: Update this and use the actual dataset
*/
var consp_desc = {
    "0" : "<p>The <em>Chemtrails</em> conspiracy theory suggests that the condensation trails left behind by aircraft crossing the sky contain chemical and/or biological agents. Depending on the different nuances of the conspiracy theory, those agents can serve different purposes such as</p>\n<ul>\n<li>weather control,</li>\n<li>human population control, and</li>\n<li>chemical/biological warfare.</li>\n</ul>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory\" class=\"uri\">https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory</a></p>",
    "2" : "TEEESTESTSTEETS"
}

var fixed = false;

elements.forEach(function(element) {
  element.addEventListener('mouseover', handleMouseOver);
  element.addEventListener('mouseout', handleMouseOut);
  element.addEventListener('click', handleClick);
});



function handleMouseOver(event) {
    var consp_id = event.target.attributes.conspid.value;
		window.hover_chord(consp_id);
		window.hover_lineplot(consp_id);
    if(!fixed){
        var consp_id = event.target.attributes.conspid.value;
        console.log(event.target.attributes);
        console.log(consp_id);
        console.log(consp_desc[consp_id]);
        descbox.innerHTML = consp_desc[consp_id];
    }
}
function handleMouseOut(event) {
    if(!fixed){
        descbox.innerHTML = "";
    }
}
function handleClick(event) {
    fixed = true;
    var consp_id = event.target.attributes.conspid.value;
    console.log(event.target.attributes);
    console.log(consp_id);
    console.log(consp_desc[consp_id]);
    descbox.innerHTML = consp_desc[consp_id];
}



