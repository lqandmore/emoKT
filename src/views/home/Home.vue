<script setup lang="ts">
import { requestOpenLives, requestCarousel, requestCommodity, requestCourses, requestSkuConfig } from "./hooks";
import { useAppStoreHook } from "@/store/app";
import { Banner, LiveItem, configReSponse, ConfigSort, ConfigModel, ConfigType } from "./hooks/types"
import { configData } from "./hooks";
import reButton from "@/components/reButton/reButton.vue"

const banners = ref<Banner[]>([])
const liveArr = ref<LiveItem[]>([])
const configArr = ref<ConfigModel[]>([])

async function requestDatas () {
  try {
    const { courseLiveNewDtos } = await requestOpenLives();
    liveArr.value = courseLiveNewDtos
    banners.value = await requestCarousel();

    const { wap } = await requestSkuConfig<configReSponse>()

    for (let index = 0; index < configData.length; index++) {
      const configItem = configData[index];
      for (let j = 0; j < wap.length; j++) {
        const sortObj = wap[j];
        if (sortObj[configItem.sortKey] === 1) {
          configItem.sort = sortObj["sort"]
          break;
        }
      }
    }


    configData.sort((a, b) => a.sort - b.sort)
    console.log(configData);
    configArr.value = configData
  } catch (error: any) {
    console.log(error);
  }
}

onMounted(() => {
  requestDatas();
});
</script>

<template>
  <van-nav-bar :title="useAppStoreHook().currentSkuName" left-text="分类" right-text="咨询" class="top" />
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <img :src="'/image' + item.picUrl" />
    </van-swipe-item>
  </van-swipe>

  <div class="config-container">
    <template v-for="item in configArr" :key="item.sort">
      <re-button :title="item.name" image-width="44px" image-height="32px" image-top :image-url="item.image"></re-button>
    </template>
  </div>
</template>

<style scoped>
.van-nav-bar {
  --van-nav-bar-text-color: var(--primary-theme-color);
}

.config-container {
  margin-left: 10px;
  width: calc(100vw - 20px);

  .re-button {
    width: 90px;
    height: 60px;
    margin-top: 20px;
  }
}
</style>
