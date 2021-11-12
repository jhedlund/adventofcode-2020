/*
 * Day base class
 *
 */

import * as dr from "../lib/dayResults.js";

const use_github = false; // if false, just use local uri (needed github for stackblitz)
const github_url = "https://raw.githubusercontent.com/";
const github_user = "jhedlund";
const github_repo = "adventofcode-2020";
const github_branch = "master";
const github_path = "/inputs/";

export default class Day {
  constructor(daynumber, sampleInputs, sampleResults, starResults) {
    this.day = daynumber;
    this.samples = sampleInputs;
    this.sampleResults = sampleResults;
    this.starResults = starResults;
    this.results = new dr.dayResults(this.day);
  }

  run(callback) {
    let self = this;
    this.cb = callback;
    this.dayInputXHR = new XMLHttpRequest();
    this.dayInputXHR.onreadystatechange = function() {
      self.inputLoaded(self);
    };
    let fileurl = "";
    if(use_github) {
      fileurl = this.github_input_uri()
    } else {
      fileurl = "./inputs/day" + this.day + ".txt";
    }
    this.dayInputXHR.open("GET", fileurl, true);
    this.dayInputXHR.send();
  }

  inputLoaded(self) {
    //console.log(self.day + " readyState", self.dayInputXHR.readyState);
    //console.log(self.day + " url", self.dayInputXHR.responseURL);

    // readystate:  0 = open not called, 1 = opened, 2= headers received
    // 3 = loading, 4 = done

    if (self.dayInputXHR.readyState == 4) {
      //self.result(self.run_star1sample(), self.star1SampleResult);

      self.dayArray = self.dayInputXHR.responseText.split("\n");

      if (self.dayInputXHR.status == 200) {
        self.runAll(self);
      } else {
        console.log(
          "Day " +
            self.day +
            " INVALID DATA, response status code " +
            self.dayInputXHR.status
        );
        self.results.addResult(
          0,
          star,
          dr.StatusEnum.missinginputdata,
          0,
          0,
          0
        );
      }
      self.cb();
    } else if (self.dayInputXHR.readyState == 0) {
      console.log("Day " + self.day + " NOT SENT");
      self.cb();
    }
  }

  runAll(self) {
    let star = 1;
    for (let i = 0; i < self.dayArray.length; i++) {
      self.dayArray[i] = self.dayArray[i].replace(/(\r\n|\n|\r)/gm, "");
    }

    self.samples.forEach(function(sample, ix, arr) {
      self.runStar(star, ix + 1, 1, sample, self.sampleResults[0][ix]);
    });

    let star1expected = -1;
    let star2expected = -1;
    if (self.starResults !== undefined && self.starResults.length > 0)
      star1expected = self.starResults[0];
    if (self.starResults !== undefined && self.starResults.length > 1)
      star2expected = self.starResults[1];

    this.runStar(star, 0, 1, self.dayArray, star1expected);

    star++;

    self.samples.forEach(function(sample, ix, arr) {
      let expected = -1;
      if (self.sampleResults[1] != undefined) {
        expected = self.sampleResults[1][ix];
      }
      self.runStar(star, ix + 1, 2, sample, expected);
    });

    this.runStar(star, 0, 2, self.dayArray, star2expected);
  }

  runStar(star, sampleNum, starNum, input, expected) {
    let message = "Running Day" + this.day + ".star" + star + "()";
    let t0 = performance.now();
    if (sampleNum > 0) {
      message += " sample " + sampleNum;
    }
    console.log(message);
    let starfn = this["star" + star];
    let status = dr.StatusEnum.wrongresulttype;
    let actual = undefined;
    let extradata = undefined;
    if (typeof starfn === "function") {
      let result = this["star" + star](input);
      if (result !== undefined && result.length > 1) {
        status = dr.StatusEnum.failure;
        actual = result[0];
        extradata = result[1];
        if (expected == undefined) expected = -1;
        let prefix = "Day " + this.day + " ";
        if (sampleNum > 0) {
          prefix += "Sample " + sampleNum + " ";
        }
        prefix += "star " + starNum + " ";
        let statusstr = "FAILURE (expected " + expected + "): ";
        if (actual == expected) {
          statusstr = "SUCCESS: ";
          status = dr.StatusEnum.success;
        }
        if (actual == undefined) {
          actual = " -- undefined";
          status = dr.StatusEnum.missingresult;
        }
        console.log(statusstr + prefix + ": " + actual);
      }
      let t1 = performance.now();
      this.results.addResult(
        sampleNum,
        star,
        status,
        actual,
        expected,
        extradata,
        t1 - t0
      );
    } else {
      console.log("Day" + this.day + ".star" + star + "() NOT IMPLEMENTED");
      let t1 = performance.now();
      this.results.addResult(
        sampleNum,
        star,
        dr.StatusEnum.notimplemented,
        undefined,
        expected,
        "",
        t1 - t0
      );
    }
  }

  writeLog(log) {
    document.getElementById("runner").innerHTML += log + "<br/>";
  }

  github_input_uri() {
    return (
      github_url +
      github_user +
      "/" +
      github_repo +
      "/" +
      github_branch +
      github_path +
      "day" +
      this.day +
      ".txt"
    );
  }
}
