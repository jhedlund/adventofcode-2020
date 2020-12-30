/*
 * Day 17 (copied from Day 11)
 *
 *
 */

import Day from "./day.js";

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

export default class Day17 extends Day {
  constructor() {
    super(17, [[".#.", "..#", "###"]], [[112], []], [,]);
  }

  star1(input) {
    if (input.length < 4) {
      return this.cycleCubes(input);
    }
  }

  star2(input) {
    //return this.equalizeSeats(input, 5, true);
  }

  cycleCubes(input, activeRule = [2, 3], inactiveRule = [3], cycles = 6) {
    //let layoutsEqual = false;
    //let rounds = 0;
    let prevInput = [input];
    let newInput = [];
    //while (!layoutsEqual && rounds < 900) {
    for (let cycle = 0; cycle < cycles; cycle++) {
      newInput = this.cycle(prevInput, activeRule, inactiveRule);
      //layoutsEqual = equals(newInput, prevInput);
      prevInput = newInput;
      console.log(cycle, newInput);
    }
    //}

    return [this.countCubes(newInput, "#"), ""];
  }

  cycle(input, activeRule, inactiveRule) {
    let result = [];
    let self = this;
    let firstSlice = input[0];
    let newblank = [];
    let blankRow = "";
    firstSlice.forEach(function(row) {
      if (blankRow.length == 0) {
        blankRow = ".".repeat(row.length);
      }
      newblank.push(blankRow);
    });
    input.splice(0, 0, newblank);
    input.push(newblank);
    if (input.length > 3) {
      blankRow = "." + blankRow + ".";
    }
    input.forEach(function(slice, sliceIx) {
      let newSlice = [];
      if (input.length > 3) {
        slice.forEach(function(row) {
          row = "." + row + ".";
        });
        slice.splice(0, 0, blankRow);
        slice.push(blankRow);
      }
      slice.forEach(function(row, rowIx) {
        let newRow = "";

        for (let colIx = 0; colIx < row.length; colIx++) {
          if (
            row.charAt(colIx) == "." &&
            self.countAdjacent(input, rowIx, colIx, sliceIx, "#") == 3
          ) {
            newRow += "#";
          } else if (
            row.charAt(colIx) == "#" &&
            (self.countAdjacent(input, rowIx, colIx, sliceIx, "#") < 2 ||
              self.countAdjacent(input, rowIx, colIx, sliceIx, "#") > 3)
          ) {
            newRow += ".";
          } else {
            newRow += row.charAt(colIx);
          }
        }
        newSlice.push(newRow);
      });
      result.push(newSlice);
    });
    return result;
  }
  countCubes(input, cubeState) {
    let result = 0;
    input.forEach(function(slice) {
      slice.forEach(function(row) {
        for (let col = 0; col < row.length; col++) {
          if (row.charAt(col) == cubeState) {
            result++;
          }
        }
      });
    });
    return result;
  }

  countState(
    direction,
    input,
    row,
    col,
    z,
    zoffset,
    seatState,
    recurse = false
  ) {
    let testcol = col;
    let testrow = row;
    let testz = z + zoffset;
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
      case "b":
        break;
    }
    if (
      testcol >= 0 &&
      testrow >= 0 &&
      testz >= 0 &&
      testz < input.length &&
      testrow < input[testz].length &&
      testcol < input[testz][testrow].length
    ) {
      let seat = input[testz][testrow].charAt(testcol);
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

  countAdjacent(input, row, col, z, seatState, recurse = false) {
    let result = 0;

    // top left
    for (let zoffset = -1; zoffset < 2; zoffset++) {
      result += this.countState(
        "nw",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "n",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "ne",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "e",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "se",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "s",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "sw",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      result += this.countState(
        "w",
        input,
        row,
        col,
        z,
        zoffset,
        seatState,
        recurse
      );
      if (zoffset != 0) {
        result += this.countState(
          "b",
          input,
          row,
          col,
          z,
          zoffset,
          seatState,
          recurse
        );
      }
    }

    return result;
  }
}
