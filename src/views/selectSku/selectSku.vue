<script setup lang="ts">
import { useAppStoreHook } from "@/store/app";
import router from "@/router";
import { requestSkuData, Colleges } from "./hooks";
import collectionCell from "@/components/collection/collectionCell.vue"
import collectionGroup from "@/components/collection/collectionGroup.vue";

const selectSku = () => {
  useAppStoreHook().changeCurrentSku(8);
  router.push({ path: "/8" });
};
const collegesArr = ref(Array<Colleges>())
async function requestData () {
  try {
    const { banner, colleges } = await requestSkuData();
    collegesArr.value = colleges
    console.log(banner);
    // console.log(colleges);

  } catch (error: any) {
    console.log(error);

  }
}

requestData();

const leftClick = (college: Colleges) => {
  const index = collegesArr.value.indexOf(college)
  const El = document.getElementsByClassName("collegeTitle")[index]
  El.scrollIntoView()
  console.log(college.name)
}


</script>

<template>
  <div class="select">
    <van-nav-bar title="对啊课堂 分类" class="top" />
    <div class="left">
      <template v-for="college in collegesArr" :key="college.id">
        <van-cell :title="college.name" @click="leftClick(college)" />
      </template>
    </div>

    <div class="container">
      <template v-for="college in collegesArr" :key="college.id">
        <collection-group :title="college.name" class="collegeTitle">
          <template v-for="sku in college.skus" :key="sku.id">
            <collection-cell :title="sku.name" :image-url="sku.unchecked_sku_img_url"></collection-cell>
          </template>
        </collection-group>
      </template>
    </div>

  </div>
</template>

<style scoped>
.top {
  position: fixed;
  width: 100vw;
  height: 60px;
}

.container {

  display: flex;
  flex-direction: column;
  position: relative;
  left: 78px;
  top: 60px;
  width: calc(100vw - 78px);
  background-color: rgb(246, 246, 246);
}

.left {
  position: fixed;
  margin-top: 60px;
  width: 78px;

  .van-cell {
    padding: 0;
    height: 60px;
  }

}

.right {

  flex-grow: 1;

}

.collegeTitle {
  /* text-align: left; */
  display: flex;
  flex-direction: column;
  background-color: transparent;
  opacity: 1;
  margin-left: 0.8rem;

}

.skucell {
  width: 100px;
  height: 100px;
}
</style>
