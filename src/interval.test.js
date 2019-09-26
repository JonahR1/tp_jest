const Interval = require("./interval");

describe("overlaps" , () => {
    var i1 = new Interval(0,1);
    test('Test overlaps', () => {
        var i2 = new Interval(0, 2);

        expect(i1.overlaps(i2)).toBe(true);
    });
    test('Test overlaps', () => {
        var i2 = new Interval(1, 1);

        expect(i1.overlaps(i2)).toBe(false);
    });
});

