<template>
  <div class="app-container">
		<!-- 顶部header区域 -->
    <mt-header fixed title="Vue脚手架"></mt-header>

		<!-- 中间路由区域 -->
		<transition>
    <router-view></router-view>
		</transition>


		<!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab" id="aaa">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>

</script>

<style scoped>
.mui-active {
	 color: #007aff!important;
}
.mui-bar-tab1 {
    bottom: 0;
    display: table;
    width: 100%;
    height: 50px;
    padding: 0;
    table-layout: fixed;
    border-top: 0;
    border-bottom: 0;
    -webkit-touch-callout: none;
}

.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
