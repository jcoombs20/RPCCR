function layerSwitch(element, layerID) {
	tmpLayers = map.layers;
	for (var i=0; i<tmpLayers.length; i++) {
		if (tmpLayers[i].name == layerID) {
			tmpLayers[i].setVisibility(element.checked);
			break;
			}
		}
	}

function imageVis(tmpNode) {
	tmpEl = document.getElementById("formImg"+tmpNode);
	if (tmpEl.style.display == "none") {
		document.getElementById("expand"+tmpNode).src = "Images/expand_minus.png";
		document.getElementById("expand"+tmpNode).title = "Click to hide legend";
		tmpEl.style.display = "inline";
		}
	else {
		document.getElementById("expand"+tmpNode).src = "Images/expand_plus.png";
		document.getElementById("expand"+tmpNode).title = "Click to show legend";
		tmpEl.style.display = "none";
		}
	}

function loadOpacity(tmpID) {
	opVal = tmpID
	tmpLayers = map.layers;
	tmpDiv = document.getElementById("opacity");
	if (tmpDiv.childNodes.length == 3) {
		tmpDiv.style.paddingTop = "1px";
		tmpExit = document.createElement("img");
		tmpExit.src = "Images/exit2_small.png";
		tmpExit.title = "Click to close";
		tmpExit.setAttribute("onclick", "hideOpacity()");
		tmpExit.id = "opacityExit";
		tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
		tmpExit.style.cssFloat = "right";
		tmpExit.style.margin = "2px";
		tmpDiv.appendChild(tmpExit);
		tmpHeader = document.createElement("p");
		tmpHeader.id = "opacityLayer";
		tmpHeader.style.margin = "5px";
		tmpHeader.style.textAlign = "center";
		tmpDiv.appendChild(tmpHeader);
		tmp0 = document.createElement("label");
		tmp0.innerHTML = "0%";
		tmp0.style.margin = "5px";
		tmpDiv.appendChild(tmp0);
		tmpSlider = document.createElement("input");
		tmpSlider.setAttribute("type", "range");
		tmpSlider.id = "slider";
		tmpSlider.setAttribute("onmouseover", "selCursor(this.id)");
		tmpSlider.setAttribute("min", "0");
		tmpSlider.setAttribute("max", "100");
		tmpSlider.setAttribute("step", "1");
		tmpSlider.setAttribute("onmouseup", "setOpacity()");
		tmpSlider.title = tmpSlider.value;
		tmpDiv.appendChild(tmpSlider);
		tmp100 = document.createElement("label");
		tmp100.innerHTML = "100%";
		tmp100.style.margin = "5px";
		tmpDiv.appendChild(tmp100);
		}
	tmpHeader = document.getElementById("opacityLayer");
	tmpHeader.innerHTML = "<br>" + tmpLayers[opVal].name + " Opacity" + "<br>";
	tmpSlider = document.getElementById("slider");
	tmpSlider.value = tmpLayers[opVal].opacity * 100;
	tmpSlider.title = tmpSlider.value;
	box = document.getElementById("formTransparency" + opVal);
	tmpDiv.style.top = box.offsetTop + box.offsetHeight + "px";
	tmpDiv.style.left = box.offsetLeft + box.offsetWidth + "px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	if (tmpDiv.offsetTop + tmpDiv.offsetHeight > h) {
		tmpDiv.style.top = h - tmpDiv.offsetHeight + "px";
		}
	tmpDiv.style.visibility = "visible";
	}

function hideOpacity() {
	document.getElementById("opacity").style.visibility = "hidden";
	}

function setOpacity() {
	tmpLayers = map.layers;
	tmpLayers[opVal].setOpacity(tmpSlider.value/100);
	tmpSlider.title = tmpSlider.value;
	}

function selCursor(cursorEl) {
	document.getElementById(cursorEl).style.cursor = "pointer";
	}

function allowDrop(ev) {
	ev.preventDefault();
	if (ev.target.id.substring(0,7) == "formDiv") {
		ev.target.style.backgroundColor = "#fffaaa";
		ev.target.style.borderTop = "2px solid black";
		}
	else if (ev.target.parentNode.id.substring(0,7) == "formDiv") {
		ev.target.parentNode.style.backgroundColor = "#fffaaa";
		ev.target.parentNode.style.borderTop = "2px solid black";
		}
	}

function leaveDrop(ev) {
	try {
		ev.preventDefault();
		if (ev.target.id.substring(0,7) == "formDiv") {
			ev.target.style.backgroundColor = "transparent";
			ev.target.style.borderTop = "0px solid transparent";
			}
		else if (ev.target.parentNode.id.substring(0,7) == "formDiv") {
			ev.target.parentNode.style.backgroundColor = "transparent";
			ev.target.style.parentNode.borderTop = "0px solid transparent";
			}
		else {
			legDiv = document.getElementById("legend");
			for (var i=0; i<legDiv.childNodes.length; i++) {
				legDiv.childNodes[i].style.backgroundColor = "transparent";
				legDiv.childNodes[i].style.borderTop = "0px solid transparent";
				}
			}
		}
	catch(err) {
		legDiv = document.getElementById("legend");
		for (var i=0; i<legDiv.childNodes.length; i++) {
			legDiv.childNodes[i].style.backgroundColor = "transparent";
			legDiv.childNodes[i].style.borderTop = "0px solid transparent";
			}
		}
	}

function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
	}

function drop(ev) {
	ev.preventDefault();
	data = ev.dataTransfer.getData("Text");
	dropper = document.getElementById(data);
	legDiv = document.getElementById("legend");

	if (ev.target.id.substring(0,7) == "formDiv") {
		for (var i=0; i<legDiv.childNodes.length; i++) {
			if (ev.target.id == legDiv.childNodes[i].id) {
				newI = i;
				}
			if (dropper.id == legDiv.childNodes[i].id) {
				oldI = i;
				}
			}
		if (newI > 3) {
			legDiv.insertBefore(dropper, legDiv.childNodes[newI]);
			}
		}
	else if (ev.target.parentNode.id.substring(0,7) == "formDiv") {
		for (var i=0; i<legDiv.childNodes.length; i++) {
			if (ev.target.parentNode.id == legDiv.childNodes[i].id) {
				newI = i;
				}
			if (dropper.id == legDiv.childNodes[i].id) {
				oldI = i;
				}
			}
		if (newI > 3) {
			legDiv.insertBefore(dropper, legDiv.childNodes[newI]);
			}
		}
	
	for (var i=0; i<legDiv.childNodes.length; i++) {
		legDiv.childNodes[i].style.backgroundColor = "transparent";
		legDiv.childNodes[i].style.borderTop = "0px solid transparent";
		}
	moveLayer(newI-2, oldI-2);
	}

function moveLayer(newI, oldI) {
	tmpLayers = map.layers
	if (newI < oldI) {
		map.setLayerIndex(tmpLayers[oldI],newI);
		holdLV = layerVar[oldI];
		holdNS = layerNS[oldI];
		holdLT = layerType[oldI];
		holdLS = legSpec[oldI];
		holdLD = layerDescription[oldI];

		for (var i=oldI; i>newI; i--) {
			layerVar[i] = layerVar[i-1];
			layerNS[i] = layerNS[i-1];
			layerType[i] = layerType[i-1];
			legSpec[i] = legSpec[i-1];
			layerDescription[i] = layerDescription[i-1]
			}	
		layerVar[newI] = holdLV;
		layerNS[newI] = holdNS;
		layerType[newI] = holdLT;
		legSpec[newI] = holdLS;
		layerDescription[newI] = holdLD;
		}
	else if (newI > oldI) {
		newI = newI - 1;
		map.setLayerIndex(tmpLayers[oldI],newI);
		holdLV = layerVar[oldI];
		holdNS = layerNS[oldI];
		holdLT = layerType[oldI];
		holdLS = legSpec[oldI];
		holdLD = layerDescription[oldI];

		for (var i=oldI; i<newI; i++) {
			layerVar[i] = layerVar[i+1];
			layerNS[i] = layerNS[i+1];
			layerType[i] = layerType[i+1];
			legSpec[i] = legSpec[i+1];
			layerDescription[i] = layerDescription[i+1];
			}	
		layerVar[newI] = holdLV;
		layerNS[newI] = holdNS;
		layerType[newI] = holdLT;
		legSpec[newI] = holdLS;
		layerDescription[newI] = holdLD;
		}
	createLegend();
	}

function createLegend() {
	legDiv = document.getElementById("legend");
	for (var i=legDiv.childNodes.length-1; i>=0; i--) {
		legDiv.removeChild(legDiv.childNodes[i]);
		}
	legDiv.ondrop = "drop(event)";
	legDiv.addEventListener("drop", drop, true);
	tmpTitle = document.createElement("p");
	tmpTitle.innerHTML = "Legend"
	tmpTitle.style.textAlign = "center";
	tmpTitle.style.fontSize = "medium";
	tmpTitle.style.marginTop = "5px";
	tmpTitle.style.marginBottom = "0px";
	legDiv.appendChild(tmpTitle);
	tmpBar = document.createElement("hr");
	tmpBar.style.marginTop = "3px";
	tmpBar.style.marginBottom = "3px";
	legDiv.appendChild(tmpBar);
	tmpLayers = map.layers;
	tmpPath = "http://felek.cns.umass.edu:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=30&HEIGHT=30&LAYER="
	for (var i=0; i<tmpLayers.length; i++) {
		if (tmpLayers[i].displayInLayerSwitcher == true) {
			formDiv = document.createElement("div");
			formDiv.draggable = "true";
			formDiv.id = "formDiv" + i;
			formDiv.style.width = "500px";
			if (i > 1) {
				formDiv.ondragstart="drag(event)";
				formDiv.addEventListener("dragstart", drag, true);
				formDiv.ondragover = "allowDrop(event)";
				formDiv.addEventListener("dragover", allowDrop, true);
				formDiv.ondragleave = "leaveDrop(event)";
				formDiv.addEventListener("dragleave", leaveDrop, true);
				}
			formExpand = document.createElement("img");
			formExpand.src = "Images/expand_plus.png";
			formExpand.id = "expand" + i;
			formExpand.alt = i;
			formExpand.setAttribute("onclick", "imageVis(this.alt)");
			formExpand.setAttribute("onmouseover", "selCursor(this.id)");
			formExpand.title = "Click to show legend";
			if (layerType[i] == "tile") {
				formExpand.style.visibility = "hidden";
				}
			formDiv.appendChild(formExpand);
			formTransparency = document.createElement("img");
			formTransparency.src = "Images/starburst_small.png";
			formTransparency.id = "formTransparency" + i;
			formTransparency.alt = i;
			formTransparency.setAttribute("onclick", "loadOpacity(this.alt)");
			formTransparency.title = "Click to change layer transparency";
			formTransparency.style.marginLeft = "2px";
			formTransparency.setAttribute("onmouseover", "selCursor(this.id)");
			formDiv.appendChild(formTransparency);
			formZoomTo = document.createElement("img");
			formZoomTo.src = "Images/zoom-to-layer-small.png";
			formZoomTo.id = "formZoomTo" + i;
			formZoomTo.alt = i;
			if (layerType[i] == "tile") {
				formZoomTo.setAttribute("onclick", "map.zoomToExtent(bounds)");
				}
			else {
				formZoomTo.setAttribute("onclick", "zoomToLayer(this.alt,1)");
				}
			formZoomTo.title = "Click to zoom to layer";
			formZoomTo.style.marginLeft = "2px";
			formZoomTo.setAttribute("onmouseover", "selCursor(this.id)");
			formDiv.appendChild(formZoomTo);
			formCheck = document.createElement("input");
			formCheck.setAttribute("type", "checkbox");
			formCheck.setAttribute("onclick", "layerSwitch(this, this.id)");
			formCheck.name = "legend";
			formCheck.value = tmpLayers[i].name;
			formCheck.id = tmpLayers[i].name;
			formCheck.setAttribute("onmouseover", "selCursor(this.id)");
			formCheck.title = "Click to show/hide layer";
			formCheck.style.marginLeft = "2px";
			formDiv.appendChild(formCheck);
			formLabel = document.createElement("label");
			formLabel.id = "formLabel" + i;
			formLabel.innerHTML = tmpLayers[i].name + "<br>";
			formLabel.title = layerDescription[i];
			formDiv.appendChild(formLabel);
			formImg = document.createElement("img");
			if (legSpec[i] != "none" && legSpec[i] != "rpccr") {
				formImg.src = tmpPath + layerNS[i] + legSpec[i];
				}
			else {
				formImg.src = tmpPath + layerNS[i];
				}
			formImg.className = "legImage";
			formImg.id = "formImg" + i;
			formImg.style.borderStyle = "solid";
			formImg.style.borderWidth = "1px";
			formImg.style.display = "none";
			formImg.style.marginLeft = "15px";
			formDiv.appendChild(formImg);
			legDiv.appendChild(formDiv);
			}
		}
	freeSpace = document.createElement("p");
	freeSpace.id = "freeSpace";
	freeSpace.ondragstart="drag(event)";
	freeSpace.addEventListener("dragstart", drag, true);
	freeSpace.ondragover = "allowDrop(event)";
	freeSpace.addEventListener("dragover", allowDrop, true);
	freeSpace.ondragleave = "leaveDrop(event)";
	freeSpace.addEventListener("dragleave", leaveDrop, true);
	freeSpace.innerHTML = "Extra Line";
	freeSpace.style.color = "transparent";
	freeSpace.style.marginTop = "0px";
	freeSpace.style.marginBottom = "0px";
	legDiv.appendChild(freeSpace);

	for (var i=0; i<tmpLayers.length; i++) {
		if (tmpLayers[i].visibility == true && tmpLayers[i].displayInLayerSwitcher == true) {
			document.getElementById(tmpLayers[i].name).checked = true;
			}
		else if (tmpLayers[i].displayInLayerSwitcher == true) {
			document.getElementById(tmpLayers[i].name).checked = false;
			}
		}
	}
