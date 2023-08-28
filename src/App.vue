<script setup lang="ts">
import { ref } from "vue";
import { useAppStoreHook } from "./store/app";
const hasSelect = useAppStoreHook().getCurrentSku !== 0;
const active = ref(0);
</script>

<template>
  <!-- <template v-if="hasSelect">

  </template>
  <template v-else> -->
    <RouterView />
  <!-- </template> -->
</template>

<style scoped></style>
