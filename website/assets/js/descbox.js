export async function initdescbox(){
    var descbox = document.getElementById("descbox")

    var defaultdescp = "<p>Hover over or click a conspiracy theory to highlight it and show it's description. To unhighlight a theory click anywhere else.</p>"

    descbox.innerHTML = defaultdescp;

    var elements = document.querySelectorAll('.consp');
    
    
/*
TODO: Update this and use the actual dataset
*/
var consp_desc = {
	"0": "<p>There are multiple conspiracy theories ranking around the <a href=\"https://en.wikipedia.org/wiki/September_11_attacks\">2001 9/11</a> terrorist attacks where Al-Qaeda operatives crashed hijacked planes into the World Trade Center twin towers in New York City and the Pentagon in Washington, D.C. These theories include, among others,</p>\n<ul>\n<li>foreknowledge by official authorities and stock traders,</li>\n<li>an inside job based on the claim that the impact of the planes alone could not have caused a collapse of the World Trade Center twin towers,</li>\n<li>the involvement of foreign governments such as the Israeli or Saudi-Arabian governments, and</li>\n<li>staging of the attacks by the US government to provide the government with arguments for the following invasions of Iraq and Afghanistan.</li>\n</ul>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/9/11_conspiracy_theories\" class=\"uri\">https://en.wikipedia.org/wiki/9/11_conspiracy_theories</a></p>",
	"1": "<p>The <em>Chemtrails</em> conspiracy theory suggests that the condensation trails left behind by aircraft crossing the sky contain chemical and/or biological agents. Depending on the different nuances of the conspiracy theory, those agents can serve different purposes such as</p>\n<ul>\n<li>weather control,</li>\n<li>human population control, and</li>\n<li>chemical/biological warfare.</li>\n</ul>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory\" class=\"uri\">https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory</a></p>",
	"2": "<p>The <em>Citizenship</em> conspiracy theories affect multiple people, mainly former US President <a href=\"https://en.wikipedia.org/wiki/Barack_Obama\">Barack Obama</a> and current US Vice President <a href=\"https://en.wikipedia.org/wiki/Kamala_Harris\">Kamala Harris</a>. Those conspiracy theories claim that the aforementioned US government officials could have never gotten into office because they do not have the citizenship of the United States of America. The <em>Birther</em> theories hypothesize that Obama was not actually born in the US and that Harris does not posess the US citizenship due to her parents being non-citizen immigrants at the time of birth.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Barack_Obama_citizenship_conspiracy_theories\" class=\"uri\">https://en.wikipedia.org/wiki/Barack_Obama_citizenship_conspiracy_theories</a></p>",
	"3": "<p>The <a href=\"https://en.wikipedia.org/wiki/COVID-19_pandemic\"><em>COVID-19</em> pandemic</a> starting in late 2019/early 2020 has caused political actors (both political activists and government officials) world-wide to spread a plethora of conspiracy theories.</p>\n<p>These conspiracy theories include, among others,</p>\n<ul>\n<li>the accidental release of a bio-weapon,</li>\n<li>population control by global elites (see also: New World Order),</li>\n<li>accusation of religious minorities such as Jews or Muslims for spreading COVID-19,</li>\n<li>5G mobile networks causing COVID-19,</li>\n<li>systematic overcounting of death counts,</li>\n<li>vaccines causing mutations in human DNA, and</li>\n<li>vaccines against COVID-19 containing tracking agents.</li>\n</ul>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/COVID-19_misinformation\" class=\"uri\">https://en.wikipedia.org/wiki/COVID-19_misinformation</a></p>",
	"4": "<p>The <em>New World Order</em> conspiracy theory implies the existence of a secretive totalitarion world government run by a hidden world elite. According to the conspiracy theory, existing governments are only the representatives of this world government and to not actually take sovereign decisions.</p>\n<p>The secret world government is often tied to secret societies like Freemasonry or the Illuminati. Additionally, the Great Reset is often referred to as one of the secret plans of this allegedly ruling world government.</p>\n<p>Individuals often tied to conspiracy theories ranking around the New World Order are <a href=\"https://en.wikipedia.org/wiki/Bill_Gates\">Bill Gates</a> or <a href=\"https://en.wikipedia.org/wiki/George_Soros\">George Soros</a>. Conspiracy theorists also regularly link them with the COVID-19 pandemic and related conspiracy theories.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/New_World_Order_(conspiracy_theory)\" class=\"uri\">https://en.wikipedia.org/wiki/New_World_Order_(conspiracy_theory)</a></p>",
	"5": "<p><em>Stop the Steal</em> (also referred to as the <em>Big Lie</em> by opponents to the theory) is a conspiracy theory heavily promoted by Donald Trump after the 2020 US presidential election. The theory claims widespread election fraud to the advantage of Joe Biden, finally leading to Donald Trump’s loss of the election. The spread of this conspiracy theory among right-wing extremists culminated in the attack on the Capitol on January 06 2021 where rioters tried to interrupt the Congressional proceedings confirming Joe Biden’s success in the presidential election.</p>\n<p>More information: <a href=\"https://en.wikipedia.org/wiki/Attempts_to_overturn_the_2020_United_States_presidential_election\" class=\"uri\">https://en.wikipedia.org/wiki/Attempts_to_overturn_the_2020_United_States_presidential_election</a></p>"
}

    
    
    elements.forEach(function(element) {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
      element.addEventListener('click', handleClick);
    });
    
    window.onclick = function(event) {
        var targetElement = event.target;
        
        var consp_id = targetElement.attributes.conspid;
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




