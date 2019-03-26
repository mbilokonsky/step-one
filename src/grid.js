const default_cell_builder = require('./cell_builder')
const grid_utils = require('./grid_utils')

module.exports = function(dimensions, default_value = false) {
	let cell_builder, value
	if (typeof default_value === 'function') {
		cell_builder = default_value;
		value = false;
	} else {
		cell_builder = default_cell_builder
		value = default_value
	}

	const array_size = grid_utils.get_array_size(dimensions)
	const get_coordinates = grid_utils.get_coordinates_for_index.bind(null, dimensions);

	const grid = new Array(array_size)
		.fill()
		.map((_, index) => cell_builder(get_coordinates(index), value))

		grid.dimensions = dimensions;

	return grid
}
