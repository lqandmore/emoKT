<script setup lang="ts">
import { useAppStoreHook } from "@/store/app";
import router from "@/router";
import { requestSkuData, Colleges } from "./hooks";


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


</script>

<template>
  <div>
    <van-nav-bar title="对啊课堂 分类" />
    <div class="container">
      <span class="left">
        <template v-for="college in collegesArr" :key="college.id">
          <van-cell :title="college.name" />
        </template>
      </span>
      <span class="right">
        <template v-for="college in collegesArr" :key="college.id">
          <van-cell-group :title="college.name" class="collegeTitle">
            <template v-for="sku in college.skus" :key="sku.id">
              <van-cell :title="sku.name" class="skuCell" />
            </template>
          </van-cell-group>
        </template>
      </span>
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100vw;
}

.left,
.right {
  width: 78px;
}

.left {
  height: 60px;

  .van-cell {
    padding: 10px 0;
  }

}

.right {
  flex-grow: 1;
  background-color: lightgray;
}

.collegeTitle {
  /* text-align: left; */
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.college {}

.skucell {
  width: 100px;
  height: 100px;
}
</style>
