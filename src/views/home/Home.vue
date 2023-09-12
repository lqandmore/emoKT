<script setup lang="ts">
import {
  requestOpenLives,
  requestCarousel,
  requestCommodity,
  requestCourses,
  requestSkuConfig
} from "./hooks";
import { useAppStoreHook } from "@/store/app";
import {
  Banner,
  LiveModel,
  configReSponse,
  ConfigModel,
  CourseModel,
  GoodsModel,
  Live
} from "./hooks/types";
import { configData } from "./hooks";
import reButton from "@/components/reButton/reButton.vue";
import groupHeader from "./components/groupHeader.vue";
import liveItem from "./components/liveItem.vue";
import courseItem from "./components/courseItem.vue";
import goodsItem from "./components/goodsItem.vue";
import selectSku from "../selectSku/selectSku.vue";

const banners = ref<Banner[]>([]);
const liveArr = ref<LiveModel[]>([]);
const configArr = ref<ConfigModel[]>([]);
const commodityArr = ref<GoodsModel[]>([]);
const courseArr = ref<CourseModel[]>([]);
const hideRobot = ref(false);
const showSeletSku = ref(false);

const groupTopClick = (title: string) => {
  console.log(title);
};
const showselectView = (show: boolean) => {
  showSeletSku.value = show;
  useAppStoreHook().showTabbar = !show;
};

const consultInfo = () => {
  console.log("咨询");
};

const dealConfigData = (arr: any[]) => {
  for (let index = 0; index < configData.length; index++) {
    const configItem = configData[index];
    for (let j = 0; j < arr.length; j++) {
      const sortObj = arr[j];
      if (sortObj[configItem.sortKey] === 1) {
        configItem.sort = sortObj["sort"];
        break;
      }
    }
  }
  configData.sort((a, b) => a.sort - b.sort);
  configArr.value = configData;
};

async function requestDatas() {
  try {
    const { courseLiveNewDtos } = await requestOpenLives<Live>();
    liveArr.value = courseLiveNewDtos;
    banners.value = await requestCarousel<Banner[]>();

    const { wap } = await requestSkuConfig<configReSponse>();
    dealConfigData(wap);

    const goodData = await requestCommodity<GoodsModel[]>();
    if (goodData.length > 5) {
      commodityArr.value = goodData.slice(0, 5);
    } else {
      commodityArr.value = goodData;
    }

    courseArr.value = await requestCourses<CourseModel[]>();
  } catch (error: any) {
    console.log(error);
  }
}

onMounted(() => {
  useAppStoreHook().showTabbar = true;
  requestDatas();
});

let oldTop = 0;

document.onscroll = () => {
  let top = document.scrollingElement?.scrollTop;
  if (top) {
    if (top > oldTop) {
      if (!hideRobot.value) hideRobot.value = true;
    } else {
      if (hideRobot.value) hideRobot.value = false;
    }
    oldTop = top;
  }
};
//
</script>

<template>
  <div class="home">
    <van-nav-bar
      :title="useAppStoreHook().currentSkuName"
      left-text="分类"
      right-text="咨询"
      class="top"
      fixed
      @click-left="showselectView(true)"
      @click-right="consultInfo()"
    />
    <div class="container" v-if="!showSeletSku">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <img :src="'/image' + item.picUrl" />
        </van-swipe-item>
      </van-swipe>

      <div class="config-container">
        <template v-for="item in configArr" :key="item.sort">
          <re-button
            :title="item.name"
            :image-url="item.image"
            image-width="44px"
            image-height="32px"
            image-top
          ></re-button>
        </template>
      </div>
      <div class="public-container">
        <group-header
          title="今日直播公开课"
          @moreClick="groupTopClick"
        ></group-header>
        <template v-for="model in liveArr" :key="model.id">
          <live-item :model="model"></live-item>
        </template>
      </div>
      <div class="goods-container">
        <group-header title="系统班" @moreClick="groupTopClick"></group-header>
        <template v-for="model in commodityArr" :key="model.id">
          <goods-item :model="model"></goods-item>
        </template>
      </div>
      <div class="course-container">
        <group-header title="视频课" @moreClick="groupTopClick"></group-header>
        <template v-for="model in courseArr" :key="model.id">
          <course-item :model="model"></course-item>
        </template>
      </div>
    </div>
    <transition name="robot">
      <van-image
        class="robot-btn"
        :class="hideRobot ? 'right-side' : ''"
        src="https://mlist.duia.com/static/img/robot-icon.3bdd84e1.gif"
        width="85px"
        height="85px"
      ></van-image>
    </transition>
    <keep-alive>
      <select-sku
        v-if="showSeletSku"
        needClose
        @dismiss="showselectView(false)"
      ></select-sku>
    </keep-alive>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  display: flex;
}
.container {
  display: block;
  padding: 60px 15px 100px 15px;
  width: calc(100vw - 30px);
}

.van-nav-bar {
  --van-nav-bar-text-color: var(--primary-theme-color);
}

.van-swipe {
  width: 100%;
  height: 150px;
}

.config-container {
  width: 100%;

  .re-button {
    width: 90px;
    height: 60px;
    margin-top: 20px;
  }
}
.robot-btn {
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 10;
}

.right-side {
  right: -45px;
}

.select-sku {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  z-index: 101;
}
</style>
