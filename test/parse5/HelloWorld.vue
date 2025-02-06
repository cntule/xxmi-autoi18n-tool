<template>
  <div class="he>llo">
    <Tips>
      <div>这是默认的插槽</div>
      <template v-slot:content>
        <div style="text-align: center">这是一个插槽内容</div>
      </template>
    </Tips>
    <List
        v-if="msg === '天\'1'"
      name="list"
    >
      <template #content>
        <div>天空</div>
      </template>
    </List
    >
    <a
        v-if="msg2"

        :class="!colProp.props.tableData[colProp.props.$index].enable ? 'disabledText' : ''"
        :key="colProp.props.$index + 'edit'"



        @click="asyncEditMethod(colProp.props.tableData[colProp.props.$index])">编辑1
    </a
    >
    <slot/>
    <el-button type="primary" @click="exportData" v-if="msg1" :loading="loading"
      >导出1</el-button
    >
    <el-button type="primary" @click="exportData" v-else :loading="loading"
      >导出2</el-button
    >
    <Show :personName.sync="person.name" />
    中间1
    <Show2 v-if="msg1 == 100" :personName.sync="person.name ? 'a<aa' : 'a>'" />
    <slot name="abc"/>
    <Tips>
      中间4
      <template v-slot:content>
        <div style="text-align: center">这是一个插槽内容</div>
      </template>
    </Tips>
    <HelloWorld v-slot:name />
    <hr />
    中间2
    <br />
    <My-Name :name="'张三<br/>'" age="18" />
    <br />
    <OtherName>中间3</OtherName>
    <h1>美丽中国.重庆</h1>
    <slot />
    {{ table.colConfigs }}
    <hr />
    <div>
      文1
      <div>
        文2
        <p>
          文3
          <span>文4</span>
          文5
        </p>
        文6
      </div>
      文7
    </div>
    文8
    <hr />
    文9
    <br />
    文10
    <!-- 这里面的内容要原样输出，不会被i18n转换 -->
    <!--skip-i18n-start-->
    <div>
      <p>中国</p>
      <p>重庆</p>
    </div>
    <!--skip-i18n-end-->
    <p>欢迎你</p>
    <p>{{ $t("poeticRomance") }}</p>
    <hr />
  </div>
</template>
<script setup lang="ts">
import Tips from "../../examples/vue-autoi18n-ts-loader/src/components/Tips.vue";
</script>