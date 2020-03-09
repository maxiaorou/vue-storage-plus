import Factory from '../factory';

describe('write/read feature case', () => {
    it('Test: Feature: special key&value is array', () => {
        let storage = Factory.getLocal();
        storage.clear();
        storage.set(['A', 'B', 'C', 'D', 'E'], [[1, 2, 3], 4, true, 'stringD', { a: 1 }]);
        storage.set(['F', 'G', 'J'], []);
        storage.set(['H', 'I'], ['', {}]);

        expect(storage.get('A')).toEqual([1, 2, 3]);
        expect(storage.get('B')).toEqual(4);
        expect(storage.get('C')).toEqual(true);
        expect(storage.get('D')).toEqual('stringD');
        expect(storage.get('E')).toEqual({ a: 1 });
        expect(storage.get('F')).toEqual('');
        expect(storage.get('G', 'G')).toEqual('G');
        expect(storage.get('J', 9)).toEqual(9);
        expect(storage.get('H')).toEqual('');
        expect(storage.get('I')).toEqual({});
    });

    it('Test: Feature: get key with array', () => {
        let storage = Factory.getLocal();
        storage.clear();
        storage.set(['A', 'B', 'C', 'D', 'E'], [[1, 2, 3], 4, true, 'stringD', { a: 1 }]);
        storage.set(['F', 'G', 'J'], []);
        storage.set(['H', 'I'], ['', {}]);
        storage.set(['K', 'L', 'M'], [0, false, '']);

        expect(storage.get(['A', 'B', 'C', 'D', 'E'])).toEqual({ A: [1, 2, 3], B: 4, C: true, D: 'stringD', E: { a: 1 } });
        expect(storage.get(['K', 'L', 'M'])).toEqual({ K: 0, L: false, M: '' });
        expect(storage.get(['F', 'G', 'J'])).toEqual({ F: '', G: '', J: '' });
        expect(storage.get(['H', 'I'], ['', {}])).toEqual({ H: '', I: {} });
        expect(storage.get(['O', 'P', 'Q'], [false, {}, 'default'])).toEqual({ O: false, P: {}, Q: 'default' });
        expect(storage.get(['R', 'S'], [])).toEqual({ R: '', S: '' });
        expect(storage.get(['T', 'U', 'V'], [1, 'string?', true])).toEqual({ T: 1, U: 'string?', V: true });
    });
});
