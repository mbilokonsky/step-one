const apply_rule = (rule_string, to_cell, cell) => {
	const { range, survival_values, birth_values, get_neighbors } = parse(rule_string);

	const living_neighbor_count = get_neighbors(cell.coordinates, range)
		.map(to_cell)
		.filter(c => !!c && !!c.value)
		.length

	if (cell.value) {
		const value = survival_values.indexOf(living_neighbor_count) > -1
		const output = {...cell, value}
		return output
	}
	const value = birth_values.indexOf(living_neighbor_count) > -1
	const output = {...cell, value }
	return output;
}

const { moore, von_neumann } = require('../neighbors')
const parse = str => {
	const [ birth, survival, range, neighborhood_type ] = str.split(":")
	return {
		birth_values: birth.split('').map(i => parseInt(i)),
		survival_values: survival.split('').map(i => parseInt(i)),
		range: parseInt(range),
		get_neighbors: neighborhood_type === 'v' ? von_neumann : moore
	}
}

module.exports = {
	apply_rule,
	parse,
	premade: {
		game_of_life: "3:23:1:m"
	}
}
