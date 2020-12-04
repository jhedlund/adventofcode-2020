/*
 * Day 2
 *
 * Passwords and Corporate Policy
 */

import Day from "./day.js";

export default class Day2 extends Day {
  constructor() {
    super(
      2,
      [["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"]],
      [[2], [1]],
      [418, 616]
    );
  }

  star1(inputArray) {
    return this.checkPasswordPolicy(inputArray);
  }

  star2(inputArray) {
    return this.checkPasswordPolicy(inputArray, "position");
  }

  checkPasswordPolicy(inputArray, rule = "count") {
    let valid_passwords = 0;

    inputArray.forEach(function(value, index, array) {
      let line = value.split(":");
      let policy = line[0].split(" ");
      let policy_char = policy[1].trim();
      let policyminmax = policy[0].split("-");

      // count
      let policy_min = policyminmax[0];
      let policy_max = policyminmax[1];

      // position
      let policy_ix1 = policy_min - 1;
      let policy_ix2 = policy_max - 1;

      let password = line[1].trim();

      if (rule == "count") {
        let char_found = password.match(new RegExp(policy_char, "g"));
        let char_count = 0;
        if (char_found !== null) char_count = char_found.length;

        if (char_count >= policy_min && char_count <= policy_max) {
          valid_passwords++;
        }
      } else if (rule == "position") {
        let char1 = password.charAt(policy_ix1);
        let char2 = password.charAt(policy_ix2);
        if (char1 == policy_char && char2 == policy_char) {
          //skip
        } else if (char1 == policy_char || char2 == policy_char) {
          valid_passwords++;
        }
      }
    });
    return valid_passwords;
  }
}
