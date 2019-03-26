const ca_levels = require('./ca_levels')

module.exports = (grid, history = {}) => {
	const ca = {
		grid,
		history: {
			[ca_levels.BASE]: [grid],
			[ca_levels.DERIVATIVE]: [grid.clone()],
			[ca_levels.INTEGRAL]: [grid.clone()],
			[ca_levels.FUTURE]: [grid.clone()],
			...history
		}
	}

	return ca;
}
