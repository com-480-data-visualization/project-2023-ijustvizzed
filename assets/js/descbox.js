export async function initdescbox(){
    var descbox = document.getElementById("descbox")

    var defaultdescp = "<p>Hover over or click a conspiracy theory to highlight it and show it's description. To unhighlight a theory click anywhere else.</p>"

    descbox.innerHTML = defaultdescp;

    var elements = document.querySelectorAll('.consp');

    document.getElementById("checkbox_washington_post").checked = true;
		document.getElementById("checkbox_cnbc").checked = true;
	  window.select_sources();
    
/*
TODO: Update this and use the actual dataset
*/
var consp_desc = {
	"0": "<p>The <em>Chemtrails</em> conspiracy theory falsely claims that the trails left behind by airplanes are deliberate chemical sprays used for undisclosed purposes, despite scientific consensus that they are simply contrails, composed of water vapor.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory\" class=\"uri\">https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory</a></p>",
	"1": "<p>The <em>Illuminati</em> conspiracy theory asserts that a secret society, often believed to consist of influential individuals, controls world events and manipulates governments and economies for their own agenda, despite no credible evidence supporting its existence.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Illuminati\" class=\"uri\">https://en.wikipedia.org/wiki/Illuminati</a></p>",
	"2": "<p>The <em>New World Order</em> conspiracy theory claims that a secretive global elite is working towards establishing a totalitarian world government that would control all aspects of society, despite no credible evidence supporting such a notion.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/New_World_Order_(conspiracy_theory)\" class=\"uri\">https://en.wikipedia.org/wiki/New_World_Order_(conspiracy_theory)</a></p>",
    "3": "<p>The <em>Soros</em> conspiracy theory falsely alleges that billionaire philanthropist George Soros is orchestrating various global events and manipulating governments and economies for his personal gain, despite lacking credible evidence and being rooted in prejudice.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/George_Soros_conspiracy_theories\" class=\"uri\">https://en.wikipedia.org/wiki/George_Soros_conspiracy_theories</a></p>",
    "4": "<p>Many conspiracy theories spread <em>antisemitic</em> beliefs. In the context of modern conspiracy theories, antisemitism often manifests through the propagation of conspiratorial beliefs that falsely blame Jews for controlling world events, manipulating economies, or orchestrating global crises.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Antisemitism\" class=\"uri\">https://en.wikipedia.org/wiki/Antisemitism</a></p>",
    "5": "<p>Conspiracy theories around <em>Obama</em> include false claims such as his alleged birthplace being outside the United States, his secret Muslim identity, and accusations of him orchestrating various nefarious agendas during his presidency, which lack credible evidence.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Category:Conspiracy_theories_regarding_Barack_Obama\" class=\"uri\">https://en.wikipedia.org/wiki/Category:Conspiracy_theories_regarding_Barack_Obama</a></p>",
    "6": "<p>Conspiracy theories around <em>Kamala Harris</em> include unfounded claims such as her alleged ineligibility for the Vice Presidency due to her parent's immigration status, false connections to globalist agendas, and baseless accusations of involvement in deep state activities or radical left-wing ideologies.</p>\n<p>More information: <a href=\"https://www.bbc.com/news/53826816\" class=\"uri\">https://www.bbc.com/news/53826816</a></p>",
    "7": "<p>Conspiracy theories around the <em>moon landing</em> falsely assert that the Apollo moon landings were staged or faked by the United States government, despite overwhelming evidence confirming their authenticity and scientific achievement.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Moon_landing_conspiracy_theories\" class=\"uri\">https://en.wikipedia.org/wiki/Moon_landing_conspiracy_theories</a></p>",
    "8": "<p>Conspiracy theories around the <em>coronavirus</em> include unfounded claims such as the virus being intentionally created as a bioweapon, 5G technology causing the spread of the virus, or it being a hoax or exaggerated threat, despite scientific consensus and evidence pointing to its natural origins and the severity of the global pandemic.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/COVID-19_misinformation\" class=\"uri\">https://en.wikipedia.org/wiki/COVID-19_misinformation</a></p>"
}
    
    
    elements.forEach(function(element) {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
      element.addEventListener('click', handleClick);
    });
    
    window.onclick = function(event) {
        var targetElement = event.target;
        
        var consp_id = targetElement.attributes.conspid;
        var id = targetElement.id;
        console.log(id);
        if(id == 'source_selector' || id == 'publications_box' || id.includes('checkbox')){
            return;
        }
        // Perform your desired actions here
        if(typeof consp_id === 'undefined'){
            window.fixed = false;
            descbox.innerHTML = defaultdescp;
            window.unhighlight_lineplot();
            window.unhighlight_chord();
            window.unclick_conspbox();
            // window.unshow_comp_lineplot();
        }
      };

    
    function handleMouseOver(event) {
        var consp_id = event.target.attributes.conspid.value;
        if(!window.fixed){
            var consp_id = event.target.attributes.conspid.value;
            descbox.innerHTML = consp_desc[consp_id];
            window.hover_chord(consp_id);
            window.hover_lineplot(consp_id);
            window.hover_conspbox(consp_id);
					  for (var x in data['labels']) {
							var type = data['labels'][x].join(" ");
							document.getElementById("lineplotsvg_pub_"+type.replaceAll(" ", "_")).style.display = "none";
						}
						var type = data['labels'][consp_id].join(" ");
					  document.getElementById("lineplotsvg_pub_"+type.replaceAll(" ", "_")).style.display = "block";
        }
    }
    function handleMouseOut(event) {
        if(!window.fixed){
            descbox.innerHTML = "";
            window.unhighlight_lineplot();
            window.unhighlight_chord();
            window.unhighlight_conspbox();
            // window.unshow_comp_lineplot(consp_id);
        }
    }
    function handleClick(event) {
        window.fixed = true;
        var consp_id = event.target.attributes.conspid.value;
        descbox.innerHTML = consp_desc[consp_id];
        window.hover_chord(consp_id);
        window.hover_lineplot(consp_id);
        window.click_conspbox(consp_id);
        for (var x in data['labels']) {
            var type = data['labels'][x].join(" ");
            document.getElementById("lineplotsvg_pub_"+type.replaceAll(" ", "_")).style.display = "none";
        }
        var type = data['labels'][consp_id].join(" ");
      document.getElementById("lineplotsvg_pub_"+type.replaceAll(" ", "_")).style.display = "block";
        // window.show_comp_lineplot(consp_id);
    }
}




