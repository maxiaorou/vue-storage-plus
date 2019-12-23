import Factory from '../factory';
import { LocalStorage, SessionStorage } from '../index';

describe('new Object', () => {
    it('Test: create new LocalStorage', () => {
        let storage = new LocalStorage();
        let storage1 = new LocalStorage();

        storage.clear();
        storage.set('num', 210);
        storage.set('boo', 'str1');
        storage1.set('num', 220);
        storage1.set('boo', 'str2');

        expect(storage.get('num', 0)).toEqual(storage1.get('num', 0));
        expect(storage.get('boo', '')).toEqual(storage1.get('boo', ''));
    });

    it('Test: create new SessionStorage', () => {
        let storage = new SessionStorage();
        let storage1 = new SessionStorage();

        storage.clear();
        storage.set('num', 210);
        storage.set('boo', 'str1');
        storage1.set('num', 220);
        storage1.set('boo', 'str2');

        expect(storage.get('num', 0)).toEqual(storage1.get('num', 0));
        expect(storage.get('boo', '')).toEqual(storage1.get('boo', ''));
    });

    it('Test: use Factory.getLocal', () => {
        let storage = Factory.getLocal();
        let storage1 = Factory.getLocal();

        storage.clear();
        storage.set('num', 210);
        storage.set('boo', 'str1');
        storage1.set('num', 220);
        storage1.set('boo', 'str2');

        expect(storage.get('num', 0)).toEqual(storage1.get('num', 0));
        expect(storage.get('boo', '')).toEqual(storage1.get('boo', ''));
    });

    it('Test: use Factory.getSession', () => {
        let storage = Factory.getSession();
        let storage1 = Factory.getSession();

        storage.clear();
        storage.set('num', 210);
        storage.set('boo', 'str1');
        storage1.set('num', 220);
        storage1.set('boo', 'str2');

        expect(storage.get('num', 0)).toEqual(storage1.get('num', 0));
        expect(storage.get('boo', '')).toEqual(storage1.get('boo', ''));
    });

    it("Test: use Factory.create('local')", () => {
        let storage = Factory.create('local');
        let storage1 = Factory.create('local');

        storage.clear();
        storage.set('num', 210);
        storage.set('boo', 'str1');
        storage1.set('num', 220);
        storage1.set('boo', 'str2');

        expect(storage.get('num')).toEqual(storage1.get('num'));
        expect(storage.get('boo')).toEqual(storage1.get('boo'));
    });

    it("Test: use Factory.create('session')", () => {
        let storage = Factory.create('session');
        let storage1 = Factory.create('session');

        storage.clear();
        storage.set('num', 210);
        storage.set('boo', 'str1');
        storage1.set('num', 220);
        storage1.set('boo', 'str2');

        expect(storage.get('num')).toEqual(storage1.get('num'));
        expect(storage.get('boo')).toEqual(storage1.get('boo'));
    });
});

describe('use getLocal ', () => {
    it('Test: create Factory.getLocal()', () => {
        let storage = Factory.getLocal();
        let storage1 = Factory.getLocal();

        expect(storage).toBe(storage1);
    });
});
