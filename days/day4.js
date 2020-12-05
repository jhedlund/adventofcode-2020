/*
 * Day 4
 *
 *
 */

import Day from "./day.js";

export default class Day4 extends Day {
  constructor() {
    super(
      4,
      [
        [
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
          "byr:1937 iyr:2017 cid:147 hgt:183cm",
          "",
          "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
          "hcl:#cfa07d byr:1929",
          "",
          "hcl:#ae17e1 iyr:2013",
          "eyr:2024",
          "ecl:brn pid:760753108 byr:1931",
          "hgt:179cm",
          "",
          "hcl:#cfa07d eyr:2025 pid:166559648",
          "iyr:2011 ecl:brn hgt:59in"
        ]
      ],
      [[2], []],
      [,]
    );
  }

  star1(inputArray) {
    return this.validPassports(inputArray, ["cid"]);
  }

  validPassports(inputArray, ignoreFields = []) {
    let fields = [];

    let countvalid = 0;
    let totalPassports = 1;

    let self = this;

    inputArray.forEach(function(line) {
      if (line == "") {
        totalPassports++;
        // complete passport, check it and reset
        if (self.checkPassport(fields, ignoreFields)) {
          countvalid++;
        }
        fields = [];
      } else {
        fields = fields.concat(line.split(" "));
        if (inputArray.length < 30) {
          //console.log(fields);
        }
      }
    });
    // one more passport to check:
    if (this.checkPassport(fields, ignoreFields)) {
      countvalid++;
    }

    return [countvalid, "totalPassports: " + totalPassports];
  }

  checkPassport(fields, ignoreFields) {
    let requiredFields = [
      "byr",
      "iyr",
      "eyr",
      "hgt",
      "hcl",
      "ecl",
      "pid",
      "cid"
    ];
    let searchFields = requiredFields;
    fields = fields.concat(ignoreFields);
    fields.forEach(function(field) {
      searchFields.forEach(function(sought, ix) {
        if (sought == field.split(":")[0]) {
          searchFields.splice(ix, 1);
        }
      });
    });
    if (searchFields.length == 0) {
      return true;
    }
    return false;
  }
}
