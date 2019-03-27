const moore = require("../../src/neighbors/moore");
describe.only("Moore Neighborhood", () => {
  it("by default returns all points within 1 space of [0,0]", () => {
    const result = moore();
    expect(result).toMatchInlineSnapshot(`
Array [
  Array [
    -1,
    -1,
  ],
  Array [
    0,
    -1,
  ],
  Array [
    1,
    -1,
  ],
  Array [
    -1,
    0,
  ],
  Array [
    1,
    0,
  ],
  Array [
    -1,
    1,
  ],
  Array [
    0,
    1,
  ],
  Array [
    1,
    1,
  ],
]
`);
  });

  it("supports an optional point parameter", () => {
    const result = moore([2, 3]);
    expect(result).toMatchInlineSnapshot(`
Array [
  Array [
    1,
    2,
  ],
  Array [
    2,
    2,
  ],
  Array [
    3,
    2,
  ],
  Array [
    1,
    3,
  ],
  Array [
    3,
    3,
  ],
  Array [
    1,
    4,
  ],
  Array [
    2,
    4,
  ],
  Array [
    3,
    4,
  ],
]
`);
  });

  it("supports an optional range parameter", () => {
    const result = moore([2, 3], 2);
    expect(result.length).toBe(24);
  });

  it("supports fluid dimensionality", () => {
    const result = moore([2, 3, 5], 2);
    expect(result.length).toBe(124);
  });
});
