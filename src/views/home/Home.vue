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

const groupTopClick = (title: string) => {
  console.log(title);
};

const banners = ref<Banner[]>([]);
const liveArr = ref<LiveModel[]>([]);
const configArr = ref<ConfigModel[]>([]);
const commodityArr = ref<GoodsModel[]>([]);
const courseArr = ref<CourseModel[]>([]);

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

    commodityArr.value = await requestCommodity<GoodsModel[]>();

    courseArr.value = await requestCourses<CourseModel[]>();
  } catch (error: any) {
    console.log(error);
  }
}

onMounted(() => {
  requestDatas();
});
</script>

<template>
  <div class="home">
    <van-nav-bar
      :title="useAppStoreHook().currentSkuName"
      left-text="分类"
      right-text="咨询"
      class="top"
    />
    <div class="container">
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
      </div>
      <div class="goods-container">
        <group-header title="系统班" @moreClick="groupTopClick"></group-header>
      </div>
      <div class="course-container">
        <group-header title="视频课" @moreClick="groupTopClick"></group-header>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 15px;
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


</style>
