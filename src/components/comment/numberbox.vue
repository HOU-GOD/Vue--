<template>
    <div>
        <!-- max值是异步请求得到的, 不知道什么时候会真正获取到数值 -->
        <!-- 我们可以使用 watch属性监听, 来监听 父组件传递过来的max值, 不管watch会被触发几次, 但是最后一次, 肯定是一个合法的max数值 -->
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countchange" ref="numbox" />
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
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        //属性监听
        max:function (newVal,oldVal) {
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>