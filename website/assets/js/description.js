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
        if(x == 0){
            content.classList.add("py-1");
        }
        content.setAttribute("conspid",x);
        content.style.color = color(type.split(" "));
        content.style.cursor = "pointer";
        content.innerText = type;
        desc_list.append(content);
    }
    
    window.wcloud_drawn = true;

    if(window.wcloud_drawn && window.chord_drawn && window.timeline_drawn){
      import("./descbox.js").then((module) => {
        // Call the async function after import is resolved
        module.initdescbox();
        })
        .catch((error) => {
        console.error('Error occurred while importing module:', error);
        });
    }

    window.hover_conspbox = function(index){
        var consp_box = document.getElementById("conp_overbox");
        //consp_box.style.setProperty("border:color", color(index), "important");
        consp_box.style.borderColor = color(window.id2name[parseInt(index)].split(" "));
    }

    window.click_conspbox = function(index){
        var consp_box = document.getElementById("conp_overbox");
        console.log(consp_box.style);
        //consp_box.style.setProperty("border:color", color(index), "important");
        //content.style.cssText += "border-color: " + color(conspir.word.split(" ")) + " !important;"
        consp_box.style.borderColor = color(window.id2name[parseInt(index)].split(" "));
    }

    window.unclick_conspbox = function(){
        var consp_box = document.getElementById("conp_overbox");
        //consp_box.style.setProperty("border:color", color(index), "important");
        consp_box.style.borderColor = "grey";
    }
    
    window.unhighlight_conspbox = function(){
        var consp_box = document.getElementById("conp_overbox");
        //consp_box.style.setProperty("border:color", color(index), "important");
        consp_box.style.borderColor = "grey";
    }
}
