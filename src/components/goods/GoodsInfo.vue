<template>
    <div class="goodsinfo-container">
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
                    <p>购买数量:<numbox></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">立即购买</mt-button>
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
            goodsinfo:{} //商品信息
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){ // 获取轮播图图片数据
            this.$axios.get("api/getthumimages/"+this.id).then(result=>{
                console.log(result);
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
                console.log(result);
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
    top: 390px;
    left: 146px;
  }
    .mui-card-header{
        font-weight: bold;
    }
}
</style>