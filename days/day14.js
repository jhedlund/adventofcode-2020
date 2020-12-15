/*
 * Day 14
 *
 *
 */

import Day from "./day.js";

export default class Day14 extends Day {
  constructor() {
    super(
      14,
      [
        [
          "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
          "mem[8] = 11",
          "mem[7] = 101",
          "mem[8] = 0"
        ],
        [
          "mask = 000000000000000000000000000000X1001X",
          "mem[42] = 100",
          "mask = 00000000000000000000000000000000X0XX",
          "mem[26] = 1]"
        ]
      ],
      [[165, 50], [, 208]],
      [13105044880745]
    );
  }

  star1(input) {
    let mask = "X".padStart(32, "X");

    let memory = new Map();

    input.forEach(function(line) {
      if (line.indexOf("mask") == 0) {
        let parts = line.split(" = ");
        mask = parts[1];
      } else {
        let parts = line.split(" = ");
        let memaddress = parts[0].substring(4);
        memaddress = Number(memaddress.slice(0, -1));

        let binary = Number(parts[1])
          .toString(2)
          .padStart(36, "0");

        let value = "";

        for (let i = 0; i < binary.length; i++) {
          if (mask.charAt(i) == "X") {
            value += binary.charAt(i);
          } else {
            value += mask.charAt(i);
          }
        }
        memory.set(memaddress, value);
      }
    });
    let sum = 0;

    memory.forEach(function(value, key) {
      sum += parseInt(value, 2);
    });
    return [sum, ""];
  }

  star2(input) {
    let mask = "X".padStart(32, "X");

    let memory = new Map();

    if (input.length > 5) {
      return;
    }

    input.forEach(function(line) {
      if (line.indexOf("mask") == 0) {
        let parts = line.split(" = ");
        mask = parts[1];
      } else {
        let parts = line.split(" = ");
        let memaddress = parts[0].substring(4);
        memaddress = Number(memaddress.slice(0, -1));

        let binary = memaddress.toString(2).padStart(36, "0");

        let value = "";

        let floatcount = 0;

        for (let i = 0; i < binary.length; i++) {
          if (mask.charAt(i) == "0") {
            value += binary.charAt(i);
          } else {
            if (mask.charAt(i) == "X") {
              floatcount++;
            }
            value += mask.charAt(i);
          }
        }
        console.log("here", Math.pow(2, floatcount));
        /*for (let i = 0; i < Math.pow(2, floatcount); i++) {
          let newvalue = "";
          let binaryIx = 0;
          let floatbinary = i.toString(2);
          console.log(floatbinary); */
          /*
          for (let c = 0; c < value.length; c++) {
            if (value.charAt(c) == "X") {
              newvalue += floatbinary.charAt(binaryIx);
              binaryIx++;
            } else {
              newvalue += value.charAt(c);
            }
          }
          memory.set(parseInt(newvalue, 2), newvalue); */
        //}
      }
    });
    let sum = 0;

    memory.forEach(function(value, key) {
      sum += parseInt(value, 2);
    });
    return [sum, ""];
  }
}
