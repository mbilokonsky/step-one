const createGrid = require('./grid')
const grid_utils = require('./grid_utils')
const ca_levels = require('./ca_levels')
const rules = require('./rules')

const evolve = (ca, rule = rules.premade.game_of_life) => {
	const delta = grid_utils.apply_rule(ca.grid, rule)
	const new_state = grid_utils.apply_delta(ca.grid, delta)
	const integral = grid_utils.apply_delta(createGrid(ca.grid.dimensions), ca.grid)

	ca.grid = new_state;
	ca.history = {
		[ca_levels.BASE]: [new_state, ...ca.history[ca_levels.BASE]],
		[ca_levels.DERIVATIVE]: [delta, ...ca.history[ca_levels.DERIVATIVE]],
		[ca_levels.INTEGRAL]: [integral, ...ca.history[ca_levels.INTEGRAL]]
	}

	return ca
}


module.exports = {
	evolve
}
