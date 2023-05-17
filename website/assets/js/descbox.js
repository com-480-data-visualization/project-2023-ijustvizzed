var descbox = document.getElementById("descbox")

var elements = document.querySelectorAll('.consp');

var consp_desc = {
    "1" : "AFAFAFAFAFAFAF",
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
    console.log(event.target.attributes);
    console.log(consp_id);
    console.log(consp_desc[consp_id]);
    descbox.innerText = consp_desc[consp_id];
}
function handleMouseOut(event) {
    if(!fixed){
        descbox.innerText = "";
    }
}
function handleClick(event) {
    fixed = true;
    var consp_id = event.target.attributes.conspid.value;
    console.log(event.target.attributes);
    console.log(consp_id);
    console.log(consp_desc[consp_id]);
    descbox.innerText = consp_desc[consp_id];
}

