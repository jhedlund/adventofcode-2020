/*
 * Day 15
 *
 *
 */

import Day from "./day.js";

export default class Day15 extends Day {
  constructor() {
    super(15, [["0,3,6"], ["1,3,2"]], [[436, 1], []], []);
  }

  star1(input) {
    let numbers = input[0].split(",");

    let numMap = new Map();
    let previousSpoken = new Map();
    numbers.forEach(function(num, ix) {
      numbers[ix] = Number(num);
    });

    let spoken = 0;
    for (let i = 0; i < 2020; i++) {
      if (i < numbers.length) {
        spoken = numbers[i];
      } else {
        if (numMap.get(spoken) == 1) {
          spoken = 0;
        } else {
          let prev = previousSpoken.get(spoken);
          let diff = prev[1] - prev[0];
          spoken = diff;
        }
      }
      if (numMap.has(spoken)) {
        numMap.set(spoken, numMap.get(spoken) + 1);
        let prev = previousSpoken.get(spoken);
        prev.push(i + 1);
        if (prev.length > 2) {
          prev.shift();
        }
        previousSpoken.set(spoken, prev);
      } else {
        numMap.set(spoken, 1);
        previousSpoken.set(spoken, [i + 1]);
      }
      //console.log(i + 1, spoken);
    }

    return [spoken, ""];
  }
}
