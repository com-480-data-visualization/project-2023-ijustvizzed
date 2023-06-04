export async function drawdescboxes(){

    var data = await d3.json("assets/data/dataset.json");
    var desc_list = document.getElementById("consp_name");
    window.id2name = [];
    for (var x in data['labels']) {
        var type = data['labels'][x].join(" ");
        window.id2name.push(type);
        var content = document.createElement("p");
        content.classList.add("h4");
        content.classList.add("consp");
        content.classList.add("border-bottom");
        content.setAttribute("conspid",x);
        content.style.color = "grey";
        content.style.cursor = "pointer";
				content.style.fontWeight = "100";
				if(x == 0){
						content.classList.add("py-1");
						content.style.color = color(type.split(" "));
						content.style.fontWeight = "400";
				}
        content.innerText = type;
        desc_list.append(content);
    }
    
    window.wcloud_drawn = true;

    if(window.wcloud_drawn && window.chord_drawn && window.timeline_drawn && window.drawn_checkbox){
		import("./descbox.js").then((module) => {
		// Call the async function after import is resolved
		module.initdescbox();
		})
		.catch((error) => {
		console.error('Error occurred while importing module:', error);
		});
	}

		function colorize(index) {
			for (var x in data['labels']) {
				var p = d3.select("#consp_name p:nth-child("+((x|0)+1)+")")
				if (x == (index|0)) {
					var type = data['labels'][index].join(" ");
					p.transition()
						.duration(100)
						.style("color", color(type.split(" ")))
						.style("font-weight", "400")
				} else {
					p.transition()
						.duration(100)
						.style("color", "grey")
						.style("font-weight", "100")
				}
			}
		}

    window.hover_conspbox = function(index){
        var consp_box = document.getElementById("descbox");
        consp_box.style.borderColor = color(window.id2name[parseInt(index)].split(" "));
				colorize(index);
    }

    window.click_conspbox = function(index){
        var consp_box = document.getElementById("descbox");
        console.log(consp_box.style);
        consp_box.style.borderColor = color(window.id2name[parseInt(index)].split(" "));
				colorize(index);
    }

    window.unclick_conspbox = function(){
        var consp_box = document.getElementById("conp_overbox");
        consp_box.style.borderColor = "grey";
				colorize(20);
    }
    
    window.unhighlight_conspbox = function(){
        var consp_box = document.getElementById("conp_overbox");
        consp_box.style.borderColor = "grey";
				colorize(20);
    }
}
