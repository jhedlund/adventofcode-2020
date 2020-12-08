/*
 * Day 7
 *
 *
 */

import Day from "./day.js";

export default class Day7 extends Day {
  constructor() {
    super(
      7,
      [
        [
          "light red bags contain 1 bright white bag, 2 muted yellow bags.",
          "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
          "bright white bags contain 1 shiny gold bag.",
          "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
          "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
          "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
          "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
          "faded blue bags contain no other bags.",
          "dotted black bags contain no other bags."
        ]
      ],
      [[4], []],
      [161]
    );
  }
  // not 93, not 74
  star1(input) {
    let answer = this.howManyBagsCanContain(input, "shiny gold");
    return [answer, ""];
  }

  howManyBagsCanContain(bagrules, seekingbag) {
    let bags = [];
    bagrules.forEach(function(bagrule) {
      let tmp = bagrule.split(" contain ");
      let children = tmp[1].split(",").map(function(item) {
        return item.trim().replace(".", "");
      });

      bags.push([tmp[0], children, undefined]);
    });

    let count = 0;
    let outerbagcount = 0;
    let self = this;
    bags.forEach(function(bag) {
      let bagcount = self.bagCanHold(bags, bag[0], seekingbag, 0);
      bag[2] = bagcount;
      count += bagcount;
      if (bagcount > 0) {
        outerbagcount++;
      }
    });
    console.log(
      "outer bags that can hold",
      outerbagcount,
      "total bags that can hold",
      count,
      "total bags",
      bags.length
    );
    return outerbagcount;
  }

  bagCanHold(bags, currentbag, seekingbag, depth) {
    let self = this;

    let count = 0;

    bags.forEach(function(bag) {
      if (bag[0].indexOf(currentbag) >= 0) {
        if (bag[2] == undefined) {
          bag[1].forEach(function(innerbagdetail) {
            innerbagdetail = innerbagdetail.split(" ");
            let numbags = innerbagdetail.shift();
            let innerbag = innerbagdetail.join(" ");
            if (innerbag.indexOf(seekingbag) >= 0) {
              count += Number(numbags);
            } else if (innerbag.indexOf("no other") >= 0) {
              //
            } else {
              count += self.bagCanHold(bags, innerbag, seekingbag, depth + 1);
            }
          });
        } else {
          count += bag[2];
        }
      }
    });
    return count;
  }
}
