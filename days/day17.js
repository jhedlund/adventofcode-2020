/*
 * Day 17 (copied from Day 11)
 *
 *
 */

import Day from "./day.js";

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

export default class Day17 extends Day {
  constructor() {
    super(17, [[".#.", "..#", "###"]], [[112], [848]], [317]);
  }

  star1(input) {
    return this.cycleCubes(input);
  }

  star2(input) {
    if (input.length < 5) {
      return this.cycleCubes(input, 6, true, true);
    }
  }

  cycleCubes(input, cycles = 6, increaseW = false, debug = false) {
    //let layoutsEqual = false;
    //let rounds = 0;
    let prevInput = [[[...input]]];

    let newInput = [];
    //while (!layoutsEqual && rounds < 900) {
    for (let cycle = 0; cycle < cycles; cycle++) {
      newInput = this.cycle(prevInput, increaseW);
      //layoutsEqual = equals(newInput, prevInput);
      prevInput = newInput;
      if (debug && cycle < 2) {
        console.log(cycle, newInput);
      }
    }
    //}

    return [this.countCubes(newInput, "#"), ""];
  }

  cycle(input, increaseW) {
    let result = [];
    let self = this;
    let newblankslice = [];
    let newblankw1 = [];
    let newblankw2 = [];
    let blankRow = "";

    for (let w = 0; w < input.length; w++) {
      for (let sliceIx = 0; sliceIx < input[w].length; sliceIx++) {
        for (let rowIx = 0; rowIx < input[w][sliceIx].length; rowIx++) {
          if (blankRow.length == 0) {
            blankRow = ".".repeat(input[w][sliceIx][rowIx].length + 2);
          }
          if (sliceIx == 0) {
            newblankslice.push(blankRow);
          }
          input[w][sliceIx][rowIx] = "." + input[w][sliceIx][rowIx] + ".";
        }
        input[0][sliceIx].push(blankRow);
        input[0][sliceIx].splice(0, 0, blankRow);

        if (sliceIx == 0) {
          newblankslice.push(blankRow);
          newblankslice.push(blankRow);
        }
      }
      if (w == 0) {
        for (let sliceIx = 0; sliceIx < input[w].length; sliceIx++) {
          newblankw1.push([...newblankslice]);
          newblankw2.push([...newblankslice]);
        }
      }
    }

    if (increaseW) {
      input.splice(0, 0, newblankw1);
      input.push(newblankw2);
      /*      let sliceLen = input[0].length;
      let rowLen = input[0][0].length;
      let blankW1 = [];
      let blankW2 = [];

      for (let slice = 0; slice < sliceLen; slice++) {
        blankW1.push(newblank);
        blankW2.push(newblank);
      }
      input.splice(0, 0, blankW1);
      input.push(blankW2); */
    }

    for (let w = 0; w < input.length; w++) {
      input[w].splice(0, 0, [...newblankslice]);
      input[w].push([...newblankslice]);

      let newW = [];

      input[w].forEach(function(slice, sliceIx) {
        let newSlice = [];

        /*slice.splice(0, 0, blankRow);
      slice.push(blankRow);
      for (let rowIx = 0; rowIx < slice.length; rowIx++) {
        slice[rowIx] = "." + slice[rowIx] + ".";
      }*/
        //console.log("pre", sliceIx, slice);
        slice.forEach(function(row, rowIx) {
          let newRow = "";

          for (let colIx = 0; colIx < row.length; colIx++) {
            if (
              row.charAt(colIx) == "." &&
              self.countAdjacent(input, rowIx, colIx, sliceIx, w, "#") == 3
            ) {
              newRow += "#";
            } else if (
              row.charAt(colIx) == "#" &&
              (self.countAdjacent(input, rowIx, colIx, sliceIx, w, "#") < 2 ||
                self.countAdjacent(input, rowIx, colIx, sliceIx, w, "#") > 3)
            ) {
              newRow += ".";
            } else {
              newRow += row.charAt(colIx);
            }
          }
          newSlice.push(newRow);
        });
        newW.push(newSlice);
      });
      result.push(newW);
    }
    return result;
  }
  countCubes(input, cubeState) {
    let result = 0;
    input.forEach(function(w) {
      w.forEach(function(slice) {
        slice.forEach(function(row) {
          for (let col = 0; col < row.length; col++) {
            if (row.charAt(col) == cubeState) {
              result++;
            }
          }
        });
      });
    });
    return result;
  }

  countState(direction, input, row, col, z, zoffset, w, woffset, seatState) {
    let testcol = col;
    let testrow = row;
    let testz = z + zoffset;
    let testw = w + woffset;
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
      testw >= 0 &&
      testw < input.length &&
      testz < input[testw].length &&
      testrow < input[testw][testz].length &&
      testcol < input[testw][testz][testrow].length
    ) {
      let seat = input[testw][testz][testrow].charAt(testcol);
      if (seat == seatState) {
        return 1;
      }
    }
    return 0;
  }

  countAdjacent(input, row, col, z, w, seatState) {
    let result = 0;

    for (let woffset = -1; woffset < 2; woffset++) {
      for (let zoffset = -1; zoffset < 2; zoffset++) {
        result += this.countState(
          "nw",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "n",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "ne",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "e",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "se",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "s",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "sw",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        result += this.countState(
          "w",
          input,
          row,
          col,
          z,
          zoffset,
          w,
          woffset,
          seatState
        );
        if (!(zoffset == 0 && woffset == 0)) {
          result += this.countState(
            "b",
            input,
            row,
            col,
            z,
            zoffset,
            w,
            woffset,
            seatState
          );
        }
      }
    }

    return result;
  }
}
