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

describe("includes" , () => {
    var i1 = new Interval(0,2);
    test('Test (0,2) and (0,1) => true', () => {
        var i2 = new Interval(0, 1);

        expect(i1.includes(i2)).toBe(true);
    });
    test('Test (0,2) and (0,3) => false', () => {
        var i2 = new Interval(0, 3);

        expect(i1.includes(i2)).toBe(false);
    });
});

describe("union" , () => {
    var i1 = new Interval(0,2);
    test('Test (0,2) and (0,1) => [(0, 2)]', () => {
        var i2 = new Interval(0, 1);

        expect(i1.union(i2)).toStrictEqual([new Interval(0, 2)]);
    });
    test('Test (0,2) and (3,6) => [(0,2), (3,6)]', () => {
        var i2 = new Interval(3, 6);

        expect(i1.union(i2)).toStrictEqual([i1, i2]);
    });
});


describe("intersection" , () => {
    var i1 = new Interval(0,3);
    test('Test (0,3) and (1,4) => (1, 3)', () => {
        var i2 = new Interval(1, 4);

        expect(i1.intersection(i2)).toStrictEqual(new Interval(1, 3));
    });
    test('Test (0,3) and (4,6) => null', () => {
        var i2 = new Interval(4, 6);

        expect(i1.intersection(i2)).toStrictEqual(null);
    });
});

describe("exclusion" , () => {
    var i1 = new Interval(0,3);
    test('Test (0,3) and (1,4) => [(0, 1), (3, 4)]', () => {
        var i2 = new Interval(1, 4);

        expect(i1.exclusion(i2)).toStrictEqual([new Interval(0, 1), new Interval(3, 4)]);
    });
    test('Test (0,3) and (4,6) => null', () => {
        var i2 = new Interval(4, 6);

        expect(i1.exclusion(i2)).toStrictEqual([i1, i2]);
    });

    test('Test (0,3) and (1,2) => [(0, 1), (2, 3)]', () => {
        var i2 = new Interval(1, 2);

        expect(i1.exclusion(i2)).toStrictEqual([new Interval(0, 1), new Interval(2, 3)]);
    });

    test('Test (0,3) and (-1,6) => [(-1, 0), (3, 6)]', () => {
        var i2 = new Interval(-1, 6);

        expect(i1.exclusion(i2)).toStrictEqual([new Interval(-1, 0), new Interval(3, 6)]);
    });

    test('Test (0,3) and (-1,2) => [(-1, 0), (2, 3)]', () => {
        var i2 = new Interval(-1, 2);

        expect(i1.exclusion(i2)).toStrictEqual([new Interval(-1, 0), new Interval(2, 3)]);
    });

    test('Test (0,3) and (3,6) => [(0, 3), (3, 6)]', () => {
        var i2 = new Interval(3, 6);

        expect(i1.exclusion(i2)).toStrictEqual([i1, i2]);
    });

    test('Test (0,3) and null => [(0, 3)]', () => {
        var i2 = null;

        expect(i1.exclusion(i2)).toStrictEqual([i1]);
    });

    test('Test (0,3) and nothing => [(0, 3)]', () => {
        expect(i1.exclusion()).toStrictEqual([i1]);
    });
});