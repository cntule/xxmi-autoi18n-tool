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
    <Tips>
      <template v-slot:content><div style="text-align: center">这是一个插槽内容</div></template>
    </Tips>
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