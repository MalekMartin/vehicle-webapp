import { OrderByDatePipe } from './order-by-date.pipe';

describe('OrderByDatePipe', () => {

    let pipe: OrderByDatePipe;

    beforeEach(() => {
        pipe = new OrderByDatePipe();
    });

    it('should return empty array', () => {
        expect(pipe.transform(null)).toEqual([]);
    });

    it('should sort array - DESC', () => {

        const mock = [
            { date: '2011-07-05' },
            { date: '2016-07-05' }
        ];

        expect(pipe.transform(mock)).toEqual([
            { date: '2016-07-05' },
            { date: '2011-07-05' }
        ]);
    });

    it('should sort array - ASC', () => {

        const mock = [
            { date: '2017-07-05' },
            { date: '2016-07-05' }
        ];

        expect(pipe.transform(mock,'ASC')).toEqual([
            { date: '2016-07-05' },
            { date: '2017-07-05' }
        ]);
    });

    it('should return array', () => {

        const mock = [
            { name: '2017-07-05' },
            { price: '2016-07-05' }
        ];

        expect(pipe.transform(mock,'ASC')).toEqual(mock);
    });


});
