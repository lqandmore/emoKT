<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <div class="collection-group">
    <div class="title">{{ props.title }}</div>
    <div class="group">
      <slot> </slot>
    </div>
  </div>
</template>

<style scoped>
.collection-group {
}

.title {
  /* width: 100%; */
  font-size: 0.8rem;
  font-weight: 900;
  color: #333;
  text-align: left;
  padding: 0.5rem;
}

.group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
