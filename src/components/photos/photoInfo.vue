<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <!-- 缩略图区域 -->
        <div class="thumbs">
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>
        <!-- 图片介绍 -->
        <div class="content" v-html="photoinfo.content"></div>
        <!-- 插入评论的并传入id值子组件 -->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>


<script>
import comment from "../comment/comment.vue";
export default {
    data(){
        return {
            id: this.$route.params.id,
            photoinfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoInfo();
        this.getPhotos();
    },
    methods:{
        getPhotoInfo(){//获取图片详情
            this.$axios.get("api/getimageInfo/"+this.id).then(result=>{
                // console.log(result);
                if (result.data.status == 0) {
                    this.photoinfo = result.data.message[0]
                }
            })
        },
        getPhotos(){//获取缩略图
            this.$axios.get("api/getthumimages/"+this.id).then(result=>{
                console.log(result);
                if (result.data.status == 0) {
                    result.data.message.forEach(item=>{
                        item.w = 600;
                        item.h = 400;
                        item.msrc = item.src;
                    });
                    this.list = result.data.message;
                }
                
            })
        },
        handleClose () {
        console.log('close event')
        }
    },
    components:{
        "cmt-box": comment
    }
}
</script>


<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

    
}
.photoinfo-container /deep/ figure {
    display: inline-block;
    margin: 10px;
    box-shadow: 8px 8px 8px #999;
}
.photoinfo-container /deep/ img { //深度选择器 作用于父子组件之间的选择, 同一个组件内部不需要使用
    display: inline-block;
    height: 100px;
    width: 100px;
}
</style>