const Interval = require("./interval");

describe("overlaps" , () => {
    var i1 = new Interval(0,1);
    test('Test (0,1) and (0,2) => true', () => {
        var i2 = new Interval(0, 2);

        expect(i1.overlaps(i2)).toBe(true);
    });
    test('Test (0,1) and (1,1) => false', () => {
        var i2 = new Interval(1, 1);

        expect(i1.overlaps(i2)).toBe(false);
    });
});

