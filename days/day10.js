/*
 * Day 10
 *
 *
 */

import Day from "./day.js";
import handheld from "../lib/handheld.js";

export default class Day10 extends Day {
  constructor() {
    super(
      10,
      [
        [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4],
        [
          28,
          33,
          18,
          42,
          31,
          14,
          46,
          20,
          48,
          47,
          24,
          23,
          49,
          45,
          19,
          38,
          39,
          11,
          1,
          32,
          25,
          35,
          8,
          17,
          7,
          9,
          4,
          2,
          34,
          10,
          3
        ]
      ],
      [[7 * 5, 22 * 10], []],
      [1920]
    );
  }

  makeNumbers(input) {
    input.forEach(function(value, ix) {
      input[ix] = Number(value);
    });
    return input;
  }

  star1(input) {
    let sorted = this.makeNumbers(input).sort(function(a, b) {
      return a - b;
    });

    let highest_joltage = sorted[sorted.length - 1];

    let current_joltage = 0;

    let voltages = [current_joltage];
    let curIx = 0;

    let error = "";
    while (current_joltage < highest_joltage) {
      let voltCount = voltages.length;
      for (let i = curIx; i < sorted.length; i++) {
        if (
          sorted[i] == current_joltage + 1 ||
          sorted[i] == current_joltage + 3
        ) {
          current_joltage = sorted[i];
          voltages.push(sorted[i]);
          curIx = i + 1;
          break;
        }
      }
      if (voltages.length - voltCount == 0) {
        error = "missing voltage";
        break;
      }
    }
    if (error.length == 0) {
      voltages.push(voltages[voltages.length - 1] + 3);
    }

    let diffCount1 = 0;
    let diffCount3 = 0;

    voltages.forEach(function(voltage, ix) {
      if (ix > 0) {
        if (voltages[ix - 1] == voltage - 1) {
          diffCount1++;
        } else {
          diffCount3++;
        }
      }
    });
    console.log(diffCount1, diffCount3);
    console.log(voltages);

    return [diffCount1 * diffCount3, error];
  }
}
