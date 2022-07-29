<template>
  <!-- <div class="wrap_head"><router-link to="/">夏日空调</router-link></div>
  <div class="wrap">
    <router-view></router-view>
  </div> -->
  <div class="wrap_app">
    <airConditioner></airConditioner>
  </div>
</template>

<script steup>
import airConditioner from '@/components/airConditioner.vue'
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    airConditioner,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  display: inline-block;
}

.wrap_app{
  width: 100%;
  height: 100%;
  display: inline-block;
}

</style>>