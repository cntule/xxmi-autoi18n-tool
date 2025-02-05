<template id="app">
  <div id="app">
    <div :title="errorTip == '错误1属性1' ? '属性1' : ''"></div>
    <div :title="errorTip === '错误2属性' ? (errorTip == '错误3' ? '错误4' : '错误5') : '错误6'"></div>
    <div :title="errorTip == '错误10属性' ? '错误11' : errorTip === '错误12' ? '错误13' : '错误14'"></div>
    <div :title="errorTip === '错误20属性' ? ['属性21'] : ''"></div>
    <div :title="errorTip === '错误30属性112'"></div>
  </div>
</template>

<script>
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component({
  i18n: {
    messages: {
      zh: {
        tip: "强烈建议你启用浏览器消息通知，才能及时知道有新消息。",
      },
      en: {
        tip: "strongly recommended that you enable browser message notifications in order to be informed of new messages in time.",
      },
    },
  },
})
export default class App extends Vue{
  created() {
    const error = this.errorTip === '错误111' ? '错误2' : '错误3';
    console.log(error);
    console.log('哈哈12');
    console.error('哈哈错误了');
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
