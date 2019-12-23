import Storage from './storage';
/**
 * sessionStorage
 */
class SessionStorage extends Storage {
    constructor() {
        super(sessionStorage);
    }
}

export default SessionStorage;

export { SessionStorage };
