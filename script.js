const weightVal = document.getElementById("weight");
const heightVal = document.getElementById("height");
const btnCalc = document.getElementById("btn-calc");
const btnClr = document.getElementById("btn-clr");

btnCalc.addEventListener("click", function () {
  const weight = weightVal.value;
  const height = heightVal.value;
  const bmi = ((weight / (height * height)) * 703).toFixed(2);

  console.log(bmi);

  const h1Text = document.getElementById("head-text");
  h1Text.innerHTML = ` <h1>Your Bmi Is : ${bmi}</h1>`;

  let diagnosis = document.getElementById("diag");
  if (bmi < 18.5) {
    diagnosis.innerHTML = "you're in the underweight range";
    diagnosis.style.color = "purple";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    diagnosis.innerHTML = "you're in the healthy weight range";
    diagnosis.style.color = "green";
  } else if (bmi >= 25 && bmi <= 29.9) {
    diagnosis.innerHTML = "you're in the overweight range";
    diagnosis.style.color = "orange";
  }
  if (bmi >= 30) {
    diagnosis.innerHTML = "you're Obese";
    diagnosis.style.color = "red";
  }

  const diagrop = document.getElementById("diagrop");

  diagrop.style.display = "block";
});

const kilograms = document.getElementById("kg");
const kgBtn = document.getElementById("kg-btn");

kgBtn.addEventListener("click", function () {
  const kilogram = kilograms.value;
  const kgConvert = (kilogram * 2.205).toFixed(2);

  const poundsText = document.getElementById("yourP");
  poundsText.innerHTML = `Your Kilogram (KG), Converted to Pounds (LBS) is : ${kgConvert}`;

  poundsText.style.display = "block";
});

// const feet =document.getElementById('ft')
// const ftBtn = document.getElementById('ft-btn')

// ftBtn.addEventListener('click', function(){
//   feetDig = feet.value
//   const feetConvert = (feetDig * 12).toFixed(1);

//   const feetText = document.getElementById('yourft')
//   feetText.innerHTML = `Your Height in Feet (ft), Converted To Inches Is : ${feetConvert}`

//   feetText.style.display ='block'
// })

const feetInput = document.getElementById("ft");
const ftBtn = document.getElementById("ft-btn");

ftBtn.addEventListener("click", function () {
  const feetValue = feetInput.value;
  const regex = /^(\d+)'(\d+)$/;
  const match = feetValue.match(regex);

  const feetText = document.getElementById("yourft");

  if (match) {
    const feet = parseInt(match[1], 10);
    const inches = parseInt(match[2], 10);
    const totalInches = feet * 12 + inches;
    const totalCm = (totalInches * 2.54).toFixed(1);

    feetText.innerHTML = `Your Height in Feet (ft), Converted To Centimeters Is: ${totalCm} cm.`;
    feetText.style.display = "block";
  } else {
    feetText.innerHTML =
      "Invalid input. Please enter height in the format 5'2.";
    feetText.style.display = "block";
  }
});

function reload() {
  window.location.reload();
}
