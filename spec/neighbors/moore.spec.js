const moore = require("../../src/neighbors/moore");
describe("Moore Neighborhood", () => {
  it("by default returns all points within 1 space of [0,0]", () => {
    const result = moore();
    expect(result.length).toBe(8);
  });

  it("supports an optional point parameter", () => {
    const result = moore([2, 3]);
    expect(result.length).toBe(8);
	});

	it('supports an optional range parameter', () => {
		const result = moore([2, 3], 2);
    expect(result.length).toBe(24);
	});

	it('supports fluid dimensionality', () => {
		const result = moore([2, 3, 5], 2);
    expect(result.length).toBe(124);
	})
});
