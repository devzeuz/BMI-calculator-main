const weightVal = document.getElementById("weight");
const heightVal = document.getElementById("height");
const btnCalc = document.getElementById("btn-calc");
const btnClr = document.getElementById("btn-clr");
const diagrop = document.getElementById("diagrop");
const h1Text = document.getElementById("head-text");
const diagnosis = document.getElementById("diag");

const kilograms = document.getElementById("kg");
const kgBtn = document.getElementById("kg-btn");
const poundsText = document.getElementById("yourP");

const feetInput = document.getElementById("ft");
const ftBtn = document.getElementById("ft-btn");
const feetText = document.getElementById("yourft");

// Calculate BMI from Weight (LBS) and Height (CM)
// Formula: (weight in lbs / 2.20462) / (height in cm / 100)^2 = (weight / height^2) * 4535.9237
btnCalc.addEventListener("click", function () {
  const weight = parseFloat(weightVal.value);
  const height = parseFloat(heightVal.value);

  if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
    h1Text.innerHTML = "Please enter valid numbers";
    diagnosis.innerHTML = "Both weight (in lbs) and height (in cm) must be greater than 0.";
    diagnosis.style.color = "#dc2626";
    diagrop.style.display = "block";
    return;
  }

  // Proper conversion factor for lbs and cm
  const bmiNum = (weight / (height * height)) * 4535.9237;
  const bmi = bmiNum.toFixed(2);

  h1Text.innerHTML = `Your BMI is: <strong>${bmi}</strong>`;

  // Continuous thresholds with zero gaps
  if (bmiNum < 18.5) {
    diagnosis.innerHTML = "You're in the underweight range";
    diagnosis.style.color = "#6b21a8";
  } else if (bmiNum < 25) {
    diagnosis.innerHTML = "You're in the healthy weight range";
    diagnosis.style.color = "#15803d";
  } else if (bmiNum < 30) {
    diagnosis.innerHTML = "You're in the overweight range";
    diagnosis.style.color = "#c2410c";
  } else {
    diagnosis.innerHTML = "You're in the obese range";
    diagnosis.style.color = "#b91c1c";
  }

  diagrop.style.display = "block";
});

// Kilograms to Pounds converter
kgBtn.addEventListener("click", function () {
  const kilogram = parseFloat(kilograms.value);

  if (isNaN(kilogram) || kilogram <= 0) {
    poundsText.innerHTML = "Please enter a valid positive weight in kilograms.";
    poundsText.style.display = "block";
    poundsText.style.color = "#7f1d1d";
    return;
  }

  const kgConvert = (kilogram * 2.20462).toFixed(2);
  poundsText.innerHTML = `<strong>${kilogram} kg</strong> = <strong>${kgConvert} lbs</strong>`;
  poundsText.style.display = "block";
  poundsText.style.color = "";
});

// Flexible Feet & Inches to Centimeters converter
// Supports: 5'10, 5'10", 5' 10, 5ft 10in, 5ft 10, 6, 6ft, etc.
function parseFeetAndInches(input) {
  const clean = input.trim();
  if (!clean) return null;

  // Pattern: 5'10 or 5'10" or 5' 10" or 5ft 10in
  const matchFtIn = clean.match(/^(\d+(?:\.\d+)?)\s*(?:'|ft|feet)\s*(\d+(?:\.\d+)?)?\s*(?:"|in|inches)?$/i);
  if (matchFtIn) {
    const feet = parseFloat(matchFtIn[1]);
    const inches = matchFtIn[2] ? parseFloat(matchFtIn[2]) : 0;
    return feet * 12 + inches;
  }

  // Standard 5'2 or 5'2"
  const matchApostrophe = clean.match(/^(\d+)'(\d+)"?$/);
  if (matchApostrophe) {
    return parseFloat(matchApostrophe[1]) * 12 + parseFloat(matchApostrophe[2]);
  }

  // Pure number (feet only, e.g. "6" or "5.5")
  if (!isNaN(clean) && parseFloat(clean) > 0) {
    return parseFloat(clean) * 12;
  }

  return null;
}

ftBtn.addEventListener("click", function () {
  const feetValue = feetInput.value;
  const totalInches = parseFeetAndInches(feetValue);

  if (totalInches !== null && totalInches > 0) {
    const totalCm = (totalInches * 2.54).toFixed(1);
    feetText.innerHTML = `<strong>${feetValue}</strong> = <strong>${totalCm} cm</strong>`;
    feetText.style.display = "block";
    feetText.style.color = "";
  } else {
    feetText.innerHTML = "Invalid format. Enter e.g. <strong>5'10</strong>, <strong>5'10\"</strong>, or <strong>6 ft</strong>.";
    feetText.style.display = "block";
    feetText.style.color = "#7f1d1d";
  }
});

// Clear button resets state without full page reload
btnClr.addEventListener("click", function () {
  weightVal.value = "";
  heightVal.value = "";
  kilograms.value = "";
  feetInput.value = "";

  diagrop.style.display = "none";
  poundsText.style.display = "none";
  feetText.style.display = "none";
  h1Text.innerHTML = "";
  diagnosis.innerHTML = "";
});

// Keyboard support: Enter key triggers calculation / conversion
[weightVal, heightVal].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnCalc.click();
  });
});
kilograms.addEventListener("keydown", (e) => {
  if (e.key === "Enter") kgBtn.click();
});
feetInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") ftBtn.click();
});

