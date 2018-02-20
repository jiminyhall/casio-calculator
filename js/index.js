var mode = "t1-0"; // "t1-0" "t1-1" "t2-0" "t2-1"
var displayVal = "";
var opsTermVal = "";
var opsVal = "";

function showText(name) {
  document.getElementById("operator").innerHTML = name;
}

function press(name) {

  console.log(name);

  if (name === "clear") {
    console.log('Clear');
    document.getElementById("display").innerHTML = "";
    displayVal = "";
    opsTermVal = "";
    document.getElementById("ops").innerHTML = "";
    opsVal = "";
    mode = "t1-0";
    return;
  }

  if (mode === "t1-0") {
    console.log("MODE t1-0");
    if (/[1-9]/.test(name)) {
      console.log("1-9");
      displayVal = name;
      document.getElementById("display").innerHTML = displayVal;
      mode = "t1-1";
    } else if (/\./.test(name)) {
      displayVal = "0.";
      document.getElementById("display").innerHTML = displayVal;
      mode = "t1-1";
    }
  }
  // ACCEPT TERM 1 - MORE THAN ONE CHAR
  else if (mode === "t1-1") {
    console.log("MODE t1-1");
    if (/[0-9]/.test(name) && displayVal.length < 10) {
      console.log("0-9");
      displayVal += name;
      document.getElementById("display").innerHTML = displayVal;
    } else if (/\./.test(name) && displayVal.length < 9 && !displayVal.includes(".")) {
      console.log("point");
      displayVal += name;
      document.getElementById("display").innerHTML = displayVal;
    } else if (/[\+\-\*\/]/.test(name)) {
      console.log("op");
      opsVal = name;
      document.getElementById("ops").innerHTML = opsVal;
      mode = "t2-0";
    }
  }

  else if (mode === "t2-0") {
    console.log("MODE t2-0");
    if (/[1-9]/.test(name)) {
      console.log("1-9");
      opsTermVal = name;
      document.getElementById("display").innerHTML = opsTermVal;
      mode = "t2-1";
    } else if (/\./.test(name)) {
      console.log("point");
      opsTermVal = "0.";
      document.getElementById("display").innerHTML = opsTermVal;
      mode = "t2-1";
    } else if (/[\+\-\*\/]/.test(name)) {
      console.log("op");
      opsVal = name;
      document.getElementById("ops").innerHTML = opsVal;
    } else if ( /=/.test(name) && opsVal !== "") {
      console.log("redo last op " + opsVal + opsTermVal);
      switch(opsVal) {
        case "*":
          displayVal = displayVal * opsTermVal;
          break;
        case "/":
          displayVal = displayVal / opsTermVal;
          break;
        case "-":
          displayVal = displayVal - opsTermVal;
          break;
        case "+":
          displayVal = parseInt(displayVal) + parseInt(opsTermVal);
          break;
      }

      console.log("Op Equals: " + displayVal + " len: " + displayVal.toString().length);
      if(displayVal.toString().length > 10) {
        document.getElementById("display").innerHTML = "Err: Size";
        document.getElementById("ops").innerHTML = "";
      } else {
        document.getElementById("display").innerHTML = displayVal;
        mode = "t2-0";
      }
    } else {
      console.log("t2-0 nothing");
    }
  }

  else if (mode === "t2-1") {

    console.log("MODE t2-1");

    if (/[0-9]/.test(name) && opsTermVal.length < 10) {
      console.log("0-9");
      opsTermVal += name;
      document.getElementById("display").innerHTML = opsTermVal;
    } else if (/\./.test(name) && opsTermVal.length < 9 && !opsTermVal.includes(".")) {
      console.log("point");
      opsTermVal += name;
      document.getElementById("display").innerHTML = opsTermVal;
    } else if (/[\+\-\*\/]/.test(name)) {
      switch(opsVal) {
        case "*":
          displayVal = displayVal * opsTermVal;
          break;
        case "/":
          displayVal = displayVal / opsTermVal;
          break;
        case "-":
          displayVal = displayVal - opsTermVal;
          break;
        case "+":
          displayVal = parseInt(displayVal) + parseInt(opsTermVal);
          break;
      }

      console.log("Op Equals: " + displayVal + " len: " + displayVal.toString().length);
      if(displayVal.toString().length > 10) {
        document.getElementById("display").innerHTML = "Err: Size";
        document.getElementById("ops").innerHTML = "";
      } else {
        document.getElementById("display").innerHTML = displayVal;
        opsVal = name;
        opsTermVal = "";
        document.getElementById("ops").innerHTML = opsVal;
        mode = "t2-0";
      }
    } else if(/=/.test(name)) {
      console.log("t2-1 + =");
      switch(opsVal) {
        case "*":
          displayVal = displayVal * opsTermVal;
          break;
        case "/":
          displayVal = displayVal / opsTermVal;
          break;
        case "-":
          displayVal = displayVal - opsTermVal;
          break;
        case "+":
          displayVal = parseInt(displayVal) + parseInt(opsTermVal);
          break;
      }

      console.log("Equals: " + displayVal + " len: " + displayVal.toString().length);
      if(displayVal.toString().length > 10) {
        document.getElementById("display").innerHTML = "Err: Size";
        document.getElementById("ops").innerHTML = "";
      } else {
        document.getElementById("display").innerHTML = displayVal;
        mode = "t2-0";
      }
    }
  }

  else {
    console.log("no mode");
  }
}

var aboutBtn = document.getElementById("aboutBtn");
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("aboutModal");

aboutBtn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onresize = function(event) {

  // resize the output screen
  var ratio = document.getElementById("casio-map").width / document.getElementById("casio-map").naturalWidth;
  var newBuffer = -280*ratio;
  var newHeight = 40*ratio;
  var newWidth = 124*ratio;
  document.getElementById("display-container").style.top = newBuffer + "px";
  document.getElementById("display-container").style.height = newHeight + "px";
  document.getElementById("display-container").style.width = newWidth + "px";
  console.log("Window resized. Image width: " + document.getElementById("casio-map").width + " new buffer: " + newBuffer);
}

$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();

  /*
	$('area').on('click', function() {
		alert($(this).attr('alt') + ' clicked');
	});
  */
});
