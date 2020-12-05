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
      [[2], [2]],
      [196, 114]
    );
  }

  star1(inputArray) {
    return this.validPassports(inputArray, ["cid"]);
  }

  star2(inputArray) {
    return this.validPassports(inputArray, ["cid"], true);
  }

  validPassports(inputArray, ignoreFields = [], validateData = false) {
    let fields = [];

    let countvalid = 0;
    let totalPassports = 1;

    let self = this;

    inputArray.forEach(function(line) {
      if (line == "") {
        totalPassports++;
        // complete passport, check it and reset
        if (self.checkPassport(fields, ignoreFields, validateData)) {
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
    if (this.checkPassport(fields, ignoreFields, validateData)) {
      countvalid++;
    }

    return [countvalid, "totalPassports: " + totalPassports];
  }

  checkPassport(fields, ignoreFields, validateData) {
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
    let validData = true;
    fields = fields.concat(ignoreFields);
    fields.forEach(function(field) {
      searchFields.forEach(function(sought, ix) {
        let f = field.split(":");
        if (sought == f[0]) {
          searchFields.splice(ix, 1);
          if (validateData && validData) {
            switch (f[0]) {
              case "byr":
                if (Number(f[1]) < 1920 || Number(f[1]) > 2002) {
                  validData = false;
                }
                break;
              case "iyr":
                if (Number(f[1]) < 2010 || Number(f[1]) > 2020) {
                  validData = false;
                }
                break;
              case "eyr":
                if (Number(f[1]) < 2020 || Number(f[1]) > 2030) {
                  validData = false;
                }
                break;
              case "hgt":
                let hgt = f[1].replace(f[1].slice(-2), "");
                if (f[1].slice(-2) == "cm") {
                  if (hgt < 150 || hgt > 193) {
                    validData = false;
                  }
                } else if (f[1].slice(-2) == "in") {
                  if (hgt < 59 || hgt > 76) {
                    validData = false;
                  }
                } else {
                  validData = false;
                }
                break;
              case "hcl":
                let colora = f[1].replace("#", "").match(/[0-9a-f]/g);
                let color = "";
                if (colora) {
                  color = colora.join("");
                }
                if (
                  "#" + color != f[1] ||
                  f[1].length != 7 ||
                  f[1].charAt(0) != "#"
                ) {
                  //console.log("COLOR", color, f[1]);
                  validData = false;
                }
                break;
              case "ecl":
                if (
                  !(
                    f[1] == "amb" ||
                    f[1] == "blu" ||
                    f[1] == "brn" ||
                    f[1] == "gry" ||
                    f[1] == "grn" ||
                    f[1] == "hzl" ||
                    f[1] == "oth"
                  )
                ) {
                  //console.log("BAD ECL: ", f[1]);
                  validData = false;
                }
                break;
              case "pid":
                let pida = f[1].match(/[0-9]/g);
                let pid = "";
                if (pida) {
                  pid = pida.join("");
                }
                if (pid != f[1] || f[1].length != 9) {
                  validData = false;
                }
                break;
            }
          }
        }
      });
    });
    if (searchFields.length == 0) {
      return true && validData;
    }
    return false;
  }
}
