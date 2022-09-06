"use strict";

let imgContainer = document.getElementById("img-container");
let resultsBtn = document.getElementById("results-btn");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");

let clicks = 0;
let maxClicksAllowed = 8;

function OddDuck(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  OddDuck.allDucksArray.push(this);
}

OddDuck.allDucksArray = [];

function getRandomNumber() {
  return Math.floor(Math.random() * OddDuck.allDucksArray.length);
}

function renderDucks() {
  let oddDuck1 = getRandomNumber();
  let oddDuck2 = getRandomNumber();
  let oddDuck3 = getRandomNumber();

  while (
    oddDuck1 === oddDuck2 ||
    oddDuck1 === oddDuck3 ||
    oddDuck2 === oddDuck3
  ) {
    oddDuck1 = getRandomNumber();
    oddDuck2 = getRandomNumber();
    oddDuck3 = getRandomNumber();
  }

  img1.src = OddDuck.allDucksArray[oddDuck1].src;
  img2.src = OddDuck.allDucksArray[oddDuck2].src;
  img3.src = OddDuck.allDucksArray[oddDuck3].src;
  img1.alt = OddDuck.allDucksArray[oddDuck1].name;
  img2.alt = OddDuck.allDucksArray[oddDuck2].name;
  img3.alt = OddDuck.allDucksArray[oddDuck3].name;

  OddDuck.allDucksArray[oddDuck1].views++;
  OddDuck.allDucksArray[oddDuck2].views++;
  OddDuck.allDucksArray[oddDuck3].views++;
}

function handleDuckClick(event) {
  if (event.target === imgContainer) {
    alert("Please click on one of the images");
  } else {
    clicks++;
    let clickDuck = event.target.alt;

    for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
      if (clickDuck === OddDuck.allDucksArray[i].name) {
        OddDuck.allDucksArray[i].clicks++;
        break;
      }
    }

    if (clicks === maxClicksAllowed) {
      imgContainer.removeEventListener("click", handleDuckClick);

      resultsBtn.addEventListener("click", renderResults);
      // resultBtn.className = "clicks-allowed";
      // imgContainer.className = "no-voting";
    } else {
      renderDucks();
    }
  }

  function renderResults() {
    let ul = document.getElementById("results-list");

    for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
      let li = document.createElement("li");
      li.textContent = `${OddDuck.allDucksArray[i].name} had ${OddDuck.allDucksArray[i].views} view(s) and was clicked ${OddDuck.allDucksArray[i].clicks} time(s).`;
      ul.appendChild(li);
    }
    resultsBtn.removeEventListener("click", renderResults);
  }
}

console.log(OddDuck.allDucksArray);

new OddDuck("bag", "./images/bag3x.jpg");
new OddDuck("banana", "./images/banana3x.jpg");
new OddDuck("bathroom", "./images/bathroom3x.jpg");
new OddDuck("boots", "./images/boots3x.jpg");
new OddDuck("breakfast", "./images/breakfast3x.jpg");
new OddDuck("bubblegum", "./images/bubblegum3x.jpg");
new OddDuck("chair3x", "./images/cthulhu3x.jpg");
new OddDuck("dog duck", "./images/dog-duck@3x.jpg");
new OddDuck("dragon", "./images/dragon3x.jpg");
new OddDuck("pen", "./images/pen3x.jpg");
new OddDuck("pet sweep", "./images/pet-sweep3x.jpg");
new OddDuck("scissors", "./images/scissors3x.jpg");
new OddDuck("shark", "./images/shark3x.jpg");
new OddDuck("sweep", "./images/sweep3x.jpg");
new OddDuck("tauntaun", "./images/tauntaun3x.jpg");
new OddDuck("unicorn", "./images/unicorn3x.jpg");
new OddDuck("water can", "./images/water-can3x.jpg");
new OddDuck("wine glass", "./images/wine-glass3x.jpg");

renderDucks();

imgContainer.addEventListener("click", handleDuckClick);
