# autoi18n

- 本项目Fork自 https://github.com/Sinsonyxs/autoi18n/tree/main
- 感谢 Gertyxs <gertyxs@outlook.com>的开源贡献
- 本项目只是添加了一些符合特定项目的自定义处理逻辑

1. 在template中，跳过&lt;!--skip-i18n-start--&gt;  &lt;!--skip-i18n-end--&gt;之间的内容
2. 跳过 @Component({i18n}) 中的内容 
3. // skip-i18n-next-line 跳过下一行的内容
4. /\*skip-i18n-start*/ /\*skip-i18n-end*/ 跳过中间的内容
5. 自定义处理astEnter的处理逻辑
6. 自定义处理astObjectProperty的处理逻辑
7. 不出处理Object key 的i18n转换
8. 中文翻译成英文（翻译仅用于学习研究）
```vue
<template>
  <div class="hello">
    <h1>美丽中国.重庆</h1>
    <hr>
    {{ table.colConfigs }}
    <hr/>
    <!-- 这里面的内容要原样输出，不会被i18n转换 -->
    <!--skip-i18n-start-->
    <div>
      <p>中国</p>
      <p>重庆</p>
    </div>
    <!--skip-i18n-end-->
    <p>欢迎你</p>
    <p>{{ $t('poeticRomance') }}</p>
    <hr>
    <Tips/>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Tips from '@/components/Tips.vue';

  @Component({
    components: {Tips},
    i18n: {
      messages: {
        zh: {
          poeticRomance: '山城夜色，与君共赏；烟火人间，情暖山城',
        },
        en: {
          poeticRomance:
              'Mountain city night, and you enjoy; Fireworks in the world, love warm mountain city',
        },
      },
    },
  })
  export default class HelloWorld extends Vue {
    @Prop() private msg!: string;

    public table = {
      colConfigs: [
        {
          label: '魔幻都市风',
          // skip-i18n-next-line
          prop: '城市名称',
          '国家': '中国',
        },
      ],
      data: [
        {'景区': '洪崖洞',},
        /*skip-i18n-start*/
        {'地理位置与交通': '洪崖洞位于重庆市渝中区解放碑沧白路，地处长江、嘉陵江两江交汇的滨江地带。游客可以乘坐地铁1号线或6号线，在小什字站下车后步行前往'},
        {'建筑特色': '洪崖洞以巴渝传统建筑特色的“吊脚楼”为主体，依山就势，沿江而建。通过分层筑台、吊脚、错叠、临崖等山地建筑手法，形成了独特的“立体式空中步行街”。这种建筑风格不仅展现了重庆的山城特色，还融合了现代与古朴的元素'},
        /*skip-i18n-end*/
        {'最佳游览时间': '洪崖洞的最佳游览时间是傍晚到夜间。当夜幕降临，华灯初上，整个景区被灯光装点得如梦似幻，非常适合拍照留念。夏季推荐在20:00 - 23:00游览，冬季则建议在19:00 - 23:00'},
      ],
      array: [
        '山城过雨百花尽，榕叶满庭莺乱啼。',
        // skip-i18n-next-line
        '日日春光斗日光，山城斜路杏花香。',
        '山城寒陟夜飞霜，枫叶青红带夕阳。',
        /*skip-i18n-start*/
        '山城寒食已冷落，更值暴雨过园林。',
        "山城夜半催金柝，酒醒孤馆灯花落。",
        /*skip-i18n-end*/
        '山城苍苍夜寂寂，水月逶迤绕城白。'
      ]
    };

    // 在autoi18n.config.js中配置了自定义跳过这个节点
    private ignoreConfigList = [
      {
        label: '人文历史风',
        prop: '千年古都',
        '山城故事': '巴渝遗韵',
      },
    ];

    private needConfigList = {
      label: '休闲娱乐风',
      prop: '美食之都',
      '欢乐之城': '乐享生活',
    };
  }
</script>

```

[![](https://img.shields.io/badge/npm-v1.0.8-blue)](https://www.npmjs.com/package/autoi18n-tool)

## 介绍

1. 自动转换、基于`Command`或者`webpack loader`的前端国际化方案
2. 目的实现前端国际化自动化、自动提取项目中的中文字符生成资源文件
3. 实现项目侵入式与非侵入式自动国际化，大大提高国际化的开发效率
4. 目前该库支持[vue](https://cn.vuejs.org/)和[react](https://react.docschina.org/)

## 为什么要写该库

如果一个老项目迭代了多年，有上百个页面，如果忽然说要做国际化:fearful:，这时我估计你心里会万马奔腾。

1. 手动提取工作量大，还很容易遗漏
2. 手动做国际化，会改变源码，源码上连个中文标识都没有，这样我们想找到点击按钮都很困难

## 安装

```bash
npm i -D autoi18n-tool

yarn add -D autoi18n-tool
```

## 使用

> 使用方式有两种，第一种：使用`Command`的形式生成国际化资源和替换国际化的原文件，第二种：使用`Command`的形式生成国际化资源使用`webpack loader`的形式无侵入式自动国际化。

### 纯命令的形式

```shell
npx autoi18n init # 初始化自动国际化配置，生成国际化配置文件和生成国际化资源文件
npx autoi18n sync -r # 同步国际化资源和替换原文件国际化字段
```

执行命令会写入

```html
<div>{{$t('a018615b35588a01')}}</div>
```

资源文件

```js
// zh-cn.json
{
  "dbefd3ada018615b35588a01e216ae6e": "你好，世界" // key是根据中文生成16的MD5
}
// en-us.js
{
  "dbefd3ada018615b35588a01e216ae6e": "Hello, world" // key是根据中文生成16的MD5
}
```

### webpack loader的形式 不会改变源码

第一步：初始化自动国际化

```shell
npx autoi18n init # 初始化自动国际化配置，生成国际化配置文件和生成国际化资源文件
npx autoi18n sync # 同步国际化资源
```

第二步：配置webpack loader

```js
module.exports = {
  // ... 其他配置
  module:{
    rules:[
      {
          enforce: 'pre', // 此项一定要加上 优先执行的loader
          test: /\.(js|mjs|jsx|ts|tsx|vue)$/,
          use: [
            {
              loader: 'autoi18n',
              options: {}
            }
          ],
          exclude: /node_modules/
        }
    ]
  }
}
```

*HTML*

```html
<div>你好，世界</div>
```

*资源文件*

```js
// zh-cn.json
{
  "dbefd3ada018615b35588a01e216ae6e": "你好，世界" // key是根据中文生成16的MD5
}
// en-us.js
{
  "dbefd3ada018615b35588a01e216ae6e": "Hello, world" // key是根据中文生成16的MD5
}
```

**页面在中文下展示为**

你好世界

**在英文下展示为**

Hello, world

## 组成部分

> 该库分为两部分，一部分是cli，目的是通过命令生成资源文件和替换源文件的国际化字段，另一部分是webpack loader，目的是无侵入式的替换源文件的国际化字段，我们最好在打包测试/上线前执行以下cli命令，生成资源文件，然后拷贝一份资源文件给翻译组进行各国语言的翻译

### cli

```shell
npx autoi18n init # 初始化自动国际化配置，这个命令会生成国际化配置文件和生成国际化资源文件
npx autoi18n sync # 同步国际化资源文件
npx autoi18n sync -r # 同步国际化资源文件并且会写入源文件 注意：这个命令会修改源码 -r 其实就是 replace 是否替换国际化字段
npx autoi18n restore -f ./src/locales/zh.json # 根据指定的配置文件恢复代码中的国际化文案 如果存在多余的国际化文案数据，可以先恢复，重新执行 npx autoi18n sync -r 自动国际化操作，就不用手动去除多余的字段了
npx autoi18n translate -f ./src/locales/zh.json # 中文翻译成英文；-as 另存为（如果文件已存在，会覆盖）
npx autoi18n -h # 查看使用帮助
npx autoi18n -V # 查看版本
```

执行`npx autoi18n init`会在项目根目录生成`autoi8n.config.js`配置文件

```js
module.exports = {
    /**
    * 需要国际化的语言种类
    */
    language: ['zh-cn', 'en-us'],
    /**
    * 国际化资源文件应用的 模块模式 根据这个模式 使用 module.exports 或者 export default
    * 如果localeFileExt 配置为json时 此配置不起效
    */
    modules: 'es6',
    /**
    * 需要国际化的目录
    */
    entry: ['./src'],
    /**
    * 国际化资源文件输出目录
    */
    localePath: './src/locales',
    /**
    * 国际化文件类型 默认 为 .json文件 支持.js和.json
    */
    localeFileExt: '.json',
    /**
    * 需要处理国际化的文件后缀
    */
    extensions: [],
    /**
    * 需要排除国际化的文件 glob模式数组
    */
    exclude: [],
    /**
    * 要忽略做国际化的方法
    */
    ignoreMethods: ['i18n.t', '$t'],
    /**
    * 要忽略做标签属性
    */
    ignoreTagAttr: ['class', 'style', 'src', 'href', 'width', 'height'],
    /**
    * 国际化对象方法，可以自定义使用方法返回 注意：如果改变国际化方法记得把该方法加到ignoreMethods忽略列表里面
    */
    i18nObjectMethod: 'i18n.t',
    /**
    * 国际化方法简写模式，可以自定使用方法返回 注意：如果改变国际化方法记得把该方法加到ignoreMethods忽略列表里面
    */
    i18nMethod: '$t',
    /**
    * 如果不喜欢又臭又长的key 可以自定义国际化配置文件的key 
    * 默认为 false 不自定义 
    */
    setMessageKey: false,
    /**
    * 生成md5的key长度 true: 32位字符 false: 16位字符
    */
    maxLenKey: false,
    /**
    * 国际化要注入到js里面的实例 会在js文件第一行注入
    */
    i18nInstance: "import i18n from '~/i18n'",
    /**
    * 格式化文件配置
    */
    prettier: {
    singleQuote: true,
    trailingComma: 'es5',
    endOfLine: 'lf',
    },
    /**
     * 自定义astEnter节点处理函数
     * @param path ast 处理节点路径
     * @param node 当前节点
     * @param file 文件对象
     * @param filePath 文件路径
     * @return {boolean} true 跳过该节点及子节点的处理
     */
    astEnter({path, node, file, filePath}) {
        // if (filePath.includes('src/components/HelloWorld.vue')) {
        //     if (node.type === 'ClassProperty' && node.key.name === 'ignoreConfigList') {
        //         return true;
        //     }
        // }
    },
    /**
     * 自定义astObject属性节点处理函数
     * @param path ast 处理节点路径
     * @param node 当前节点
     * @param key 属性key
     * @param value 属性值
     * @param keyName 属性key值
     * @param valueValue 属性值值
     * @param file 文件对象
     * @param filePath 文件路径
     * @return {boolean} true 跳过该节点及子节点的处理
     */
    astObjectProperty: ({path, node, key, value, keyName, valueValue, file, filePath}) => {
        // if (filePath.includes('src/components/HelloWorld.vue')) {
        //     if (keyName === 'prop' && valueValue === '菜单编码') {
        //         return true;
        //     }
        // }
    },
    translateLanguage: 'en', // 翻译文件的名称
}
```

### webpack loader

在webpack配置文件加入loader配置

```js
module.exports = {
  // ... 其他配置
  module:{
    rules:[
      {
          enforce: 'pre', // 此项一定要加上 优先执行的loader
          test: /\.(js|mjs|jsx|ts|tsx|vue)$/,
          use: [
            {
              loader: 'autoi18n',
              options: {}
            }
          ],
          exclude: /node_modules/
        }
    ]
  }
}
```



> **注意**
>
> 1. 在vue模板上不支持模板字符串嵌套模板字符串使用，js正则没有平衡组的概念，目前没有很好的处理方案
> 2. 每次有新的中文字段加入需要使用`npx autoi8n sync`进行国际化资源同步，所以建议在打包项目前执行同步操作

项目还在完善中，欢迎大家pr，如果你觉得不错也欢迎给个start :smile::smile::smile:

# License

[MIT](https://opensource.org/licenses/MIT)