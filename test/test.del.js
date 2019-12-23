import Factory from '../factory';

describe('delete data', () => {
    it('Test: delete one key storage', () => {
        let storage = Factory.getLocal();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);
        storage.set('boo', false);
        storage.set('str', 'this is str');
        storage.set('obj', { name: {} });

        storage.remove('arr');
        storage.remove('str');
        storage.remove('obj');
        expect(storage.get('arr', [])).toEqual([]);
        expect(storage.get('num', 0)).toEqual(110);
        expect(storage.get('boo', true)).toEqual(false);
        expect(storage.get('str', '')).toEqual('');
        expect(storage.get('obj', {})).toEqual({});
    });

    it('Test: delete array storage', () => {
        let storage = Factory.getLocal();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);
        storage.set('boo', false);
        storage.set('str', 'this is str');
        storage.set('obj', { name: {} });

        storage.remove(['arr', 'num', 'boo']);
        expect(storage.get('arr')).toEqual('');
        expect(storage.get('num')).toEqual('');
        expect(storage.get('boo')).toEqual('');
        expect(storage.get('str', '')).toEqual('this is str');
        expect(storage.get('obj', {})).toEqual({ name: {} });
    });

    it('Test: delete key with string ("key1,key2,key3")', () => {
        let storage = Factory.getLocal();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);
        storage.set('boo', false);
        storage.set('str', 'this is str');
        storage.set('obj', { name: {} });

        storage.remove('arr,num,boo');
        expect(storage.get('arr')).toEqual('');
        expect(storage.get('num')).toEqual('');
        expect(storage.get('boo')).toEqual('');
        expect(storage.get('str', '')).toEqual('this is str');
        expect(storage.get('obj', {})).toEqual({ name: {} });
    });

    it('Test: delete data is not exist', () => {
        let storage = Factory.getLocal();

        storage.remove('arr,num,boo');
        expect(storage.get('arr')).toEqual('');
        expect(storage.get('num')).toEqual('');
        expect(storage.get('boo')).toEqual('');
    });

    it('Test: clear storage', () => {
        let storage = Factory.getLocal();
        storage.set('arr', [3, 4, 5]);
        storage.set('num', 110);
        storage.set('boo', false);
        storage.set('str', 'this is str');
        storage.set('obj', { name: {} });
        storage.set('del', { name: {} });
        storage.clear();
        expect(storage.get('arr', [])).toEqual([]);
        expect(storage.get('num', 0)).toEqual(0);
        expect(storage.get('boo', false)).toEqual(false);
        expect(storage.get('str', '')).toEqual('');
        expect(storage.get('obj', {})).toEqual({});
        expect(storage.get('del')).toEqual('');
    });
});
