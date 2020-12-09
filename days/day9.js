/*
 * Day 9
 *
 *
 */

import Day from "./day.js";
import handheld from "../lib/handheld.js";

export default class Day9 extends Day {
  constructor() {
    super(
      9,
      [
        [
          35,
          20,
          15,
          25,
          47,
          40,
          62,
          55,
          65,
          95,
          102,
          117,
          150,
          182,
          127,
          219,
          299,
          277,
          309,
          576
        ]
      ],
      [[127], [62]],
      [1721308972, 209694133]
    );
  }

  star1(input) {
    if (input.length < 50) {
      return this.validateNumbers(input, 5, 5);
    } else {
      return this.validateNumbers(input, 25, 25);
    }
  }
  // 186493970 is too low
  // 186897546 is too low
  star2(input) {
    let illegal = this.star1(input);

    let contiguous = [];
    let smallest = 0;
    let largest = 0;
    input.forEach(function(number, ix) {
      number = Number(number);
      if (contiguous.length == 0) {
        let cursum = number;
        smallest = number;
        largest = number;
        contiguous = [number];
        for (let i = ix + 1; i < input.length; i++) {
          let nextnum = Number(input[i]);
          cursum += nextnum;
          contiguous.push(nextnum);
          if (nextnum < smallest) {
            smallest = nextnum;
          }
          if (nextnum > largest) {
            largest = nextnum;
          }
          if (cursum < illegal[0]) {
            //
          } else if (cursum > illegal[0]) {
            contiguous = [];
            break;
          } else {
            break;
          }
        }
      }
    });
    return [largest + smallest, largest + ", " + smallest];
  }

  validateNumbers(input, preamble = 25, window = 25) {
    let current = [];
    let illegal = [];
    let self = this;
    input.forEach(function(value, ix) {
      if (illegal.length == 0) {
        if (current.length == window && ix >= preamble) {
          if (input.length < 50) {
            //console.log(current, value);
          }
          if (self.validateNumber(current, value, input)) {
            current.shift();
            current.push(Number(value));
          } else {
            illegal = [value, ix];
          }
        } else {
          current.push(Number(value));
        }
      }
    });
    return illegal;
  }

  validateNumber(numbers, value, input) {
    let result = false;
    numbers.forEach(function(number, ix) {
      if (!result) {
        for (let i = ix + 1; i < numbers.length; i++) {
          //if (input.length < 50) {
          //console.log(number, numbers[i], number + numbers[i], value);
          //}
          if (number + numbers[i] == value) {
            result = true;
            break;
          }
        }
      }
    });
    return result;
  }
}
