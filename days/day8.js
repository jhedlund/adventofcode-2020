/*
 * Day 8
 *
 *
 */

import Day from "./day.js";
import handheld from "../lib/handheld.js";

export default class Day8 extends Day {
  constructor() {
    super(
      8,
      [
        [
          "nop +0",
          "acc +1",
          "jmp +4",
          "acc +3",
          "jmp -3",
          "acc -99",
          "acc +1",
          "jmp -4",
          "acc +6"
        ]
      ],
      [[5], [8]],
      [1766, 1639]
    );
    this.handheld = new handheld();
  }

  star1(input) {
    let result = this.handheld.runInstructions(input);
    return [result.accumulator, result.error];
  }

  star2(input) {
    let result = undefined;

    for (let ix = 0; ix < input.length; ix++) {
      let instr = input[ix].split(" ");
      if (instr[0] !== "acc") {
        if (instr[0] == "nop") {
          instr[0] = "jmp";
        } else {
          instr[0] = "nop";
        }
        let saveinstr = input[ix];
        input[ix] = instr.join(" ");

        result = this.handheld.runInstructions(input);

        if (result.finished) {
          break;
        }

        input[ix] = saveinstr;
      }
    }

    return [result.accumulator, result.error];
  }
}
