import Factory from '../factory';

describe('write and read', () => {
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
});
