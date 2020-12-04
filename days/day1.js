/*
 * Day 1
 *
 * Expense Report
 *
 */

import Day from "./day.js";

export default class Day1 extends Day {
  constructor() {
    super(
      1,
      [[1721, 979, 366, 299, 675, 1456]],
      [[514579], [241861950]],
      [982464, 162292410]
    );
  }
  star1(inputArray) {
    return this.expenseReport(inputArray);
  }
  star2(inputArray) {
    return this.expenseReport(inputArray, 3);
  }

  expenseReport(inputArray, depth = 2) {
    return this.sumArray([], 0, inputArray, depth);
  }

  sumArray(startValues, startIx, inputArray, depth) {
    let answer = -1;
    let extradata = "";
    let self = this;
    inputArray.forEach(function(val, ix, arr) {
      if (ix >= startIx) {
        if (depth == 1) {
          let sumvalues =
            startValues.reduce(function(a, b) {
              return a + b;
            }) + Number(val);

          if (sumvalues == 2020) {
            answer =
              startValues.reduce(function(a, b) {
                return a * b;
              }) * Number(val);

            extradata = "Values: " + startValues.concat(Number(val));

            return [answer, extradata];
          }
        } else {
          // depth > 1

          let tmp = self.sumArray(
            startValues.concat(Number(val)),
            ix + 1,
            inputArray,
            depth - 1
          );
          if (tmp[0] != -1) {
            answer = tmp[0];
            extradata = tmp[1];
          }
        }
      }
    });
    return [answer, extradata];
  }
}
