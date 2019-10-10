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

    test('Save nothing', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save();

        expect(dbMock.write.mock.calls.length).toBe(0);
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

    test('get number of books check call', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(1)
        };
        const repository = new BookRepository(dbMock);

        repository.getTotalCount();

        expect(dbMock.value.mock.calls.length).toBe(1);
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

    test('get total price of books test with 0', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(0)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalPrice()).toBe(0);
    });

    test('get total price of books calls test', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(10)
        };
        const repository = new BookRepository(dbMock);
        repository.getTotalPrice();
        expect(dbMock.value.mock.calls.length).toBe(11);
    });
});

describe('Book repository getBookByName', function () {

    var object = {
        'id' : 1,
        "name" :"test",
        'price' :6.1,
        "added_at" : '2019-01-01'
    };

    test('get book by name with a book result', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(object)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getBookByName('test')).toStrictEqual(object);
    });

    test("get book by name with a null result (bookName doesn't exist)", () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue()
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getBookByName('test')).toStrictEqual(null);
    });

    test("get book by name with a null result (bookname argument is not defined or null)", () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue()
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getBookByName()).toStrictEqual(null);
    });

    test("get book by name call test with 0 argument", () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue()
        };
        const repository = new BookRepository(dbMock);

        repository.getBookByName();

        expect(dbMock.value.mock.calls.length).toBe(0);
    });

    test("get book by name call test with argument", () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(object)
        };
        const repository = new BookRepository(dbMock);

        repository.getBookByName("test");

        expect(dbMock.value.mock.calls.length).toBe(1);
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
            added_at: "2020-12-04"
        },
        {
            id: 1,
            name: "test",
            price: 6.1,
            added_at: "2020-12-04"
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
             "count": 2,
             "count_cumulative": 5,
             "month": 12,
             "year": 2020,
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

    test('get number of a book added by month with argument and array in value  check call', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter: jest.fn().mockReturnThis(),
            sortBy: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(data)
        };
        const repository = new BookRepository(dbMock);
        repository.getCountBookAddedByMonth('test');
        expect(dbMock.value.mock.calls.length).toBe(1);
    });

    test('get number of a book added by month with no argument and array in value check call', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter: jest.fn().mockReturnThis(),
            sortBy: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(data)
        };
        const repository = new BookRepository(dbMock);
        repository.getCountBookAddedByMonth();
        expect(dbMock.value.mock.calls.length).toBe(0);
    });


    test('get number of a book added by month with argument and no array in value check call', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter: jest.fn().mockReturnThis(),
            sortBy: jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue()
        };
        const repository = new BookRepository(dbMock);
        repository.getCountBookAddedByMonth('test');
        expect(dbMock.value.mock.calls.length).toBe(1);
    });
});



