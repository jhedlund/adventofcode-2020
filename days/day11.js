/*
 * Day 10
 *
 *
 */

import Day from "./day.js";

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

export default class Day11 extends Day {
  constructor() {
    super(
      11,
      [
        [
          "L.LL.LL.LL",
          "LLLLLLL.LL",
          "L.L.L..L..",
          "LLLL.LL.LL",
          "L.LL.LL.LL",
          "L.LLLLL.LL",
          "..L.L.....",
          "LLLLLLLLLL",
          "L.LLLLLL.L",
          "L.LLLLL.LL"
        ]
      ],
      [[37], []],
      [,]
    );
  }

  star1(input) {
    let layoutsEqual = false;
    let rounds = 0;
    let prevInput = input;
    let newInput = [];
    while (!layoutsEqual && rounds < 900) {
      rounds++;
      newInput = this.seatRound(prevInput);
      layoutsEqual = equals(newInput, prevInput);
      prevInput = newInput;
    }

    return [this.countSeats(newInput, "#"), ""];
  }

  seatRound(input) {
    let result = [];
    let self = this;
    input.forEach(function(row, rowIx) {
      let newRow = "";
      for (let colIx = 0; colIx < row.length; colIx++) {
        if (
          row.charAt(colIx) == "L" &&
          self.countAdjacent(input, rowIx, colIx, "#") == 0
        ) {
          newRow += "#";
        } else if (
          row.charAt(colIx) == "#" &&
          self.countAdjacent(input, rowIx, colIx, "#") >= 4
        ) {
          newRow += "L";
        } else {
          newRow += row.charAt(colIx);
        }
      }
      result.push(newRow);
    });
    return result;
  }
  countSeats(input, seatState) {
    let result = 0;
    input.forEach(function(row) {
      for (let col = 0; col < row.length; col++) {
        if (row.charAt(col) == seatState) {
          result++;
        }
      }
    });
    return result;
  }
  countAdjacent(input, row, col, seatState) {
    let result = 0;

    // top left
    if (col > 0 && row > 0 && input[row - 1].charAt(col - 1) == seatState) {
      result++;
    }

    //top
    if (row > 0 && input[row - 1].charAt(col) == seatState) {
      result++;
    }

    // top right
    if (
      row > 0 &&
      col < input[row - 1].length - 1 &&
      input[row - 1].charAt(col + 1) == seatState
    ) {
      result++;
    }

    // right
    if (
      col < input[row].length - 1 &&
      input[row].charAt(col + 1) == seatState
    ) {
      result++;
    }

    // bottom right
    if (
      row < input.length - 1 &&
      col < input[row + 1].length - 1 &&
      input[row + 1].charAt(col + 1) == seatState
    ) {
      result++;
    }

    // bottom
    if (row < input.length - 1 && input[row + 1].charAt(col) == seatState) {
      result++;
    }

    //bottom left
    if (
      row < input.length - 1 &&
      col > 0 &&
      input[row + 1].charAt(col - 1) == seatState
    ) {
      result++;
    }

    // left
    if (col > 0 && input[row].charAt(col - 1) == seatState) {
      result++;
    }

    return result;
  }
}
