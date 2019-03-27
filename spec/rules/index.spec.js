const createGrid = require("../../src/grid");
const grid_utils = require("../../src/grid_utils");
const rules = require("../../src/rules");
const { moore, von_neumann } = require("../../src/neighbors");

describe("rules", () => {
  describe(".apply_rule", () => {
    it("computes the next value of a cell", () => {
      const grid = createGrid([10, 10]);

      const input = [[4, 2], [3, 3], [4, 3], [5, 3], [4, 4]];

      input.forEach(point => (grid_utils.getPoint(grid, point).value = true));

      const state1 = grid_utils.print_grid_2d(grid);
      console.log(state1);

      const to_cell = grid_utils.getPoint.bind(null, grid);

      const applied_rule = rules.apply_rule.bind(null, "3:23:1", to_cell);
      const new_grid = grid.map(cell => applied_rule(cell));
      new_grid.dimensions = grid.dimensions;

      const state2 = grid_utils.print_grid_2d(new_grid);
      console.log(state2);
      expect(state1).toMatchInlineSnapshot(`
"
..........
..........
....X.....
...XXX....
....X.....
..........
..........
..........
..........
.........."
`);
      expect(state2).toMatchInlineSnapshot(`
"
..........
..........
...XXX....
...X.X....
...XXX....
..........
..........
..........
..........
.........."
`);
    });
  });
  describe(".parse", () => {
    it("converts a rules string into a rules object", () => {
      const string = "2:23:1:v";
      const rule = rules.parse(string);

      expect(rule.survival_values).toEqual([2, 3]);
      expect(rule.birth_values).toEqual([2]);
      expect(rule.range).toEqual(1);
      expect(rule.get_neighbors).toEqual(von_neumann);
    });

    it("defaults to a moore function", () => {
      const string = "2:23:1";
      const rule = rules.parse(string);

      expect(rule.survival_values).toEqual([2, 3]);
      expect(rule.birth_values).toEqual([2]);
      expect(rule.range).toEqual(1);
      expect(rule.get_neighbors).toEqual(moore);
    });
  });
});
