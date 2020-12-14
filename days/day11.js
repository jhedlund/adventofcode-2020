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
      [[37], [26]],
      [2359, 2131]
    );
  }

  star1(input) {
    return this.equalizeSeats(input);
  }

  star2(input) {
    return this.equalizeSeats(input, 5, true);
  }

  equalizeSeats(input, occupiedMinimumRule = 4, firstVisible = false) {
    let layoutsEqual = false;
    let rounds = 0;
    let prevInput = input;
    let newInput = [];
    while (!layoutsEqual && rounds < 900) {
      rounds++;
      newInput = this.seatRound(prevInput, occupiedMinimumRule, firstVisible);
      layoutsEqual = equals(newInput, prevInput);
      prevInput = newInput;
    }

    return [this.countSeats(newInput, "#"), ""];
  }

  seatRound(input, occupiedMinimumRule, firstVisible) {
    let result = [];
    let self = this;
    input.forEach(function(row, rowIx) {
      let newRow = "";
      for (let colIx = 0; colIx < row.length; colIx++) {
        if (
          row.charAt(colIx) == "L" &&
          self.countAdjacent(input, rowIx, colIx, "#", firstVisible) == 0
        ) {
          newRow += "#";
        } else if (
          row.charAt(colIx) == "#" &&
          self.countAdjacent(input, rowIx, colIx, "#", firstVisible) >=
            occupiedMinimumRule
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

  countState(direction, input, row, col, seatState, recurse = false) {
    let testcol = col;
    let testrow = row;
    switch (direction) {
      case "nw":
        testcol = col - 1;
        testrow = row - 1;
        break;
      case "n":
        testrow = row - 1;
        break;
      case "ne":
        testrow = row - 1;
        testcol = col + 1;
        break;
      case "e":
        testcol = col + 1;
        break;
      case "se":
        testcol = col + 1;
        testrow = row + 1;
        break;
      case "s":
        testrow = row + 1;
        break;
      case "sw":
        testrow = row + 1;
        testcol = col - 1;
        break;
      case "w":
        testcol = col - 1;
        break;
    }
    if (
      testcol >= 0 &&
      testrow >= 0 &&
      testrow < input.length &&
      testcol < input[testrow].length
    ) {
      let seat = input[testrow].charAt(testcol);
      if (seat == seatState) {
        return 1;
      } else if (recurse && seat == ".") {
        return this.countState(
          direction,
          input,
          testrow,
          testcol,
          seatState,
          recurse
        );
      }
    }
    return 0;
  }

  countAdjacent(input, row, col, seatState, recurse = false) {
    let result = 0;

    // top left
    result += this.countState("nw", input, row, col, seatState, recurse);
    result += this.countState("n", input, row, col, seatState, recurse);
    result += this.countState("ne", input, row, col, seatState, recurse);
    result += this.countState("e", input, row, col, seatState, recurse);
    result += this.countState("se", input, row, col, seatState, recurse);
    result += this.countState("s", input, row, col, seatState, recurse);
    result += this.countState("sw", input, row, col, seatState, recurse);
    result += this.countState("w", input, row, col, seatState, recurse);

    return result;
  }
}
