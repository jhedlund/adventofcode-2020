/*
 * Day 3
 *
 *
 */

import Day from "./day.js";

export default class Day3 extends Day {
  constructor() {
    super(
      3,
      [
        [
          "..##.......",
          "#...#...#..",
          ".#....#..#.",
          "..#.#...#.#",
          ".#...##..#.",
          "..#.##.....",
          ".#.#.#....#",
          ".#........#",
          "#.##...#...",
          "#...##....#",
          ".#..#...#.#"
        ]
      ],
      [[7], []],
      [214]
    );
  }

  star1(inputArray) {
    return this.countTrees(inputArray);
  }

  countTrees(inputArray) {
    let move = [3, 1]; // right 3, down 1

    let location_x = 0;

    let open_count = 0;
    let tree_count = 0;

    if (inputArray[0].charAt(0) == ".") {
      open_count++;
    } else {
      tree_count++;
    }

    for (let i = 0; i < inputArray.length; i += move[1]) {
      if (i + move[1] < inputArray.length) {
        let targetRow = inputArray[i + move[1]];

        location_x += move[0];

        if (location_x >= targetRow.length) {
          // wrap it around, the rows repeat
          location_x = 0 + (location_x - targetRow.length);
        }
        if (targetRow.charAt(location_x) == ".") {
          open_count++;
        } else {
          tree_count++;
        }
        if (inputArray.length < 20 && false) {
          console.log(
            "location",
            i + move[1],
            location_x,
            ".".repeat(location_x) + "v"
          );
          console.log("location", i + move[1], location_x, targetRow);
        }
      }
    }

    return [tree_count, ""];
  }
}
