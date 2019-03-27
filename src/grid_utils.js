const get_coordinates_for_index = (dimensions, index) => {
	const point = [];
	let divisor = 1;
	for (var i = 0; i < dimensions.length; i++) {
		const mod_by = dimensions[i]
		point.push(Math.floor(index / divisor) % mod_by)
		divisor = divisor * mod_by;
	}

	return point
}

const lookup_index_for_point = (dimensions, point) => {
	if (point.length !== dimensions.length) {
		throw new Error(`Dimensionality mismatch: cannot find point ${point} in space ${dimensions}`)
	}


	/*
			if you have an n-dimensional array that maps to an AxBxC grid, the index
			for any given point requested is: a + A*b + A*B*c

			Each number generates an offset. Your final return index is the sum of the offsets.

			think of it as: the first number tells you which vertical column you're looking at
				(value is between 0 and width, return value is just the value)
			the second number tells you which horizontal column you're looking at
				(value is between 0 and height, return value + (width * value))
			the third number tells you which depth column you're looking at
				(value is between 0 and depth, return value + (width * height * value))
			etc.

			Then you just add them up and that's your index.
	*/

	let index = 0;
	let multiplier = 1;
	for (var i = 0; i < dimensions.length; i++) {
		index = index + (multiplier * point[i])
		multiplier = multiplier * dimensions[i]
	}

	return index
}

const getPoint = (grid, point) => grid[lookup_index_for_point(grid.dimensions, point)]

const get_array_size = dimensions => dimensions.reduce((acc, val) => acc * val, 1)

const clone = grid => {
	const new_grid = grid.slice()
	new_grid.dimensions = grid.dimensions.slice();
	return new_grid
}

const rules = require('./rules')
const apply_rule = (grid, rule) => {
	const bound_rule = rules.apply_rule.bind(null, rule, getPoint.bind(null, grid))
	const output = grid.map(bound_rule)
	output.dimensions = grid.dimensions
	return output;
}

const apply_delta = (grid, delta) => {
	const output = grid.map((v, i) => delta[i].value ? {...v, value: !v.value} : v)
	output.dimensions = grid.dimensions
	return output
}

const { moore } = require('./neighbors')
const find_neighbors = (point, range, get_neighbors = moore) => {
	return get_neighbors(point, range)
}

const print_grid_1d = grid => grid.map(c => c.value ? 'X' : '.').join('')

const print_grid_2d = grid => {
	const [width] = grid.dimensions
	return grid
		.map((c, i) => {
			return (i%width===0 ? '\n' : '') + (c.value ? 'X' : '.')
		})
		.join('')

}

module.exports = {
	get_coordinates_for_index,
	lookup_index_for_point,
	getPoint,
	get_array_size,
	clone,
	apply_rule,
	apply_delta,
	find_neighbors,
	print_grid_2d
}
