<template>
    <div>
        <!-- max值是异步请求得到的, 不知道什么时候会真正获取到数值 -->
        <!-- 我们可以使用 watch属性监听, 来监听 父组件传递过来的max值, 不管watch会被触发几次, 但是最后一次, 肯定是一个合法的max数值 -->
        <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countchange" ref="numbox" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>


<script>
import mui from "../../lib/mui/js/mui.js";
export default {
    mounted(){
        mui(".mui-numbox").numbox()
    },
    methods:{
        countchange(){
            // console.log(this.$refs.numbox.value);
            // this.$emit("getcount",parseInt(this.$refs.numbox.value))
            this.$store.commit("updataGoodsInfo",{id:this.goodsid,
            count:this.$refs.numbox.value})
        }
    },
    props:["initcount","goodsid"]
}
</script>


<style lang="scss" scoped>

</style>