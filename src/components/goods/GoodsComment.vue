<template>
    <div>
        <comment :id="$route.params.id"></comment>
    </div>
</template>


<script>
import comment from "../comment/comment";
export default {
    components:{
        comment
    }
}
</script>


<style lang="scss" scoped>

</style>