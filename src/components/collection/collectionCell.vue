<script setup lang="ts">
const props = defineProps({
  imageUrl: String,
  title: String,
  isSelected: Boolean,
})

const itemClick = () => {
  console.log(111111);
}

</script>

<template>
  <div @click="itemClick()" class="collection-cell">
    <van-image width="26px" height="26px" fit="contain" position="center" :src="'/image' + props.imageUrl"></van-image>
    <div class="text">{{ title }}</div>
    <div class="bottomLine" :class="{ selected: isSelected }"></div>
    <!-- <div class="bottomSpace">
      <div class="bottomLine"></div>
    </div> -->

  </div>
</template>

<style scoped>
.collection-cell {
  width: 135px;
  height: 104px;
  display: inline-flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  margin: 0 10px 10px 0;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;

  .text {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: .32rem;
    text-align: center;
  }

  .bottomLine {
    width: 100%;
    height: 1px;
  }

}



.selected {
  background-color: #47c88a;
}
</style>
