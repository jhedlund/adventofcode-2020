/*
 * Day 13
 *
 *
 */

import Day from "./day.js";

export default class Day13 extends Day {
  constructor() {
    super(13, [["939", "7,13,x,x,59,x,31,19"]], [[295], [1068781]], [2935]);
  }

  star1(input) {
    return this.findEarliestBus(input);
  }

  star2(input) {
    let busses = input[1].split(",");

    let busRules = [];

    busses.forEach(function(busID, busIx) {
      if (busID != "x") {
        busRules.push([Number(busID), busIx]);
      }
    });

    let found_t = 0;
    //100000000000000
    //3000000000 took 1 minute
    //for (let t = 100000000000000; t < 300000000000000; t++) {
    for (let t = 0; t < 3000; t++) {
      let matches = 0;
      for (let busIx = 0; busIx < busRules.length; busIx++) {
        let busID = busRules[busIx][0];
        let minutes = busRules[busIx][1];

        if (!(this.nextDepart(busID, t + minutes) == t + minutes)) {
          break;
        } else {
          matches++;
        }
      }
      if (matches == busRules.length) {
        found_t = t;
        break;
      }
    }
    return [found_t, ""];
  }

  findEarliestBus(input) {
    let earliestLeave = Number(input[0]);
    let busses = input[1].split(",");

    let earliestTime = 0;
    let earliestBus = 0;

    let self = this;
    busses.forEach(function(busID) {
      if (busID != "x") {
        let nextTime = self.nextDepart(Number(busID), earliestLeave);
        if (earliestTime == 0 || nextTime < earliestTime) {
          earliestTime = nextTime;
          earliestBus = busID;
        }
      }
    });
    return [
      earliestBus * (earliestTime - earliestLeave),
      [earliestBus, earliestTime]
    ];
  }

  nextDepart(busID, afterTimestamp) {
    let next = afterTimestamp;
    let rem = afterTimestamp % busID;
    if (rem > 0) {
      let before = afterTimestamp - rem;

      next = before + busID;
    }
    return next;
  }
}
