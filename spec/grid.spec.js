const createGrid = require('../src/grid')
const grid_utils = require('../src/grid_utils')

describe('grid', () => {
	it('is a function', () => {
		expect(typeof createGrid).toBe('function')
	})

	it('returns an array with as many dimensions as requested', () => {
		const dimensions1 = [5] // one dimension, five length.
		const dimensions2 = [32, 234, 12] // three dimensions etc

		const grid1 = createGrid(dimensions1)
		const grid2 = createGrid(dimensions2)

		expect(grid1.length).toBe(5);
		expect(grid2.length).toBe(32 * 234 * 12)
	})

	it('which returns a cell based on a position array', () => {
		const dimensions = [20, 20, 20];
		const grid = createGrid(dimensions);

		const point1 = [0, 0, 0];
		const point2 = [19, 19, 19];

		expect(grid_utils.getPoint(grid, point1).coordinates).toEqual(point1)
		expect(grid_utils.getPoint(grid, point2).coordinates).toEqual(point2)
	})

	it('supports an optional default_value', () => {
		const dimensions = [20, 20, 20];
		const grid = createGrid(dimensions, "foobar");
		expect(grid_utils.getPoint(grid, [12, 1, 3]).value).toBe("foobar")
	})

	it('supports optional function (point, value) as default_value', () => {
		const dimensions = [20, 20, 20];
		const cell_builder = (point, value) => `${point} has value ${value}`
		const grid = createGrid(dimensions, cell_builder);
		expect(grid_utils.getPoint(grid, [12, 1, 3])).toBe(`${[12, 1, 3]} has value false`)
	})
})
