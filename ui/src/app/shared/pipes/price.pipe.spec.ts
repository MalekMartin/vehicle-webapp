import { PricePipe } from './price.pipe';

describe('PricePipe', () => {

    let pipe: PricePipe;

    beforeEach(() => {
        pipe = new PricePipe();
    });

    it('Should return "0 Kč" when value is empty', () => {
        expect(pipe.transform(undefined)).toBe('0 Kč');
    });

    it('Should return value with units', () => {
        expect(pipe.transform(10)).toBe('10 Kč');
    });

    it('Should return not formated number with units', () => {
        expect(pipe.transform(100)).toBe('100 Kč');
    });

    it('Should format value and add units', () => {
        expect(pipe.transform(1000)).toBe('1 000 Kč');
    });

    it('Should return format decimal value', () => {
        expect(pipe.transform(1000.1)).toBe('1 000.1 Kč');
    });
});
