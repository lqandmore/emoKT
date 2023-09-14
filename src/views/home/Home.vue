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
import { useConfig } from "./hooks/config";
import reButton from "@/components/reButton/reButton.vue";
import groupHeader from "./components/groupHeader.vue";
import liveItem from "./components/liveItem.vue";
import courseItem from "./components/courseItem.vue";
import goodsItem from "./components/goodsItem.vue";
import selectSku from "../selectSku/selectSku.vue";
import router from "@/router"

const banners = ref<Banner[]>([]);
const liveArr = ref<LiveModel[]>([]);
const configArr = ref<ConfigModel[]>([]);
const commodityArr = ref<GoodsModel[]>([]);
const courseArr = ref<CourseModel[]>([]);
const hideRobot = ref(false);
const showSeletSku = ref(false);
const configData = useConfig().configOriginData

const groupTopClick = (title: string) => {
  console.log(title);
};
const showselectView = (show: boolean) => {
  showSeletSku.value = show;
  useAppStoreHook().showTabbar = !show;
};

const skuChanged = () => {
  requestDatas();
}

const consultInfo = () => {
  console.log("咨询");
};

const configBtnClick = (key: string) => {
  switch (key) {
    case "live": {
      router.push({ name: "goods-list" })
    }
  }
}

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

async function requestDatas () {
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

const onscroll = (event: Event) => {
  let el = event.target as Element
  let top = el.scrollTop;
  if (top > oldTop) {
    if (!hideRobot.value) hideRobot.value = true;
  } else {
    if (hideRobot.value) hideRobot.value = false;
  }
  oldTop = top;

};
//
</script>

<template>
  <div class="home">
    <van-nav-bar :title="useAppStoreHook().currentSkuName" left-text="分类" right-text="咨询" class="top" fixed
      @click-left="showselectView(true)" @click-right="consultInfo()" />
    <div class="container" @scroll="onscroll">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <img :src="'/image' + item.picUrl" />
        </van-swipe-item>
      </van-swipe>

      <div class="config-container">
        <template v-for="(item) in configArr" :key="item.sort">
          <re-button :title="item.name" :image-url="item.image" image-width="44px" image-height="32px" image-top
            @click="configBtnClick(item.sortKey)"></re-button>
        </template>
      </div>
      <div class="public-container">
        <group-header title="今日直播公开课" @moreClick="groupTopClick"></group-header>
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
      <van-image class="robot-btn" :class="hideRobot ? 'right-side' : ''"
        src="https://mlist.duia.com/static/img/robot-icon.3bdd84e1.gif" width="85px" height="85px"></van-image>
    </transition>
    <keep-alive>
      <div class="sku-meng" v-if="showSeletSku">
        <select-sku needClose @dismiss="showselectView" @sku-changed="skuChanged"></select-sku>
      </div>
    </keep-alive>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
}

.container {
  position: absolute;
  top: 46px;
  left: 0;
  bottom: 50px;
  display: block;
  padding: 0 15px 0 15px;
  width: calc(100vw - 30px);
  height: calc(100vh - 46px - 50px);
  overflow: hidden;
  overflow-y: scroll;
}

.container::after {
  display: block;
  content: "";
  height: 50px;
  overflow: hidden;
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

.sku-meng {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
  z-index: 101;
}

/*
.select-sku {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 101;
} */
</style>
