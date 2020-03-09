const getDefaultValue = Symbol('getDefaultValue');
const setItemFunc = Symbol('setItemFunc');
const getItemFunc = Symbol('getItemFunc');

class Storage {
    constructor(props) {
        this.storage = props || localStorage;
    }

    [getDefaultValue](def) {
        //兼容旧1.0.3接口，使用构建函数的默认值
        if (typeof def === 'function') {
            /* eslint-disable indent */
            switch (def) {
                case String:
                    def = '';
                    break;
                case Object:
                    def = {};
                    break;
                case Array:
                    def = [];
                    break;
                case Number:
                    def = 0;
                    break;
                case Boolean:
                    def = false;
                    break;
            }
        }
        return def;
    }

    [getItemFunc](key, def) {
        let str = this.storage.getItem(key);
        let obj;
        if (str === '' || !str) {
            //返回默认值
            return this[getDefaultValue](def);
        }

        try {
            obj = JSON.parse(str);
        } catch (error) {
            obj = str;
            // throw new Error(`vue-storage error: your storage value is wrong! { key: ${key}, value: ${str} }`);
        }
        return [null, undefined].indexOf(obj) >= 0 ? this[getDefaultValue](def) : obj;
    }

    [setItemFunc](key, val) {
        let str = val;
        if (typeof val !== 'string') {
            str = JSON.stringify(val);
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
