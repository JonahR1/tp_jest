const BookRepository = require('./book.repository');

describe('Book repository Save', function () {

    test('Save a book', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: "Unit test"});

        expect(dbMock.write.mock.calls.length).toBe(1);
    });
});

describe('Book repository getTotalCount', function () {

    test('get number of books', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(1)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalCount()).toBe(1);
    });
});

describe('Book repository getTotalPrice', function () {

    test('get total price of books', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(4).mockReturnValueOnce(1)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalPrice()).toBe(4);
    });
});

describe('Book repository getBookByName', function () {

    var object = {
        'id' : 1,
        "name" :"test",
        'price' :6.1,
        "added_at" : '2019-01-01'
    };

    test('get book by name ', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(object)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getBookByName('test')).toStrictEqual(object);
    });
});

describe('Book repository getCountBookAddedByMonth', function () {
    var data = [
        {
            id: 1,
            name: "test",
            price: 6.1,
            added_at: "2019-01-04"
        },
        {
            id: 1,
            name: "test",
            price: 6.1,
            added_at: "2019-02-04"
        },
        {
            id: 1,
            name: "test",
            price: 6.1,
            added_at: "2019-01-04"
        },
        {
            id: 1,
            name: "test",
            price: 6.1,
            added_at: "2019-12-04"
        }];

    var result = [
            {
             "count": 1,
             "count_cumulative": 1,
             "month": 1,
             "year": 2019,
            },
            {
             "count": 1,
             "count_cumulative": 2,
             "month": 2,
             "year": 2019,
            },
            {
             "count": 1,
             "count_cumulative": 3,
             "month": 1,
             "year": 2019,
            },
            {
             "count": 1,
             "count_cumulative": 4,
             "month": 12,
             "year": 2019,
            }]
    
    test('get number of a book added by month with null value => [] ', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter: jest.fn().mockReturnThis(),
            sortBy: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getCountBookAddedByMonth('test')).toStrictEqual([]);
    });

    test('get number of a book added by month with array in value ', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter: jest.fn().mockReturnThis(),
            sortBy: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(data)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getCountBookAddedByMonth('test')).toStrictEqual(result);
    });
});



