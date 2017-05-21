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
          displayVal = displayVal + opsTermVal;
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
          displayVal = displayVal + opsTermVal;
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
          displayVal = displayVal + opsTermVal;
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
  /* console.log(name);

  if ((displayVal.length > 8) && ((name === ".") || (name === "1") || (name==="2") || (name==="3") || (name==="4")|| (name==="5") || (name==="6") || (name==="7")|| (name==="8")|| (name==="9"))) {
    console.log("too many chars");
    return;
  }


  switch (name) {
    case "*":
    case "+":
    case "-":
    case "/":
      console.log(name + " operator on " + displayVal);
      if(displayVal !== "") {
        console.log(name);
        opsVal = name;
        document.getElementById("ops").innerHTML = opsVal;
      }
      break;
    case "=":

    case "0":
      if (displayVal === "")
        break;
      if(opsVal !== "")
        if(opsTermVal === "")
          break;
    case ".":
      if (displayVal === "") {
        displayVal = "0.";
        document.getElementById("display").innerHTML = displayVal;
        break;
      } else if (displayVal.contains(".")) {
        break;
      } else if (opsVal !== "" && opsTermVal ==="") {
        opsTermVal = "0.";
        document.getElementById("display").innerHTML = opsTermVal;
        break;
      }

    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (displayVal === "" && opsVal === "") {
        displayVal = name;
        document.getElementById("display").innerHTML = displayVal;
      } else if (displayVal !== "" && opsVal === "") {
        displayVal += name;
        document.getElementById("display").innerHTML = displayVal;
      } else if (opsVal !== "" && opsTermVal === "") {
        opsTermVal = name;
        document.getElementById("display").innerHTML = opsTermVal;
      } else if (opsVal === "") {
        opsTermVal += name;
        document.getElementById("display").innerHTML = opsTermVal;
      }
      break;
    case "clear":
      console.log('Clear');
      document.getElementById("display").innerHTML = "";
      displayVal = "";
      opsTermVal = "";
      document.getElementById("ops").innerHTML = "";
      opsVal = "";
      break;
    default:
  }

  */
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
