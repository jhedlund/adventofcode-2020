// Import stylesheets
import "./style.css";
import * as day1 from "./days/day1.js";
import * as day2 from "./days/day2.js";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;
let sampleInput = [];

sampleInput = [1721, 979, 366, 299, 675, 1456];

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
  // have to use github, stackblitz not serving static files (I tried assets)
  "https://raw.githubusercontent.com/jhedlund/adventofcode-2020/master/inputs/day1.txt",
  true
);
day1xhr.send();

sampleInput = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

day2.checkPasswordPolicy(sampleInput, 2);

day2.checkPasswordPolicy(sampleInput, 1, "position");

let day2xhr = new XMLHttpRequest();
day2xhr.onreadystatechange = function() {
  if (day2xhr.readyState == 4) {
    //console.log(xhr.status);
    //console.log(xhr.responseURL);
    //console.log(xhr.responseText);

    let day2array = day2xhr.responseText.split("\n");
    day2.checkPasswordPolicy(day2array, 418);
    day2.checkPasswordPolicy(day2array, 616, "position");
  }
};
day2xhr.open(
  "GET",
  // have to use github, stackblitz not serving static files (I tried assets)
  "https://raw.githubusercontent.com/jhedlund/adventofcode-2020/master/inputs/day2.txt",
  true
);
day2xhr.send();
