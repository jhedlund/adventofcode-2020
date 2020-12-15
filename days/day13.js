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

    if (busRules.length > 6) {
      return;
    }

    let found_t = 0;
    let iterations = 0;
    let timestamp = busRules[0][0];

    let cur_mult = maxBus;
    let next_ix = 1;
    let n = 1;
    if (busRules.length > 6) {
      //n = 2395816212;
      n = 190186626518;
    }
    let current_t = 0;
    while (true) {
      iterations++;

      current_t = cur_mult * n;

      //let seeking = largestBusID - (largestBusMinutes - busRules[busIx][1]);
      let seeking = current_t - (busRules[0][1] - busRules[next_ix][1]);

      if (seeking % busRules[next_ix][0] == 0) {
        /*if (current_t < 10000 && busRules.length < 6) {
          console.log(
            "MATCH! on ",
            current_t,
            busRules[next_ix][0],
            x * busRules[next_ix][0],
            "n=",
            n,
            "x=",
            x
          );
        }*/
        next_ix++;
        if (next_ix >= busRules.length) {
          found_t = current_t - busRules[0][1];
          break;
        }
      } else {
        /*if (next_ix > 1) {
          console.log(
            "missed out, seeking ",
            current_t,
            "but went over with ",
            x * busRules[next_ix][0]
          );
        }*/
        n++;
        next_ix = 1;
      }
      /*   for (let busIx = 0; busIx < busRules.length; busIx++) {
        if (timestamp >= 1068780 && timestamp <= 1068789) {
          console.log(
            "busID",
            busRules[busIx][0],
            "comparing timestamp",
            timestamp + busRules[busIx][1]
          );
        }
        if ((timestamp + busRules[busIx][1]) % busRules[busIx][0] == 0) {
          matches++;
        } else {
          break;
        }
      }
*/
      if (iterations > 100000000000) {
        break;
      }
      timestamp += minBus;
    }
    console.log("stopped at ", current_t, "n =", n);
    //130000013
    //1300000013
    //1301300000
    //13001300000
    //13013000000
    //13130000000
    //12982381815
    //7317223810
    //73172220508
    //146344441749
    //219516661524
    //292688882765
    //1024411081981
    //1756133282663
    //6885855482612
    //8351855484811
    //37671855482612
    //44257355278488
    //66234577275046
    //139406797236961
    //100000000000000

    /*
    let iterations = 0;
    let multiplier = Math.floor(maxTime / busRules[0][0]);
    //if (busRules.length > 6) {
    //201153999984665
    //multiplier = Math.floor(100000000000000 / busRules[0][0]);
    //multiplier = Math.floor(208483999983932 / busRules[0][0]);

    console.log("Starting at multiplier ", multiplier);
    //}

    while (true) {
      iterations++;

      let matches = 0;

      let largestBusID = busRules[0][0];
      let largestBusMinutes = busRules[0][1];

      largestBusID = largestBusID * multiplier;

      for (let busIx = 1; busIx < busRules.length; busIx++) {
        let seeking = largestBusID - (largestBusMinutes - busRules[busIx][1]);


        if (
          this.findDepart(
            busRules[busIx][0],
            largestBusID,
            -1 * (largestBusMinutes - busRules[busIx][1])
          ) != seeking
        ) {
          break;
        } else {
          matches++;
        }
      }

      multiplier--;

      if (iterations > 10000000000 || matches == busRules.length - 1) {
        console.log("stopped at ", largestBusID - largestBusMinutes);
        if (matches == busRules.length - 1) {
          found_t = largestBusID - largestBusMinutes;
        }
        break;
      }
    }
*/
    //1828096811171363
    //1828090214171363
    //1827364544171363
    //1820767544171363
    //100000000000000
    //1000000000 iterations took 17.3s got to:
    //733000000665
    //10000000000 iterations took 257s got to:
    //7330000000665
    //10000000000 to
    //100000000000 itarations took 20623s got to:
    //73300000000665

    //100000000000000
    //3000000000 took 1 minute
    //for (let t = 100000000000000; t < 300000000000000; t++) {
    /*    for (let t = 0; t < 3000; t++) {
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
    }*/

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
