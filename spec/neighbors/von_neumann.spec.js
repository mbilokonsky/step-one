const von_neumann = require("../../src/neighbors/von_neumann");
describe("Moore Neighborhood", () => {
  it("by default returns all points within 1 space of [0,0]", () => {
    const result = von_neumann();
    expect(result.length).toBe(4);
  });

  it("supports an optional point parameter", () => {
    const result = von_neumann([2, 3]);
    expect(result.length).toBe(4);
	});

	it('supports an optional range parameter', () => {
		const result = von_neumann([2, 3], 2);
    expect(result.length).toBe(12);
	});

	it('supports fluid dimensionality', () => {
		const result = von_neumann([2, 3, 5], 2);
    expect(result.length).toBe(24);
	})
});
