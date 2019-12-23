import Storage from './storage';
/**
 * localStorage
 */
class LocalStorage extends Storage {
    constructor() {
        super(localStorage);
    }
}

export default LocalStorage;

export { LocalStorage };
