/*
 * Day 5
 *
 *
 */

import Day from "./day.js";

export default class Day5 extends Day {
  constructor() {
    // Note:  Star2 did not have samples, so just setting expected to 0
    super(
      5,
      [["FBFBBFFRLR"], ["BFFFBBFRRR"], ["FFFBBBFRRR"], ["BBFFBBFRLL"]],
      [[357, 567, 119, 820], [0, 0, 0, 0]],
      [994, 741]
    );
  }

  star1(input) {
    return this.maxSeatID(input);
  }

  star2(input) {
    return this.maxSeatID(input, "myseat");
  }

  maxSeatID(input, fn = "highest") {
    let highest = 0;
    let result = 0;
    let self = this;

    let allSeats = [];

    input.forEach(function(boardingpass) {
      let x = self.seatID(boardingpass);

      allSeats.push(x);

      if (x > highest) {
        highest = x;
      }
    });

    // 609 was too low, 742 too high
    if (fn == "myseat") {
      allSeats = allSeats.sort(function(a, b) {
        return b - a;
      });

      let sequence = highest;

      for (let ix = 1; ix < allSeats.length; ix++) {
        if (allSeats[ix] != sequence - 1) {
          result = sequence - 1;
          sequence = allSeats[ix];
        } else {
          sequence--;
        }
      }
      return [result, ""];
    }

    return [highest, ""];
  }

  seatID(boardingpass) {
    let rowinstruction = boardingpass.match(/[FB]/g).join("");

    let row = this.seat(rowinstruction, rowinstruction.charAt(0), 0, 128);

    let seatinstruction = boardingpass.match(/[LR]/g).join("");

    let seat = this.seat(seatinstruction, seatinstruction.charAt(0), 0, 8);
    //console.log("seatid", row, seat, row * 8 + seat);
    return row * 8 + seat;
  }

  seat(remaining, char, start, max) {
    if (remaining.length == 1) {
      if (char == "F" || char == "L") {
        return start;
      } else {
        return start + 1;
      }
    }
    let newstart = start;
    let newmax = max;
    if (char == "F" || char == "L") {
      newmax = max - (max - start) / 2;
    } else {
      newstart = max - (max - start) / 2;
    }
    //console.log("breakdown", remaining, char, newstart, newmax);
    return this.seat(
      remaining.substring(1),
      remaining.charAt(1),
      newstart,
      newmax
    );
  }
}
