const getDefaultValue = Symbol('getDefaultValue');
const setItemFunc = Symbol('setItemFunc');
const getItemFunc = Symbol('getItemFunc');

class Storage {
    constructor(props) {
        this.storage = props || localStorage;
    }

    [getDefaultValue](type) {
        /* eslint-disable indent */
        switch (type) {
            case String:
                return '';
            case Object:
                return {};
            case Array:
                return [];
            case Number:
                return 0;
            case Boolean:
                return false;
        }
        return '';
    }

    [getItemFunc](key, def) {
        let str = this.storage.getItem(key);
        let obj;
        if (str === '' || !str) {
            //返回默认值
            return def;
        }

        try {
            obj = JSON.parse(str); //this[trycatch](() => { return JSON.parse(str); });
        } catch (error) {
            obj = str;
            // throw new Error(`vue-storage error: your storage value is wrong! { key: ${key}, value: ${str} }`);
        }
        return [null, undefined].indexOf(obj) >= 0 ? def : obj;
    }

    [setItemFunc](key, val) {
        let str = val;
        //考虑支持[{},{}]
        if (typeof val !== 'string') {
            str = JSON.stringify(val); //this[trycatch](() => { return JSON.stringify(val); });
        }
        this.storage.setItem(key, str);
    }
    /**
     * 设置
     * @param {string} key
     * @param {any} val
     */
    set(key, val) {
        if (key instanceof Array && val instanceof Array) {
            // set(['a','b'],[a,b])
            key.forEach((k, i) => {
                this[setItemFunc](k, i < val.length ? val[i] : '');
            });
            return;
        }
        //set('a', {});
        this[setItemFunc](key, val);
    }

    /**
     * 取Storage里的数据
     * @param {string} key
     * @param {any} 指定取不到数据时的默认值
     */
    get(key, def = '') {
        if (key instanceof Array) {
            let defArray = def instanceof Array ? def : [];
            let defRes = {};
            // get(['a','b']) =>> {a:1,b:2}
            key.forEach((k, i) => {
                defRes[k] = this[getItemFunc](k, i < defArray.length ? defArray[i] : '');
            });
            return defRes;
        }
        return this[getItemFunc](key, def);
    }

    /**
     * 获取存储的原值
     * @param {any} key key
     */
    getOriginal(key) {
        return this.storage.getItem(key);
    }

    /**
     *
     * @param {string|Array} keys
     */
    remove(keys) {
        if (!(keys instanceof Array)) {
            //把keys转为数组
            keys = keys.split(',');
        }
        keys.forEach(key => {
            this.storage.removeItem(key);
        });
    }

    /**
     * 清空数据
     */
    clear() {
        this.storage.clear();
    }
}

export default Storage;
