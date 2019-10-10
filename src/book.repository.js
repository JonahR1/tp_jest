class BookRepository {

    /**
     * @param db
     */
    constructor(db) {
        this.db = db;
    }

    save (book) {
        if(book != null && typeof(book) != "undefined") this.db.get('books').push(book).write();
    }

    /**
     * Nombre total de livre
     */
    getTotalCount() {
        return this.db.get('books').size().value();
    }

    /**
     * Somme du prix de tous les livre
     */
    getTotalPrice() {
        let result = 0;
        let length = this.getTotalCount();

        for(let i = 0 ; i < length ; ++i) {
            result += this.db.get('books[' + i + '].price').value();
        }

        return result;
    }


    /**
     * Retourne un livre
     */
    getBookByName(bookName) {
        let result = this.db.get('books').find({name: bookName}).value()

        if(typeof(result) == "undefined") result = null;

        return result;
    }

    /**
     * Nombre de livre ajouté par mois
     *
     *  [
     *      {
     *          year: 2017,
     *          month, 2,
     *          count, 129,
     *          count_cumulative: 129
     *      },
     *      {
     *          year: 2017,
     *          month, 3,
     *          count, 200,
     *          count_cumulative: 329
     *      },
     *      ....
     *  ]
     */
    getCountBookAddedByMonth(bookName) {
        var array = this.db.get('books').filter({name: bookName}).sortBy('added_at').value();
        var length = array.length;
        var result = [];
        if(length > 0) {
            var year = new Date(array[0].added_at).getFullYear();
            var month = new Date(array[0].added_at).getMonth() + 1;
            var count = 1;
            var count_cumulative = 1;

            let newYear, newMonth, newDate;
            for(let i = 1 ; i < length ; ++i) {
                newDate =  new Date(array[i].added_at)
                newYear = newDate.getFullYear();
                newMonth = newDate.getMonth() + 1;
                if(newYear != year || newMonth != month) {
                    result.push({
                        year: year,
                        month: month,
                        count: count,
                        count_cumulative: count_cumulative
                    });

                    count = 1;
                    year = newYear;
                    month = newMonth;
                }
                else {
                    ++count;
                }
                ++count_cumulative;
            }

            result.push({
                year: year,
                month: month,
                count: count,
                count_cumulative: count_cumulative
            });
        }
        return result;
    }


}


module.exports = BookRepository;