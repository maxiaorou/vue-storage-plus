import LocalStorage from './src/localStorage';
import SessionStorage from './src/sessionStorage';

class Factory {
    static getLocal() {
        if (!Factory.local) {
            Factory.local = new LocalStorage();
        }
        return Factory.local;
    }

    static getSession() {
        if (!Factory.session) {
            Factory.session = new SessionStorage();
        }
        return Factory.session;
    }
}

Factory.local = undefined;
Factory.session = undefined;

export default Factory;

export { Factory, LocalStorage, SessionStorage };
