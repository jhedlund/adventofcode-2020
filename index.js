// Import stylesheets
import "./style.css";
import * as day1 from "./days/day1.js";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;

let sampleInput = [1721, 979, 366, 299, 675, 1456];

day1.expenseReport(sampleInput, 514579);

let day1array = [];

let day1xhr = new XMLHttpRequest();
day1xhr.onreadystatechange = function() {
  if (day1xhr.readyState == 4) {
    //console.log(xhr.status);
    //console.log(xhr.responseURL);
    //console.log(xhr.responseText);

    day1array = day1xhr.responseText.split("\n");
    day1.expenseReport(day1array, 982464);
    day1.expenseReport(day1array, 162292410, 3);
  }
};

day1.expenseReport(sampleInput, 241861950, 3);

day1xhr.open(
  "GET",
  /* have to use github, stackblitz not serving static files (I tried in assets) */
  "https://raw.githubusercontent.com/jhedlund/adventofcode-2020/master/inputs/day1.txt",
  true
);
day1xhr.send();


