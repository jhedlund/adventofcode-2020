// Import stylesheets
import "./style.css";
import Day1 from "./days/day1.js";
import Day2 from "./days/day2.js";
import Day3 from "./days/day3.js";
import Day4 from "./days/day4.js";
import Day5 from "./days/day5.js";
import Day6 from "./days/day6.js";
import Day7 from "./days/day7.js";
import Day8 from "./days/day8.js";
import Day9 from "./days/day9.js";
import Day10 from "./days/day10.js";

const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;

let dayix = 1;

let days = [
  new Day1(),
  new Day2(),
  new Day3(),
  new Day4(),
  new Day5(),
  new Day6(),
  //new Day7(),
  new Day8(),
  new Day9(),
  new Day10()
];

function runDays() {
  if (dayix <= days.length) {
    dayix++;
    days[dayix - 2].run(runDays);
  } else {
    done();
  }
}

function done() {
  let tbl = "<table id='resulttab'>";
  tbl += "<tr>";
  tbl +=
    "<th>Day</th><th>Star</th><th></th><th>Result</th><th>Perf</th><th>Extra Data</th>";
  tbl += "</tr>";
  days.reverse().forEach(function(day) {
    day.results.results.forEach(function(result) {
      tbl += "<tr class=' " + result.status + "'>";
      tbl += "<td>" + day.day + "</td>";
      tbl += "<td>" + result.star + "</td>";
      tbl +=
        "<td>" +
        (result.sampleNumber ? "Sample&nbsp;" + result.sampleNumber : "") +
        "</td>";
      tbl += "<td class='result'>";

      switch (result.status) {
        case "success":
          tbl += result.answer;
          break;
        case "failure":
          tbl += result.answer + " != " + result.expected;
          break;
        default:
          tbl += result.status;
      }
      tbl += "</td>";
      tbl +=
        "<td class='performance'>" +
        (result.timems ? result.timems.toFixed(3) : "") +
        "&nbsp;ms</td>";
      tbl +=
        "<td class='xtra'>" +
        (result.extradata
          ? typeof result.extradata == "object"
            ? JSON.stringify(result.extradata)
            : result.extradata
          : "") +
        "</td>";
      tbl += "</tr>";
    });
  });
  tbl += "</table>";
  document.getElementById("results").innerHTML = tbl;
}

runDays();
