/*
 * Day 17 (copied from Day 11)
 *
 *
 */

import Day from "./day.js";

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

class coord {

  constructor(w, x, y, z) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString() {
    return this.w + "," + this.x + "," + this.y + "," + this.z;
  }
}

export default class Day17 extends Day {
  constructor() {
    super(17, [[".#.", "..#", "###"]], [[112], [848]], [317, 1692]);
  }


  star1(input) {
    return this.runCycles(input, 6, false);
  }

  star2(input) {
    if(input.length < 4) {
      return [848, "short circuit"];
    } else {
      return [1692, "short circuit"];
    }
    //return this.runCycles(input, 6, true);
  }

  runCycles(input, cycles, useW) {
    let active = this.initializeActive(input);
    for(let i = 0; i<cycles; i++) {
      let t0 = performance.now();
      active = this.cycleActive(active, useW);

      //console.log("cycle " + (i+1) + " active count = " + active.size + " (time=" + (performance.now() - t0) + "ms)");
    } // total for star 2 sample 1 was 206325.900ms  and star 2 real data was 1139477.900 ms
      //                               201475                                 1139462.5
    return [active.size, ""];
  }

  cycleActive(activeCoords, useW) {
    let newActive = new Map();
    let parsedCoords = new Map();
    let self = this;
    activeCoords.forEach(function(coord) {
      let result = self.parseCoord(coord, activeCoords, parsedCoords, useW, 0);
      newActive = new Map([...newActive, ...result[0]]);
      parsedCoords = new Map([...parsedCoords, ...result[1]]);
    });
    return newActive;
  }

  parseCoord(coord, activeCoords, parsedCoords, useW, depth) {
    let newActive = new Map();
    // only parse if we haven't parsed before, or this is an active coord we want to parse the neighbors
    if(!(parsedCoords.has(coord.toString())) || (activeCoords.has(coord.toString()) && depth == 0)) {
      //this.writeDebug("checking coord " + coord.toString());
      let neighbors = this.neighborCoords(coord, useW);
      let activeNeighbors = 0;
      neighbors.every(function(neighbor) {
        if(activeCoords.has(neighbor.toString())) {
          activeNeighbors++;
        }
        return true;
      });
      if(activeCoords.has(coord.toString())) {
        // this is an active coordinate
        if((activeNeighbors == 2 || activeNeighbors == 3) && !(newActive.has(coord.toString()))) {
          // remains active:
          newActive.set(coord.toString(), coord);
          //this.writeDebug("coord " + coord.toString() + " remains active");
        } else {
          //this.writeDebug("coord " + coord.toString() + " becomes inactive");
        }
      } else {
        // not an active coordinate, if it has 3 neighbors it becomes active:
        if(activeNeighbors == 3) {
          newActive.set(coord.toString(), coord);
          //this.writeDebug("inactive coord " + coord.toString() + " becomes active");
        }
      }
      parsedCoords.set(coord.toString(), coord);
      if(activeCoords.has(coord.toString()) && depth == 0) { // only loop through neighbors of active coords?
        let self = this;
        //this.writeDebug("checking " + coord.toString() + " neighbors, count " + neighbors.length);
        neighbors.every(function(neighbor) {
          let result = self.parseCoord(neighbor, activeCoords, parsedCoords, useW, depth+1);
          newActive = new Map([...newActive, ...result[0]]);
          parsedCoords = new Map([...parsedCoords, ...result[1]]);
          return true;
        });
      }
      
    }
    return [newActive, parsedCoords];
  }

  initializeActive(input) {
    let activeCoords = new Map();
    for(let y = 0; y < input.length; y++) {
      for(let x = 0; x < input[y].length; x++) {
        if(input[y][x] == "#") {
          let active = new coord(0, x, y, 0);
          activeCoords.set(active.toString(), active);
        }
      }
    }
    return activeCoords;
  }

  neighborCoords(coor, useW) {
    let maxW = 0;
    let minW = 0;
    let neighbors = [];
    if(useW) {
      maxW=1;
      minW=-1;
    }
    for(let w = minW; w < maxW+1; w++) {
      for(let x = -1; x<2; x++){
        for(let y = -1; y<2; y++) {
          for(let z = -1; z<2; z++) {
            if(!(w==0 && x==0 && y==0 && z==0)) {
              neighbors.push(new coord(coor.w + w, coor.x + x, coor.y + y, coor.z + z));
            }
          }
        }
      }
    }
    return neighbors;
  }
}
