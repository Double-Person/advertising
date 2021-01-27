<template>
	<view>
		<!-- 广告社区 -->
		<view v-for="item in 3" :key="item" class="advertising-item">
			<advertisingItem />
		</view>
		
		<customTabBar />
	</view>
</template>

<script>
	import advertisingItem from '@/components/advertisingItem/advertisingItem.vue'
	export default {
		components:{
			advertisingItem
		},
		data() {
			return {
				
			}
		},
		
		methods: {
			
		}
	}
</script>

<style scoped>
.advertising-item{
	margin-top: 23rpx;
}
</style>
