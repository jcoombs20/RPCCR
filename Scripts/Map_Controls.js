function getIdLayer() {
	document.getElementById("download").style.visibility = "hidden";
	document.getElementById("selLayerList").style.visibility = "hidden";
	document.getElementById("riparian").style.visibility = "hidden";
	document.getElementById("coords").style.visibility = "hidden";
	document.getElementById("drain_area").style.visibility = "hidden";

	idLayerDiv = document.getElementById("idLayerList");
	if (idLayerDiv.style.visibility == "visible") {
		idLayerDiv.style.visibility = "hidden";
		return;
		} 

	tmpLayers = map.layers;
	layerList = ["All Layers"];
	for (var i=0;i<tmpLayers.length;i++) {
		if (tmpLayers[i].visibility == true && tmpLayers[i].displayInLayerSwitcher == true && layerType[i] != "tile") {
			layerList.push(tmpLayers[i].name);
			}
		}

	for (var i=idLayerDiv.childNodes.length - 1; i>=0; i--) {
		idLayerDiv.removeChild(idLayerDiv.childNodes[i]);
		}

	idLayerDiv.style.padding = "0px";
	tmpExit = document.createElement("img");
	tmpExit.src = "Images/exit2_small.png";
	tmpExit.title = "Click to close";
	tmpExit.setAttribute("onclick", "document.getElementById('idLayerList').style.visibility = 'hidden'");
	tmpExit.id = "idLayerExit";
	tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
	tmpExit.style.cssFloat = "right";
	tmpExit.style.margin = "2px";
	idLayerDiv.appendChild(tmpExit);

	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	idLayerDiv.appendChild(breakP);

	idLayerHeading = document.createElement("p");
	idLayerHeading.innerHTML = "Select Layer";
	idLayerHeading.style.textAlign = "center";
	idLayerHeading.style.margin = "0px";
	idLayerDiv.appendChild(idLayerHeading);

	idLayerBar = document.createElement("hr");
	idLayerDiv.appendChild(idLayerBar);

	formIdElement = document.createElement("form");
	formIdElement.id = "formIdLayers";
	idLayerDiv.appendChild(formIdElement);
	for (var i=0; i<layerList.length;i++) {
		formIdSelect = document.createElement("input");
		formIdSelect.setAttribute("type", "radio");
		formIdSelect.setAttribute("onclick", "setIdLayer(this.id, this.value)");
		formIdSelect.name = "idLayers";
		formIdSelect.id = "formSelectId-" + layerList[i];
		formIdSelect.value = layerList[i];
		formIdLabel = document.createElement("label");
		formIdLabel.appendChild(formIdSelect);
		formIdLabel.style.paddingLeft = "5px";
		formIdLabel.style.paddingRight = "5px";
		formIdLabel.innerHTML += layerList[i] + "<br>";
		formIdElement.appendChild(formIdLabel);
		}
	if (document.getElementById(radioID) != null) {
		document.getElementById(radioID).checked = true;
		}
	else {
		setIdLayer("formSelectId-All Layers", layerList[0]);
		document.getElementById(radioID).checked = true;
		}
	tmpLayer = document.getElementById("IdLayerSelect");
	panel = document.getElementById("controlPanel");
	x = panel.childNodes;
	xx = x[10];
	x = xx.getBoundingClientRect();
	idLayerDiv.style.left = x.left + "px";
	idLayerDiv.style.top = x.bottom + "px";
	idLayerDiv.style.borderRadius = "0px 10px 10px 10px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (idLayerDiv.offsetLeft + idLayerDiv.offsetWidth > w) {
		idLayerDiv.style.left = w - idLayerDiv.offsetWidth + "px";
		}
	idLayerDiv.style.visibility = "visible";
	}

function setIdLayer(layerID, layerVal) {
	if (layerID == "formSelectId-All Layers") {
		identify.layers = []
		for (var a=0; a<layerList.length; a++) {
			for (var i=0; i<layerVar.length; i++) {
				if (layerVar[i].name == layerList[a]) {
					identify.layers.push(layerVar[i]);
					break;
					}
				}
			}
		}
	else {
		for (var i=0; i<layerVar.length; i++) {
			if (layerVar[i].name == layerVal) {
				identify.layers = [layerVar[i]];
				break;
				}
			}
		}
	idLayerDiv.style.visibility="hidden";
	radioID = layerID;
	extPanel.activateControl(identify);
	}

function getFSLayer() {
	document.getElementById("download").style.visibility = "hidden";
	document.getElementById("idLayerList").style.visibility = "hidden";
	document.getElementById("riparian").style.visibility = "hidden";
	document.getElementById("coords").style.visibility = "hidden";
	document.getElementById("drain_area").style.visibility = "hidden";

	layerDiv = document.getElementById("selLayerList");
	if (layerDiv.style.visibility == "visible") {
		layerDiv.style.visibility = "hidden";
		return;
		}

	tmpLayers = map.layers;
	layerList = [];
	for (var i=0;i<tmpLayers.length;i++) {
		if (tmpLayers[i].visibility == true && tmpLayers[i].displayInLayerSwitcher == true && layerType[i] != "raster" && layerType[i] != "tile") {
			layerList.push(tmpLayers[i].name);
			}
		}

	for (var i=layerDiv.childNodes.length - 1; i>=0; i--) {
		layerDiv.removeChild(layerDiv.childNodes[i]);
		}

	layerDiv.style.padding = "0px";
	tmpExit = document.createElement("img");
	tmpExit.src = "Images/exit2_small.png";
	tmpExit.title = "Click to close";
	tmpExit.setAttribute("onclick", "document.getElementById('selLayerList').style.visibility = 'hidden'");
	tmpExit.id = "layerExit";
	tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
	tmpExit.style.cssFloat = "right";
	tmpExit.style.margin = "2px";
	layerDiv.appendChild(tmpExit);

	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	layerDiv.appendChild(breakP);

	layerHeading = document.createElement("p");
	layerHeading.innerHTML = "Select Layer";
	layerHeading.style.textAlign = "center";
	layerHeading.style.margin = "0px";
	layerDiv.appendChild(layerHeading);

	layerBar = document.createElement("hr");
	layerDiv.appendChild(layerBar);

	formElement = document.createElement("form");
	formElement.id = "formLayers";
	layerDiv.appendChild(formElement);
	for (var i=0; i<layerList.length;i++) {
		formSelect = document.createElement("input");
		formSelect.setAttribute("type", "radio");
		formSelect.setAttribute("onclick", "setFSLayer(this.id, this.value)");
		formSelect.name = "layers";
		formSelect.id = "formSelect-" + layerList[i];
		formSelect.value = layerList[i];
		formLabel = document.createElement("label");
		formLabel.appendChild(formSelect);
		formLabel.style.paddingRight = "5px";
		formLabel.style.paddingLeft = "5px";
		formLabel.innerHTML += layerList[i] + "<br>";
		formElement.appendChild(formLabel);
		}
	if (document.getElementById(radioFS) != null) {
		document.getElementById(radioFS).checked = true;
		}
	else {
		setFSLayer("formSelect-" + layerList[0], layerList[0]);
		document.getElementById(radioFS).checked = true;
		}
	tmpLayer = document.getElementById("FSLayerSelect");
	panel = document.getElementById("controlPanel");
	x = panel.childNodes;
	xx = x[12];
	x = xx.getBoundingClientRect();
	layerDiv.style.left = x.left + "px";
	layerDiv.style.top = x.bottom + "px";
	layerDiv.style.borderRadius = "0px 10px 10px 10px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (layerDiv.offsetLeft + layerDiv.offsetWidth > w) {
		layerDiv.style.left = w - layerDiv.offsetWidth + "px";
		}
	layerDiv.style.visibility = "visible";	}

function setFSLayer(layerID, layerVal) {
	if (layerID != radioFS) {
		clearSelFeat();
		}
	for (var i=0; i<layerVar.length; i++) {
		if (layerVar[i].name == layerVal) {
				selFeat.protocol = OpenLayers.Protocol.WFS.fromWMSLayer(layerVar[i]);
				str = layerNS[i];
				a = str.indexOf(":");
				rpccrSFLayer = str.substr(a+1, str.length);
				rpccrSFLayer = rpccrSFLayer.toLowerCase();
				rpccrSFNum = i;
				break;
			}
		}
	layerDiv.style.visibility="hidden";
	radioFS = layerID;
	extPanel.activateControl(selFeat);
	}

function clearSelFeat() {
	numFeats = featureLayer.features;
	for (var i=numFeats.length-1;i>=0;i--) {
		featureLayer.removeFeatures([numFeats[i]]);
		}
	oid = [];
	}

function getDownload() {
	document.getElementById("idLayerList").style.visibility = "hidden";
	document.getElementById("selLayerList").style.visibility = "hidden";
	document.getElementById("riparian").style.visibility = "hidden";
	document.getElementById("coords").style.visibility = "hidden";

	dloadDiv = document.getElementById("download");
	if (dloadDiv.style.visibility == "visible") {
		dloadDiv.style.visibility = "hidden";
		return;
		}
	for (var i=dloadDiv.childNodes.length - 1; i>=0; i--) {
		dloadDiv.removeChild(dloadDiv.childNodes[i]);
		}

	dloadDiv.style.padding = "0px";
	tmpExit = document.createElement("img");
	tmpExit.src = "Images/exit2_small.png";
	tmpExit.title = "Click to close";
	tmpExit.setAttribute("onclick", "document.getElementById('download').style.visibility = 'hidden'");
	tmpExit.id = "dloadExit";
	tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
	tmpExit.style.cssFloat = "right";
	tmpExit.style.margin = "2px";
	dloadDiv.appendChild(tmpExit);

	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	dloadDiv.appendChild(breakP);

	dloadHeading = document.createElement("p");
	dloadHeading.innerHTML = "Download Specifications";
	dloadHeading.style.textAlign = "center";
	dloadHeading.style.margin = "0px";
	dloadDiv.appendChild(dloadHeading);

	dloadBar = document.createElement("hr");
	dloadDiv.appendChild(dloadBar);

	dloadP = document.createElement("p");
	dloadP.innerHTML = "Layer to download";
	dloadP.style.textAlign = "center";
	dloadP.style.margin = "0px";
	dloadDiv.appendChild(dloadP);
	dloadSel = document.createElement("select");
	dloadSel.setAttribute("onchange", "setSaveType(this.selectedIndex-1)");
	dloadSel.setAttribute("onclick", "setLink()");
	dloadSel.multiple = false;
	dloadSel.name = "dloadSel";
	dloadSel.id = "dloadSel";
	dloadSel.style.margin = "5px";
	dloadOpt = document.createElement("option");
	dloadOpt.value = 0;
	dloadOpt.id = "dloadOpt0";
	dloadOpt.innerHTML = "All Visible Layers";
	dloadSel.appendChild(dloadOpt);
	tmpLayers = map.layers;
	for (var i=0; i<tmpLayers.length; i++) {
		if (tmpLayers[i].displayInLayerSwitcher == true && layerType[i] != "tile") {
			dloadOpt = document.createElement("option");
			dloadOpt.value = i + 1;
			dloadOpt.id = "dloadOpt" + (i + 1);
			dloadOpt.innerHTML = tmpLayers[i].name;
			dloadSel.appendChild(dloadOpt);
			}
		}
	dloadDiv.appendChild(dloadSel);
	dloadSel.selectedIndex = dloadIndex + 1;

	saveTypeP = document.createElement("p");
	saveTypeP.style.textAlign = "center";
	saveTypeP.innerHTML = "File Type";
	saveTypeP.style.margin = "10px 0px 0px 0px";
	dloadDiv.appendChild(saveTypeP);
	saveTypeSel = document.createElement("select");
	saveTypeSel.multiple = false;
	saveTypeSel.name = "saveTypeSel";
	saveTypeSel.id = "saveTypeSel";
	saveTypeSel.setAttribute("onclick", "setLink()");
	saveTypeSel.style.margin = "5px";
	if (layerType[dloadIndex + 2] == "raster" || dloadIndex == -1) {
		for (var i=0; i<=3; i++) {
			saveOpt = document.createElement("option");
			saveOpt.id = "saveOpt" + i;
			switch(i) {
				case 0:
					saveOpt.innerHTML = "GEOTIFF";
					saveOpt.value = "IMAGE/GEOTIFF8";
					break;
				case 1:
					saveOpt.innerHTML = "JPEG";
					saveOpt.value = "IMAGE/JPEG";
					break;
				case 2:
					saveOpt.innerHTML = "PNG";
					saveOpt.value = "IMAGE/PNG";
					break;
				case 3:
					saveOpt.innerHTML = "PDF";
					saveOpt.value = "APPLICATION/PDF";
					break;
				}
			saveTypeSel.appendChild(saveOpt);
			}
		}
	else {
		for (var i=0; i<=4; i++) {
			saveOpt = document.createElement("option");
			saveOpt.id = "saveOpt" + i;
			switch(i) {
				case 0:
					saveOpt.innerHTML = "SHAPE-ZIP";
					saveOpt.value = "SHAPE-ZIP";
					break;
				case 1:
					saveOpt.innerHTML = "JPEG";
					saveOpt.value = "IMAGE/JPEG";
					break;
				case 2:
					saveOpt.innerHTML = "PNG";
					saveOpt.value = "IMAGE/PNG";
					break;
				case 3:
					saveOpt.innerHTML = "PDF";
					saveOpt.value = "APPLICATION/PDF";
					break;
				case 4:
					saveOpt.innerHTML = "CSV";
					saveOpt.value = "CSV";
					break;
				}
			saveTypeSel.appendChild(saveOpt);
			}
		}
		
	dloadDiv.appendChild(saveTypeSel);
	saveTypeSel.selectedIndex = saveTypeIndex;

	spaceP = document.createElement("p");
	spaceP.innerHTML = "<br>";
	spaceP.style.margin = "0px";
	dloadDiv.appendChild(spaceP);

	viewPortChk = document.createElement("input");
	viewPortChk.setAttribute("type", "checkbox");
	viewPortChk.id = "viewPortChk";
	viewPortChk.title = "Check to restrict layer extent to that of the map";
	viewPortChk.setAttribute("onclick", "setLink()");
	viewPortChk.checked = dlExtent;
	viewPortChk.style.margin = "0px 0px 0px 10px";
	dloadDiv.appendChild(viewPortChk);

	viewPortLbl = document.createElement("label");
	viewPortLbl.innerHTML = "Restrict download to map extent";
	viewPortLbl.style.margin = "0px 10px 0px 5px";
	dloadDiv.appendChild(viewPortLbl);

	spaceP = document.createElement("p");
	spaceP.innerHTML = "<br>";
	spaceP.style.margin = "0px";
	dloadDiv.appendChild(spaceP);

	dloadButton = document.createElement("button");
	dloadButton.innerHTML = "Download";
	dloadButton.id = "downloadButton";
	dloadButton.setAttribute("onmouseup", "document.getElementById('download').style.visibility = 'hidden'");
	dloadButton.style.cursor = "pointer";
	dloadButton.style.margin = "5px";
	dloadDiv.appendChild(dloadButton);
	dloadButton.style.marginLeft = (dloadDiv.offsetWidth - dloadButton.offsetWidth)/2 + "px";

	dloadSel.style.marginLeft = (dloadDiv.offsetWidth - dloadSel.offsetWidth)/2 + "px";
	saveTypeSel.style.marginLeft = (dloadDiv.offsetWidth - saveTypeSel.offsetWidth)/2 + "px";

	setLink();

	panel = document.getElementById("controlPanel");
	x = panel.childNodes;
	xx = x[15];
	x = xx.getBoundingClientRect();
	dloadDiv.style.left = x.left + "px";
	dloadDiv.style.top = x.bottom + "px";
	dloadDiv.style.borderRadius = "0px 10px 10px 10px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (dloadDiv.offsetLeft + dloadDiv.offsetWidth > w) {
		dloadDiv.style.left = w - dloadDiv.offsetWidth + "px";
		}
	dloadDiv.style.visibility = "visible";
	}

function setSaveType(tmpIndex) {
	saveTypeSel = document.getElementById("saveTypeSel");
	for (var i=saveTypeSel.length-1; i>=0; i--) {
		saveTypeSel.remove(i);
		}
	if (layerType[tmpIndex + 2] == "raster" || tmpIndex == -1) {
		for (var i=0; i<=3; i++) {
			saveOpt = document.createElement("option");
			saveOpt.id = "saveOpt" + i;
			switch(i) {
				case 0:
					saveOpt.innerHTML = "GEOTIFF";
					saveOpt.value = "IMAGE/GEOTIFF8";
					break;
				case 1:
					saveOpt.innerHTML = "JPEG";
					saveOpt.value = "IMAGE/JPEG";
					break;
				case 2:
					saveOpt.innerHTML = "PNG";
					saveOpt.value = "IMAGE/PNG";
					break;
				case 3:
					saveOpt.innerHTML = "PDF";
					saveOpt.value = "APPLICATION/PDF";
					break;
				}
			saveTypeSel.appendChild(saveOpt);
			}
		}
	else {
		for (var i=0; i<=4; i++) {
			saveOpt = document.createElement("option");
			saveOpt.id = "saveOpt" + i;
			switch(i) {
				case 0:
					saveOpt.innerHTML = "SHAPE-ZIP";
					saveOpt.value = "SHAPE-ZIP";
					break;
				case 1:
					saveOpt.innerHTML = "JPEG";
					saveOpt.value = "IMAGE/JPEG";
					break;
				case 2:
					saveOpt.innerHTML = "PNG";
					saveOpt.value = "IMAGE/PNG";
					break;
				case 3:
					saveOpt.innerHTML = "PDF";
					saveOpt.value = "APPLICATION/PDF";
					break;
				case 4:
					saveOpt.innerHTML = "CSV";
					saveOpt.value = "CSV";
					break;
				}
			saveTypeSel.appendChild(saveOpt);
			}
		}
	if (saveTypeIndex < saveTypeSel.length) {
		saveTypeSel.selectedIndex = saveTypeIndex;
		}
	else {
		saveTypeSel.selectedIndex = 0;
		saveTypeIndex = 0;
		}

	if (legSpec[tmpIndex + 2] == "rpccr" && saveTypeIndex == 0) {
		document.getElementById("viewPortChk").checked = false;
		}
	else if (legSpec[tmpIndex + 2] == "rpccr" && saveTypeIndex != 0) {
		document.getElementById("viewPortChk").checked = true;
		}
	else if (dloadIndex == -1) {
		document.getElementById("viewPortChk").checked = true;
		}

	dlExtent = document.getElementById("viewPortChk").checked;
	}

function setLink() {
	dloadDiv = document.getElementById("download");
	dloadSel = document.getElementById("dloadSel");
	dloadIndex = dloadSel.selectedIndex - 1;
	saveTypeSel = document.getElementById("saveTypeSel");
	saveTypeIndex = saveTypeSel.selectedIndex;
	if (legSpec[dloadIndex + 2] == "rpccr" && saveTypeIndex == 0) {
		document.getElementById("viewPortChk").checked = false;
		}
	else if (legSpec[dloadIndex + 2] == "rpccr" && saveTypeIndex != 0) {
		document.getElementById("viewPortChk").checked = true;
		}
	else if (dloadIndex == -1) {
		document.getElementById("viewPortChk").checked = true;
		}
	dlExtent = document.getElementById("viewPortChk").checked;
	dloadButton = document.getElementById("downloadButton");
	if (dlExtent == true) {
		getBounds();
		mapPX = map.getSize().toString();
		mapPXArray = mapPX.split(",");
		mapPXW = parseFloat(mapPXArray[0].substr(mapPXArray[0].indexOf("=") + 1, mapPXArray[0].length));
		mapPXH = parseFloat(mapPXArray[1].substr(mapPXArray[1].indexOf("=") + 1, mapPXArray[1].length));
		}
	else {
		if (dloadIndex == -1) {

			}
		else if (layerType[dloadIndex + 2] == "raster" && saveTypeIndex != 0 && legSpec[dloadIndex + 2] != "rpccr") {
			requestBB("http://felek.cns.umass.edu:8080/geoserver/wcs?SERVICE=wcs&VERSION=1.0.0&REQUEST=DescribeCoverage&COVERAGE=" + layerNS[dloadIndex + 2]);
			
			tmpPoint = xmlDoc.getElementsByTagName("gml:pos")[0].childNodes[0].nodeValue;
			TPArray = tmpPoint.split(" ");
			tmpLonX = parseFloat(TPArray[0]);
			tmpLatY = parseFloat(TPArray[1]);

			maxLeft = tmpLonX;
			maxBottom = tmpLatY;

			tmpPoint = xmlDoc.getElementsByTagName("gml:pos")[1].childNodes[0].nodeValue;
			TPArray = tmpPoint.split(" ");
			tmpLonX = parseFloat(TPArray[0]);
			tmpLatY = parseFloat(TPArray[1]);

			maxRight = tmpLonX;
			maxTop = tmpLatY;

			mapBB = maxLeft + "," + maxBottom + "," + maxRight + "," + maxTop;
			
			mapPX = xmlDoc.getElementsByTagName("gml:high")[0].childNodes[0].nodeValue;
			mapPXArray = mapPX.split(" ");
			mapPXW = parseFloat(mapPXArray[0]);
			mapPXH = parseFloat(mapPXArray[1]);
			}
		else {
			requestBB("http://felek.cns.umass.edu:8080/geoserver/wfs?SERVICE=wfs&VERSION=2.0.0&REQUEST=GetCapabilities");

			tmpNames = xmlDoc.getElementsByTagName("FeatureType");
			for (var i=0; i<tmpNames.length; i++) {
				if (tmpNames[i].childNodes[0].childNodes[0].nodeValue == layerNS[dloadIndex + 2]) {
					lowerCorner = xmlDoc.getElementsByTagName("ows:LowerCorner");
					tmpPoint = lowerCorner[i].childNodes[0].nodeValue;
					TPArray = tmpPoint.split(" ");
					tmpLonX = parseFloat(TPArray[0]);
					tmpLatY = parseFloat(TPArray[1]);

					maxLeft = tmpLonX;
					maxBottom = tmpLatY;

					upperCorner = xmlDoc.getElementsByTagName("ows:UpperCorner");
					tmpPoint = upperCorner[i].childNodes[0].nodeValue;
					TPArray = tmpPoint.split(" ");
					tmpLonX = parseFloat(TPArray[0]);
					tmpLatY = parseFloat(TPArray[1]);

					maxRight = tmpLonX;
					maxTop = tmpLatY;

					mapBB = maxLeft + "," + maxBottom + "," + maxRight + "," + maxTop;
					mapBBWFS = maxBottom + "," + maxLeft + "," + maxTop + "," + maxRight;
					
					//dlBounds = map.getExtent();
					//zoomToLayer(dloadIndex + 2,1);
					mapPX = map.getSize().toString();
					mapPXArray = mapPX.split(",");
					mapPXW = parseFloat(mapPXArray[0].substr(mapPXArray[0].indexOf("=") + 1, mapPXArray[0].length));
					mapPXH = parseFloat(mapPXArray[1].substr(mapPXArray[1].indexOf("=") + 1, mapPXArray[1].length));
					//map.zoomToExtent(dlBounds);
					break;
					}
				}
			}
		}

	if (layerType[dloadIndex + 2] == "raster" || dloadIndex == -1) {
		switch (saveTypeSel.selectedIndex) {
			case 0:
				if (dloadIndex >= 0 && dlExtent == false) {	
					a = layerNS[dloadIndex + 2].indexOf(":");
					tmpStr = "http://felek.cns.umass.edu:8080/geoserver/www/GIS_zips/" + layerNS[dloadIndex + 2].slice(a+1) + ".zip";
					dloadButton.setAttribute("onclick", "window.open('" + tmpStr + "')");
					break;
					}
				else if (dloadIndex >= 0 && dlExtent == true) {
					dloadButton.setAttribute("onclick", "BB_zip()");
					break;
					}
			default:
				tmpStr = "http://felek.cns.umass.edu:8080/geoserver/wms?SERVICE=wms&VERSION=1.1.1&REQUEST=GetMap";
				tmpStr += "&SRS=EPSG:4326";
				if (dloadIndex > -1) {
					tmpStr += "&LAYERS=" + layerNS[dloadIndex + 2];
					}
				else {
					tmpLayers = map.layers;
					tmpLayerStr = "&LAYERS=";
					for (var i=0;i<tmpLayers.length;i++) {
						if (tmpLayers[i].visibility == true && tmpLayers[i].displayInLayerSwitcher == true && layerType[i] != "tile") {
							if (tmpLayerStr == "&LAYERS=") {
								tmpLayerStr += layerNS[i];
								}
							else {
								tmpLayerStr += "," + layerNS[i];
								}
							}
						}
					tmpStr += tmpLayerStr;
					}
				tmpStr += "&BBOX=" + mapBB;
				tmpStr += "&WIDTH=" + mapPXW + "&HEIGHT=" + mapPXH;
				tmpStr += "&FORMAT=" + document.getElementById("saveOpt" + saveTypeIndex).value;
				dloadButton.setAttribute("onclick", "window.open('" + tmpStr + "')");
				break;
			}
		}
	else {
		switch (saveTypeSel.selectedIndex) {
			case 0:
				tmpStr = "http://felek.cns.umass.edu:8080/geoserver/wfs?SERVICE=wfs&VERSION=2.0.0&REQUEST=getFeature";
				tmpStr += "&SRSNAME=EPSG:4326";
				tmpStr += "&TYPENAME=" + layerNS[dloadIndex + 2];
				tmpStr += "&BBOX=" + mapBBWFS;
				tmpStr += "&OUTPUTFORMAT=" + document.getElementById("saveOpt" + saveTypeIndex).value;
				dloadButton.setAttribute("onclick", "window.open('" + tmpStr + "')");
				break;
			case 4:
				tmpStr = "http://felek.cns.umass.edu:8080/geoserver/wfs?SERVICE=wfs&VERSION=2.0.0&REQUEST=getFeature";
				tmpStr += "&SRSNAME=EPSG:4326";
				tmpStr += "&TYPENAME=" + layerNS[dloadIndex + 2];
				tmpStr += "&BBOX=" + mapBBWFS;
				tmpStr += "&OUTPUTFORMAT=" + document.getElementById("saveOpt" + saveTypeIndex).value;
				dloadButton.setAttribute("onclick", "window.open('" + tmpStr + "')");
				break;
			default:
				tmpStr = "http://felek.cns.umass.edu:8080/geoserver/wms?SERVICE=wms&VERSION=1.1.1&REQUEST=getMap";
				tmpStr += "&SRS=EPSG:4326";
				tmpStr += "&LAYERS=" + layerNS[dloadIndex + 2];
				tmpStr += "&BBOX=" + mapBB;
				tmpStr += "&WIDTH=" + mapPXW + "&HEIGHT=" + mapPXH;
				tmpStr += "&FORMAT=" + document.getElementById("saveOpt" + saveTypeIndex).value;
				dloadButton.setAttribute("onclick", "window.open('" + tmpStr + "')");
				break;
			}
		}
	}

function BB_zip() {
	a = layerNS[dloadIndex + 2].indexOf(":");
	BBinput = {"raster_name": layerNS[dloadIndex + 2].slice(a+1), "maxLeft": maxLeft, "maxBottom": maxBottom, "maxRight": maxRight, "maxTop": maxTop};
	socket.emit('BB_zip_rid', BBinput);
	}

function requestBB(url) {
	if (window.XMLHttpRequest) {
  		// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  		}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  		}
	
	xmlhttp.onreadystatechange=function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200) {	
			xmlDoc = xmlhttp.responseXML;
			return;
    			}
  		}
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	}

function getBounds() {
	tmpMap = document.getElementById("mapViewer");
	latPix = [0, Math.round(tmpMap.offsetHeight/2), tmpMap.offsetHeight];
	lonPix = [0, Math.round(tmpMap.offsetWidth/2), tmpMap.offsetWidth];
	tmpBounds = map.getExtent();

	//Max Left Longitude
	maxLeft = 504851290
	for (var i=0;i<3;i++) {
		tmpPos = new OpenLayers.Pixel;
		tmpPos.x = lonPix[0];
		tmpPos.y = latPix[i];
		tmpPoint = map.getLonLatFromPixel(tmpPos).toString();

	    	TPArray = tmpPoint.split(",");
	    	tmpLonX = parseFloat(TPArray[0].substr(4, TPArray[0].length));
	    	tmpLatY = parseFloat(TPArray[1].substr(4, TPArray[1].length));

		gotoPoint = [parseFloat(tmpLonX), parseFloat(tmpLatY)];
		gotoPointT = proj4(projFrom, projTo, gotoPoint).toString();
		gotoArray = gotoPointT.split(",");
		tmpVal = parseFloat(gotoArray[0]);

		if (tmpVal < maxLeft) {
			maxLeft = tmpVal;
			}
		}

	//Max right Longitude
	maxRight = -504851290

	for (var i=0;i<3;i++) {
		tmpPos = new OpenLayers.Pixel;
		tmpPos.x = lonPix[2];
		tmpPos.y = latPix[i];
		tmpPoint = map.getLonLatFromPixel(tmpPos).toString();

	    	TPArray = tmpPoint.split(",");
	    	tmpLonX = parseFloat(TPArray[0].substr(4, TPArray[0].length));
	    	tmpLatY = parseFloat(TPArray[1].substr(4, TPArray[1].length));

		gotoPoint = [parseFloat(tmpLonX), parseFloat(tmpLatY)];
		gotoPointT = proj4(projFrom, projTo, gotoPoint).toString();
		gotoArray = gotoPointT.split(",");
		tmpVal = parseFloat(gotoArray[0]);

		if (tmpVal > maxRight) {
			maxRight = tmpVal;
			}
		}

	//Max Top Latitude
	maxTop = -20037509
	for (var i=0;i<3;i++) {
		tmpPos = new OpenLayers.Pixel;
		tmpPos.x = lonPix[i];
		tmpPos.y = latPix[0];
		tmpPoint = map.getLonLatFromPixel(tmpPos).toString();

	    	TPArray = tmpPoint.split(",");
	    	tmpLonX = parseFloat(TPArray[0].substr(4, TPArray[0].length));
	    	tmpLatY = parseFloat(TPArray[1].substr(4, TPArray[1].length));

		gotoPoint = [parseFloat(tmpLonX), parseFloat(tmpLatY)];
		gotoPointT = proj4(projFrom, projTo, gotoPoint).toString();
		gotoArray = gotoPointT.split(",");
		tmpVal = parseFloat(gotoArray[1]);

		if (tmpVal > maxTop) {
			maxTop = tmpVal;
			}
		}

	//Max Bottom Latitude
	maxBottom = 20037509
	for (var i=0;i<3;i++) {
		tmpPos = new OpenLayers.Pixel;
		tmpPos.x = lonPix[i];
		tmpPos.y = latPix[2];
		tmpPoint = map.getLonLatFromPixel(tmpPos).toString();

	    	TPArray = tmpPoint.split(",");
	    	tmpLonX = parseFloat(TPArray[0].substr(4, TPArray[0].length));
	    	tmpLatY = parseFloat(TPArray[1].substr(4, TPArray[1].length));

		gotoPoint = [parseFloat(tmpLonX), parseFloat(tmpLatY)];
		gotoPointT = proj4(projFrom, projTo, gotoPoint).toString();
		gotoArray = gotoPointT.split(",");
		tmpVal = parseFloat(gotoArray[1]);

		if (tmpVal < maxBottom) {
			maxBottom = tmpVal;
			}
		}

	mapBB = maxLeft + "," + maxBottom + "," + maxRight + "," + maxTop;
	mapBBWFS = maxBottom + "," + maxLeft + "," + maxTop + "," + maxRight;
	}

function goToCoords() {
	document.getElementById("idLayerList").style.visibility = "hidden";
	document.getElementById("selLayerList").style.visibility = "hidden";
	document.getElementById("download").style.visibility = "hidden";
	document.getElementById("riparian").style.visibility = "hidden";
	document.getElementById("drain_area").style.visibility = "hidden";

	coordsDiv = document.getElementById("coords");
	if (coordsDiv.style.visibility == "visible") {
		coordsDiv.style.visibility = "hidden";
		return;
		}
	if (coordsDiv.childNodes.length == 0) {
		coordsDiv.style.margin = "0px";
		tmpExit = document.createElement("img");
		tmpExit.src = "Images/exit2_small.png";
		tmpExit.title = "Click to close";
		tmpExit.setAttribute("onclick", "document.getElementById('coords').style.visibility = 'hidden'");
		tmpExit.id = "coordsExit";
		tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
		tmpExit.style.cssFloat = "right";
		tmpExit.style.margin = "2px";
		coordsDiv.appendChild(tmpExit);

		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		coordsDiv.appendChild(breakP);

		tmpHeader = document.createElement("p");
		tmpHeader.id = "coordsHeader";
		tmpHeader.style.margin = "5px";
		tmpHeader.style.textAlign = "center";
		tmpHeader.innerHTML = "Input long & lat in decimal degrees";
		coordsDiv.appendChild(tmpHeader);

		coordsBar = document.createElement("hr");
		coordsDiv.appendChild(coordsBar);

		longLabel = document.createElement("label");
		longLabel.innerHTML = "Long:";
		longLabel.style.margin = "5px";
		coordsDiv.appendChild(longLabel);
		
		longInp = document.createElement("input");
		longInp.setAttribute("type", "text");
		longInp.id = "longInp";
		longInp.name = "longInp";
		longInp.style.margin = "5px";
		longInp.style.width = "100px";
		coordsDiv.appendChild(longInp);
		
		latLabel = document.createElement("label");
		latLabel.innerHTML = "Lat:";
		latLabel.style.margin = "5px";
		coordsDiv.appendChild(latLabel);
		
		latInp = document.createElement("input");
		latInp.setAttribute("type", "text");
		latInp.id = "latInp";
		latInp.name = "latInp";
		latInp.style.margin = "5px";
		latInp.style.width = "100px";
		coordsDiv.appendChild(latInp);

		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		coordsDiv.appendChild(breakP);

		scaleLabel = document.createElement("label");
		scaleLabel.innerHTML = "Scale:";
		scaleLabel.style.margin = "5px";
		coordsDiv.appendChild(scaleLabel);

		coordsScale = document.createElement("select");
		coordsScale.multiple = false;
		coordsScale.name = "dloadSel";
		coordsScale.id = "coordsScale";
		coordsScale.style.margin = "5px";
		tmpScale = layerVar[10].scales;
		for (var i=0; i<tmpScale.length; i++) {
			scaleOpt = document.createElement("option");
			scaleOpt.value = i;
			scaleOpt.id = "scaleOpt" + i;
			scaleOpt.innerHTML = "1:" + Math.round(tmpScale[i]);
			coordsScale.appendChild(scaleOpt);
			}
		coordsDiv.appendChild(coordsScale);
		coordsScale.selectedIndex = 0;
		//scaleLabel.style.marginLeft = (coordsDiv.offsetWidth + coordsScale.offsetWidth - scaleLabel.offsetWidth) / 2 + "px";
		//coordsScale.style.marginLeft = (coordsDiv.offsetWidth - coordsScale.offsetWidth + scaleLabel.offsetWidth) / 2 + "px";

		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		coordsDiv.appendChild(breakP);

		coordsBut = document.createElement("button");
		coordsBut.setAttribute("onclick", "mapCoords()");
		coordsBut.innerHTML = "Map Location";
		coordsBut.style.height = "auto";
		coordsBut.style.width = "auto";
		coordsBut.style.marginBottom = "5px";
		coordsDiv.appendChild(coordsBut);

		coordsBut.style.marginLeft = (coordsDiv.offsetWidth - coordsBut.offsetWidth) / 2 + "px";

		/*tmpGeo = document.createElement("input");
		tmpGeo.setAttribute("type", "text");
		tmpGeo.id = "tmpGeo";
		tmpGeo.name = "tmpGeo";
		tmpGeo.style.margin = "5px";
		tmpGeo.style.width = "100px";
		coordsDiv.appendChild(tmpGeo);

		geoBut = document.createElement("button");
		geoBut.setAttribute("onclick", "google(tmpGeo.value");
		geoBut.innerHTML = "Geocode Location";
		geoBut.style.height = "auto";
		geoBut.style.width = "auto";
		geoBut.style.marginBottom = "5px";
		coordsDiv.appendChild(geoBut);

		geoBut.style.marginLeft = (coordsDiv.offsetWidth - geoBut.offsetWidth) / 2 + "px";
		*/
		}

	panel = document.getElementById("controlPanel");
	x = panel.childNodes;
	xx = x[7];
	x = xx.getBoundingClientRect();
	coordsDiv.style.left = x.left + "px";
	coordsDiv.style.top = x.bottom + "px";
	coordsDiv.style.borderRadius = "0px 10px 10px 10px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (coordsDiv.offsetLeft + coordsDiv.offsetWidth > w) {
		coordsDiv.style.left = w - coordsDiv.offsetWidth + "px";
		}
	coordsDiv.style.visibility = "visible";
	}

function mapCoords() {
	gotoLong = document.getElementById("longInp");
	gotoLat = document.getElementById("latInp");

	if (gotoLong.value == "" || gotoLat.value == "" || isNaN(gotoLong.value) == true || isNaN(gotoLat.value) == true) {
		alert("Please enter coordinates in decimal degrees.");
		return;
		}
	
	map.zoomToMaxExtent();
	getDownload();
	document.getElementById("download").style.visibility = "hidden";

	getBounds();
	
	DDPoint = [parseFloat(gotoLong.value), parseFloat(gotoLat.value)];
	DDPointT = proj4(projTo, projFrom, DDPoint).toString();
	DDPointTArray = DDPointT.split(",");

	gotoPoint = new OpenLayers.LonLat;
	gotoPoint.lon = parseFloat(DDPointTArray[0]);
	gotoPoint.lat = parseFloat(DDPointTArray[1]);

	gotoPopup = new OpenLayers.Popup.FramedCloud("gotoPopup", gotoPoint, new OpenLayers.Size(50,50), gotoLong.value + " W<br>" + gotoLat.value + " N", null, true);
	map.addPopup(gotoPopup, true);
	map.setCenter(gotoPoint,document.getElementById("coordsScale").selectedIndex, false, false);

	document.getElementById("coords").style.visibility = "hidden";
	}

function zoomToLayer(layerNum, tmpBi) {
	tmp_id = layerNS[layerNum];
	n = tmp_id.indexOf(":");
	tmp_ws = tmp_id.slice(0,n);
	tmp_cs = tmp_id.slice(n + 1);

	if (layerType[layerNum] == "raster") {
		tmp_url = '/geoserver/rest/workspaces/' + tmp_ws + '/coveragestores/' + tmp_cs + '/coverages/' + tmp_cs + '.json';
		}
	else {
		tmp_url = '/geoserver/rest/workspaces/' + tmp_ws + '/datastores/' + tmp_cs + '/featuretypes/' + tmp_cs + '.json';		
		}

	input = {"cs": tmp_cs, "url": tmp_url};

	//socket.emit('zoom_layer', input);

	$.ajax({url:"http://felek.cns.umass.edu:3412/zoom_layer", 
		type:"POST", 
		success:function(data,status) {
			//alert(data + "\n" + status);
			tmpData = JSON.parse(data);
			}, 
		error:function(xhr,status,error) {
			alert(status + "\n" + error)
			},
		data:input,
		dataType:"text",
		async:false
		});

	if (layerType[layerNum] == "raster") {
		ll = [parseFloat(tmpData.coverage.latLonBoundingBox.minx), parseFloat(tmpData.coverage.latLonBoundingBox.miny)];
		llT = proj4(projTo, projFrom, ll).toString();
		llTArray = llT.split(",");

		ur = [parseFloat(tmpData.coverage.latLonBoundingBox.maxx), parseFloat(tmpData.coverage.latLonBoundingBox.maxy)];
		urT = proj4(projTo, projFrom, ur).toString();
		urTArray = urT.split(",");
		}
	else {
		ll = [parseFloat(tmpData.featureType.latLonBoundingBox.minx), parseFloat(tmpData.featureType.latLonBoundingBox.miny)];
		llT = proj4(projTo, projFrom, ll).toString();
		llTArray = llT.split(",");

		ur = [parseFloat(tmpData.featureType.latLonBoundingBox.maxx), parseFloat(tmpData.featureType.latLonBoundingBox.maxy)];
		urT = proj4(projTo, projFrom, ur).toString();
		urTArray = urT.split(",");
		}

	if (tmpBi == 1) {
		tmpBounds = new OpenLayers.Bounds(llTArray[0], llTArray[1], urTArray[0], urTArray[1]);
		map.zoomToExtent(tmpBounds);
		}
	else {
		
		}
	}

function loadHelp(id) {
	toolDiv = document.getElementById("tool_info");
	toolDiv.style.padding = "0px";
	for (var i=toolDiv.childNodes.length - 1; i>=0; i--) {
		toolDiv.removeChild(toolDiv.childNodes[i]);
		}

	tmpExit = document.createElement("img");
	tmpExit.src = "Images/exit2_small.png";
	tmpExit.setAttribute("onclick", "document.getElementById('tool_info').style.visibility = 'hidden'");
	tmpExit.id = "infoExit";
	tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
	tmpExit.title = "Click to close";
	tmpExit.style.position = "absolute";
	tmpExit.style.right = "0px";
	tmpExit.style.top = "0px";
	tmpExit.style.margin = "2px";
	toolDiv.appendChild(tmpExit);

	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	toolDiv.appendChild(breakP);

	toolHeading = document.createElement("h3");
	toolHeading.id = "toolHeading";
	toolHeading.style.textAlign = "center";
	toolHeading.style.margin = "5px";
	toolDiv.appendChild(toolHeading);
	toolBar = document.createElement("hr");
	toolDiv.appendChild(toolBar);

	toolInfo = document.createElement("p");
	toolInfo.id = "toolInfo";
	toolInfo.style.textAlign = "center";
	toolInfo.style.margin = "5px";
	toolDiv.appendChild(toolInfo);

	switch (id) {
		case "ripHelp": //rpccr tool
			toolHeading.innerHTML = "RPCCR Tool";
			toolInfo.innerHTML = "The Riparian Prioritization for Climate Change Resilience (RPCCR) tool enables users to dynamically locate areas in the riparian zone that would benefit most from increased shading produced by planting of trees. The tool operates on a 200 meter stream buffer (100 on each side), and requires the user to specify values for maximum percent canopy cover and minimum solar gain percentile. The user can additionally choose to include minimum elevation (meters) and maximum percent impervious surface values in the analysis. Finally, the user is able to restrict the analysis to only those polygons highlighted using the Feature Select tool located on the control panel. The analysis begins by acquiring the solar gain distribution of pixels located in the buffer zone of selected features, and calculates the value that corresponds to the user-specified percentile. This value, along with the values specified for canopy cover and other selected layers, is then used to construct a map algebra query which builds and returns a simple raster in which individual pixels are given a value of 101 if they meet all conditions, or 100 if they fail to meet one or more conditions. The returned layer name is created by concatenating the name of the layer that contains the selected feature, the selected feature's unique id, the specified percent canopy cover and solar gain percentile values, and if selected, the specified elevation and impervious surface values. The user can also specify to run statistics on the selected layers and output. If checked, a window will pop up at the conclusion of the analysis displaying the specified input, descriptive statistics for the input layers, and counts for the output layer.";
			break;
		case "drainHelp": //drainage area calculator
			toolHeading.innerHTML = "Drainage Area Calculator";
			toolInfo.innerHTML = "The Drainage Area Calculator tool uses values found in the National Hydrography Dataset Plus (NHD+) version 2 flow accumulation (fac) grid to calculate a user-specified drainage area for a point clicked on the map. The fac grid is a raster composed of 30 x 30 meter pixels, where each pixel's value is the cumulative number of other pixels that flow into that pixel. The tool functions by acquiring the longitude and latitude of the user-selected point, and uses those values to construct a query to retrieve the flow accumulation value of the pixel containing that point. This value is then converted into the area units specified by the user, and displayed in a pop-up window along with the corresponding point coordinates. Points clicked outside of the rectangle will return a value of 'Outside EBTJV Range'.";
			break;
		}
	toolDiv.style.visibility = "visible";
	}

function load_stats() {
	statsDiv = document.getElementById("stats_info");
	statsDiv.style.padding = "0px";
	for (var i=statsDiv.childNodes.length - 1; i>=0; i--) {
		statsDiv.removeChild(statsDiv.childNodes[i]);
		}

	tmpExit = document.createElement("img");
	tmpExit.src = "Images/exit2_small.png";
	tmpExit.setAttribute("onclick", "document.getElementById('stats_info').style.visibility = 'hidden'");
	tmpExit.id = "infoExit";
	tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
	tmpExit.title = "Click to close";
	//tmpExit.style.position = "absolute";
	//tmpExit.style.right = "0px";
	//tmpExit.style.top = "0px";
	tmpExit.style.cssFloat = "right";
	tmpExit.style.margin = "2px";
	statsDiv.appendChild(tmpExit);

	breakP = document.createElement("p");
	breakP.innerHTML = "<br>";
	breakP.style.margin = "0px";
	statsDiv.appendChild(breakP);

	statsHeading = document.createElement("h2");
	statsHeading.id = "statsHeading";
	statsHeading.innerHTML = "Statistics";
	statsHeading.style.textAlign = "center";
	statsHeading.style.margin = "5px";
	statsDiv.appendChild(statsHeading);
	statsBar = document.createElement("hr");
	statsDiv.appendChild(statsBar);

	statsInfo = document.createElement("textarea");
	//statsInfo.setAttribute("onclick", "this.select()");
	statsInfo.id = "statsInp";
	statsInfo.name = "statsInp";
	statsInfo.cols = 75;
	statsInfo.rows = tmpRows;
	statsInfo.value = tmpStats;
	statsInfo.style.margin = "5px";
	statsInfo.readOnly = "true";
	statsInfo.id = "statsInfo";
	statsDiv.appendChild(statsInfo);
	
	statsDiv.style.visibility = "visible";
	}
