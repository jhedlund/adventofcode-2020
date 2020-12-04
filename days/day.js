/*
 * Day base class
 *
 */

const github_url = "https://raw.githubusercontent.com/";
const github_user = "jhedlund";
const github_repo = "adventofcode-2020";
const github_branch = "master";
const github_path = "/inputs/";

export default class Day {
  constructor(daynumber, sampleInputs, sampleResults, starResults, callback) {
    this.day = daynumber;
    this.samples = sampleInputs;
    this.sampleResults = sampleResults;
    this.starResults = starResults;
    this.callback = callback;
  }

  run(callback) {
    let self = this;
    this.cb = callback;
    //console.log(this.github_input_uri());
    this.dayInputXHR = new XMLHttpRequest();
    this.dayInputXHR.onreadystatechange = function() {
      self.inputLoaded(self);
    };
    this.dayInputXHR.open("GET", this.github_input_uri(), true);
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

      self.samples.forEach(function(sample, ix, arr) {
        self.runStar("1", ix + 1, 1, sample, self.sampleResults[0][ix]);
      });

      if (self.dayInputXHR.status == 200) {
        let star1expected = -1;
        let star2expected = -1;
        if (self.starResults !== undefined && self.starResults.length > 0)
          star1expected = self.starResults[0];
        if (self.starResults !== undefined && self.starResults.length > 1)
          star2expected = self.starResults[1];

        this.runStar("1", 0, 1, self.dayArray, star1expected);

        self.samples.forEach(function(sample, ix, arr) {
          let expected = -1;
          if (self.sampleResults[1] != undefined) {
            expected = self.sampleResults[1][ix];
          }
          self.runStar("2", ix + 1, 2, sample, expected);
        });

        this.runStar("2", 0, 2, self.dayArray, star2expected);
      } else {
        console.log(
          "Day " +
            self.day +
            " INVALID DATA, response status code " +
            self.dayInputXHR.status
        );
      }
      self.cb();
    } else if (self.dayInputXHR.readyState == 0) {
      console.log("Day " + self.day + " NOT SENT");
      self.cb();
    }
  }

  runStar(star, sampleNum, starNum, input, expected) {
    let message = "Running Day" + this.day + ".star" + star + "()";
    if (sampleNum > 0) {
      message += " sample " + sampleNum;
    }
    console.log(message);
    let starfn = this["star" + star];
    if (typeof starfn === "function") {
      let actual = this["star" + star](input);
      if (expected == undefined) expected = -1;
      let prefix = "Day " + this.day + " ";
      if (sampleNum > 0) {
        prefix += "Sample " + sampleNum + " ";
      }
      prefix += "star " + starNum + " ";
      let status = "FAILURE (expected " + expected + "): ";
      if (actual == expected) {
        status = "SUCCESS: ";
      }
      if (actual == undefined) {
        actual = " -- undefined";
        //status = "";
      }
      console.log(status + prefix + ": " + actual);
    } else {
      console.log("Day" + this.day + ".star" + star + "() NOT IMPLEMENTED");
    }
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
