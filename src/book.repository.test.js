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
