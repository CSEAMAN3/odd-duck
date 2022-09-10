const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleDuckClicks);
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

let clicks = 0;
const maxClicksAllowed = 10;

function OddDuck(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;

  OddDuck.allDucksArray.push(this);
}

OddDuck.allDucksArray = [];

function getRandomIndex() {
  return Math.floor(Math.random() * OddDuck.allDucksArray.length);
}

function renderDucks() {
  let oddDuck1 = getRandomIndex();
  let oddDuck2 = getRandomIndex();
  let oddDuck3 = getRandomIndex();

  while (
    oddDuck1 === oddDuck2 ||
    oddDuck1 === oddDuck3 ||
    oddDuck2 === oddDuck3
  ) {
    let oddDuck1 = getRandomIndex();
    let oddDuck2 = getRandomIndex();
    let oddDuck3 = getRandomIndex();
  }

  img1.src = OddDuck.allDucksArray[oddDuck1].src;
  img2.src = OddDuck.allDucksArray[oddDuck2].src;
  img3.src = OddDuck.allDucksArray[oddDuck3].src;

  img1.alt = OddDuck.allDucksArray[oddDuck1].name;
  img2.alt = OddDuck.allDucksArray[oddDuck2].name;
  img3.alt = OddDuck.allDucksArray[oddDuck3].name;

  OddDuck.allDucksArray[oddDuck1].views++;
  OddDuck.allDucksArray[oddDuck1].views++;
  OddDuck.allDucksArray[oddDuck1].views++;
}

function handleDuckClicks(event) {
  if (event.target === imgContainer) {
    alert("Please click on an image.");
  } else {
    clicks++;
    let currentClick = event.target.alt;

    for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
      if (currentClick === OddDuck.allDucksArray[i].name) {
        OddDuck.allDucksArray[i].clicks++;
        break;
      }
    }

    if (maxClicksAllowed === clicks) {
      alert(
        "Thank you, click view results to se which products are the most popular."
      );
    }

    renderDucks();
  }
}

new OddDuck("bag", "./images/bag3x.jpg");
new OddDuck("banana", "./images/banana3x.jpg");
new OddDuck("bathroom", "./images/bathroom3x.jpg");
new OddDuck("boots", "./images/boots3x.jpg");
new OddDuck("breakfast", "./images/breakfast3x.jpg");
new OddDuck("bubblegum", "./images/bubblegum3x.jpg");
new OddDuck("chair", "./images/chair3x.jpg");
new OddDuck("cthulhu", "./images/cthulhu3x.jpg");
new OddDuck("dog-duck", "./images/dog-duck@3x.jpg");
new OddDuck("dragon", "./images/dragon3x.jpg");
new OddDuck("pen", "./images/pen3x.jpg");
new OddDuck("pet-sweep", "./images/pet-sweep3x.jpg");
new OddDuck("scissors", "./images/scissors3x.jpg");
new OddDuck("shark", "./images/shark3x.jpg");
new OddDuck("sweep", "./images/sweep3x.jpg");
new OddDuck("tauntaun", "./images/tauntaun3x.jpg");
new OddDuck("unicorn", "./images/unicorn3x.jpg");
new OddDuck("water-can", "./images/water-can3x.jpg");
new OddDuck("wine-glass", "./images/wine-glass3x.jpg");

renderDucks();
