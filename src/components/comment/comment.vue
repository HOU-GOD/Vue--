<template>
    <div class="cmt-container">
        <h3>发表评论{{id}}</h3>
        <hr>
        <textarea placeholder="该BB时就BB(最多120个字)" maxlength="120" v-model="sendComment"></textarea>
        <mt-button type="primary" size="large" @click="setcomment">发表BB</mt-button>
        <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>

      <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
    </div>
</template>


<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            //默认展示第一页数据
            pageIndex: 1,
            comments: [],
            sendComment:''
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        // 获取数据
        getComments(){
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result=>{
                console.log(result);
                
                if (result.body.status === 0) {
                    // this.comments = this.comments.concat(result.body.message);
                    // this.comments = this.comments.push.apply(null,result.body.message);有错误
                    this.comments = [...this.comments,...result.body.message]
                }else {
                    Toast("获取失败")
                }
            })
        },
        //点击提交
        setcomment(){
            // console.log(this.sendComment);
            this.$http.post("api/postcomment/"+this.id,{
                artid:this.id,
                content:this.sendComment
            }).then(result=>{
                if (result.body.status === 0) {
                    Toast("提交成功");
                    this.sendComment = '';
                    // this.getComments();
                }else {
                    Toast("提交失败")
                    this.sendComment = '';
                }
                
            })
            
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        }
    },
    props:['id']
}
</script>


<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>