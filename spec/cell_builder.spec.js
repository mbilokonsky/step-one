const cell_builder = require('../src/cell_builder')
describe('cell_builder', () => {
	it('is a function', () => {
		expect(typeof cell_builder).toBe('function')
	})

	it('sets the coordinates of the cell to the input value', () => {
		expect(cell_builder([1, 3]).coordinates).toEqual([1, 3])
		expect(cell_builder([7, 33, 12]).coordinates).toEqual([7, 33, 12])
		expect(cell_builder([0]).coordinates).toEqual([0])
	})

	it('sets the value of the cell to the default value (0)', () => {
		expect(cell_builder([1, 3]).value).toEqual(0)
	})

	it('sets the value of the cell to the value provided', () => {
		expect(cell_builder([1, 3], 'foobar').value).toEqual('foobar')
	})
})
