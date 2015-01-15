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
		document.getElementById("expand"+tmpNode).src = "../Images/expand_minus.png";
		document.getElementById("expand"+tmpNode).title = "Click to hide legend";
		tmpEl.style.display = "inline";
		}
	else {
		document.getElementById("expand"+tmpNode).src = "../Images/expand_plus.png";
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
		tmpExit.src = "../Images/exit2_small.png";
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

function moveLayerUp(upVal) {
	if (upVal > 0) {
		tmpLayers = map.layers
		map.raiseLayer(tmpLayers[upVal-1],1);
		hold = layerVar[upVal-1];
		layerVar[upVal-1] = layerVar[upVal];
		layerVar[upVal] = hold;
		hold = layerNS[upVal-1];
		layerNS[upVal-1] = layerNS[upVal];
		layerNS[upVal] = hold;
		hold = layerType[upVal-1];
		layerType[upVal-1] = layerType[upVal];
		layerType[upVal] = hold;
		hold = legSpec[upVal-1];
		legSpec[upVal-1] = legSpec[upVal];
		legSpec[upVal] = hold;
		createLegend();
		}
	}

function moveLayerDown(downVal) {
	tmpLayers = map.layers
	downValPlus = parseInt(downVal) + 1
	if (downVal < tmpLayers.length-3) {
		map.raiseLayer(tmpLayers[downVal],1);
		hold = layerVar[downVal];
		layerVar[downVal] = layerVar[downValPlus];
		layerVar[downValPlus] = hold;
		hold = layerNS[downVal];
		layerNS[downVal] = layerNS[downValPlus];
		layerNS[downValPlus] = hold;
		hold = layerType[downVal];
		layerType[downVal] = layerType[downValPlus];
		layerType[downValPlus] = hold;
		hold = legSpec[downVal];
		legSpec[downVal] = legSpec[downValPlus];
		legSpec[downValPlus] = hold;
		createLegend();
		}
	}

function createLegend() {
	legDiv = document.getElementById("legend");
	for (var i=legDiv.childNodes.length-1; i>=0; i--) {
		legDiv.removeChild(legDiv.childNodes[i]);
		}
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
	tmpPath = "http://localhost/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=30&HEIGHT=30&LAYER="
	for (var i=0; i<tmpLayers.length; i++) {
		if (tmpLayers[i].displayInLayerSwitcher == true) {
			formDiv = document.createElement("div");
			formDiv.draggable = "true";
			formDiv.id = "formDiv" + i;
			formExpand = document.createElement("img");
			formExpand.src = "../Images/expand_plus.png";
			formExpand.id = "expand" + i;
			formExpand.alt = i;
			formExpand.setAttribute("onclick", "imageVis(this.alt)");
			formExpand.setAttribute("onmouseover", "selCursor(this.id)");
			formExpand.title = "Click to show legend";
			formDiv.appendChild(formExpand);
			formTransparency = document.createElement("img");
			formTransparency.src = "../Images/starburst_small.png";
			formTransparency.id = "formTransparency" + i;
			formTransparency.alt = i;
			formTransparency.setAttribute("onclick", "loadOpacity(this.alt)");
			formTransparency.title = "Click to change layer transparency";
			formTransparency.style.marginLeft = "2px";
			formTransparency.setAttribute("onmouseover", "selCursor(this.id)");
			formDiv.appendChild(formTransparency);
			formZoomTo = document.createElement("img");
			formZoomTo.src = "../Images/zoom-to-layer-small.png";
			formZoomTo.id = "formZoomTo" + i;
			formZoomTo.alt = i;
			formZoomTo.setAttribute("onclick", "zoomToLayer(this.alt,1)");
			formZoomTo.title = "Click to zoom to layer";
			formZoomTo.style.marginLeft = "2px";
			formZoomTo.setAttribute("onmouseover", "selCursor(this.id)");
			formDiv.appendChild(formZoomTo);
			formMoveUp = document.createElement("img");
			formMoveUp.src = "../Images/arrow_up.png";
			formMoveUp.id = "formMoveUp" + i;
			formMoveUp.alt = i;
			formMoveUp.setAttribute("onclick", "moveLayerUp(this.alt)");
			formMoveUp.title = "Move layer up 1 position";
			formMoveUp.style.marginLeft = "2px";
			formMoveUp.setAttribute("onmouseover", "selCursor(this.id)");
			formDiv.appendChild(formMoveUp);
			formMoveDown = document.createElement("img");
			formMoveDown.src = "../Images/arrow_down.png";
			formMoveDown.id = "formMoveDown" + i;
			formMoveDown.alt = i;
			formMoveDown.setAttribute("onclick", "moveLayerDown(this.alt)");
			formMoveDown.title = "Move layer down 1 position";
			formMoveDown.style.marginLeft = "2px";
			formMoveDown.setAttribute("onmouseover", "selCursor(this.id)");
			formDiv.appendChild(formMoveDown);
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
			formDiv.appendChild(formLabel);
			formImg = document.createElement("img");
			if (legSpec[i] != "none") {
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
	freeSpace.innerHTML = "<br>";
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
