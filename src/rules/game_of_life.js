const { moore } = require('../neighbors')
module.exports = {
	range: 1,
	get_neighbors: moore,
	survival_values: [2,3],
	birth_values: [2]
}
