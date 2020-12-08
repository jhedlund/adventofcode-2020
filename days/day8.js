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
      [[5], []],
      [,]
    );
  }

  star1(input) {
    return this.accumulator(input);
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
    let error = undefined;
    while (true) {
      if (!instructions.has(ix)) {
        error = "unknown instructions, bug?  Tried index '" + ix + "'";
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
    }
    return [accum, error];
  }
}
