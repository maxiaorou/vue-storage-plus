import Factory from '../factory';

describe('write and read', () => {
    it('Test: get not exist data and return ""', () => {
        let storage = Factory.getLocal();
        storage.clear();
        expect(storage.get('arr')).toEqual('');
        expect(storage.get('num')).toEqual('');
        expect(storage.get('boo')).toEqual('');
        expect(storage.get('str')).toEqual('');
        expect(storage.get('obj')).toEqual('');
    });

    it('Test: get not exist data and return special data', () => {
        let storage = Factory.getLocal();
        storage.clear();
        expect(storage.get('arr', [1, 2, 3])).toEqual([1, 2, 3]);
        expect(storage.get('num', 4)).toEqual(4);
        expect(storage.get('boo', true)).toEqual(true);
        expect(storage.get('str', 'this is my string')).toEqual('this is my string');
        expect(storage.get('obj', { a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('Test: write data and get', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);
        storage.set('boo', false);
        storage.set('str', 'this is str');
        storage.set('obj', { name: {} });

        expect(storage.get('arr')).toEqual([3, 4, 5]);
        expect(storage.get('num')).toEqual(110);
        expect(storage.get('boo')).toEqual(false);
        expect(storage.get('str')).toEqual('this is str');
        expect(storage.get('obj')).toEqual({ name: {} });
    });

    it('Test: write data and get data when key is not exist', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);

        expect(storage.get('arr', [1, 2, 3])).toEqual([3, 4, 5]);
        expect(storage.get('num', 4)).toEqual(110);
        expect(storage.get('boo', true)).toEqual(true);
        expect(storage.get('str', 'string??')).toEqual('string??');
        expect(storage.get('obj', { a: 1, b: 2 })).toEqual({ a: 1, b: 2 });

        expect(storage.get('A', [])).toEqual([]);
        expect(storage.get('B', false)).toEqual(false);
    });

    it('Test: write data and get it with default value', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('arr', '[3, 4, 5]');
        storage.set('num', '110');
        storage.set('boo', 'false');
        storage.set('str', 'this is str');
        storage.set('obj', '{ "name": {} }');

        expect(storage.get('arr', [1, 2, 3])).toEqual([3, 4, 5]);
        expect(storage.get('num', 4)).toEqual(110);
        expect(storage.get('boo', true)).toEqual(false);
        expect(storage.get('str', 'string??')).toEqual('this is str');
        expect(storage.get('obj', { a: 1, b: 2 })).toEqual({ name: {} });
    });
});
