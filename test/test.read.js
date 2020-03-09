import Factory from '../factory';

describe('read case', () => {
    it('Test: write storage', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('test1', { key: 'test1' });
        storage.set('test2', { key: 'test2' });

        expect(storage.get('test1')).toEqual({ key: 'test1' });
        expect(storage.get('test2')).toEqual({ key: 'test2' });
    });

    it('Test: write exist data into storage', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('test1', { key: 'test1' });
        storage.set('test1', { key: 'test3' });
        storage.set('test2', { key: 'test2' });

        expect(storage.get('test1')).toEqual({ key: 'test3' });
        expect(storage.get('test2')).toEqual({ key: 'test2' });
    });

    it('Test: get Original data', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('test1', { key: 'test3' });
        storage.set('test2', { key: 'test2' });

        expect(storage.getOriginal('test1')).toEqual('{"key":"test3"}');
        expect(storage.getOriginal('test2')).toEqual('{"key":"test2"}');
    });

    it('Test: read default val', () => {
        let storage = Factory.getLocal();

        storage.clear();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);
        storage.set('boo', false);
        storage.set('str', 'this is str');
        storage.set('obj', { name: {} });

        expect(storage.get('arr', [1])).toEqual([3, 4, 5]);
        expect(storage.get('num', 0)).toEqual(110);
        expect(storage.get('boo', true)).toEqual(false);
        expect(storage.get('str', 'str')).toEqual('this is str');
        expect(storage.get('obj', { name: 11 })).toEqual({ name: {} });

        expect(storage.get('A', [1])).toEqual([1]);
        expect(storage.get('B', 0)).toEqual(0);
        expect(storage.get('C', true)).toEqual(true);
        expect(storage.get('D', 'str')).toEqual('str');
        expect(storage.get('E', { name: 11 })).toEqual({ name: 11 });

        expect(storage.get('F', Array)).toEqual([]);
        expect(storage.get('G', Number)).toEqual(0);
        expect(storage.get('H', Boolean)).toEqual(false);
        expect(storage.get('I', String)).toEqual('');
        expect(storage.get('J', Object)).toEqual({});
    });

    it('Test: using $ls', () => {
        let storage = window.$ls;

        storage.clear();
        storage.set('arr', [3, 4, 5]);
        console.log(storage.version);
        expect(storage.get('arr', [1])).toEqual([3, 4, 5]);
    });

    it('Test: using $ss', () => {
        let storage = window.$ss;

        storage.clear();
        storage.set('arr', [3, 4, 5]);
        expect(storage.get('arr', [1])).toEqual([3, 4, 5]);
    });
});
