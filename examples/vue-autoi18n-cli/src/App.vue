<template>
  <div id="app">
    <h1>{{ '欢迎使用 autoi18n' }}</h1>
    <select @change="setLanguage" :value="lang">
      <option value="zh-cn">{{ '中文' }}</option>
      <option value="en-us">{{ '英文' }}</option>
    </select>
    {{ `${'总数'}${total}${'条'}` }}
    <div v-if="show === '中文'">111</div>
    {{ lang === '中文' ? '中文' : '英文' }}
    <div :title="errorTip == '错误1属性' ? '属性1' : ''"></div>
    <div :title="errorTip === '错误2属性' ? (errorTip == '错误3' ? '错误4' : '错误5') : '错误6'"></div>
    <div :title="errorTip == '错误10属性' ? '错误11' : info.errorTip === '错误12' ? '错误13' : '错误14'"></div>
    <div :title="errorTip === '错误20属性' ? ['属性21'] : ''"></div>
    <div :title="name.errorTip === '错误30属性'"></div>
    <div>{{ name === '张三' ? '张三1' : '张三2' }}</div>

    <div>{{ '开始之前' }}</div>
    <!-- skip-i18n-start -->
    <div>
      中文
      <div :title="(skip = '跳过')"></div>
    </div>
    <!-- skip-i18n-end -->
    <div>{{ '结束' }}</div>
  </div>
</template>

<script lang="ts">
import i18n from '@/i18n'
import {Component} from "vue-property-decorator";

@Component({
  i18n: {
    messages: {
      zh: {
        tip: "强烈建议你启用浏览器消息通知，才能及时知道有新消息。",
        enableNotify: "启用消息通知",
        successTip: "消息通知已成功启用！",
      },
      en: {
        tip: "strongly recommended that you enable browser message notifications in order to be informed of new messages in time.",
        enableNotify: "Enable",
        successTip: "Message notifications successfully enabled!",
      },
    },
  },
})
export default class App extends Vue {

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
