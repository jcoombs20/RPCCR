function socket_emit() {
	socket = io.connect('http://felek.cns.umass.edu:3412');

	socket.on('get_rid', function(tmpData) {
		rid = [];
		for (var i=0; i<tmpData.length; i++) {
			rid.push({"rid": tmpData[i].rid});
			}
		input = {"layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid, "solgain": document.getElementById("solGainInp").value};
		tmpProgress.innerHTML = "Calculating solar gain percentile value";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('solar_gain_percentile', input);
		});
	socket.on('solar_gain_percentile', function(tmpData) {
		solgainval = tmpData.value;
		input = {"layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid, "solgain": document.getElementById("solGainInp").value, "solgainval": solgainval, "cancov": document.getElementById("canInp").value, "el": document.getElementById("elInp").value, "eluse": document.getElementById("elCheck").checked, "impsur": document.getElementById("impSurInp").value, "impsuruse": document.getElementById("impSurCheck").checked, "file_name": file_name};
		tmpProgress.innerHTML = "Outputting map algebra function to GeoTIFF file";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('map_algebra', input);
		});
	socket.on('map_algebra', function(tmpData) {
		rpccr_file_name.push(file_name);
		input = {"file_name": file_name};
		tmpProgress.innerHTML = "Zipping File";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('zip_it', input);
		});
	socket.on('zip_it', function(tmpData) {
		input = {"ws":"rpccr", "cs": cs_id, "file": file_loc, "style":"rpccr_style"};
		tmpProgress.innerHTML = "Verifying Workspace";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('add_ws', input);
		});
	socket.on('add_ws', function(tmpData) {
		tmpProgress.innerHTML = "Creating Coverage Store";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('add_cs', input);
		});
	socket.on('add_cs', function(tmpData) {
		tmpProgress.innerHTML = "Adding Coverage";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('add_coverage', input);
		});
	socket.on('add_coverage', function(tmpData) {
		tmpProgress.innerHTML = "Verifying Style";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('add_style', input);
		});
	socket.on('add_style', function(tmpData) {
		tmpProgress.innerHTML = "Assigning Style";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		socket.emit('change_style', input);
		});
	socket.on('change_style', function(tmpData) {
		tmpProgress.innerHTML = "Adding Layer to Map";
		stepCnt += 1;
		tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";
		rpccr_id.push(cs_id);
		rpccr_count = rpccrLayers[rpccrLayers.length];
		rpccrLayers[rpccr_count] = new OpenLayers.Layer.WMS( cs_id,
 			"http://felek.cns.umass.edu:8080/geoserver/rpccr/wms", 
			{layers: cs_id, format: "image/png", transparent: true} 
			);
		layerVar.push(rpccrLayers[rpccr_count]);
		layerNS.push("rpccr:" + cs_id);
		layerType.push("raster");
		legSpec.push("rpccr");
		layerDescription.push("Raster created by the RPCCR tool showing optimal tree planting locations based on the selected features and threshold values specified by the user");
		uniqueID.push("");
		map.addLayer(rpccrLayers[rpccr_count]);
		x = map.getNumLayers();
		map.setLayerIndex(rpccrLayers[rpccr_count],x-4);
		rpccrLayers[rpccr_count].setVisibility(true);

		if (document.getElementById("statsCheck").checked == true) {
			tmpProgress.innerHTML = "Calculating Statistics";
			stepCnt += 1;
			tmpStatus.style.width = Math.round((stepCnt/steps)*100) + "%";

			tmpRows = 8;
			tmpStats = "Specified Values\rCanopy Cover: " + document.getElementById("canInp").value + "\rSolar Gain Percentile: " + document.getElementById("solGainInp").value + "\rEquivalent Percentile Value: " + solgainval + "\r";
			if (document.getElementById("elCheck").checked == true) {
				tmpStats += "Elevation: " + document.getElementById("elInp").value + "\r";
				tmpRows += 1;
				}
			if (document.getElementById("impSurCheck").checked == true) {
				tmpStats += "Impervious Surface: " + document.getElementById("impSurInp").value + "\r";
				tmpRows += 1;
				}
			
			tmpStr = "";
			for (i in oid) {
				if (i == 0) {
					tmpStr = oid[i].oid;
					}
				else {
					tmpStr += ", " + oid[i].oid;
					}
				}
			tmpStats += "Selected Feature Layer: " + rpccrSFLayer + "\rSelected Feature ID: " + tmpStr + "\r";
			tmpStats += "\rLayer Name\tMean\tSt_Dev\tMin\t0.25\tMedian\t0.75\tMax\r";
			statsCnt = 0;
			input = {"stat_layer": "can_cov_11", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
			socket.emit("get_stats", input);
			}
		else {
			createLegend();
			zoomToLayer(x-4,1);
			rpccr_visual(0);
			}
		});
	socket.on('get_stats', function(tmpData) {
		switch(statsCnt) {
			case 0:
				tmpStr = "Canopy Cover\t" + tmpData[0].mean.toFixed(2) + "\t" + tmpData[0].stddev.toFixed(2);
				input = {"stat_layer": "can_cov_11", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit('get_quants', input);
				break;
			case 1:
				tmpStr = "Solar Gain\t" + tmpData[0].mean.toFixed(2) + "\t" + tmpData[0].stddev.toFixed(2);
				input = {"stat_layer": "solar_gain_cor_11", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit('get_quants', input);
				break;
			case 2:
				tmpStr = "Elevation\t" + tmpData[0].mean.toFixed(2) + "\t" + tmpData[0].stddev.toFixed(2);
				input = {"stat_layer": "ned_10_wgs84", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit('get_quants', input);
				break;
			case 3:
				tmpStr = "Imp. Surface\t" + tmpData[0].mean.toFixed(2) + "\t" + tmpData[0].stddev.toFixed(2);
				input = {"stat_layer": "imp_sur_11", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit('get_quants', input);
				break;
			}
		});
	socket.on('get_quants', function(tmpData) {
		tmpStr += "\t" + tmpData[0].value + "\t" + tmpData[1].value + "\t" + tmpData[2].value + "\t" + tmpData[3].value + "\t" + tmpData[4].value + "\r";
		tmpStats += tmpStr;
		
		tmpRows += 1;

		if (statsCnt == 1) {
			if (document.getElementById("elCheck").checked == true) {
				statsCnt = 2;
				}
			else if (document.getElementById("impSurCheck").checked == true) {
				statsCnt = 3;
				}
			else {
				statsCnt = 4;
				}
			}
		else if (statsCnt == 2) {
			if (document.getElementById("impSurCheck").checked == true) {
				statsCnt = 3;
				}
			else {
				statsCnt = 4;
				}
			}
		else {
			statsCnt += 1;
			}

		switch(statsCnt) {
			case 1:
				input = {"stat_layer": "solar_gain_cor_11", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit("get_stats", input);
				break;
			case 2:
				input = {"stat_layer": "ned_10_wgs84", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit("get_stats", input);
				break;
			case 3:
				input = {"stat_layer": "imp_sur_11", "layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid};
				socket.emit("get_stats", input);
				break;
			case 4:
				input = {"layer": rpccrSFLayer, "id_field": uniqueID[rpccrSFNum], "oid": oid, "rid": rid, "solgain": document.getElementById("solGainInp").value, "solgainval": solgainval, "cancov": document.getElementById("canInp").value, "el": document.getElementById("elInp").value, "eluse": document.getElementById("elCheck").checked, "impsur": document.getElementById("impSurInp").value, "impsuruse": document.getElementById("impSurCheck").checked, "file_name": file_name};
				socket.emit('get_counts', input);
				break;
			}
		});
	socket.on('get_counts', function(tmpData) {
		tmpStats += "\rMap Algebra Results \rCells meeting specifications: " + tmpData[1].count + "\rCells not meeting specifications: " + tmpData[0].count;
		tmpRows += 4;

		createLegend();
		zoomToLayer(x-4,1);
		rpccr_visual(0);
		load_stats();
		});
	socket.on('zoom_layer', function(data) {

		});
	socket.on('BB_zip_rid', function(tmpData) {
		rid = [];
		for (var i=0; i<tmpData.length; i++) {
			rid.push({"rid": tmpData[i].rid});
			}
		a = layerNS[dloadIndex + 2].indexOf(":");
		BBinput = {"raster_name": layerNS[dloadIndex + 2].slice(a+1), "maxLeft": maxLeft, "maxBottom": maxBottom, "maxRight": maxRight, "maxTop": maxTop, "rid": rid};
		socket.emit('BB_zip_query', BBinput);
		});
	socket.on('BB_zip_query', function(tmpData) {
		tmpTime = tmpData.tmpTime;
		a = layerNS[dloadIndex + 2].indexOf(":");
		BBinput = {"raster_name": layerNS[dloadIndex + 2].slice(a+1), "tmpTime": tmpTime};
		socket.emit('BB_zip_it', BBinput);
		});
	socket.on('BB_zip_it', function(tmpData) {
		tmpTime = tmpData.tmpTime;
		raster_name = tmpData.raster_name;
		a = layerNS[dloadIndex + 2].indexOf(":");
		tmpStr = "http://felek.cns.umass.edu:8080/geoserver/www/GIS_zips/" + layerNS[dloadIndex + 2].slice(a+1) + "_" + tmpTime + ".zip";
		download_id.push(raster_name + "_" + tmpTime + ".zip");
		//window.location(tmpStr);
		window.open(tmpStr, "_blank");
		});
	socket.on('get_area_contains', function(tmpData) {
		if (tmpData[0].contains == true) {
			input = {"lat": tmpLat, "lon": tmpLon, "unit": daIndex};
			socket.emit('get_area_rid', input);
			}
		else {
			show_area("Outside EBTJV Range");
			}
		});
	socket.on('get_area_rid', function(tmpData) {
		rid = [];
		for (var i=0; i<tmpData.length; i++) {
			rid.push({"rid": tmpData[i].rid});
			}
		input = {"lat": tmpLat, "lon": tmpLon, "unit": daIndex, "rid": rid};
		socket.emit('get_area', input);
		});
	socket.on('get_area', function(tmpData) {
		show_area(tmpData);
		});
	socket.on('disconnect', function(err) {
		//alert('Socket has been disconnected');
		});
	socket.on('error', function(err) {
		socket.emit('disconnect');
		alert(err.error);
		rpccr_visual(0);
		});
	}