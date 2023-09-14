<script setup lang="ts">

import { useAppStoreHook } from "@/store/app";
import router from "@/router"

</script>

<template>
  <div class="goods-list">
    <van-nav-bar :title="useAppStoreHook().currentSkuName" left-arrow class="top" fixed @click-left="router.go(-1)" />
  </div>
</template>

<style scoped></style>
