import 'chai/register-should';
import {assert} from 'chai';
import {digitalRoot} from '../src/digitalRoot';

describe('digitalRoot should', () => {
    it('return 0 when n is 0', () => {
        digitalRoot(0).should.equal(0);
    });
});

describe("solution", () => {
    xit('should work for fixed tests', () => {
        assert.equal(digitalRoot(16), 7);
        assert.equal(digitalRoot(456), 6 );
    });
});
