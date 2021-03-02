<template>
	<view class="warp">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view>
			<!-- 顶部导航栏 -->
			<view class="top-bar">
				<view class="fl al-center location">
					<image src="/static/image/index/point.png" mode=""></image>
					<text>{{ point.city }}</text>
				</view>

				<view class="" @click="search">
					<uni-search-bar :radius="100" placeholder="点击搜索" cancelButton="none">
					</uni-search-bar>
				</view>

			</view>
			<!-- 轮播 -->
			<view class="shuffling page-section-spacing">
				<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" :duration="500">
					<swiper-item v-for="item in bannerList" :key="item.id">
						<view class="swiper-item uni-bg-red">
							<image :src="item.image" mode="" class="banner-img"></image>
						</view>
					</swiper-item>

				</swiper>
			</view>
			<!-- 公告 -->
			<view class="fl al-center tips">
				<image src="/static/image/index/gonggao@2x.png" mode=""></image>
				<text class="over-ellipsis">{{notice}}</text>
			</view>

			<!-- 社区广告  物业广告 -->
			<view class="fl jc-around modul">
				<view class="modul-item fl al-center" @click="toCommunity(item)" v-for="item in adTypeList" :key="item.id">
					<image :src="handImgUrls(item.image)" mode=""></image>
					<text class="management">{{ item.name }}</text>
				</view>
			</view>

			<!-- 广告图 -->
			<view class="management-img">
				<advertisingItem v-for="(item, index) in list" :key="item.id" @click.native="toPath(item.id)" :item="item"/>
			</view>

		</view>

		<uni-popup ref="popup" type="dialog">
			<view class="dialog">
				<view class="title"> {{ popup.title }} </view>
				<view class="content"> {{popup.content}} </view>
				<view class="fl jc-between bottom">
					<navigator open-type="exit">
						<view class="not-agree is-agree">不同意</view>
					</navigator>
					<view class="agree is-agree" @click="close">同意</view>
				</view>
			</view>
		</uni-popup>

		<customTabBar :active="0" />
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import customTabBar from "@/components/customTabBar/customTabBar.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	import advertisingItem from '@/components/advertisingItem/advertisingItem.vue';
	

	import {
		adType,
		lists,
		announcement,
		xieyi,
		search,
		indexList
	} from "@/api/api.js"
	import {
		handImgUrl
	} from '@/utils/utils.js'
	
	import { KEY } from "@/config/index.js"

	export default {
		components: {
			uniSearchBar,
			customTabBar,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			
			advertisingItem
		},
		data() {
			return {
				adTypeList: [],
				bannerList: [],
				notice: '',
				point: {}, // 104.064945,30.570231
				agreements: {},
				popup: { // // 协议
					title: '',
					content: ``,
				},
				list: []
			}
		},
		onLoad(e) {
			console.log(e)
			this.initPage()
			this.$nextTick(() => {
				this.$refs.popup.open()
			})
		},
		methods: {
			initPage() {
				// this.getPoint();
				Promise.all([adType(), lists(), announcement(), xieyi(), indexList()]).then(res => {
					let [adTypeList, bannerList, notice, popup, list] = res;
					this.adTypeList = adTypeList
					this.bannerList = bannerList
					this.notice = notice
					this.popup = popup
					this.list = list
				})

			},
				
			
			handImgUrls(url) {
				return handImgUrl(url)
			},
			toPath(id) {
				uni.navigateTo({
					url: '/pages/details/details?id=' + id,
				})
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
			},
			// 搜索
			search() {
				uni.navigateTo({
					url: '../communityAdvertising/communityAdvertising?search=search'
				})
			},
			// 社区广告
			toCommunity(item) {
				console.log(item)
				if(!item.id) {
					return false;
				}
				let query = {
					type_id: item.id,
					name: item.name,
				}
				uni.navigateTo({
					url: '../communityAdvertising/communityAdvertising?query=' + JSON.stringify(query)
				})

			},
			// 获取位置
			getPoint() {
				// #ifdef MP-WEIXIN
				this.getLocation()
				// #endif

				// #ifdef H5
				this.loactionH5()
				// #endif
			},
			// 小程序获取位置
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						this.conversionPoint(res)
					},
					fail() {
						uni.showToast({
							title: '定位失败，请检查是否开启定位',
							icon: 'none'
						})
					}
				});
			},
			// h5公众号定位
			loactionH5() {
				console.log('h5')
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.conversionPoint(res)
					},
					fail(err) {
						uni.showToast({
							title: '定位失败，请检查是否开启定位',
							icon: 'none'
						})
					},

				});
			},
			
			// 经纬度转坐标位置
			conversionPoint(res) {
				uni.setStorageSync('location', res)
				uni.request({
					url: "https://restapi.amap.com/v3/geocode/regeo?parameters",
					method: 'GET',
					data: {
						key: KEY,
						location: `${res.longitude}, ${res.latitude}`
					},
					success: (data) => {
						let {
							city,
							district,
							province
						} = data.data.regeocode.addressComponent;
						this.point = {
							city,
							district,
							province,
							longitude: res.longitude,
							latitude: res.latitude,
						}
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.dialog {
		width: 527rpx;
		// height: 710rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 32rpx 0px rgba(117, 117, 117, 0.56);
		border-radius: 10rpx;
		padding: 49rpx 55rpx 62rpx 55rpx;

		.title {
			text-align: center;
			font-size: 40rpx;
			font-weight: 800;
			color: #2E2E2E;
			margin-bottom: 45rpx;
		}

		.content {
			font-size: 16rpx;
			font-weight: 400;
			color: #2E2E2E;
			line-height: 36rpx;

		}

		.bottom {
			margin-top: 49rpx;

			.is-agree {
				text-align: center;
				height: 70rpx;
				line-height: 70rpx;
				width: 200rpx;

				font-size: 30rpx;
				font-weight: 800;
				border-radius: 10rpx;

			}

			.not-agree {
				border: 2rpx solid #8B8B8B;
				color: #8B8B8B;
			}

			.agree {
				color: $main-theme-color;
				border: 2rpx solid $main-theme-color;
			}
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: $main-theme-color;
	}

	.warp {
		background: rgb(241, 241, 241);
		height: calc(100vh - 122rpx);
	}

	.top-bar {
		height: 189rpx;
		width: 100%;
		background: $main-theme-color;

		.location {
			margin-left: 22rpx;
			padding-top: 35rpx;
			font-size: 30rpx;
			color: #fff;

			image {
				width: 25rpx;
				height: 32rpx;
				margin-right: 17rpx;
			}
		}

		/deep/ .uni-searchbar {
			background-color: rgba(0, 0, 0, 0) !important;
		}
	}

	.tips {
		width: 668rpx;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 40rpx;
		background: #fff;
		margin: 0 auto;

		image {
			width: 39rpx;
			height: 29rpx;
			margin-right: 39rpx;
		}

		text {
			font-size: 20rpx;
			color: #646464;
		}
	}

	.modul {
		margin: 18rpx auto 20rpx auto;

		.modul-item {
			width: 344rpx;
			height: 116rpx;
			background: #FFFFFF;
			border-radius: 10rpx;

			image {
				width: 59rpx;
				height: 59rpx;
				margin: 0 25rpx 0 52rpx;
			}

			text {
				font-size: 36rpx;
				font-weight: normal;
			}

			.management {
				color: $main-theme-color;
			}

			.classroom {
				color: #04A2A8;
			}

		}
	}

	.management-img{
		margin-bottom: 200rpx;
	}

</style>
