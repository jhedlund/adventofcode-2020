/*
 *
 *
 */

export default class handheld {
  runInstructions(input) {
    let result = Object({
      accumulator: 0,
      finished: false,
      error: undefined,
      input: input,
      instructions: undefined
    });

    let instructions = new Map();
    let ix = 0;
    input.forEach(function(instr) {
      let store = instr.split(" ");
      store.push(0);
      instructions.set(ix, store);
      ix++;
    });

    result.instructions = instructions;

    ix = 0;
    let next_ix = 0;

    while (true) {
      if (!instructions.has(ix)) {
        result.error = "unknown instructions, bug?  Tried index '" + ix + "'";
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
            result.accumulator += value;
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
        result.finished = true;
        break;
      }
    }
    return result;
  }

  fixInstructions(input) {
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

        result = this.runInstructions(input);

        if (result.finished) {
          break;
        }

        input[ix] = saveinstr;
      }
    }

    return result;
  }
}
