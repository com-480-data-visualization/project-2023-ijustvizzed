export async function initdescbox(){
    var descbox = document.getElementById("descbox")

    var defaultdescp = "<p>Hover over or click a conspiracy theory to highlight it and show it's description. To unhighlight a theory click anywhere else.</p>"

    descbox.innerHTML = defaultdescp;

    var elements = document.querySelectorAll('.consp');
    
    console.log("descbox:", elements);
    
    console.log(window.wcloud_drawn, window.chord_drawn, window.timeline_drawn);

    /*
    TODO: Update this and use the actual dataset
    */
    var consp_desc = {
        "0" : "<p>The <em>Chemtrails</em> conspiracy theory suggests that the condensation trails left behind by aircraft crossing the sky contain chemical and/or biological agents. Depending on the different nuances of the conspiracy theory, those agents can serve different purposes such as</p>\n<ul>\n<li>weather control,</li>\n<li>human population control, and</li>\n<li>chemical/biological warfare.</li>\n</ul>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory\" class=\"uri\">https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory</a></p>",
        "2" : "TEEESTESTSTEETS"
    }
    
    console.log("initdescbox", window);
    
    elements.forEach(function(element) {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
      element.addEventListener('click', handleClick);
    });
    
    window.onclick = function(event) {
        var targetElement = event.target;
        console.log('Clicked element:', targetElement);
        
        var consp_id = targetElement.attributes.conspid;
        console.log('Window clicked', consp_id);
        // Perform your desired actions here
        if(typeof consp_id === 'undefined'){
            window.fixed = false;
            descbox.innerHTML = defaultdescp;
            window.unhighlight_lineplot();
            window.unhighlight_chord();
            window.unclick_conspbox();
        }
      };

    
    function handleMouseOver(event) {
        var consp_id = event.target.attributes.conspid.value;
        if(!window.fixed){
            var consp_id = event.target.attributes.conspid.value;
            console.log(event.target.attributes);
            console.log(consp_id);
            console.log(consp_desc[consp_id]);
            descbox.innerHTML = consp_desc[consp_id];
            window.hover_chord(consp_id);
            window.hover_lineplot(consp_id);
            window.hover_conspbox(consp_id);
        }
    }
    function handleMouseOut(event) {
        if(!window.fixed){
            descbox.innerHTML = "";
            window.unhighlight_lineplot();
            window.unhighlight_chord();
            window.unhighlight_conspbox();
        }
    }
    function handleClick(event) {
        window.fixed = true;
        var consp_id = event.target.attributes.conspid.value;
        console.log(event.target.attributes);
        console.log(consp_id);
        console.log(consp_desc[consp_id]);
        descbox.innerHTML = consp_desc[consp_id];
        window.hover_chord(consp_id);
        window.hover_lineplot(consp_id);
        window.click_conspbox(consp_id);
    }
}




