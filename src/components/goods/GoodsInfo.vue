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
        
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header mui-card-media" style="height:4vw;background-image:url(../images/cbd.jpg)"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>Posted on January 18, 2016</p>
                    <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <a class="mui-card-link">Read more</a>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>
    </div>
</template>

<script>
import swiper from "../comment/swiper.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotu: []
        }
    },
    created(){
        this.getLunbotu();
    },
    methods:{
        getLunbotu(){
            this.$axios.get("api/getthumimages/"+this.id).then(result=>{
                console.log(result);
                if (result.data.status == 0) {
                    result.data.message.forEach(item=>{
                        item.img = item.src
                    })
                    this.lunbotu = result.data.message
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>


<style lang="scss" scoped>

</style>