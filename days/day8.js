/*
 * Day 8
 *
 *
 */

import Day from "./day.js";

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
  }

  star1(input) {
    return this.accumulator(input);
  }

  star2(input) {
    let results = [];

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

        results = this.accumulator(input);

        if (results[1].finished) {
          break;
        }

        input[ix] = saveinstr;
      }
    }

    return results;
  }

  accumulator(input) {
    let accum = 0;
    let instructions = new Map();
    let ix = 0;
    input.forEach(function(instr) {
      let store = instr.split(" ");
      store.push(0);
      instructions.set(ix, store);
      ix++;
    });

    ix = 0;
    let next_ix = 0;
    let extra = Object();

    while (true) {
      if (!instructions.has(ix)) {
        extra.error = "unknown instructions, bug?  Tried index '" + ix + "'";
        break;
      }

      let instr = instructions.get(ix);

      if (instr[2] == 0) {
        instr[2] += 1;

        let oper = instr[0];

        let value = Number(instr[1].substring(1));

        if (instr[1].indexOf("-") == 0) {
          value = -1 * value;
        }
        next_ix = ix + 1;

        switch (oper) {
          case "acc":
            accum += value;
            break;
          case "jmp":
            next_ix = ix + value;
            break;
          case "nop":
            // nothing
            break;
        }
        ix = next_ix;
      } else {
        break;
      }
      if (ix >= instructions.size) {
        extra.finished = true;
        break;
      }
    }
    return [accum, extra];
  }
}
