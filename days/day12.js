/*
 * Day 12
 *
 *
 */

import Day from "./day.js";

export default class Day12 extends Day {
  constructor() {
    super(12, [["F10", "N3", "F7", "R90", "F11"]], [[25], [286]], [439, 12385]);
  }

  star1(input) {
    let location = this.navigate(input);
    return [Math.abs(location[0]) + Math.abs(location[1]), location];
  }

  // 54933 is too high, 16179 too high, 108623 obv too high
  star2(input) {
    let location = this.navigate(input, true);
    return [Math.abs(location[0]) + Math.abs(location[1]), location];
  }

  navigate(input, usewaypoint = false) {
    let shipdirection = 90;

    let waypoint = [10, 1];
    let coords = [0, 0];

    input.forEach(function(instruction) {
      let instr = instruction.charAt(0);
      let units = Number(instruction.substring(1));
      let x = 0;
      let y = 0;
      let moveship = false;
      let movewaypoint = false;
      if (instr == "R") {
        if (usewaypoint) {
          let origu = units;
          if (units == 90) {
            units = 270;
          } else if (units == 270) {
            units = 90;
          }
          units = (units * Math.PI) / 180;
          let tmp = [waypoint[0] - coords[0], waypoint[1] - coords[1]];
          let newx =
            tmp[0] * (Math.cos(units) | 0) - tmp[1] * (Math.sin(units) | 0);
          let newy =
            tmp[1] * (Math.cos(units) | 0) + tmp[0] * (Math.sin(units) | 0);
          waypoint[0] = coords[0] + newx;
          waypoint[1] = coords[1] + newy;
        } else {
          shipdirection += units;
          while (shipdirection >= 360) {
            shipdirection -= 360;
          }
        }
      } else if (instr == "L") {
        if (usewaypoint) {
          units = (units * Math.PI) / 180;
          let tmp = [waypoint[0] - coords[0], waypoint[1] - coords[1]];
          let newx =
            tmp[0] * (Math.cos(units) | 0) - tmp[1] * (Math.sin(units) | 0);
          let newy =
            tmp[1] * (Math.cos(units) | 0) + tmp[0] * (Math.sin(units) | 0);
          waypoint[0] = coords[0] + newx;
          waypoint[1] = coords[1] + newy;
        } else {
          shipdirection -= units;
          while (shipdirection < 0) {
            shipdirection += 360;
          }
        }
      } else if (instr == "F") {
        if (usewaypoint) {
          moveship = true;
          x = units * (waypoint[0] - coords[0]);
          y = units * (waypoint[1] - coords[1]);
        } else {
          moveship = true;
          if (shipdirection == 0) {
            y = units;
          } else if (shipdirection == 270) {
            x = -1 * units;
          } else if (shipdirection == 180) {
            y = -1 * units;
          } else if (shipdirection == 90) {
            x = units;
          } else {
            // assuming this shouldn't happen for the inputs
          }
        }
      } else {
        if (usewaypoint) {
          movewaypoint = true;
        } else {
          moveship = true;
        }
        switch (instr) {
          case "N":
            y = units;
            break;
          case "S":
            y = -1 * units;
            break;
          case "E":
            x = units;
            break;
          case "W":
            x = -1 * units;
            break;
        }
      }
      if (moveship) {
        coords[0] += x;
        coords[1] += y;
        waypoint[0] += x;
        waypoint[1] += y;
      } else if (movewaypoint) {
        waypoint[0] += x;
        waypoint[1] += y;
      }
    });

    return coords;
  }
}
