// Import stylesheets
import "./style.css";
import * as day1 from "./days/day1.js";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;

let sampleInput = [1721, 979, 366, 299, 675, 1456];

day1.expenseReport(sampleInput);

let reader = new FileReader();
let inputtext = "";

reader.onload = function(e) {
  console.log(e.target.result);
};

//reader.readAsText("./inputs/day1.txt");
