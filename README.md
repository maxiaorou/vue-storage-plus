# vue-storage-plus &middot;
[![Build Status](https://travis-ci.com/microlv/vue-storage-plus.svg?branch=master)](https://travis-ci.com/microlv/vue-storage-plus) [![npm version](https://img.shields.io/badge/npm-%3E5.0-blue.svg)](https://www.npmjs.com/package/vue-storage-plus) [![codecov](https://codecov.io/gh/microlv/vue-storage-plus/branch/master/graph/badge.svg)](https://codecov.io/gh/microlv/vue-storage-plus)
## npm use:

npm i vue-storage-plus -S

## Purpose:

reading localStorage or sessionStorage samplify api

normal using, there are often such long and stinky code, the purpose is to deal with this kind of duplicate code!

```js
var test = localstroage.get('test');
if (test && typeof test === 'string') {
    try {
        test = JSON.parse(test);
    } catch (error) {
        test = {}; //parse faild
    }
} else {
    test = {}; //default
}
console.log(test);
```

Check test.js to find more use case.
![TestCase](https://raw.githubusercontent.com/microlv/vue-storage-plus/master/test/jest.png)

## API：
## set(key,value)
```js
//set A=[3, 4, 5]
storage.set('A', [3, 4, 5]);
//set A=[1, 2, 3], B=true, C='test'
storage.set(['A', 'B', 'C'], [[1, 2, 3], true, 'test']);
```
## get(key, ?default='')
get the key value from storage

if ?type is exist, where storage data is null or undefined, then return the default value of type

if ?default is exist, if the read key does not exist or  storage data is null or undefined, output the default value.
```js
//clear data first.
this.$storage.clear();
//get A, if A is null or undefined, then return ''
this.$storage.get('A');
//get B, if B is null or undefined, then return [1,2,3]
this.$storage.get('B', [1, 2, 3]);
//get C&D, if C&D is null or undefined, then return {C:false,D:'default'}
this.$storage.get(['C','D'], [false, 'default']);
//get E&F, if E&F is null or undefined, then return {E:[1, 2, 3],F:true,G:''}
this.$storage.set(['E', 'F', 'G'], [[1, 2, 3], true]);
let res = this.$storage.get(['E','F','G']); //res={E:[1, 2, 3],F:true,G:''}
let [E,F] = [...res];
```

### vue project using

```js
//in main.js
import { install as storageInstall } from 'vue-storage-plus';
Vue.use(storageInstall);

//in any *.vue function

mounted() {
    this.$storage.set('arr', [3, 4, 5]);
    this.$storage.set('num', 110);
    this.$storage.set('boo', false);

    this.$storage.get('arr', [1, 2, 3]);   //([3, 4, 5]);
    this.$storage.get('num', 4);   //(110);
    this.$storage.get('boo', true);   //(false);
}
```

### Work with Webpack
```js
Webpack 4
// in your vue.config.js, add the code, then when you run webpack, it will transpile es6 to es5:
transpileDependencies: ['vue-storage-plus']

Webpack 3
//If you want to support low-version browsers, you need to refer to "babel-polyfill" and add transformations to "babel-loader"
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
        resolve('src'),
        resolve('node_modules/vue-storage-plus')
    ]
}
```

### API alias
```js
this.$storage.set('boo', false); //localStorage
this.$ls.set('boo', false); //localStorage
this.$localStorage.set('boo', false); //localStorage

this.$sessionStorage.set('boo', false); //sessionStorage
this.$ss.set('boo', false); //sessionStorage
```

### import using
```js
import { ls, ss, LocalStroage, SessionStorage } from 'vue-storage-plus';
ls.set('boo', false);
ls.get('boo');

ss.set('boo', false);
ss.get('boo');

let storage = new LocalStroage();
storage.set('arr', [3, 4, 5]);
storage.get('arr', [1, 2, 3]);   //([3, 4, 5]);

```

### set data

```js
//set A=[3, 4, 5]
storage.set('A', [3, 4, 5]);
//set A=[1, 2, 3], B=true
storage.set(['A', 'B'], [[1, 2, 3], true]);
```

### get value

```js
//get A, if A is null or undefined, then return ''
this.$storage.get('A');

//get B, if B is null or undefined, then return [1,2,3]
this.$storage.get('B', [1, 2, 3]);

//get C&D, if C&D is null or undefined, then return {C:false,D:'default'}
this.$storage.get(['C','D'], [false,'default']);

this.$storage.set(['E', 'F'], [[1, 2, 3], true]);
//get E&F, if E&F is null or undefined, then return {E:[1, 2, 3],F:true}
let res = this.$storage.get(['E','F']);
let [E,F] = [...res];
```

### Read a non-existent data and specify the default value returned (parameter 2)

```js
storage.clear();
storage.get('arr', [1, 2, 3]);//[1, 2, 3];
storage.get('num', 4);//4;
storage.get('boo', true);//true
storage.get('str', 'this is my string');//'this is my string'
storage.get('obj', { a: 1, b: 2 });// { a: 1, b: 2 }
```

### delete data

```js
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);
storage.set('str', 'this is str');
storage.set('obj', { name: {} });

storage.remove('arr');
storage.remove('arr,num,boo');
storage.remove(['arr,num,boo']);
storage.clear();
```

### Read an existing data without specifying the default value returned

```js
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);
storage.set('str', 'this is str');
storage.set('obj', { name: {} });

storage.get('arr');   //([3, 4, 5]);
storage.get('num');   //(110);
storage.get('boo');   //(false);
storage.get('str');   //('this is str');
storage.get('obj');   //({ name: {} });
```

### Read the data and specify the return type and default value. If the data can be converted to the type at write time, the default value are ignored

```js
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);
storage.set('str', 'this is str');
storage.set('obj', { name: {} });

storage.get('arr', [1, 2, 3]);   //([3, 4, 5]);
storage.get('num', 4);   //(110);
storage.get('boo', true);   //(false);
storage.get('str', 'string??');   //('this is str');
storage.get('obj', { a: 1, b: 2 });   //({ name: {} });
```

## Run test case

1. npm install
2. jest test.js

## LICENSE

MIT

### You are welcome to contribute
andy.lv@live.com
