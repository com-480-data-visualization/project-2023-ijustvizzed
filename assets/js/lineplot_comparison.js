export async function init_lineplot_comp(){
    /*
    The radio buttons in conspiracy_selector select which conspiracy to view
    when clicking this, the svg displayed will switch to the corresponding conspiracy
    Each line of the svg will identify a source
    The selector buttons at the bottom allow selecting which timeline is displayed (from which source)
    */

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
    
    var data_lineplot = await d3.csv("assets/data/timeline.csv");
    var column2sums  = getColumnSums(data_lineplot);
    console.log("console2sums", column2sums);
    delete column2sums.date;
    /*
    Need to adjust the proportions of this
    */

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
    
    // draw the radios at the side of the lineplot
    /*
    <div class="form-check">
		<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
		<label class="form-check-label" for="exampleRadios1">
			 Default radio
		</label>
	</div>
    */
   /*
    var radiodiv = document.getElementById("conspiracy_selector");
    for(var i in myWords){
        var conspir = myWords[i];
        var newDiv = document.createElement("div");
        newDiv.classList.add("form-check");
        var inp = document.createElement("input");
        inp.classList.add("form-check-input");
        inp.type = "radio";
        inp.name = "consp_radio";
        inp.value = conspir.word;
        inp.id = "radio_" + conspir.word;
        var lbl = document.createElement("label");
        lbl.classList.add("form-check-label");
        lbl.htmlFor = "radio_" + conspir.word;
        lbl.textContent = conspir.word;
        newDiv.appendChild(inp);
        newDiv.appendChild(lbl);
        radiodiv.appendChild(newDiv);
    }
    */
    /*
    <div class="form-check form-check-inline">
		<input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
		<label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
	 </div>    
    */
    // draw selector buttons at the bottom
		var sources = ["infowars", "axios", "cnbc", "cnn", "economist", "mashable", "politico", "reuters", "techcrunch", "the hill", "the new york times", "the verge", "vice", "vox", "washington post", "wired"]

    var selectordiv = document.getElementById("source_selector");
    for(var i in sources){
        var src = sources[i];
        var newDiv = document.createElement("div");
        newDiv.classList.add("form-check");
        newDiv.classList.add("form-check-inline");
        var inp = document.createElement("input");
        inp.classList.add("form-check-input");
        inp.type = "checkbox";
		src = src.replaceAll(" ", "_")
        inp.id = "checkbox_" + src;
        inp.addEventListener("input", select_sources);
        var lbl = document.createElement("label");
		lbl.id = "checkbox_label_" + src;
        lbl.classList.add("form-check-label");
        lbl.htmlFor = "checkbox_" + src;
        if(src == "infowars"){
            var boldElement = document.createElement('b');
            boldElement.textContent = src;
            lbl.appendChild(boldElement);
        }else{
            lbl.textContent = src;
        }
        lbl.textContent = src;
		var lbl_after = document.createElement("label");
		lbl_after.id = "checkbox_label_after_" + src;
        newDiv.appendChild(inp);
        newDiv.appendChild(lbl);
		lbl.appendChild(lbl_after);
        selectordiv.appendChild(newDiv);

		var style = document.createElement("style");
		var css = "#checkbox_label_"+src+" {font-weight: 200; position: relative; display: inline-block } \n    #checkbox_label_after_"+src+" { content: ''; position: absolute; left: 0; bottom: -1px; width: 100%; height: 2px; background-color: "+color(src)+"; }";
		style.textContent = css;
		document.body.appendChild(style);
    }

    choose_conspiracy();

    window.drawn_checkbox = true;

    window.choose_conspiracy = choose_conspiracy;
    window.select_sources = select_sources;

    if(window.wcloud_drawn && window.chord_drawn && window.timeline_drawn && window.drawn_checkbox){
		import("./descbox.js").then((module) => {
		// Call the async function after import is resolved
		module.initdescbox();
		})
		.catch((error) => {
		console.error('Error occurred while importing module:', error);
		});
	}

    function choose_conspiracy(){
        // iterate over radio buttons and for the checked draw the lineplot for that conspiracy


        select_sources();

    }

    function select_sources(){
        // unhighlihgt all timelines
        for(var i in sources){
						src = sources[i].replaceAll(" ", "_")
            var sel = document.getElementById("checkbox_" + src);
            if(sel.checked){
                // highlight the line on the thingy => @Luca need a function in window that highlights/unhighlights a timeline
                window.highlight_source(src);
            } else {
                window.unhighlight_source(src);
            }
        }
    }
}
