// ========   For Sign In  ============
var signName = document.getElementById("signN");
var signEmail = document.getElementById("signE");
var signPassword = document.getElementById("signP");
var signMessage = document.getElementById("sinM");

// ========   For Log In  ============
var logEmail = document.getElementById("logE");
var logPassword = document.getElementById("logP");
var logMessage = document.getElementById("logM");

// ========   For Log In  ============
var homeM = document.getElementById("homeM");

var usersList = [];

if (localStorage.getItem("users")) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

function sign() {
  if (
    signName.value == "" ||
    signEmail.value == "" ||
    signPassword.value == ""
  ) {
    signMessage.innerHTML = "All inputs are required";
    signName.classList.add("is-invalid");
    signEmail.classList.add("is-invalid");
    signPassword.classList.add("is-invalid");
    return;
  } else if (
    vaildName(signName.value) &&
    vaildEmail(signEmail.value) &&
    vaildPassword(signPassword.value)
  ) {
    for (var i = 0; i < usersList.length; i++) {
      if (usersList[i].email == signEmail.value) {
        signEmail.classList.add("is-invalid");
        signMessage.innerHTML = "This email is already exist";
        return;
      }
    }
    var temp = {
      name: signName.value,
      email: signEmail.value,
      password: signPassword.value,
    };
    usersList.push(temp);
    localStorage.setItem("users", JSON.stringify(usersList));
    signMessage.innerHTML = "success";
    signEmail.classList.remove("is-invalid");
    signName.classList.remove("is-invalid");
    signPassword.classList.remove("is-invalid");
    clear(signName, signEmail, signPassword);
    return;
  } else {
    signName.classList.add("is-invalid");
    signEmail.classList.add("is-invalid");
    signPassword.classList.add("is-invalid");
    signMessage.innerHTML = "Inputs Not Follow Instruction";
    return;
  }
}

function log() {
  if (logEmail.value == "" || logPassword.value == "") {
    logMessage.innerHTML = "All inputs are required";
    logEmail.classList.add("is-invalid");
    logPassword.classList.add("is-invalid");
    return;
  } else if (vaildEmail(logEmail.value) && vaildPassword(logPassword.value)) {
    for (var i = 0; i < usersList.length; i++) {
      if (
        usersList[i].email == logEmail.value &&
        usersList[i].password == logPassword.value
      ) {
        logEmail.classList.remove("is-invalid");
        logPassword.classList.remove("is-invalid");
        localStorage.setItem("target", usersList[i].name);
        return (location.href = "home.html");
      }
    }
    logMessage.innerHTML = "Email or Password is wrong";
    logEmail.classList.add("is-invalid");
    logPassword.classList.add("is-invalid");
    return;
  } else {
    logMessage.innerHTML = "Inputs are not allows instruction";
    return;
  }
}

function convertToBinary(str) {
  let binaryString = "";

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const binaryCode = charCode.toString(2).padStart(8, "0");
    binaryString += binaryCode + " ";
  }

  return (homeM.innerHTML = binaryString.trim());
}

convertToBinary(localStorage.getItem("target"));

function vaildName(x) {
  var regex = /[A-Za-z1-9]{3,}/;
  return regex.test(x);
}

function vaildEmail(x) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(x);
}

function vaildPassword(x) {
  let regex = /[A-Za-z1-9.]{4,15}/;
  return regex.test(x);
}

function clear(x, y, z) {
  x.value = "";
  y.value = "";
  z.value = "";
}
