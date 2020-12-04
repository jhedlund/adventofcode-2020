// Import stylesheets
import "./style.css";
import Day1 from "./days/day1.js";
import Day2 from "./days/day2.js";

const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;

let day = 1;

let days = [new Day1(), new Day2()];

function runDays() {
  if (day <= days.length) {
    day++;
    days[day - 2].run(runDays);
  }
}

runDays();
