import { Factory, LocalStorage, SessionStorage } from './factory';
// import config from './package.json';

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

let version = '2.0.2';
if (window) {
    ls.version = version;
    ss.version = version;

    window.$ls = ls;
    window.$ss = ss;
}

export default { Factory, LocalStorage, SessionStorage, install, ls, ss };

export { Factory, LocalStorage, SessionStorage, install, ls, ss };
