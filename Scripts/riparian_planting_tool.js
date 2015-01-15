function getRiparian() {
	document.getElementById("download").style.visibility = "hidden";
	document.getElementById("idLayerList").style.visibility = "hidden";
	document.getElementById("selLayerList").style.visibility = "hidden";
	document.getElementById("coords").style.visibility = "hidden";
	document.getElementById("drain_area").style.visibility = "hidden";

	ripDiv = document.getElementById("riparian");
	if (ripDiv.style.visibility == "visible") {
		ripDiv.style.visibility = "hidden";
		return;
		}
	if (ripDiv.childNodes.length == 0) {
		ripDiv.style.padding = "0px";

		tmpExit = document.createElement("img");
		tmpExit.src = "Images/exit2_small.png";
		tmpExit.title = "Click to close";
		tmpExit.setAttribute("onclick", "document.getElementById('riparian').style.visibility = 'hidden'");
		tmpExit.id = "ripExit";
		tmpExit.setAttribute("onmouseover", "selCursor(this.id)");
		tmpExit.style.cssFloat = "right";
		tmpExit.style.margin = "2px";
		tmpExit.style.marginRight = "5px";
		ripDiv.appendChild(tmpExit);

		tmpHelp = document.createElement("img");
		tmpHelp.src = "Images/help-small.png";
		tmpHelp.title = "Click to show information about this tool";
		tmpHelp.id = "ripHelp";
		tmpHelp.setAttribute("onclick", "loadHelp(this.id)");
		tmpHelp.setAttribute("onmouseover", "selCursor(this.id)");
		tmpHelp.style.cssFloat = "right";
		tmpHelp.style.margin = "2px";
		ripDiv.appendChild(tmpHelp);

		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripDiv.appendChild(breakP);

		ripHeading = document.createElement("p");
		ripHeading.innerHTML = "Input Specifications";
		ripHeading.style.textAlign = "center";
		ripHeading.style.margin = "0px";
		ripDiv.appendChild(ripHeading);
		ripBar = document.createElement("hr");
		ripDiv.appendChild(ripBar);

		ripForm = document.createElement("form");
		ripForm.id = "ripForm";

		canCheck = document.createElement("input");
		canCheck.setAttribute("type", "checkbox");
		canCheck.id = "canCheck";
		canCheck.style.margin = "5px";
		canCheck.style.visibility = "hidden";
		ripForm.appendChild(canCheck);
		canCheck.checked = true;
		canLab = document.createElement("label");
		canLab.innerHTML = "% Canopy Cover <=";
		canLab.style.margin = "5px";
		canLab.style.marginRight = "49px";
		ripForm.appendChild(canLab);
		canInp = document.createElement("input");
		canInp.setAttribute("type", "text");
		canInp.setAttribute("onblur", "validate(this.value,this.id)");
		canInp.setAttribute("onfocus", "this.select()");
		canInp.setAttribute("onclick", "this.select()");
		canInp.id = "canInp";
		canInp.name = "canInp";
		canInp.value = "70";
		canInp.title = "Enter the maximum percent canopy cover to include in the analysis";
		canInp.style.margin = "5px";
		canInp.style.width = "70px";
		ripForm.appendChild(canInp);
		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripForm.appendChild(breakP);

		solGainCheck = document.createElement("input");
		solGainCheck.setAttribute("type", "checkbox");
		solGainCheck.id = "solGainCheck";
		solGainCheck.style.margin = "5px";
		solGainCheck.style.visibility = "hidden";
		ripForm.appendChild(solGainCheck);
		solGainCheck.checked = true;
		solGainLab = document.createElement("label");
		solGainLab.innerHTML = "Solar Gain Percentile >=";
		solGainLab.style.margin = "5px";
		solGainLab.style.marginRight = "15px";
		ripForm.appendChild(solGainLab);
		solGainInp = document.createElement("input");
		solGainInp.setAttribute("type", "text");
		solGainInp.setAttribute("onblur", "validate(this.value,this.id)");
		solGainInp.setAttribute("onfocus", "this.select()");
		solGainInp.setAttribute("onclick", "this.select()");
		solGainInp.id = "solGainInp";
		solGainInp.name = "solGainInp";
		solGainInp.value = "75";
		solGainInp.title = "Enter the minimum solar gain percentile to include in the analysis";
		solGainInp.style.margin = "5px";
		solGainInp.style.width = "70px";
		ripForm.appendChild(solGainInp);
		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripForm.appendChild(breakP);

		elCheck = document.createElement("input");
		elCheck.setAttribute("type", "checkbox");
		elCheck.id = "elCheck";
		elCheck.style.margin = "5px";
		ripForm.appendChild(elCheck);
		elCheck.checked = true;
		elLab = document.createElement("label");
		elLab.innerHTML = "Elevation (m) >=";
		elLab.style.margin = "5px";
		elLab.style.marginRight = "69px";
		ripForm.appendChild(elLab);
		elInp = document.createElement("input");
		elInp.setAttribute("type", "text");
		elInp.setAttribute("onblur", "validate(this.value,this.id)");
		elInp.setAttribute("onfocus", "this.select()");
		elInp.setAttribute("onclick", "this.select()");
		elInp.id = "elInp";
		elInp.name = "elInp";
		elInp.value = "600";
		elInp.title = "Enter the minimum elevation (in meters) to include in the analysis";
		elInp.style.margin = "5px";
		elInp.style.width = "70px";
		ripForm.appendChild(elInp);
		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripForm.appendChild(breakP);

		impSurCheck = document.createElement("input");
		impSurCheck.setAttribute("type", "checkbox");
		impSurCheck.id = "impSurCheck";
		impSurCheck.style.margin = "5px";
		ripForm.appendChild(impSurCheck);
		impSurCheck.checked = true;
		impSurLab = document.createElement("label");
		impSurLab.innerHTML = "% Impervious Surface <=";
		impSurLab.style.margin = "5px";
		impSurLab.style.marginRight = "15px";
		ripForm.appendChild(impSurLab);
		impSurInp = document.createElement("input");
		impSurInp.setAttribute("type", "text");
		impSurInp.setAttribute("onblur", "validate(this.value,this.id)");
		impSurInp.setAttribute("onfocus", "this.select()");
		impSurInp.setAttribute("onclick", "this.select()");
		impSurInp.id = "impSurInp";
		impSurInp.name = "impSurInp";
		impSurInp.value = "10";
		impSurInp.title = "Enter the maximum percent impervious surface to include in the analysis";
		impSurInp.style.margin = "5px";
		impSurInp.style.width = "70px";
		ripForm.appendChild(impSurInp);
		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripForm.appendChild(breakP);

		conSelCheck = document.createElement("input");
		conSelCheck.setAttribute("type", "checkbox");
		conSelCheck.setAttribute("onclick", "conSelAlert(this.checked)");
		conSelCheck.id = "conSelCheck";
		conSelCheck.title = "Check to restrict the extent of the analysis to the boundaries of the selected feature(s)";
		conSelCheck.style.margin = "5px";
		ripForm.appendChild(conSelCheck);
		conSelCheck.checked = true;
		conSelLab = document.createElement("label");
		conSelLab.innerHTML = "Restrict Extent by Selected Features";
		conSelLab.style.margin = "5px";
		conSelLab.style.marginRight = "15px";
		ripForm.appendChild(conSelLab);
		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripForm.appendChild(breakP);

		statsCheck = document.createElement("input");
		statsCheck.setAttribute("type", "checkbox");
		statsCheck.id = "statsCheck";
		statsCheck.title = "Check to output basic statistics for selected raster layer inputs and output, NOTE: Checking can result in substantial increases in analysis time";
		statsCheck.style.margin = "5px";
		ripForm.appendChild(statsCheck);
		statsCheck.checked = false;
		statsLab = document.createElement("label");
		statsLab.innerHTML = "Output statistics for selected raster layers";
		statsLab.style.margin = "5px";
		statsLab.style.marginRight = "15px";
		ripForm.appendChild(statsLab);
		breakP = document.createElement("p");
		breakP.innerHTML = "<br>";
		breakP.style.margin = "0px";
		ripForm.appendChild(breakP);

		ripDiv.appendChild(ripForm);

		submitInp = document.createElement("button");
		submitInp.setAttribute("onclick", "addRPCCR()");
		submitInp.setAttribute("onmouseup", "rpccr_visual(1)");
		submitInp.style.cursor = "pointer";
		submitInp.id = "submitInp";
		submitInp.innerHTML = "Perform Analysis";
		submitInp.title = "Click to perform the analysis using the current specified features, layers, and values";
		submitInp.style.width = "125px";
		submitInp.style.marginBottom = "10px";
		ripDiv.appendChild(submitInp);
		
		testBut = document.createElement("button");
		testBut.innerHTML = "Download";
		testBut.setAttribute("onclick", "test()");
		//ripDiv.appendChild(testBut);
		}
	submitInp.style.marginLeft = (ripDiv.offsetWidth - submitInp.offsetWidth)/2 + "px";
	panel = document.getElementById("controlPanel");
	x = panel.childNodes;
	xx = x[16];
	x = xx.getBoundingClientRect();
	ripDiv.style.left = x.left + "px";
	ripDiv.style.top = x.bottom + "px";
	ripDiv.style.borderRadius = "0px 10px 10px 10px";

	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (ripDiv.offsetLeft + ripDiv.offsetWidth > w) {
		ripDiv.style.left = w - ripDiv.offsetWidth + "px";
		}
	ripDiv.style.visibility = "visible";
	}

function test() {
	input = {"layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid};
	socket.emit('test', input);	
	}

function validate(val, id) {
	if (isNaN(val) == true) {
		if (id == "elInp") {
			alert("Please enter a value");
			document.getElementById(id).focus();
			return 1;
			}
		else {
			alert("Please enter a value between 0 and 100 inclusive");
			document.getElementById(id).focus();
			return 1;
			}
		}
	if (id != "elInp") {
		if(val < 0 || val > 100) {
			alert("Please enter a value between 0 and 100 inclusive");
			document.getElementById(id).focus();
			return 1;
			}
		}
	return 0;
	}

function conSelAlert(tmpCheck) {
	if (tmpCheck == false) {
		alert("Unchecking this option makes the analysis default to the 'EBTJV Boundary' layer,\nregardless of whether features are selected or not,\nwhich will be quite time consuming.");
		}
	}

function addRPCCR() {
	if (oid.length == 0 && document.getElementById("conSelCheck").checked == true) {
		alert("You have not selected any features");
		rpccr_visual(0);
		return;
		}

	for (var i=0;i<4;i++) {
		switch (i) {
			case 0:
				valid = validate(document.getElementById("canInp").value, document.getElementById("canInp").id);
				if (valid == 1)  {
					console.log("valid: " + valid);
					rpccr_visual(0);
					document.getElementById("riparian").style.visibility = "visible";
					return;
					}
				break;
			case 1:
				valid = validate(document.getElementById("solGainInp").value, document.getElementById("solGainInp").id);
				if (valid == 1)  {
					rpccr_visual(0);
					document.getElementById("riparian").style.visibility = "visible";
					return;
					}
				break;
			case 2:
				valid = validate(document.getElementById("elInp").value, document.getElementById("elInp").id);
				if (valid == 1)  {
					rpccr_visual(0);
					document.getElementById("riparian").style.visibility = "visible";
					return;
					}
				break;
			case 3:
				valid = validate(document.getElementById("impSurInp").value, document.getElementById("impSurInp").id);
				if (valid == 1)  {
					rpccr_visual(0);
					document.getElementById("riparian").style.visibility = "visible";
					return;
					}
				break;
			}
		}

	if (document.getElementById("conSelCheck").checked == false) {
		clearSelFeat();
		oid.push({"oid": 0});
		rpccrSFLayer = "ebtjv_boundary";
		for (var i=0;i<layerNS.length;i++) {
			if (layerNS[i] == "EBTJV:EBTJV_Boundary") {
				rpccrSFNum = i;
				break;
				}
			}
		}
		
	tmpProgress = document.getElementById("progress");
	tmpStatus = document.getElementById("prog_state");
	if (document.getElementById("statsCheck").checked == true) {
		steps = 12;
		}
	else {
		steps = 11;
		}
	stepCnt = -1;
	tmpProgress.innerHTML = "Initiating...";
	stepCnt += 1;
	tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";

	strOid = "";
	for (i in oid) {
		if (strOid == "") {
			strOid = oid[i].oid;
			}
		else {
			strOid += "-" + oid[i].oid;
			}
		}

	tmp_cs_id = rpccrSFLayer + "-" + strOid + "-" + document.getElementById("canInp").value + "-" + document.getElementById("solGainInp").value;
	if (document.getElementById("elCheck").checked == true) {
		tmp_cs_id +=  "-" + document.getElementById("elInp").value
		}
	if (document.getElementById("impSurCheck").checked == true) {
		tmp_cs_id +=  "-" + document.getElementById("impSurInp").value
		}
	cs_id = tmp_cs_id.replace(" ", "_");

	
	file_loc = "rpccr/" + cs_id + ".tif";
	file_name = cs_id + ".tif";
		
	for (var i=0; i<rpccr_id.length; i++) {
		if (rpccr_id[i] == cs_id) {
			alert("The RPCCR layer you are attempting to add is already present on the map.");
			rpccr_visual(0);
			return;
			}
		}

	input = {"layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid};

	tmpProgress.innerHTML = "Acquiring rid values";
	stepCnt += 1;
	tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";

	socket.emit('get_rid', input);
	}

function delay() {
	return;
	}

function rpccr_visual(tmpBi) {
	if (tmpBi == 0) {
		document.getElementById("rpccr_background").style.visibility = "hidden";
		document.getElementById("rpccr_status").style.visibility = "hidden";
		}
	else {
		tmpDiv = document.getElementById("rpccr_status");
		if (tmpDiv.childNodes.length == 0) {
			rpccr_title = document.createElement("h1");
			rpccr_title.innerHTML = "Request Status";
			rpccr_title.style.textAlign = "center";
			tmpDiv.appendChild(rpccr_title);
			progress = document.createElement("p");
			progress.id = "progress";
			progress.style.textAlign = "center";
			tmpDiv.appendChild(progress);
			prog_cont = document.createElement("div");
			prog_cont.style.width = "100%";
			prog_cont.style.height = "20px";
			prog_cont.style.borderTop = "solid";
			prog_cont.style.borderBottom = "solid";
			prog_cont.style.borderWidthTop = "2px";
			prog_cont.style.borderWidthBottom = "2px";
			prog_cont.style.borderColor = "#FFFFFF";
			prog_cont.style.backgroundColor = "#000000";
			prog_cont.style.opacity = 1;
			prog_state = document.createElement("div");
			prog_state.id = "prog_state";
			prog_state.style.height = "100%";
			prog_state.style.width = "0%";
			prog_state.style.backgroundColor = "#00FF00";
			prog_state.style.opacity = 1;
			prog_cont.appendChild(prog_state);
			tmpDiv.appendChild(prog_cont);
			}
		w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		tmpDiv.style.top = (h - tmpDiv.offsetHeight)/2 + "px";
		tmpDiv.style.left = (w - tmpDiv.offsetWidth)/2 + "px";
		progress.innerHTML = "Initiating...";
		document.getElementById("riparian").style.visibility = "hidden";
		document.getElementById("rpccr_background").style.visibility = "visible";
		document.getElementById("rpccr_status").style.visibility = "visible";
		}
	}
