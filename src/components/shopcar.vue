<template>
<div class="shopcar-container">
    <div class="goods-list">
    <!-- 商品列表区域 -->
        <div class="mui-card" v-for="(item, i) in goodslist" :key="i">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>

                        </p>
                        <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
		<div class="mui-card-content">
            <div class="mui-card-content-inner jiesuan">
                <div class="left">
                    <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                </div>
                <mt-button type="danger">去结算</mt-button>
            </div>
		</div>
	</div>
</div>
</template>

<script>
import numbox from "../components/comment/shopnumbox.vue";
export default {
  data() {
    return {
      goodslist: [] //购物车中的数据
    };
  },
  created() {
    this.getshopCar();
  },
  methods: {
    getshopCar() {
      //获取store中所有的数据的id
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      this.$axios
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          // console.log(result);
          if (result.data.status == 0) {
            this.goodslist = result.data.message;
          }
        });
    },
    selectedChange(id, value) {
      // 点击开关同步到store公交车中
      this.$store.commit("updateSelected", { id: id, selected: value });
    },
    remove(id, i) {
      // 点击删除, 先从store中根据传输的id删除, 同时把当前组件中goodslist对应的删除(根据索引i)
      this.goodslist.splice(i, 1);
      this.$store.commit("removeCar", id);
    }
  },
  components: {
    numbox
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
      a {
        color: red;
        position: absolute;
        top: 46px;
        right: 26px;
        font-size: 18px;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
