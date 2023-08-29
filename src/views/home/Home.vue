<script setup lang="ts">
import { requestSkuList } from "./hooks";
import { useRoute } from "vue-router";
const skuId = useRoute();
console.log(skuId);

// requestSkuList();
</script>

<template>
  <div class="common-layout">首页</div>
</template>

<style scoped></style>
