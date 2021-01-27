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
					<text>北京站</text>
				</view>
				
				<view class="">
					<uni-search-bar :radius="100" @confirm="search" placeholder="点击搜索" cancelButton="none"></uni-search-bar>
				</view>
				
			</view>
			<!-- 轮播 -->
			<view class="page-section-spacing">
				<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" :duration="500">
					<swiper-item v-for="item in 4" :key="item">
						<view class="swiper-item uni-bg-red">{{ item }}</view>
					</swiper-item>
						
				</swiper>
			</view>
			<!-- 公告 -->
			<view class="fl al-center tips">
				<image src="/static/image/index/gonggao@2x.png" mode=""></image>
				<text class="over-ellipsis">公告栏文字文字文字文字公告栏文字文字文字文字文字文字公告栏文字文字文字文字公告栏文字文字文字文字文字文字</text>
			</view>
			
			<!-- 社区广告  物业广告 -->
			<view class="fl jc-around modul">
				<view class="modul-item fl al-center" @click="toCommunity">
					<image src="/static/image/index/management.png" mode=""></image>
					<text class="management">社区广告</text>
				</view>
				<view class="modul-item fl al-center">
					<image src="/static/image/index/classroom.png" mode=""></image>
					<text class="classroom">物业广告</text>
				</view>
			</view>
			
			<!-- 广告图 -->
			
			<view class="management-img">
				<image src="/static/image/index/classroom.png" mode=""></image>
				<view class="over-ellipsis img-tips">啦啦啦啦啦啦啦啦啦啦</view>
			</view>

		</view>
		
		<customTabBar :active="0" />
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import customTabBar from "@/components/customTabBar/customTabBar.vue"
	export default {
		components: {
			uniSearchBar,
			customTabBar
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			search(value) {
				console.log(value)
			},
			toCommunity() {
				uni.navigateTo({
					url: '../communityAdvertising/communityAdvertising'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.warp {
		background: rgb(241, 241, 241);
		height: calc(100vh - 122rpx);
	}

	.top-bar {
		height: 189rpx;
		width: 100%;
		background: #A80404;
		.location{
			margin-left: 22rpx;
			padding-top: 35rpx;
			font-size: 30rpx;
			color: #fff;
			image{
				width: 25rpx;
				height: 32rpx;
				margin-right: 17rpx;
			}
		}
		/deep/ .uni-searchbar {
			background-color: rgba(0,0,0,0) !important;
		}
	}

	/deep/ .page-section-spacing {
		width: 100%;
		height: 343rpx;
		.uni-swiper-dot {
			background: rgba(254, 69, 85, .5);
			
			width: 50rpx;
			height: 10rpx;
			border-radius: 30%;
		}
		.uni-swiper-dot-active {
			background: rgb(254, 69, 85);
		}
	}
	
	.tips {
		width: 668rpx;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 40rpx;
		background: #fff;
		margin: 0 auto;
		image{
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
			text{
				font-size: 36rpx;
				font-weight: normal;
			}
			.management{
				color: #A80404;
			}
			.classroom{
				color: #04A2A8;
			}

		}
	}
	
	.management-img{
		margin: 0 auto;
		width: 705rpx;
		height: 228rpx;
		border-radius: 10rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.img-tips{
			position: absolute;
			bottom: 0;
			width: 661rpx;
			padding: 0 22rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: #000000;
			opacity: 0.5;
			border-radius: 0 0 10rpx 10rpx;
			color: #fff;
			font-size: 20rpx;
		}

	}
	
	
</style>
