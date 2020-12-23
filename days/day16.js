/*
 * Day 16
 *
 *
 */

import Day from "./day.js";

export default class Day16 extends Day {
  constructor() {
    super(
      16,
      [
        [
          "class: 1-3 or 5-7",
          "row: 6-11 or 33-44",
          "seat: 13-40 or 45-50",
          "",
          "your ticket:",
          "7,1,14",
          "",
          "nearby tickets:",
          "7,3,47",
          "40,4,50",
          "55,2,20",
          "38,6,12"
        ]
      ],
      [[71], [1]],
      [30869, 4381476149273]
    );
  }

  star1(input) {
    let notes = new ticketNotes(input);
    return [notes.sum_invalid_fields()[0], ""];
  }
  star2(input) {
    let notes = new ticketNotes(input);
    return notes.field_order();
  }
}

class ticketNotes {
  constructor(input) {
    let self = this;
    let state = "rules";
    this.nearby_tickets = [];
    this.rules = new Map();
    input.forEach(function(line) {
      if (line.indexOf("your ticket") == 0) {
        state = "your";
      } else if (line.indexOf("nearby tickets") == 0) {
        state = "nearby";
      } else if (line.length > 0) {
        switch (state) {
          case "your":
            self.my_ticket = line;
            break;
          case "nearby":
            self.nearby_tickets.push(line);
            break;
          default:
            let rule = line.split(": ");
            let ruleranges = rule[1].split(" or ");
            let ranges = [];
            ruleranges.forEach(function(range) {
              range = range.split("-");
              range[0] = Number(range[0]);
              range[1] = Number(range[1]);
              ranges.push(range);
            });
            self.rules.set(rule[0], ranges);
            break;
        }
      }
    });
    this.allValidFields = [];
    this.rules.forEach(function(ranges, key) {
      ranges.forEach(function(rangerule) {
        let adjusted_rule = false;
        self.allValidFields.forEach(function(valid) {
          if (self.number_in_range(rangerule[0], valid)) {
            if (rangerule[1] > valid[1]) {
              valid[1] = rangerule[1];
            }
            adjusted_rule = true;
          } else if (self.number_in_range(rangerule[1], valid)) {
            if (rangerule[0] < valid[0]) {
              valid[0] = rangerule[0];
            }
            adjusted_rule = true;
          }
        });

        if (!adjusted_rule) {
          self.allValidFields.push(rangerule);
        }
      });
    });
  }

  number_in_range(number, range) {
    if (number >= range[0] && number <= range[1]) {
      return true;
    }
    return false;
  }

  field_order() {
    this.valid_tickets = [];
    let self = this;
    this.valid_tickets.push(this.my_ticket);

    let valid_field_positions = new Map();

    this.rules.forEach(function(ranges, fieldname) {
      valid_field_positions.set(fieldname, []);
      self.my_ticket.split(",").forEach(function(value, pos) {
        let validpos = valid_field_positions.get(fieldname);
        validpos.push(pos);
      });
    });

    this.nearby_tickets.forEach(function(ticket) {
      if (self.sum_invalid_fields(ticket)[1]) {
        self.valid_tickets.push(ticket);
      }
    });
    let known_positions = new Map();

    let result = this.find_valid_paths(
      new Map(),
      new Map(),
      valid_field_positions,
      0
    );

    if (result.length == 2) {
      known_positions = result[0];
      let multiply = 1;
      let my_ticket_fields = this.my_ticket.split(",");
      my_ticket_fields.forEach(function(value, position) {
        if (known_positions.get(position).indexOf("departure") == 0) {
          multiply = multiply * value;
        }
      });
      return [multiply, ""];
    }
    return [-1, "failure"];
  }

  // Returns array of 2 dictionaries:  known_positions and known_fields
  // known_positions are keyed on position and known_fields are keyed on fieldname
  find_valid_paths(
    known_positions,
    known_fields,
    valid_field_positions,
    depth
  ) {
    let pre_count = 0;
    let self = this;
    let count = 0;
    let result = [];
    while (true) {
      pre_count = known_positions.size;
      let zero_present = false;
      this.valid_tickets.forEach(function(ticket, ticketIx) {
        let fields = ticket.split(",");

        fields.forEach(function(value, fieldposition) {
          value = Number(value);

          for (const [fieldname, ranges] of self.rules.entries()) {
            let inrange = false;
            if (
              !known_fields.has(fieldname) &&
              !known_positions.has(fieldposition)
            ) {
              for (const [index, range] of ranges.entries()) {
                if (self.number_in_range(value, range)) {
                  inrange = true;
                  break;
                }
              }
            }
            let valid_positions = valid_field_positions.get(fieldname);
            if (
              !inrange &&
              valid_positions.indexOf(fieldposition) >= 0 &&
              known_positions.get(fieldposition) != fieldname
            ) {
              // If not in range, then this is not a valid position for this field
              valid_positions.splice(valid_positions.indexOf(fieldposition), 1);
            }
          }
        });
      });

      for (const [fieldname, positions] of valid_field_positions) {
        if (positions.length == 0) {
          console.log("zero for ", fieldname);
          zero_present = true;
          break;
        } else if (positions.length == 1) {
          known_positions.set(positions[0], fieldname);
          known_fields.set(fieldname, positions[0]);
        }
      }

      count++;
      let diff = known_positions.size - pre_count;
      let max_depth = 3;

      if (
        zero_present ||
        diff == 0 ||
        count > 20 ||
        known_positions.size == valid_field_positions.size ||
        depth > max_depth
      ) {
        if (zero_present) {
          return [];
        } else if (depth > max_depth) {
          break;
        } else if (
          diff > 0 &&
          known_positions.size != valid_field_positions.size
        ) {
          //
        } else if (known_positions.size != valid_field_positions.size) {
          for (const [fieldname, positions] of valid_field_positions) {
            if (positions.length > 1) {
              let save_positions = positions;
              for (let i = 0; i < positions.length; i++) {
                let new_position = positions[i];

                let new_vfp = this.copy_map(valid_field_positions);
                new_vfp.set(fieldname, [new_position]);
                let new_kp = this.copy_map(known_positions);
                new_kp.set(new_position, fieldname);
                let new_kf = this.copy_map(known_fields);
                new_kf.set(fieldname, new_position);

                result = this.find_valid_paths(
                  new_kp,
                  new_kf,
                  new_vfp,
                  depth + 1
                );

                if (known_positions.size == valid_field_positions.size) {
                  break;
                } else if (result == undefined || result.length == 0) {
                  //
                } else {
                  break;
                }
              }
              if (
                known_positions.size == valid_field_positions.size ||
                (result != undefined && result.length > 0)
              ) {
                if (result == undefined || result.length == 0) {
                  result = [known_positions, known_fields];
                }
                break;
              }
            }
          }
        } else if (known_positions.size == valid_field_positions.size) {
          console.log("Found at count", count, "depth", depth);
          result = [known_positions, known_fields];
        }
        break;
      }
    }
    return result;
  }

  copy_map(input) {
    let result = new Map();
    input.forEach(function(value, key) {
      result.set(key, value);
    });
    return result;
  }

  sum_invalid_fields(ticket) {
    let invalid_sum = 0;
    let ticket_valid = true;

    if (ticket == undefined) {
      let self = this;
      this.nearby_tickets.forEach(function(ticket) {
        let result = self.sum_invalid_fields(ticket);
        invalid_sum += result[0];
      });
      ticket_valid = true; // always return true for all tickets
    } else {
      let fields = ticket.split(",");
      let self = this;
      fields.forEach(function(value) {
        value = Number(value);
        let valid = false;
        for (let validIx = 0; validIx < self.allValidFields.length; validIx++) {
          if (self.number_in_range(value, self.allValidFields[validIx])) {
            valid = true;
            break;
          }
        }
        if (!valid) {
          ticket_valid = false;
          invalid_sum += value;
        }
      });
    }
    return [invalid_sum, ticket_valid];
  }
}
