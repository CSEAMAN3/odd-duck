"use strict";

let imgContainer = document.getElementById("img-container");
let main = document.getElementById("main");
let btnIcon = document.getElementById("btn-icon");
let resultsBtn = document.getElementById("results-btn");
document.getElementById("delete-btn").addEventListener("click", function () {
  localStorage.removeItem("duckData");
  location.reload();
});

let themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click", switchTheme);

function getThemeOnLoad() {
  if (!localStorage.getItem("theme")) {
    //checking if a theme is set, if not, add dark by default
    localStorage.setItem("theme", "dark");
  }
  //check what the theme is, and add the relevant class
  if (localStorage.getItem("theme") === "dark") {
    main.classList.remove("light");
    main.classList.add("dark");
    btnIcon.classList.remove("fa-moon");
    btnIcon.classList.add("fa-sun");
  } else {
    main.classList.remove("dark");
    main.classList.add("light");
    btnIcon.classList.remove("fa-sun");
    btnIcon.classList.add("fa-moon");
  }
}

function switchTheme() {
  let currentTheme = localStorage.getItem("theme");
  // if dark , change to light and vice versa
  if (currentTheme === "dark") {
    localStorage.setItem("theme", "light");
    // change class on main element
    main.classList.remove("dark");
    main.classList.add("light");
    btnIcon.classList.remove("fa-sun");
    btnIcon.classList.add("fa-moon");
  } else {
    localStorage.setItem("theme", "dark");
    main.classList.remove("light");
    main.classList.add("dark");
    btnIcon.classList.remove("fa-moon");
    btnIcon.classList.add("fa-sun");
  }
}

let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let usedDucks = [];

let clicks = 0;
let maxClicksAllowed = 8;
let lastThreeImages = [];

function OddDuck(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
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
    oddDuck2 === oddDuck3 ||
    usedDucks.includes(oddDuck1) ||
    usedDucks.includes(oddDuck1) ||
    usedDucks.includes(oddDuck3)
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

  usedDucks = [];
  usedDucks.push(oddDuck1, oddDuck2, oddDuck3);
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
      alert(
        "Thank you so much, now click view results to see which products you voted for."
      );

      resultsBtn.addEventListener("click", renderChart);
      // resultBtn.classList.add = "clicks-allowed";
      // imgContainer.className = "no-voting";
    } else {
      renderDucks();
    }
  }

  // function renderResults() {
  //   let ul = document.getElementById("results-list");

  //   for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
  //     let li = document.createElement("li");
  //     li.textContent = `${OddDuck.allDucksArray[i].name} had ${OddDuck.allDucksArray[i].views} view(s) and was clicked ${OddDuck.allDucksArray[i].clicks} time(s).`;
  //     ul.appendChild(li);
  //   }
  //   resultsBtn.removeEventListener("click", renderResults);
  // }
}

function renderChart() {
  let duckNames = [];
  let duckViews = [];
  let duckLikes = [];

  for (let i = 0; i < OddDuck.allDucksArray.length; i++) {
    duckNames.push(OddDuck.allDucksArray[i].name);
    duckViews.push(OddDuck.allDucksArray[i].views);
    duckLikes.push(OddDuck.allDucksArray[i].clicks);
  }

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: duckNames,
    datasets: [
      {
        label: "Likes",
        data: duckLikes,
        backgroundColor: ["#42032C"],
        borderColor: ["#D36B00"],
        borderWidth: 1,
      },
      {
        label: "Views",
        data: duckViews,
        backgroundColor: ["#D36B00"],
        borderColor: ["#42032C"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          ticks: { color: "#D36B00", beginAtZero: true },
        },
        x: {
          ticks: { color: "#D36B00", beginAtZero: true },
        },
      },
    },
  };
  let canvasChart = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(canvasChart, config);
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem("duckData", JSON.stringify(OddDuck.allDucksArray));
}

function checkLocalStorage() {
  //If localData is truthy:
  const localData = JSON.parse(localStorage.getItem("duckData"));
  if (localData) {
    for (let i = 0; i < localData.length; i++) {
      let name = localData[i].name;
      let src = localData[i].src;
      let views = localData[i].views;
      let clicks = localData[i].clicks;
      new OddDuck(name, src, views, clicks);
    }
  } else {
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
  }
}

// new OddDuck("bag", "./images/bag3x.jpg");
// new OddDuck("banana", "./images/banana3x.jpg");
// new OddDuck("bathroom", "./images/bathroom3x.jpg");
// new OddDuck("boots", "./images/boots3x.jpg");
// new OddDuck("breakfast", "./images/breakfast3x.jpg");
// new OddDuck("bubblegum", "./images/bubblegum3x.jpg");
// new OddDuck("chair3x", "./images/cthulhu3x.jpg");
// new OddDuck("dog duck", "./images/dog-duck@3x.jpg");
// new OddDuck("dragon", "./images/dragon3x.jpg");
// new OddDuck("pen", "./images/pen3x.jpg");
// new OddDuck("pet sweep", "./images/pet-sweep3x.jpg");
// new OddDuck("scissors", "./images/scissors3x.jpg");
// new OddDuck("shark", "./images/shark3x.jpg");
// new OddDuck("sweep", "./images/sweep3x.jpg");
// new OddDuck("tauntaun", "./images/tauntaun3x.jpg");
// new OddDuck("unicorn", "./images/unicorn3x.jpg");
// new OddDuck("water can", "./images/water-can3x.jpg");
// new OddDuck("wine glass", "./images/wine-glass3x.jpg");

checkLocalStorage();
getThemeOnLoad();
renderDucks();

imgContainer.addEventListener("click", handleDuckClick);
