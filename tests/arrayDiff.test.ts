import { expect } from 'chai';

import { arrayDiff } from '../src/arrayDiff';

describe('arrayDiff should', () => {
    it('return [] when a is []', () => {
        expect(arrayDiff([], [])).to.eql([]);
    });

    describe('return a when b is []', () => {
        it.each([
            [[1]],
            [[2]],
            [[1, 2]],
        ])('a = %p', (a: number[]) => {
            expect(arrayDiff(a, [])).to.eql(a);
        });
    });

    describe('return a when b is not contained', () => {
        it.each([
            [[1], [0]],
            [[2], [0, 1]],
            [[1, 2], [3, 4]],
        ])('a = %p, b = %p', (a: number[], b: number[]) => {
            expect(arrayDiff(a, b)).to.eql(a);
        });
    });

    describe('return [] when a is b', () => {
        it.each([
            [[1]],
            [[2]],
            [[1, 2]],
        ])('a and b = %p', (ab: number[]) => {
            expect(arrayDiff(ab, ab)).to.eql([]);
        });
    });

    describe('return remainder when a is superset of b', () => {
        it.each([
            [[1, 2], [1], [2]],
            [[1, 2, 3, 4], [1, 3], [2, 4]],
        ])('%p - %p = %p', (ab: number[]) => {
            expect(arrayDiff(ab, ab)).to.eql([]);
        });
    });

    describe('return remainder when some a included in b', () => {
        it.each([
            [[1, 2], [0, 1], [2]],
            [[1, 2, 3, 4], [1, 3, 5], [2, 4]],
        ])('%p - %p = %p', (ab: number[]) => {
            expect(arrayDiff(ab, ab)).to.eql([]);
        });
    });
});

describe('Basic tests', () => {
    it('Basic test should work', () => {
        expect(arrayDiff([], [4, 5])).to.eql([], 'a was [], b was [4,5]');
        expect(arrayDiff([3, 4], [3])).to.eql([4], 'a was [3, 4], b was [3]');
        expect(arrayDiff([1, 8, 2], [])).to.eql([1, 8, 2], 'a was [1, 8, 2], b was []');
        expect(arrayDiff([1, 2, 3], [1, 2])).to.eql([3], 'a was [1, 2, 3], b was [1, 2]');
    });
});
