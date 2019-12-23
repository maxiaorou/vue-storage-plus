# vue-storage-plus

## 安装使用:

npm i vue-storage-plus -S

## 运行 test case

1. npm install
2. jest test.js

## 设计意图:

加快读取localStorage,sessionStorage之间的读取和数据间的转换

在日常使用中,经常会有这种又长又臭的代码, 本顶目就是为了处理这种重复的代码!

```js
var test = localstroage.get('test');
if (test && typeof test === 'string') {
    try {
        test = JSON.parse(test);
    } catch (error) {
        test = {}; //转换失败
    }
} else {
    test = {}; //默认值
}
console.log(test);
```
更多用例, 查看test.js

## API：
## set(key,value)
```js
storage.set('arr', [3, 4, 5]);
```
## get(key, ?type=可空, ?default=可空)
获取key值的storage, type指定则测试转换为type类型的数据, 如果读取的key不存在, 则输出default的值
```js
读取arr的值并转换为Array输出, 如果arr不存在,则输出[1,2,3]
this.$storage.get('arr', Array, [1, 2, 3]);
```

### vue 项目使用
在main.js里
```js
import { install as storageInstall } from 'vue-storage-plus';
Vue.use(storageInstall);

在任意*.vue方法里
mounted() {
    this.$storage.set('arr', [3, 4, 5]);
    this.$storage.set('num', 110);
    this.$storage.set('boo', false);
    this.$storage.set('str', 'this is str');
    this.$storage.set('obj', { name: {} });

    this.$storage.get('arr', Array, [1, 2, 3]);   //([3, 4, 5]);
    this.$storage.get('num', Number, 4);   //(110);
    this.$storage.get('boo', Boolean, true);   //(false);
    this.$storage.get('str', String, 'string??');   //('this is str');
    this.$storage.get('obj', Object, { a: 1, b: 2 });   //({ name: {} });
}

如果要支持低版本浏览器，需引用"babel-polyfill"并在"babel-loader"加入转换
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
        resolve('src'),
        resolve('node_modules/vue-storage-plus')
    ]
},
```

### 引用使用
```js
import { LocalStroage } from 'vue-storage-plus';
let storage = new LocalStroage();
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);

storage.get('arr', Array, [1, 2, 3]);   //([3, 4, 5]);
storage.get('num', Number, 4);   //(110);
storage.get('boo', Boolean, true);   //(false);

```

### 别名
```js
this.$storage.set('boo', false); //localStorage
this.$ls.set('boo', false); //localStorage
this.$localStorage.set('boo', false); //localStorage

this.$sessionStorage.set('boo', false); //sessionStorage
this.$ss.set('boo', false); //sessionStorage
```

### 写入数据

```js
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);
storage.set('str', 'this is str');
storage.set('obj', { name: {} });
```

### 读取一个不存在的数据, 指定返回的类型, 返回指定类型的默认值

```js
storage.get('arr', Array);
// []
storage.get('num', Number);
// 0
storage.get('boo', Boolean);
// false
storage.get('str', String);
// ''
storage.get('obj', Object);
// {}
```

### 读取一个不存在的数据, 并指定返回的默认值（第3个参数）

```js
storage.get('arr', Array, [1, 2, 3]);
//[1, 2, 3];
storage.get('num', Number, 4);
//4;
storage.get('boo', Boolean, true);
//true
storage.get('str', String, 'this is my string');
//'this is my string'
storage.get('obj', Object, { a: 1, b: 2 });
// { a: 1, b: 2 }
```

### 删除数据

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

### 读取一个存在的数据，不指定返回的默认值

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

### 读取数据,并指定返回类型和默认值, 如果数据能转成写入时的类型, 则无视返回类型和默认值

```js
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);
storage.set('str', 'this is str');
storage.set('obj', { name: {} });

storage.get('arr', Array, [1, 2, 3]);   //([3, 4, 5]);
storage.get('num', Number, 4);   //(110);
storage.get('boo', Boolean, true);   //(false);
storage.get('str', String, 'string??');   //('this is str');
storage.get('obj', Object, { a: 1, b: 2 });   //({ name: {} });
```

### 读取数据,并指定返回类型和默认值, 如果数据能转成写入时的类型, 则无视返回类型和默认值(返回类型和转换的类型不同)

```js
storage.set('arr', [3, 4, 5]);
storage.set('num', 110);
storage.set('boo', false);
storage.set('str', 'this is str');
storage.set('obj', { name: {} });

storage.get('arr', String, [1, 2, 3]);   //([3, 4, 5]);
storage.get('num', Object, 4);   //(110);
storage.get('boo', Number, true);   //(false);
storage.get('str', Boolean, 'string??');   //('this is str');
storage.get('obj', String, { a: 1, b: 2 });   //({ name: {} });
```
