/*
 * Day 6
 *
 *
 */

import Day from "./day.js";

export default class Day6 extends Day {
  constructor() {
    super(
      6,
      [
        [
          "abc",
          "",
          "a",
          "b",
          "c",
          "",
          "ab",
          "ac",
          "",
          "a",
          "a",
          "a",
          "a",
          "",
          "b"
        ]
      ],
      [[11], [6]],
      [6885, 3550]
    );
  }

  star1(input) {
    let answer = this.groupCounts(input);

    return [answer, ""];
  }

  star2(input) {
    let answer = this.groupCounts(input, "union");

    return [answer, ""];
  }

  groupCounts(input, fn = "all") {
    let group = [];
    let sum = 0;
    let self = this;
    let newgroup = true;
    input.forEach(function(person) {
      if (person == "") {
        sum += self.uniqueCount(group);
        /* if (input.length < 50) {
          console.log(group.sort(), self.uniqueCount(group));
        }*/
        group = [];
        newgroup = true;
      } else {
        if (fn == "union") {
          if (group.length == 0 && newgroup) {
            group = person.split("");
            newgroup = false;
          } else {
            let found = [];
            group.forEach(function(groupanswer) {
              person.split("").forEach(function(yesanswer) {
                if (groupanswer == yesanswer) {
                  found.push(groupanswer);
                }
              });
            });
            group = found;
          }
        } else {
          group = group.concat(person.split(""));
        }
      }
    });
    sum += self.uniqueCount(group);
    return sum;
  }

  uniqueCount(group) {
    let previousanswer = "";
    let sum = 0;
    group.sort().forEach(function(yesanswer) {
      if (yesanswer != previousanswer) {
        sum++;
      }
      previousanswer = yesanswer;
    });
    return sum;
  }
}
