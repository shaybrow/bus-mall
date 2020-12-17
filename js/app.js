'use strict';


// global var
// product array
let allProducts = [];
let notNext = [];
let totalClicks = 0;
let maxClicks = 25;
let container = document.getElementById('stuff');
let main = document.getElementById('container-parent');
let picsDisplayed = 3;

// all products constructor
function Product(name, imgSrc) {
  this.clicked = 0;
  this.name = name;
  this.src = imgSrc;
  this.views = 0;

  allProducts.push(this);
}

function randomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function assignImg() {
  imgPrinter(picsDisplayed);

  for (let i = notNext.length; i > picsDisplayed; i--) {
    let j = i - 1;
    allProducts.push(notNext[j]);
    notNext.splice(j, 1);
  }

}
function imgPrinter(times) {
  let productNumber;
  for (let i = 0; i < times; i++) {
    let img1 = document.createElement('img');
    productNumber = randomNum(allProducts.length);
    allProducts[productNumber].views++;
    img1.src = allProducts[productNumber].src;
    img1.title = allProducts[productNumber].name;
    img1.classList = 'images';
    container.appendChild(img1);
    notNext.unshift(allProducts[productNumber]);
    allProducts.splice([productNumber], 1);
  }
}


function clicksPic(event) {

  // console.log(event);
  let clickedP = event.target.title;

  for (let i = 0; i < notNext.length; i++) {
    if (clickedP === notNext[i].name) {
      notNext[i].clicked++;
    }
  }
  totalClicks++;
  if (totalClicks === maxClicks) {
    container.innerHTML = '';
    container.removeEventListener('click', clicksPic);
    // calculateResults();
  }
  else {
    container.innerHTML = '';
    assignImg();
  }

}

function calculateResults() {
  container.removeEventListener('click', clicksPic);
  for (let k = 0; k < notNext.length; k++) {
    console.log(notNext);
    allProducts.push(notNext[k]);
  }
  // save data to local storage here
}

function stringyLocal() {
  let stringProducts = JSON.stringify(allProducts);
  localStorage.setItem('products', stringProducts);
}

function viewResultsB(event) {
  let clickedB = event.target.id;
  if (clickedB === 'clicked') {
    calculateResults();
    container.innerHTML = '';
    stringyLocal();
    // save data to local storage here
    makeAChart();
    main.removeEventListener('click', viewResultsB);

  }

}

// run it
let grabProducts = localStorage.getItem('products');
if (grabProducts) {
  allProducts = JSON.parse(grabProducts);
} else {
  new Product('dragon', 'img/dragon.jpg');
  new Product('bag', 'img/bag.jpg');
  new Product('banana', 'img/banana.jpg');
  new Product('bathroom', 'img/bathroom.jpg');
  new Product('boots', 'img/boots.jpg');
  new Product('breakfast', 'img/breakfast.jpg');
  new Product('bubblegum', 'img/bubblegum.jpg');
  new Product('chair', 'img/chair.jpg');
  new Product('cthulhu', 'img/cthulhu.jpg');
  new Product('dog-duck', 'img/dog-duck.jpg');

  new Product('pen', 'img/pen.jpg');
  new Product('pet-sweep', 'img/pet-sweep.jpg');
  new Product('scissors', 'img/scissors.jpg');
  new Product('shark', 'img/shark.jpg');
  new Product('sweep', 'img/sweep.png');
  new Product('tauntaun', 'img/tauntaun.jpg');
  new Product('unicorn', 'img/unicorn.jpg');
  new Product('usb', 'img/usb.gif');
  new Product('water-can', 'img/water-can.jpg');
  new Product('wine-glass', 'img/wine-glass.jpg');
}



// remove listener
// display results


// chart life https://www.chartjs.org/docs/latest/


function makeAChart() {
  let viewReturn = [];
  let nameReturn = [];
  let clickReturn = [];
  for (let i = 0; i < allProducts.length; i++) {
    clickReturn.push(allProducts[i].clicked);
  }
  for (let i = 0; i < allProducts.length; i++) {
    viewReturn.push(allProducts[i].views);
  }
  for (let i = 0; i < allProducts.length; i++) {
    nameReturn.push(allProducts[i].name);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameReturn,
      datasets: [{
        label: '# of Clicks',
        data: clickReturn,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'white',
      }, {
        label: '# of Views',
        data: viewReturn,
        backgroundColor: 'rgba(153, 20, 25, 10)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
assignImg();
container.addEventListener('click', clicksPic);
main.addEventListener('click', viewResultsB);