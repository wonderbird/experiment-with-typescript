import { hello } from '../src/hello';

describe('hello', () => {
    test('should return world', () => {
        expect(hello()).toBe('world');
    });
});
