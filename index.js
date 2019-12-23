import { Factory, LocalStorage, SessionStorage } from './factory';

if (!window.localStorage) {
    console.error('only support web browser');
}

let ls = Factory.create('local');
let ss = Factory.create('session');

const install = VUE => {
    VUE.prototype.$storage = ls;
    VUE.prototype.$localStorage = ls;
    VUE.prototype.$ls = ls;
    VUE.prototype.$sessionStorage = ss;
    VUE.prototype.$ss = ss;
};

if (window) {
    window.$ls = ls;
    window.$ss = ss;
}

let expObj = { Factory, LocalStorage, SessionStorage, install, ls, ss };

export default expObj;

export { Factory, LocalStorage, SessionStorage, install, ls, ss };
