<template>
  <div class="air_conditioner">
    <div class="air_wrap">
      <div class="air_wrap_title">夏日空调</div>

      <div class="air_wrap_inner">
        <!-- 空调机 -->
        <div class="air_condition">
          <div class="air_top">
            <div class="brand_left">
              <div class="inner_box">
                <!-- 顶部点标识 -->
                <div class="inner_box_point_top">
                  <span v-for="item in 5" :key="item"><li></li></span>
                </div>

                <!-- 上部分-三包 -->
                <div class="inner_box_top">
                  <div class="line">
                    <span class="tag1"></span>
                    <span class="tag4"></span>
                  </div>
                  <div class="line"><span class="tag2"></span></div>
                  <div class="line"><span class="tag3"></span></div>
                </div>

                <!-- 下部分-出风口 -->
                <div class="inner_box_bottom">
                  <div class="inner_box_bottom_line1">
                    <span v-for="item in 7" :key="item"><li></li></span>
                  </div>
                  <div class="inner_box_bottom_line2">
                    <div class="inner_box_bottom_line2_small">
                      <div class="inner_box_bottom_line2_small1">
                        <span v-for="item in 8" :key="item"><li></li></span>
                      </div>
                      <div class="inner_box_bottom_line2_small2">
                        <span v-for="item in 8" :key="item"><li></li></span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 底部点标识 -->
                <div class="inner_box_point_bottom">
                  <span v-for="item in 7" :key="item"><li></li></span>
                </div>
              </div>
            </div>
            <div class="brand_right">
              <div
                v-if="firstSuspendFlag"
                class="inner_box"
                :class="{ airTemperature_hidden: suspendFlag }"
              >
                <div><img :src="snowflakeImg" width="30" /></div>
                <!-- 气温 -->
                <div>{{ airTemperature }}<span class="du_point"></span>C</div>
              </div>
            </div>
          </div>
          <div class="air_bottom"></div>
        </div>

        <!-- 风向标 -->
        <div class="wind_direction">
          <img class="wd_left" :src="windDirection" width="30" />
          <img class="wd_center" :src="windDirection" width="30" />
          <img class="wd_right" :src="windDirection" width="30" />
        </div>

        <!-- 微博热榜 -->
        <div class="content_warp">
          <div>{{ realtime.note }}</div>
          <div v-if="realtime.icon_desc_color">
            <span :style="{ background: realtime.icon_desc_color }">{{
              realtime.icon_desc
            }}</span>
          </div>
        </div>

        <!-- 遥控器 -->
        <div class="remote_control">
          <span @click="updownEvn(1)"><img :src="updown" width="20" /></span>
          <span
            @click="suspendEvn"
            class="suspend_default"
            :class="{
              suspend_yes: suspendFlag && firstSuspendFlag,
              suspend_no: !suspendFlag,
            }"
            ><img :src="openClose" width="20"
          /></span>
          <span @click="updownEvn(2)"><img :src="updown" width="20" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { inject } from "vue";
const $axios: any = inject("$axios");

// 雪花
const snowflakeImg = ref(
  "data:image/png;base64,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"
);
// 风向标识
const windDirection = ref(
  "data:image/png;base64,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"
);

// 上下键
const updown = ref(
  "data:image/png;base64,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"
);

// 开关键
const openClose = ref(
  "data:image/png;base64,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"
);

// 气温
const airTemperature = ref(27);

// 开关
const suspendFlag = ref(true);
const firstSuspendFlag = ref(false);
let realtime = reactive({ note: "", icon_desc: "", icon_desc_color: "" });

// 遥控器升降温
function updownEvn(type: number) {
  // 关闭状态
  if (suspendFlag.value) return;

  // 最低温度
  if (airTemperature.value <= 18 && type === 2) return;

  // 最高温度
  if (airTemperature.value >= 39 && type === 1) return;

  if (type === 1) return airTemperature.value++;
  return airTemperature.value--;
}

// 开启||暂停
function suspendEvn() {
  firstSuspendFlag.value = true;
  suspendFlag.value = !suspendFlag.value;
}

let list = reactive([]);

// 获取点评
function getDataEvn() {
  const api = "/weibo-service/ajax/side/hotSearch";
  $axios.get(api).then((res: any) => {
    list = res.data.data.realtime;
    if (list.length > 0) {
      realtime.note = (list[0] as any).note;
      realtime.icon_desc_color = (list[0] as any).icon_desc_color;
      realtime.icon_desc = (list[0] as any).icon_desc;
    }
  });
}

onMounted(() => {
  getDataEvn();
});

const ax = setInterval(() => {
  if (list.length == 0) {
    clearInterval(ax);
    return;
  }
  list.splice(0, 1);

  realtime.note = (list[0] as any).note;
  realtime.icon_desc_color = (list[0] as any).icon_desc_color;
  realtime.icon_desc = (list[0] as any).icon_desc;
}, 3000);
</script>

<style scoped lang="scss">

.air_conditioner{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.air_wrap {
  width: 30vw;
  height: 40vh;
  display: inline-block;
  align-items: center;
  justify-content: center;
  min-width: 20rem;
  min-height: 17rem;
}

.air_wrap_title{
  font-size: 3rem;
  display: inline-block;
  width: 100%;
  text-align: center;
  font-family: "KaiTi";
}

.air_wrap_inner {
  width: 100%;
  height: 100%;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 3vh;
}

/* 风向标 */
.wind_direction {
  width: 100%;
  margin-top: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 6vw;
    opacity: 0.3;

    &:nth-child(1) {
      transform: rotate(135deg);
    }
    &:nth-child(2) {
      transform: rotate(90deg);
    }
    &:nth-child(3) {
      transform: rotate(45deg);
    }

    &:nth-last-child(1) {
      margin: 0;
    }
  }
}

/* 热点 */
.content_warp {
  width: 100%;
  margin: 3vh 0; 
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 5vw;

  div {
    &:nth-child(1) {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #8d8daa;
      text-align: center;
    }
    &:nth-child(2) {
      width: 4vw;

      span {
        color: #fff;
        width: 35px;
        height: 35px;
        line-height: 32px;
        text-align: center;
        display: inline-block;
        border-radius: 5px;
        font-size: 14px;
        box-sizing: border-box;
      }
    }
  }
}

/* 遥控器 */
.remote_control {
  width: 100%;
  margin-top: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4vw;
  box-sizing: border-box;

  span {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3vw;
    box-shadow: 1px 0px 15px #888888;
    cursor: pointer;

    &:nth-last-child(1) {
      margin: 0;
    }

    &:nth-child(3) {
      transform: rotate(180deg);
    }
  }

  .suspend_default {
    background-color: rgb(67, 160, 71);
  }
  /* 按钮动画延迟效果 */
  .suspend_yes {
    animation: suspend_yes 1s 1;
  }
  .suspend_no {
    background-color: rgb(243, 53, 49);
    animation: suspend_no 1s 1;
  }
  @keyframes suspend_yes {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes suspend_no {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }
}

.air_top {
  width: 100%;
  height: 12vh;
  border: 1px solid #dcdcdc;
  border-bottom: 3px solid #dcdcdc;
  box-shadow: -1px -5px 10px #888888;
  display: flex;
  justify-content: space-between;

  .brand_left,
  .brand_right {
    flex: 1;
  }
}

.brand_left {
  display: flex;
  justify-content: space-between;

  .inner_box {
    width: 3rem;
    height: 3.5rem;
    background: rgb(71, 171, 248);
    margin: 12px 0 0 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0 5px 0px 5px;
    box-sizing: border-box;
    align-items: center;
  }

  .inner_box_point_top {
    height: 10px;
    width: calc(100% - 8px);
    padding: 0;
    margin: 0;
    font-size: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
    span {
      margin: 0 5px 0 0;
      &:nth-last-child(1) {
        margin-right: 0px;
      }
    }
    li {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff;

      padding: 0px;
      display: inline-block;
    }
  }

  .inner_box_point_bottom {
    height: 10px;
    width: calc(100% - 8px);
    padding: 0;
    margin: 0;
    font-size: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
    span {
      margin: 0 5px 0 0;
      &:nth-last-child(1) {
        margin-right: 0px;
      }
    }
    li {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff;

      padding: 0px;
      display: inline-block;
    }
  }

  .inner_box_top,
  .inner_box_bottom {
    flex: 1;
    display: flex;
    background: #fff;
    box-sizing: border-box;
    width: calc(100% - 5px);
    border-radius: 2px;
    overflow: hidden;
  }

  .inner_box_top {
    padding-top: 3px;
    flex-direction: column;
  }

  .inner_box_bottom {
    flex-direction: column;
    margin-top: 3px;
    .inner_box_bottom_line1 {
      display: flex;
      height: 10px;
      align-items: center;
      border-bottom: 2px solid #000;
      padding: 0 5px 8px 3px;
      box-sizing: border-box;
      justify-content: space-between;

      span {
        margin: 0 2px 0 0;
        &:nth-last-child(1) {
          margin-right: 0px;
        }
      }

      li {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        display: inline-block;
        background: #000;
      }
    }
    .inner_box_bottom_line2 {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner_box_bottom_line2_small1,
      .inner_box_bottom_line2_small1,
      .inner_box_bottom_line2_small2 {
        overflow: hidden;
      }
      .inner_box_bottom_line2_small {
        width: calc(100% - 20px);
        height: calc(100% - 3px);
        display: flex;
        flex-direction: column;
      }

      .inner_box_bottom_line2_small1,
      .inner_box_bottom_line2_small2 {
        flex: 1;
        overflow: hidden;
        display: inherit;
        border: 1px solid #fff;

        span {
          margin: 0 2px 0 0;
          &:nth-last-child(1) {
            margin-right: 0px;
          }
        }

        li {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #000;
        }
      }
    }
  }

  .line {
    flex: 1;
    width: 100%;
    display: flex;
    padding: 0 0 0 5px;
    position: relative;
  }

  .tag1 {
    display: inline-block;
    width: 10px;
    height: 4px;
    background: rgb(4, 41, 4);
    position: relative;
  }
  .tag1::after {
    position: absolute;
    right: -4px;
    width: 0;
    height: 0;
    content: " ";
    border-right: 2px solid transparent;
    border-top: 2px solid transparent;
    border-left: 2px solid rgb(4, 41, 4);
    border-bottom: 2px solid transparent;
  }

  .tag2 {
    display: inline-block;
    width: 15px;
    height: 4px;
    background: green;
    position: relative;
  }
  .tag2::after {
    position: absolute;
    right: -4px;
    width: 0;
    height: 0;
    content: " ";
    border-right: 2px solid transparent;
    border-top: 2px solid transparent;
    border-left: 2px solid green;
    border-bottom: 2px solid transparent;
  }

  .tag3 {
    display: inline-block;
    width: 20px;
    height: 4px;
    background: rgb(231, 38, 38);
    position: relative;
  }
  .tag3::after {
    position: absolute;
    right: -4px;
    width: 0;
    height: 0;
    content: " ";
    border-right: 2px solid transparent;
    border-top: 2px solid transparent;
    border-left: 2px solid rgb(231, 38, 38);
    border-bottom: 2px solid transparent;
  }

  .tag4 {
    display: inline-block;
    width: 10px;
    height: 4px;
    background: rgb(4, 41, 4);
    position: relative;
    left: 12px;
  }
  .tag4::after {
    position: absolute;
    right: 10px;
    width: 0;
    height: 0;
    content: " ";
    border-left: 2px solid transparent;
    border-top: 2px solid transparent;
    border-right: 2px solid rgb(4, 41, 4);
    border-bottom: 2px solid transparent;
  }
}

.brand_right {
  position: relative;
  color: #8d8daa;
  .inner_box {
    position: absolute;
    right: 35px;
    top: 10px;
    height: 40px;
    width: 50px;
    display: flex;
    flex-direction: column;
    animation: inner_box 0.8s 1;

    div {
      display: inline-block;
    }

    .du_point {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      display: inline-block;
      border: 2px solid #8d8daa;
      margin-bottom: 5px;
    }
  }

  .airTemperature_hidden {
    opacity: 0;
    animation: airTemperature_hidden 0.8s 1;
  }

  @keyframes inner_box {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes airTemperature_hidden {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.25;
    }
    100% {
      opacity: 0;
    }
  }
}

.air_bottom {
  width: 100%;
  height: 5vh;
  border-radius: 0 0 20px 20px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 0px 15px #888888;
}
</style>