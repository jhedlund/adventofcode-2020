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
      [[7 * 5, 22 * 10], [8, 19208]],
      [1920, 1511207993344]
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

    let joltages = [current_joltage];
    let curIx = 0;

    let error = "";
    while (current_joltage < highest_joltage) {
      let joltCount = joltages.length;
      for (let i = curIx; i < sorted.length; i++) {
        if (
          sorted[i] == current_joltage + 1 ||
          sorted[i] == current_joltage + 3
        ) {
          current_joltage = sorted[i];
          joltages.push(sorted[i]);
          curIx = i + 1;
          break;
        }
      }
      if (joltages.length - joltCount == 0) {
        error = "missing voltage";
        break;
      }
    }
    if (error.length == 0) {
      joltages.push(joltages[joltages.length - 1] + 3);
    }

    let diffCount1 = 0;
    let diffCount3 = 0;

    joltages.forEach(function(voltage, ix) {
      if (ix > 0) {
        if (joltages[ix - 1] == voltage - 1) {
          diffCount1++;
        } else {
          diffCount3++;
        }
      }
    });

    return [diffCount1 * diffCount3, error];
  }

  star2(input) {
    input.push(0);
    let sorted = this.makeNumbers(input).sort(function(a, b) {
      return a - b;
    });
    let highest_joltage = sorted[sorted.length - 1];

    sorted.push(highest_joltage + 3);

    let containers = new Map();
    let lastSum = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      let paths = [];
      let sum = 0;
      if (i + 3 >= sorted.length) {
        sum = 1;
      } else {
        for (
          let search = i + 1;
          search < sorted.length && search < i + 4;
          search++
        ) {
          if (
            sorted[i] + 1 == sorted[search] ||
            sorted[i] + 2 == sorted[search] ||
            sorted[i] + 3 == sorted[search]
          ) {
            paths.push(sorted[search]);
          }
        }

        paths.forEach(function(ix) {
          sum += containers.get(ix);
        });
      }
      lastSum = sum;
      containers.set(sorted[i], sum);
    }
    return [lastSum, ""];
    //return [this.countWays(sorted, 0, 0, t0), ""];
  }

  countWays(sorted, curIx, depth, t0) {
    let count = 0;
    // 134,764,384 @ five minutes
    // 259,732,048 @ 10 minutes
    // 814,222,985 @ 30 minutes
    if (performance.now() - t0 < 1000) {
      let current_joltage = sorted[curIx];

      let paths = [];
      for (let outer = curIx + 1; outer < sorted.length; outer++) {
        paths = [];
        for (let i = curIx + 1; i < curIx + 4 && i < sorted.length; i++) {
          if (
            current_joltage + 1 == sorted[i] ||
            current_joltage + 2 == sorted[i] ||
            current_joltage + 3 == sorted[i]
          ) {
            paths.push(i);
          }
        }
        if (paths.length > 1) {
          break;
        } else {
          ///count += paths.length;
          //paths = [];
        }
      }

      if (paths.length > 0) {
        let self = this;
        paths.forEach(function(pathIx, pathsIx) {
          count += self.countWays(sorted, pathIx, depth + 1, t0);
        });
      } else {
        count += 1;
      }
    } else {
    }
    return count;
  }
}
