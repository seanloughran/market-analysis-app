window.addEventListener("load", pullStoData);

var totalVoteCount = 0; //Tracks user votes on product photos.
document.getElementById('votePlace').innerHTML = totalVoteCount;

var Picture = function(picSource, picNum, label) {
  this.label = label;
  this.picSource = picSource;
  this.picNum = picNum;
  this.y = 0; //Number of times a photo is voted for.
  this.addPicture = function(placementID) {
    document.getElementById(placementID).innerHTML = "<img src="+this.picSource+" class='productPicture' id='"+this.picNum+"'>";
    document.getElementById(this.picNum).addEventListener("click", clickPhoto);
    this.shownCount++;
  };
}

var r2bag = new Picture("Images/bag.jpg", 1, "R2D2");
var banana = new Picture("Images/banana.jpg", 2, "Banana");
var boots = new Picture("Images/boots.jpg", 3, "Boots");
var chair = new Picture("Images/chair.jpg", 4, "Chair");
var monster = new Picture("Images/cthulhu.jpg", 5, "Cthyulu");
var dragon = new Picture("Images/dragon.jpg", 6, "Dragon Meat");
var pen = new Picture("Images/pen.jpg", 7, "Pen");
var scissors = new Picture("Images/scissors.jpg", 8, "Scissors");
var shark = new Picture("Images/shark.jpg", 9, "Shark Bag");
var babysweep = new Picture("Images/sweep.jpg", 10, "Baby Sweeper");
var usb = new Picture("Images/usb.jpg", 11, "USB Tail");
var watercan = new Picture("Images/water_can.jpg", 12, "Water Can");
var wineglass = new Picture("Images/wine_glass.jpg", 13, "Wine Glass");
var unicorn = new Picture("Images/unicorn.jpg", 14, "Unicorn Meat");

var picArray = [r2bag, banana, boots, chair, monster, dragon, pen, scissors, shark, babysweep, usb, watercan, wineglass, unicorn];

var clickedPicArr = [];

//This block store the y values/votes of the pictures to local storage.
function locStoPics() {
  var picYs = [];
  for (pI = 0; pI<picArray.length; pI++) {
    var cur = picArray[pI];
    picYs.push(cur.y);
  }
  localStorage.setItem('storedYs', JSON.stringify(picYs));
}

//Checks local storage on page load for stored y values/votes. If there is anything there, pulls down those values and assigns them to the corresponding picture object.
function pullStoData () {
  console.log("Loaded");
  var check = localStorage.getItem('storedYs');
  if (check == null) {
    return;
  } else {
    unStrYs = JSON.parse(check);
    for (yT=0; yT<picArray.length; yT++) {
      picArray[yT].y = unStrYs[yT];
    }
    console.log("pic array previous update");
  }
}

var chart = null;

//Chart will only show products/pictures that have been voted for.
function chartRender() {
  for (ci=0; ci<picArray.length; ci++) {
    if (picArray[ci].y>0) {  //If photo has a y value/vote count that is greater than zero, added to clickedPicArr which is used by the chart.
      clickedPicArr.push(picArray[ci]);
    }
  }

  chart = new CanvasJS.Chart("chartContainer", {
    title: {text: "Picture Votes Counted"},
    data: [
      {
        type: "column",
        dataPoints: clickedPicArr
      }
    ]
  });

  chart.render();

}

var last3shown = []; //Will keep track of shown pictures.

//Generates 3 random pictures to be added for user viewing.
function randomPicturePicker () {
  var usedNumbers = []; //Will help keep the current 3 pictures different.
  var threeindex = 1;

  //Shortens the last3shown down to 3 numbers because it will initially be too long.
  if (last3shown.length>3) {
    last3shown.splice(0, 3);
  }

  while (threeindex <= 3) {
    var randomNum = Math.floor(Math.random() * (picArray.length - 1 + 1)) + 1; //Generates random num between 1 and 14. Will adjust if more pictures added. This will correspond to a picNum of a object.
    var unused = true;
    var previousShown = true;

    for (z=0; z<usedNumbers.length; z++) { //This for loop runs through the usedNumbers array to check if a picture has been used before in this vote instance.
      if (usedNumbers[z] == randomNum) {
        unused = false; //If the product/picture has been shown in the current 3 pictures.
      }
    }

    //This checks if the current picture was shown in the last 3 images shown.
    if (last3shown.length >= 3) {
      for (lasti=0; lasti<3; lasti++) {
        if (randomNum == last3shown[lasti]) {
          previousShown = false;
        }
      }
    }

    //This code runs if the random number generated has not occured in this instance of the function or shown in the last 3 pictures.
    if (unused && previousShown) {
      last3shown.push(randomNum);
      usedNumbers.push(randomNum);
      for (arrIndex = 0; arrIndex<picArray.length; arrIndex++) {//This for loop runs through the picture objects array. If a picture's assigned picNum matches the unused, random number, the addPicture method for that picture adds the picture to the index paragraph id.

          var currentPic = picArray[arrIndex];
          if (currentPic.picNum == randomNum) {
            currentPic.addPicture("picture"+threeindex);
            threeindex++;
          }
      }
    }

  }
}

//Adds a vote for the clicked photo. Increases progress bar value. Updates total vote count. Generates next random set of pictures.
function clickPhoto() {
  if (totalVoteCount<14) {
    for (objecti=0; objecti<picArray.length; objecti++) {
      var picObject = picArray[objecti];
      if (picObject.picNum == this.id) {
          picObject.y++
      }
    }
    totalVoteCount++
    document.getElementById('progressBar').value = totalVoteCount*6.666667;
    document.getElementById('votePlace').innerHTML = totalVoteCount;
    randomPicturePicker();
  }
  else { //Calls display switch on photo vote 15.
    locStoPics();
    document.getElementById('reset').style.display = "inline-block";
    displaySwitch();
    chartRender();
  }
}

//Runs after the 15th vote... disappears the pictures and progress bar. Makes the chart section visible.
function displaySwitch() {
  var iniShow = document.getElementsByClassName('initialshow');
  for (is=0; is<iniShow.length; is++) {
    iniShow[is].style.display = "none";
  }

  document.getElementById('chartContainer').style.display = "block";
  document.getElementById('chartContainer').style.position = "static";

  document.getElementById('busPic').style.width = "13.3%";
  document.getElementById('header').style.marginBottom = "10px";

}

//Runs on clicked reset button. Disappears chart. Reappears photos. Generates new picture set.
function reset() {
  totalVoteCount = 0;
  clickedPicArr = [];

  var iniShow = document.getElementsByClassName('initialshow');
  for (is=0; is<iniShow.length; is++) {
    iniShow[is].style.display = "block";
  }

  var paraDis = document.getElementsByClassName('votePicPara');
  for (parai=0; parai<paraDis.length; parai++) {
    paraDis[parai].style.display = "inline-block";
  }

  document.getElementById('chartContainer').style.display = "none";

  document.getElementById('busPic').style.width = "21.4%";
  document.getElementById('header').style.marginBottom = 0;

  document.getElementById('progressBar').value = 0;
  document.getElementById('progressBar').style.margin = "0 auto";
  document.getElementById('votePlace').innerHTML = totalVoteCount;

  randomPicturePicker();
}

document.getElementById('reset').addEventListener("click", reset);

randomPicturePicker(); //Inital generation of 3 random pictures, on the page load.
