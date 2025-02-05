<template>
  <div class="he>llo">
    <Show :personName.sync="person.name" />
    i18n.tc('中间1')
    <Show2 v-if="msg1 == 100" :personName.sync="person.name ? 'a<aa' : 'a>'" />
    <Tips>
      i18n.tc('中间4')
      <template v-slot:content>
        <div style="text-align: center">i18n.tc('这是一个插槽内容')</div>
      </template>
    </Tips>
    <HelloWorld v-slot:name />
    <hr />
    i18n.tc('中间2')
    <br />
    <My-Name :name="'张三<br/>'" age="18" />
    <br />
    <OtherName>i18n.tc('中间3')</OtherName>
    <h1>i18n.tc('美丽中国.重庆')</h1>
    <slot />
    {{ table.colConfigs }}
    <hr />
    <div>
      i18n.tc('文1')
      <div>
        i18n.tc('文2')
        <p>
          i18n.tc('文3')
          <span>i18n.tc('文4')</span>
          i18n.tc('文5')
        </p>
        i18n.tc('文6')
      </div>
      i18n.tc('文7')
    </div>
    i18n.tc('文8')
    <hr />
    i18n.tc('文9')
    <br />
    i18n.tc('文10')
    <!-- 这里面的内容要原样输出，不会被i18n转换 -->
    <!--skip-i18n-start-->
    <div>
      <p>i18n.tc('中国')</p>
      <p>i18n.tc('重庆')</p>
    </div>
    <!--skip-i18n-end-->
    <p>i18n.tc('欢迎你')</p>
    <p>{{ $t('poeticRomance') }}</p>
    <hr />
  </div>
</template>
