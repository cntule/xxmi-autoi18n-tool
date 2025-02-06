<template>
  <div id="app">
    <div class="lang-switch">
      <!--skip-i18n-start-->
      <button @click="switchLang('zh')">{{ "中文" }}</button>
      <!--skip-i18n-end-->
      <button @click="switchLang('en')">English</button>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return { key: 1000 };
  },
  methods: {
    switchLang(lang) {
      this.$i18n.locale = lang;
      this.$data.key = Date.now();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.lang-switch {
  position: fixed;
  top: 0;
  right: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
