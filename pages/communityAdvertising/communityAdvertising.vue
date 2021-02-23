<template>
	<view>
		<!-- 广告社区 -->
		<view v-for="item in list" :key="item.id" class="advertising-item" @click="toPath(item.id)">
			<advertisingItem :item="item"/>
		</view>
		
		<customTabBar />
	</view>
</template>

<script>
	import advertisingItem from '@/components/advertisingItem/advertisingItem.vue';
	
	import { announcementList } from "@/api/api.js"
	export default {
		components:{
			advertisingItem
		},
		data() {
			return {
				query: {
					page: 1,
					limit: 10,
				},
				list: []
				
			}
		},
		async onLoad(opt) {
			// 1 社区广告
			let options = await JSON.parse(opt.query || '{}');
			await uni.setNavigationBarTitle({
			    title: options.name
			});
			this.query = await Object.assign(this.query, options);
			await this.getList()
		},
		
		methods: {
			getList() {
				announcementList(this.query).then(res => {
					if(this.list.length === res.total) {
						return false;
					}
					this.list = res.data
				})
			},
			toPath(id) {
				uni.navigateTo({
					url: '../details/details?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
.advertising-item{
	margin-top: 23rpx;
}
</style>
