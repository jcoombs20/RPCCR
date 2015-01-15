function getAreaUnits() {
	document.getElementById("download").style.visibility = "hidden";
	document.getElementById("idLayerList").style.visibility = "hidden";
	document.getElementById("selLayerList").style.visibility = "hidden";
	document.getElementById("riparian").style.visibility = "hidden";
	document.getElementById("coords").style.visibility = "hidden";

	DADiv = document.getElementById("drain_area");
	if (DADiv.style.visibility == "visible") {
		DADiv.style.visibility = "hidden";
		return;
		}
	if (DADiv.childNodes.length == 0) {
		DADiv.style.padding = "0px";
		DADiv.style.margin = "0px";
		tmpExit = document.createElement("img");
		tmpExit.src = "Images/exit2_small.png";
		tmpExit.title = "Click to close";
		tmpExit.setAttribute("onclick", "hide_reset()");
		tmpExit.id = "DAExit";
		tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
		tmpExit.style.cssFloat = "right";
		tmpExit.style.margin = "2px";
		DADiv.appendChild(tmpExit);

		tmpHelp = document.createElement("img");
		tmpHelp.src = "Images/help-small.png";
		tmpHelp.title = "Click to show information about this tool";
		tmpHelp.id = "drainHelp";
		tmpHelp.setAttribute("onclick", "loadHelp(this.id)");
		tmpHelp.setAttribute("onmouseover", "selCursor(this.id)");
		tmpHelp.style.cssFloat = "right";
		tmpHelp.style.margin = "2px";
		DADiv.appendChild(tmpHelp);

		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		DADiv.appendChild(breakP);

		tmpHeader = document.createElement("p");
		tmpHeader.id = "DAHeader";
		tmpHeader.style.margin = "5px";
		tmpHeader.style.textAlign = "center";
		tmpHeader.innerHTML = "Select Area Units";
		DADiv.appendChild(tmpHeader);

		DABar = document.createElement("hr");
		DADiv.appendChild(DABar);

		unitLabel = document.createElement("label");
		unitLabel.innerHTML = "Unit:";
		unitLabel.style.margin = "5px";
		DADiv.appendChild(unitLabel);

		DAUnits = document.createElement("select");
		DAUnits.multiple = false;
		DAUnits.name = "unitSel";
		DAUnits.id = "DAUnits";
		DAUnits.style.margin = "5px";
		for (var i=0; i<6; i++) {
			DAUnitsOpt = document.createElement("option");
			DAUnitsOpt.value = i;
			DAUnitsOpt.id = "DAUnitsOpt" + i;
			switch(i) {
				case 0:
 					DAUnitsOpt.innerHTML = "Kilometers";
  					break;
				case 1:
 					DAUnitsOpt.innerHTML = "Hectares";
  					break;
				case 2:
 					DAUnitsOpt.innerHTML = "Meters";
  					break;
				case 3:
 					DAUnitsOpt.innerHTML = "Miles";
  					break;
				case 4:
 					DAUnitsOpt.innerHTML = "Acres";
  					break;
				case 5:
 					DAUnitsOpt.innerHTML = "Feet";
  					break;
				}
			DAUnits.appendChild(DAUnitsOpt);
			}
		DADiv.appendChild(DAUnits);
		DAUnits.selectedIndex = 0;

		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		DADiv.appendChild(breakP);

		DABut = document.createElement("button");
		DABut.setAttribute("onclick", "setAreaUnits()");
		DABut.innerHTML = "Select Unit";
		DABut.style.height = "auto";
		DABut.style.width = "auto";
		DABut.style.marginBottom = "5px";
		DADiv.appendChild(DABut);

		DABut.style.marginLeft = (DADiv.offsetWidth - DABut.offsetWidth) / 2 + "px";
		}
	panel = document.getElementById("controlPanel");
	x = panel.childNodes;
	xx = x[17];
	x = xx.getBoundingClientRect();
	DADiv.style.left = x.left + "px";
	DADiv.style.top = x.bottom + "px";
	DADiv.style.borderRadius = "0px 10px 10px 10px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (DADiv.offsetLeft + DADiv.offsetWidth > w) {
		DADiv.style.left = w - DADiv.offsetWidth + "px";
		}
	DADiv.style.visibility = "visible";
	}

function setAreaUnits() {
	document.getElementById("drain_area").style.visibility = "hidden";
	daIndex = document.getElementById("DAUnits").selectedIndex;
	extPanel.activateControl(drainArea);
	}

function hide_reset() {
	document.getElementById("drain_area").style.visibility = 'hidden'
	document.getElementById("DAUnits").selectedIndex = daIndex;
	}

function DAReg() {
	drainArea.events.register("click", map, function(e) {
		alert(e.xy);
		});
	}

function show_area(tmpData) {
	saDiv = document.getElementById("show_area");
				
	for (var i=saDiv.childNodes.length - 1; i>=0; i--) {
		saDiv.removeChild(saDiv.childNodes[i]);
		}
	saDiv.style.padding = "0px";
	saExit = document.createElement("img");
	saExit.src = "Images/exit2_small.png";
	saExit.title = "Click to close";
	saExit.setAttribute("onclick", "document.getElementById('show_area').style.visibility = 'hidden'");
	saExit.id = "saExit";
	saExit.setAttribute("onmouseover", "selCursor(this.id)");
	saExit.style.position = "absolute";
	saExit.style.right = "0px";
	saExit.style.top = "0px";
	saExit.style.margin = "2px";
	saDiv.appendChild(saExit);
	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	saDiv.appendChild(breakP);
	saHeader = document.createElement("h3");
	saHeader.id = "saHeader";
	saHeader.style.margin = "5px";
	saHeader.style.textAlign = "center";
	saHeader.innerHTML = "Drainage Calculator";
	saDiv.appendChild(saHeader);
	saBar = document.createElement("hr");
	saDiv.appendChild(saBar);
	saPoint = document.createElement("h4");
	saPoint.style.margin = "5px";
	saPoint.style.textAlign = "center";
	saPoint.innerHTML = "Point";
	saDiv.appendChild(saPoint);
	saInpPoint = document.createElement("input");
	saInpPoint.setAttribute("type", "text");
	saInpPoint.setAttribute("onclick", "this.select()");
	saInpPoint.id = "saInp";
	saInpPoint.name = "saInp";
	saInpPoint.value = tmpLon4326.toFixed(4) + ", " + tmpLat4326.toFixed(4);
	saInpPoint.style.margin = "5px";
	saInpPoint.readOnly = "true";
	saDiv.appendChild(saInpPoint);
	saArea = document.createElement("h4");
	saArea.style.margin = "5px";
	saArea.style.textAlign = "center";
	saArea.innerHTML = "Area";
	saDiv.appendChild(saArea);
	saInpArea = document.createElement("input");
	saInpArea.setAttribute("type", "text");
	saInpArea.setAttribute("onclick", "this.select()");
	saInpArea.id = "saInp";
	saInpArea.name = "saInp";
	if (tmpData == "Outside EBTJV Range") {
		saInpArea.value = "Outside EBTJV Range";
		}
	else {
		saInpArea.value = tmpData + " " + document.getElementById("DAUnitsOpt" + daIndex).innerHTML;
		}
	saInpArea.style.margin = "5px";
	saInpArea.readOnly = "true";
	saDiv.appendChild(saInpArea);
	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	saDiv.appendChild(breakP);
	saInpPoint.size = Math.max(saInpPoint.value.length, saInpArea.value.length) + 2;
	saInpArea.size = Math.max(saInpPoint.value.length, saInpArea.value.length) + 2;
	saInpPoint.style.marginLeft = (saDiv.offsetWidth - saInpPoint.offsetWidth)/2 + "px";
	saInpArea.style.marginLeft = (saDiv.offsetWidth - saInpArea.offsetWidth)/2 + "px";		
	saDiv.style.visibility = "visible";
	}
