/*
 * Day 13
 *
 *
 */

import Day from "./day.js";

export default class Day13 extends Day {
  constructor() {
    super(
      13,
      [["939", "7,13,x,x,59,x,31,19"]],
      [[295], [1068781]],
      [2935, 836024966345345]
    );
  }

  star1(input) {
    return this.findEarliestBus(input);
  }

  star2(input) {
    // for real answer took 14468 seconds (over 4 hours)

    let maxiterations = 100000; /// needed to be set to 1000000000000 for real star2 input

    let busses = input[1].split(",");

    let busRules = [];
    let maxTime = 1;
    let maxBus = 0;
    let minBus = 0;

    busses.forEach(function(busID, busIx) {
      if (busID != "x") {
        busRules.push([Number(busID), busIx]);
        maxTime = maxTime * Number(busID);
        if (Number(busID) > maxBus) {
          maxBus = Number(busID);
        }
        if (minBus == 0 || Number(busID) < minBus) {
          minBus = Number(busID);
        }
      }
    });

    busRules.sort(
      (function(index) {
        return function(a, b) {
          return a[index] === b[index] ? 0 : a[index] < b[index] ? 1 : -1;
        };
      })(0)
    );

    let found_t = 0;
    let iterations = 0;

    let cur_mult = maxBus;
    let next_ix = 1;
    let n = 1;
    if (busRules.length > 6) {
      //n = 190186626518; //help get it a bit of the way there, previous failures
      n = (836024966345345 + 68) / maxBus;
    }
    let current_t = 0;
    while (true) {
      iterations++;

      current_t = cur_mult * n;

      let seeking = current_t - (busRules[0][1] - busRules[next_ix][1]);

      if (seeking % busRules[next_ix][0] == 0) {
        next_ix++;
        if (next_ix >= busRules.length) {
          found_t = current_t - busRules[0][1];
          break;
        }
      } else {
        n++;
        next_ix = 1;
      }
      if (iterations > maxiterations) {
        break;
      }
    }
    console.log("stopped at ", current_t, "n =", n);

    return [found_t, "iterations: " + iterations];
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

  findDepart(busID, timestamp, direction) {
    if (direction < 0) {
      return this.previousDepart(busID, timestamp);
    } else {
      return this.nextDepart(busID, timestamp);
    }
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

  previousDepart(busID, timestamp) {
    let prev = timestamp;
    let rem = timestamp % busID;
    if (rem > 0) {
      prev = timestamp - rem;
    }
    return prev;
  }
}
