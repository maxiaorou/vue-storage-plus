import LocalStorage from './src/localStorage';
import SessionStorage from './src/sessionStorage';

class Factory {
    static create(instance) {
        switch (instance) {
            case 'session':
                return new SessionStorage();
            case 'local':
            default:
                return new LocalStorage();
        }
    }

    static getLocal() {
        if (!Factory.singleton.local) {
            Factory.singleton.local = new LocalStorage();
        }
        return Factory.singleton.local;
    }

    static getSession() {
        if (!Factory.singleton.session) {
            Factory.singleton.session = new SessionStorage();
        }
        return Factory.singleton.session;
    }
}

Factory.singleton = { local: undefined, session: undefined };

export default Factory;

export { Factory, LocalStorage, SessionStorage };
