export async function drawdescboxes(type){

    function getColumnSums(csvData) {
        var columnSums = {};
    
        // Get the column names from the first row of the CSV data
        var columnNames = Object.keys(csvData[0]);
    
        // Calculate the sum for each column
        columnNames.forEach(function(columnName) {
              var values = csvData.map(function(d) {
                  return +d[columnName];
                });
          var sum = d3.sum(values);
          columnSums[columnName] = sum;
        });
    
        return columnSums;
      }

    console.log("create description box: ", type);
    var data_lineplot = await d3.csv("assets/data/timeline.csv")
    var data = await d3.json("assets/data/dataset.json");
    var column2sums  = getColumnSums(data_lineplot);
    console.log("console2sums", column2sums);
    delete column2sums.date;
    var myWords = []
    var i = 0;
    for (var key in column2sums) {
        var obj = {};
        obj["word"] = key;
        obj["size"] = column2sums[key];
        obj["id"] = i;
        i = i+1;
        myWords.push(obj);
    }
    window.id2name = myWords;
    var desc_list = document.getElementById("consp_name");
    var overbox = document.getElementById("conp_overbox");
    desc_list.innerHTML = "";
    for (var i in myWords){
        var conspir = myWords[i];
        var content = document.createElement("p");
        content.classList.add("h4");
        content.classList.add("consp");
        content.classList.add("border-bottom")
        if(i == 0){
            content.classList.add("py-1")
        }
        content.setAttribute("conspid",i);
        content.style.color = color(conspir.word.split(" "));
        content.style.cursor = "pointer";
        console.log(conspir);
        content.innerText = conspir.word
        desc_list.append(content);
    }
    
    window.wcloud_drawn = true;

    if(window.wcloud_drawn && window.chord_drawn && window.timeline_drawn){
      console.log("wordcloud initdescbox");
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
        console.log(window.id2name, parseInt(index))
        consp_box.style.borderColor = color(window.id2name[parseInt(index)].word.split(" "));
    }

    window.click_conspbox = function(index){
        var consp_box = document.getElementById("conp_overbox");
        //consp_box.style.setProperty("border:color", color(index), "important");
        console.log(window.id2name, parseInt(index));
        //content.style.cssText += "border-color: " + color(conspir.word.split(" ")) + " !important;"
        consp_box.style.borderColor = color(window.id2name[parseInt(index)].word.split(" "));
    }

    window.unclick_conspbox = function(){
        var consp_box = document.getElementById("conp_overbox");
        //consp_box.style.setProperty("border:color", color(index), "important");
        console.log(window.id2name)
        consp_box.style.borderColor = "grey";
    }
    
    window.unhighlight_conspbox = function(){
        var consp_box = document.getElementById("conp_overbox");
        //consp_box.style.setProperty("border:color", color(index), "important");
        console.log(window.id2name)
        consp_box.style.borderColor = "grey";
    }
}