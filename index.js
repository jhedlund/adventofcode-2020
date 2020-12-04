// Import stylesheets
import "./style.css";
import Day1 from "./days/day1.js";
import Day2 from "./days/day2.js";

const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>AdventOfCode 2020</h1>`;

let dayix = 1;

let days = [new Day1(), new Day2()];

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
  tbl += "<th>Day</th><th>Star</th><th></th><th>Result</th>";
  tbl += "</tr>";
  days.forEach(function(day) {
    day.results.results.forEach(function(result) {
      tbl += "<tr class=' " + (result.success ? "success" : "fail") + "'>";
      tbl += "<td>" + day.day + "</td>";
      tbl += "<td>" + result.star + "</td>";
      tbl +=
        "<td>" +
        (result.sampleNumber ? "Sample " + result.sampleNumber : "") +
        "</td>";
      tbl +=
        "<td>" +
        (result.success
          ? result.answer
          : result.answer + " != " + result.expected) +
        "</td>";
      tbl += "</tr>";
    });
  });
  tbl += "</table>";
  document.getElementById("results").innerHTML = tbl;
}

runDays();
