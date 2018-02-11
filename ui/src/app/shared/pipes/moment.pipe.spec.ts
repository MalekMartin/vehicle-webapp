import { MomentPipe } from './moment.pipe';

describe('MomentPipe', () => {

    let pipe: MomentPipe;

    beforeEach(() => {
        pipe = new MomentPipe();
    });

    it('Should return empty string for empty value', () => {
        expect(pipe.transform(undefined, '')).toBe('');
    });

    it('Should format value', () => {
        expect(pipe.transform('2015-07-16T22:00:00.000Z', 'DD.MM.YYYY'))
            .toBe('17.07.2015');
    });

    it('Should return value when value is not valid date', () => {
        expect(pipe.transform('not a date')).toBe('not a date');
    });

});
