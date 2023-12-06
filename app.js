const lengthInput = document.querySelector(".length-input");
let charLenDisplay = document.querySelector(".char-count");
//  VARIABLES FOR CHECKBOX TYPES
const uppercaseCheckBox = document.querySelector(".uppercase");
const lowercaseCheckBox = document.querySelector(".lowercase");
const numbersCheckBox = document.querySelector(".numbers");
const symbolCheckBox = document.querySelector(".symbols");
const generateButton = document.querySelector(".generate-btn");
const passwordDisplay = document.querySelector(".password-display");
const firstRect = document.querySelector(".first-rect");
const secRect = document.querySelector(".second-rect");
const thirdRect = document.querySelector(".third-rect");
const fourthRect = document.querySelector(".fourth-rect");
const copyIcon = document.querySelector(".copy");
const checkBoxes = document.querySelector(".checkboxes");
let passLen = 0;
let selectedCharset = "";

// parolis genereireba

function generatePassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-";

  if (length === 0 || length < 6) {
    passwordDisplay.textContent = "Increase password length";
    return;
  }

  // selected charset tavidan aris empty mere checkboxebis mixedvit emateba charset stringidan
  if (lowercaseCheckBox.checked) {
    selectedCharset += charset.match(/[a-z]/g).join("");
  }
  if (uppercaseCheckBox.checked) {
    selectedCharset += charset.match(/[A-Z]/g).join("");
  }
  if (numbersCheckBox.checked) {
    selectedCharset += charset.match(/[0-9]/g).join("");
  }
  if (symbolCheckBox.checked) {
    selectedCharset += charset.match(/[^a-zA-Z0-9]/g).join("");
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * selectedCharset.length);
    password += selectedCharset.charAt(randomIndex);
  }

  passwordDisplay.textContent = password;
  return password;
}

// abrunebs booleans chartulia tuara chekbox

function listenCheckInputs(checkbox) {
  checkbox.addEventListener("input", checkbox.checked);
}

// ghilaki generirebistvis

function generBtn() {
  const newPassword = generatePassword(passLen);
  if (passLen < 6) {
    passwordDisplay.textContent = "Give it more length";
    return;
  }

  if (selectedCharset === "") {
    passwordDisplay.textContent = "Select at least one";
    return;
  }

  //conditionebi sidzlieris dasadgenad vamateb class

  if (passLen >= 6 && passLen <= 8 && selectedCharset !== "") {
    firstRect.classList.add("too-weak");
  } else if (passLen > 8 && passLen <= 10 && selectedCharset !== "") {
    firstRect.classList.add("weak");
    secRect.classList.add("weak");
  } else if (passLen > 10 && passLen <= 15 && selectedCharset !== "") {
    firstRect.classList.add("medium");
    secRect.classList.add("medium");
    thirdRect.classList.add("medium");
  } else if (passLen > 15 && passLen <= 20 && selectedCharset !== "") {
    firstRect.classList.add("strong");
    secRect.classList.add("strong");
    thirdRect.classList.add("strong");
    fourthRect.classList.add("strong");
  }

  // final res display

  passwordDisplay.classList.add("final-res");
  passwordDisplay.textContent = newPassword;
  copyIcon.addEventListener("click", copyContent(newPassword));
}

// password length calc

function lengthCalc() {
  passLen = lengthInput.value;
  charLenDisplay.textContent = lengthInput.value;
}

// copy generated password

const copyContent = async (newPas) => {
  try {
    await navigator.clipboard.writeText(newPas);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

lengthInput.addEventListener("input", lengthCalc);
generateButton.addEventListener("click", generBtn);
