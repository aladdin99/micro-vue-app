<template>
<div class="wrap_app">
  <h1>mirco-app1</h1>
  <router-link to="/">air-conditioner</router-link> |
  <router-link to="/cat">cat</router-link> |
  <router-link to="/dog">dog</router-link>
  <button @click="getDataEvn">getData</button>
  <div><router-view></router-view></div>
</div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount } from "vue";
const $axios: any = inject("$axios");
function getDataEvn() {
  console.log("---ok---");
  const api =
    "/juejin/tag_api/v1/query_category_briefs?aid=2608&uuid=7107530919398344224";
  $axios.get(api).then((res: any) => {
    console.log(res);
  });
}

// dom节点加载完成
onBeforeMount(() => {
  window.addEventListener("resize", () => {
    console.log("窗口变化啦~");
    // const scale = document.documentElement.clientWidth; // 获取布局视口的宽度，也就是浏览器宽度
    // const font_size = scale / 375; /// 经过换算，动态计算不同设备的font-size值
    // console.log(scale, font_size);
    // document.documentElement.style.fontSize = font_size + "px";
  });
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrap_app{
  font-size: 1rem;
}
</style>>