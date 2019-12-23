import { Factory, LocalStorage, SessionStorage, install } from '../index';

describe('entry test', () => {
    it('Test: create different entry', () => {
        let storage = Factory.getLocal();
        let storage2 = new LocalStorage();
        let storage3 = new SessionStorage();

        let VUE = () => {};
        install(VUE, {});

        storage.set('test1', { key: 'test1' });
        storage2.set('test2', { key: 'test2' });
        storage3.set('test3', { key: 'test3' });

        expect(storage.get('test1')).toEqual({ key: 'test1' });
        expect(storage2.get('test2')).toEqual({ key: 'test2' });
        expect(storage3.get('test3')).toEqual({ key: 'test3' });
    });
});
