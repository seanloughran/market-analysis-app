var Picture = function(picSource, picNum) {
  this.picSource = picSource;
  this.picNum = picNum;
  this.addPicture = function(placementID) {
    document.getElementById(placementID).innerHTML = "<img src="+this.picSource+" class='picture'>";
  };
}

var r2bag = new Picture("Images/bag.jpg", 1);
var banana = new Picture("Images/banana.jpg", 2);
var boots = new Picture("Images/boots.jpg", 3);
var chair = new Picture("Images/chair.jpg", 4);
var monster = new Picture("Images/cthulhu.jpg", 5);
var dragon = new Picture("Images/dragon.jpg", 6);
var pen = new Picture("Images/pen.jpg", 7);
var scissors = new Picture("Images/scissors.jpg", 8);
var shark = new Picture("Images/shark.jpg", 9);
var babysweep = new Picture("Images/sweep.jpg", 10);
var usb = new Picture("Images/usb.jpg", 11);
var watercan = new Picture("Images/water_can.jpg", 12);
var wineglass = new Picture("Images/wine_glass.jpg", 13);
var unicorn = new Picture("Images/unicorn.jpg", 14);

var picArray = [r2bag, banana, boots, chair, monster, dragon, pen, scissors, shark, babysweep, usb, watercan, wineglass, unicorn];

var shownArray = [];

function randomPicturePicker () { //Generates 3 random pictures
  var usedNumbers = []; //Will help keep track of used pictures.
  var index = 1;

  while (index <= 3) {
    var randomNum = Math.floor(Math.random() * (picArray.length - 1 + 1)) + 1; //Generates random num between 1 and 14. Will adjust if more pictures added.
    var unused = true;

    for (z=0; z<usedNumbers.length; z++) { //This for loop runs the usedNumbers array to check if a picture has been used before.
      if (usedNumbers[z] == randomNum) {
        unused = false;
      }
    }
    if (unused) { //This code runs if the random number generated has not occured in this instance of the function.
      for (arrIndex = 0; arrIndex<picArray.length; arrIndex++) {//This foro loop runs through the picture objects array. If a picture's assigned number matches the unused, random number, the addPicture method for that picture adds the picture to the index paragraph id.

          var currentPic = picArray[arrIndex];
          if (currentPic.picNum == randomNum) {
            currentPic.addPicture("picture"+index);
            index++;
          }
      }
    }

    usedNumbers.push(randomNum);
    shownArray.push(randomNum);
  }
}

randomPicturePicker();
