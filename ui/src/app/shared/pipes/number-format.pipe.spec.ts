import { NumberFormatPipe } from './number-format.pipe';

describe('NumberFormatPipe', () => {

    let pipe: NumberFormatPipe;

    beforeEach(() => {
        pipe = new NumberFormatPipe();
    });

    it('Should return empty value', () => {
        expect(pipe.transform(null, null)).toBe('');
    });

    it('Should return value', () => {
        expect(pipe.transform(10)).toBe('10');
    });

    it('Should return value with units', () => {
        expect(pipe.transform(10, 'km')).toBe('10km');
    });

    it('Should return value with no spaces', () => {
        expect(pipe.transform(100)).toBe('100');
    });

    it('Should retun value with no spaces and with units', () => {
        expect(pipe.transform(100, 'km')).toBe('100km');
    });

    it('Should return formated vaule w/o units', () => {
        expect(pipe.transform(1000)).toBe('1 000');
    });

    it('Should return formated vaule with units', () => {
        expect(pipe.transform(1000, 'km')).toBe('1 000km');
    });

    it('Should return formated decimal value w/o spaces', () => {
        expect(pipe.transform(1.1)).toBe('1.1');
    });

    it('Should return formated decimal value w/o spaces with units', () => {
        expect(pipe.transform(1.1, 'km')).toBe('1.1km');
    });

    it('Shhould return formated decimal w/o spaces', () => {
        expect(pipe.transform(100.1)).toBe('100.1');
    });

    it('Shhould return formated decimal w/o spaces and with units', () => {
        expect(pipe.transform(100.1, 'km')).toBe('100.1km');
    });

    it('Should return formated decimal with spaces', () => {
        expect(pipe.transform(1000.1)).toBe('1 000.1');
    });

    it('Should return formated decimal with spaces and units', () => {
        expect(pipe.transform(1000.1, 'km')).toBe('1 000.1km');
    });

});
