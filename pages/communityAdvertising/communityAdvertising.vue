<template>
	<view>
		<view v-if="isShowSearch">
			<uni-search-bar :radius="100" @confirm="search" @clear="clear" placeholder="点击搜索" cancelButton="none">
			</uni-search-bar>
		</view>
		<!-- 广告社区 -->
		<view v-for="item in list" :key="item.id" class="advertising-item" @click="toPath(item.id)">
			<advertisingItem :item="item"/>
		</view>
		
		<customTabBar />
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import advertisingItem from '@/components/advertisingItem/advertisingItem.vue';
	
	import { announcementList, search } from "@/api/api.js"
	export default {
		components:{
			advertisingItem,
			uniSearchBar
		},
		data() {
			return {
				last_page: 1,
				isShowSearch: false,  // 是否显示搜索框
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
			await uni.setNavigationBarTitle({ title: options.name || '搜索' });
			this.query = {
				...options,
				...this.query
			}
			console.log(this.query)
			if(opt.search) {
				this.isShowSearch = true
			}else {
				this.isShowSearch = false
			}
			await this.getLocation()
			
		},
		onReachBottom() {
			if(!this.isShowSearch) {
				if (this.last_page == this.page) {
					return uni.showToast({
						title: '暂无更多数据',
						icon: 'none'
					})
				}
				this.query.page += 1;
				this.getList()
			}
		},
		methods: {
			getList() {
				announcementList(this.query).then(res => {
					let { last_page, data } = res;
					this.last_page = last_page;
					if (data.length === 0) {
						return uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
					}
					
					this.list.push(...data)
				})
			},
			getLocation() {
				
				// #ifdef MP-WEIXIN
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						this.query.lng = res.longitude
						this.query.lat = res.latitude
						if(!this.isShowSearch) {
							this.getList()
						}
					},
					fail() {
						this.showToast()
					}
				});
				// #endif
				
				// #ifdef H5
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.query.lng = res.longitude
						this.query.lat = res.latitude
						if(!this.isShowSearch) {
							this.getList()
						}
					},
					fail(err) {
						this.showToast()
					},
				
				});
				// #endif
			},
			showToast() {
				uni.showToast({
					title: '定位失败，请检查是否开启定位',
					icon: 'none'
				})
			},
			clear(value) {
				console.log('clean', value)
			},
			// 搜索
			search(val) {
				let obj = {
					key: val.value || '',
					limit: 100,
					page: 1,
					lng: this.query.lng,  // 104.06476
					lat: this.query.lat  // 30.5702
				}
				search(obj).then(res => {
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
