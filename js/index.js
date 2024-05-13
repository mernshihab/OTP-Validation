let generatedOTP;
let intID;
let timeid;
let expire = document.getElementById("expireOTP-id");

function expireOTP() {
  const totalTime = 15000;
  const interval = 1000;
  let slice = totalTime / interval;
  intID = setInterval(() => {
    expire.innerText = `Your OTP will expire in ${slice} second`;
    slice = slice - 1;
  }, interval);
  timeid = setTimeout(() => {
    clearInterval(intID);
    expire.innerText = "OTP Expired";
    generateOTP();
  }, totalTime);
}

function otpBoxes() {
  const boxes = document.getElementById("otp-box-list-id");
  boxes.addEventListener("input", function (e) {
    const target = e.target;
    const value = e.target.value;
    if (isNaN(value)) {
      target.value = "";
      return;
    }
    const nextElem = target.nextElementSibling;
    const prevElem = target.previousElementSibling;
    if (nextElem && value) {
      nextElem.focus();
    } else if (prevElem && !value) {
      prevElem.focus();
    }
    validateOTP();
  });
}

function validateOTP() {
  const result = document.getElementById("result-id");
  let typedNumber = "";
  const boxListElement = document.getElementById("otp-box-list-id");
  [...boxListElement.children].forEach((e) => {
    typedNumber = typedNumber + e.value;
  });
  const OTP = parseInt(typedNumber, 10);
  if (OTP === generatedOTP) {
    result.innerText = "Your OTP validation successful";
    clearInterval(intID);
    clearTimeout(timeid);
    expire.innerText = "";
    result.classList.remove("failed");
    result.classList.add("success");
  } else {
    result.innerText = "Invalid OTP";
    result.classList.remove("success");
    result.classList.add("failed");
  }
}

function generateOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  const otpElem = document.getElementById("generated-otp-id");
  otpElem.innerText = `Your OTP: ${generatedOTP}`;
  expireOTP();
}

function init() {
  otpBoxes();
  setTimeout(generateOTP, 1000);
}

init();
