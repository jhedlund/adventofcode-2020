// Import stylesheets
import "./style.css";
import * as day1 from "./days/day1.js";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;

let sampleInput = [1721, 979, 366, 299, 675, 1456];

day1.expenseReport(sampleInput, 514579);

let day1array = [];

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    //console.log(xhr.status);
    //console.log(xhr.responseURL);
    //console.log(xhr.responseText);
    day1array = xhr.responseText.split("\n");
    day1.expenseReport(day1array, 982464);
  }
};

xhr.open(
  "GET",
  //"./assets/day1.txt",
  "https://raw.githubusercontent.com/jhedlund/adventofcode-2020/master/assets/day1.txt",
  true
);
xhr.send();
