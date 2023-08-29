<script setup lang="ts">
import { useAppStoreHook } from "@/store/app";
import router from "@/router";
import { requestSkuData } from "./hooks";

const selectSku = () => {
  useAppStoreHook().changeCurrentSku(8);
  router.push({ path: "/8" });
};

requestSkuData();
</script>

<template>
  <div>
    <van-nav-bar title="对啊课堂 分类" />
    <div>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
    </div>
    <van-button type="primary" @click="selectSku()">主要按钮</van-button>
  </div>
</template>

<style scoped></style>
