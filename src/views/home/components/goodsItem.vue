<script setup lang="ts">
import reButton from "@/components/reButton/reButton.vue";
import { GoodsModel } from "../hooks/types";

const props = defineProps({
  model: Object
});

const goodsModel = props.model as GoodsModel;
const tagInfo = computed(() => {
  switch (goodsModel.classCourseType) {
    case 1:
      return { name: "系统班", color: "green" };
    case 2: {
      if (goodsModel.discount === 7) {
        return { name: "专题课·抢购", color: "blue" };
      }
      return { name: "专题课", color: "blue" };
    }
    case 17:
      return { name: "VIP题库", color: "orange" };
    default:
      return { name: "专题课", color: "blue" };
  }
});

const buyNumString = computed(() => {
  if (goodsModel.classCourseType === 2 && goodsModel.discount === 7) {
    return `已购:${goodsModel.respStuNum}/${goodsModel.disMaximum}人`;
  } else {
    if (goodsModel.respStuNum > 1000) {
      return "1000+人购买";
    }
    return `${goodsModel.respStuNum}人购买`;
  }
});

const subtitle = computed(() => {
  const date = new Date(goodsModel.startDate);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDay();
  if (new Date().getFullYear() - Y >= 0) {
    return `第${goodsModel.enrollNum}期即将开课，${M}月${D}日`;
  } else {
    return `第${goodsModel.enrollNum}期即将开课，${Y}年${M}月${D}日`;
  }
});
</script>

<template>
  <div class="goods-item">
    <div class="tag" :class="tagInfo.color">{{ tagInfo.name }}</div>
    <div class="container">
      <div class="title">{{ goodsModel.name }}</div>
      <div class="sub-title">{{ subtitle }}</div>
      <div class="teahcer-container">
        <template v-for="teacher in goodsModel.teacherList.slice(0, 3)">
          <re-button
            :title="teacher.name"
            :image-url="teacher.imageUrl"
            image-width="29px"
            image-height="29px"
            image-redius="14.5px"
            font-size="10px"
            font-color="#999"
            image-top
          ></re-button>
        </template>
      </div>
    </div>

    <div class="bottom">
      <div>{{ buyNumString }}</div>
      <div class="right">
        <div class="cost">{{ `￥${goodsModel.costPrice}` }}</div>
        <div class="dis-price">{{ `￥${goodsModel.disPrice}` }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goods-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  .tag {
    padding: 2px 10px;
    font-size: 13px;
    color: #fff;
    background-size: 60px 22px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  .blue {
    background-image: linear-gradient(90deg, #80acf8, #8291fb);
  }
  .green {
    background-image: linear-gradient(90deg, #40dc91, #38dadb);
  }
  .orange {
    background-image: linear-gradient(87deg, #fb8061 8%, #fd563f 95%);
  }
}
.container {
  display: flex;
  width: calc(100% - 30px);
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
  margin: 15px 15px 0 15px;
  .title {
    font-size: 16px;
    font-weight: 900;
    width: 200px;
    overflow: hidden;
    text-align: left;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .re-button {
    width: 68px;
    height: 56px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.sub-title {
  font-size: 12px;
  font-weight: 300;
  margin: 10px 0;
  color: #999;
}

.bottom {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  margin: 15px;
  font-size: 12px;
  .right {
    display: flex;
    justify-content: space-between;

    .cost {
      text-decoration: line-through;
    }
    .dis-price {
      color: red;
      font-weight: 500;
      margin-left: 5px;
    }
  }
}
</style>
