<template>
    <div class="goodsinfo-container">
        <!-- 购物车的小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>


        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotu="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量:<numbox @getcount="countnum" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsinfo.goods_no}}</p>
                    <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="gotoInfo(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="gotoComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "../comment/swiper.vue";//导入轮播图组件
import numbox from "../comment/numberbox.vue";//导入数字选择框
export default {
    data(){
        return {
            id:this.$route.params.id, //商品ID信息
            lunbotu: [], // 轮播图图片数据
            goodsinfo:{}, //商品信息
            ballFlag: false, //控制初始球的显示和隐藏
            num1:1 //
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){ // 获取轮播图图片数据
            this.$axios.get("api/getthumimages/"+this.id).then(result=>{
                // console.log(result);
                if (result.data.status == 0) {
                    result.data.message.forEach(item=>{
                        item.img = item.src
                    })
                    this.lunbotu = result.data.message
                }
            })
        },
        getGoodsInfo(){ // 获取商品信息详情
            this.$axios.get("api/goods/getinfo/"+ this.id).then(result=>{
                // console.log(result);
                if (result.data.status == 0) {
                    this.goodsinfo = result.data.message[0]
                }                
            })
        },
        gotoInfo(id){ // 使用编程式导航 跳转到图文详情页面
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        gotoComment(id){ // 使用编程式导航 跳转到商品评论夜念
            this.$router.push({name:"goodscomment",params:{id}})
        },
        // 动画函数
        addToShopCar(){ //点击添加购物车开始动画, 调用在Vuex中的数据方法
            this.ballFlag = !this.ballFlag;
            //自定义一个商品信息对象, 以便购物车页面展示使用
            //{id:商品,count:要购买的数量,price:商品的单价,selected:false 是否勾选结账用}
            var goodsinfo = {
                id:this.id,
                count:this.num1,
                price:this.goodsinfo.sell_price,
                selected:true
            }
            this.$store.commit("addToCar",goodsinfo);
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;
            // 获取小球的 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        countnum(num){
            console.log(num,111111);
            this.num1 = num;
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>


<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  position: relative;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 370px;
    left: 78px;
  }
    .mui-card-header{
        font-weight: bold;
    }
}
</style>