<template>
<div>
  <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotu" :key="item.length">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotu: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http.get("http://vue.studyit.io/api/getlunbo").then(result => {
        if (result.body.status === 0) {
          console.log(result);

          // 成功
          this.lunbotu = result.body.message;
          Toast("加载成功");
        } else {
          Toast("加载失败");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  margin-top: 40px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: cyan;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
