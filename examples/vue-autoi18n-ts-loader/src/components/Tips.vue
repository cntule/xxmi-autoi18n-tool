<template>
  <div>
    <hr />
    <h3>Tips</h3>
    <slot />
    <p>
      5、权限接口包含接口名称、接口地址1、请求方式和应用名（例如：获取用户信息
      /api/get/user get usercenter），多个权限接口之间以“；”隔开；
    </p>
    <p>
      6、上级节点输入所属菜单下的权限节点，多级节点以“/”区分，如无上级节点则不填；
    </p>
    <slot name="content" />
    <div>
      <p>温馨提示</p>
      <p>1、洪崖洞"要去'看看的</p>
      <p>2、磁器'口要去'瞧一瞧；</p>
      <p>{{ "3、李子坝\'轻轨站“要去'\"'拍”张照的" }}</p>
    </div>
    <div>
      {{ originalText }}
    </div>
    {{ msg1 ? "中'国1" : "重“庆" }}
    <hr />
    {{ msg2 ? "中'国2" : msg2 == "重”庆1A" ? '重"庆2A' : "重'\"庆3A" }}
    <hr />
    {{ msg3 ? "中'国3" : msg3 === "重”庆1B" ? '重"庆2B' : "重'\"庆3B" }}
    <hr />
    {{ msg4 ? "中'国4" : msg4 == "重C”" + "庆1" ? '重"庆2C' : "重'\"庆3C" }}
    <hr />
    {{ msg5 ? "中'国5" : msg5 === "重D”" + "庆1" ? '重"庆2D' : "重'\"庆3D" }}
    <hr />
    {{ msg6 ? "中国" + "Chi中na" : "重庆" }}
    <el-button>提交</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tips",
  data() {
    return {
      msg1: "",
      msg2: "",
      msg3: "",
      msg4: "",
      msg5: "",
      msg6: "",
    };
  },
  /*skip-i18n-start*/
  computed: {
    originalText() {
      return "重庆是一座美食之都，火锅、串串香、小面、烤鱼……每一种美食都能让你的味蕾舞动起来";
    },
  },
  /*skip-i18n-end*/
});
</script>
