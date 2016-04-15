var totalVoteCount = 0;
document.getElementById('votePlace').innerHTML = totalVoteCount;

var Picture = function(picSource, picNum, label) {
  this.label = label;
  this.picSource = picSource;
  this.picNum = picNum;
  this.y = 0;
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

var chart = null;

function chartRender() {
  for (ci=0; ci<picArray.length; ci++) {
    if (picArray[ci].y>0) {
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

function randomPicturePicker () { //Generates 3 random pictures
  var usedNumbers = []; //Will help keep 3 pictures different.
  var threeindex = 1;

  if (last3shown.length>3) {
    last3shown.splice(0, 3);
  }

  while (threeindex <= 3) {
    console.log(last3shown);
    var randomNum = Math.floor(Math.random() * (picArray.length - 1 + 1)) + 1; //Generates random num between 1 and 14. Will adjust if more pictures added.
    var unused = true;
    var previousShown = true;

    for (z=0; z<usedNumbers.length; z++) { //This for loop runs the usedNumbers array to check if a picture has been used before in this vote instance.
      if (usedNumbers[z] == randomNum) {
        unused = false;
      }
    }

    if (last3shown.length >= 3) {
      for (lasti=0; lasti<3; lasti++) {
        if (randomNum == last3shown[lasti]) {
          previousShown = false;
        }
      }
    }

    if (unused && previousShown) { //This code runs if the random number generated has not occured in this instance of the function.
      last3shown.push(randomNum);
      usedNumbers.push(randomNum);
      for (arrIndex = 0; arrIndex<picArray.length; arrIndex++) {//This for loop runs through the picture objects array. If a picture's assigned number matches the unused, random number, the addPicture method for that picture adds the picture to the index paragraph id.

          var currentPic = picArray[arrIndex];
          if (currentPic.picNum == randomNum) {
            currentPic.addPicture("picture"+threeindex);
            threeindex++;
          }
      }
    }

  }
}

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
    document.getElementById('reset').style.display = "inline-block";
    displaySwitch();
    chartRender();
  }
}

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

randomPicturePicker();
