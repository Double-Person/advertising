<template>
	<view class="warp">
		<view class="bg-color">
			<view class="top-Bar"></view>
			<view class="fl al-center heade-info">
				<image class="avatar" :src="userInfo.userinfo && userInfo.userinfo.avatar || '/static/image/tabBar/mine.png'" mode=""></image>
				<view class="login-register">
				
					{{ userInfo.userinfo && userInfo.userinfo.username || '登录/注册' }}
					
				</view>
			</view>
		
			<view class="meau">
				<view v-for="(item,index) in meau" :key="index" class="fl al-center jc-between meau-item" @click="toPath(item.path)">
					<view class="icon-title">
						<image class="icon" :src="item.icon" mode=""></image>
						<text>{{item.title}}</text>
					</view>
					<image class="black" src="/static/image/mine/back.png" mode=""></image>
				</view>
			</view>
		
			<customTabBar :active="2" />
		</view> 
	
		<view class="warp-mask" @click="isShow" v-if="isShowMask">
			<image src="/static/image/mine/arrow@2x.png" mode="" class="arrow"></image>
			<view class="share-warp">
				微信分享得“优惠券”，分享人数与面额为：分享1人得10元（满100可用）。使用方法付款时，点击“我的优惠券”，点击“优惠券面额”选择大小，
				用户每次消费只能消耗一张优惠券。
			</view>
		</view>
	</view>
	
</template>

<script>
	import {getUserinfo} from "@/api/api.js"
	export default {
		
		data() {
			return {
				isShowMask: true,
				userInfo: uni.getStorageSync('userInfo') || {},
				meau: [{
						icon: require('static/image/mine/card.png'),
						title: '我的账户',
						path: '/pages/withdrawal/withdrawal'
					},
					{
						icon: require('static/image/mine/team.png'),
						title: '立即分享'
					},
					{
						icon: require('static/image/mine/team.png'),
						title: '实名认证',
						path: '/pages/uploadIDCard/uploadIDCard'
					},
					{
						icon: require('static/image/mine/coupons.png'),
						title: '优惠券',
						path: '/pages/coupons/coupons'
					},
				]
			}
		},
		onLoad() {
			this._getUserinfo()
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res);
		      console.log(res.target)
		    }
		    return {
		      title: '自定义分享标题',
		      path: '/pages/index/index?id=123'
		    }
		  },
		methods: {
			isShow() {
				this.isShowMask = false
			},
			// 获取用户所有资料
			_getUserinfo() {
				getUserinfo().then(res => {
					uni.setStorageSync('allInfo', res)
				})
			},
			toPath(url) {
				if (!url) {
					return false;
				}
				uni.navigateTo({ url })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp{
		position: relative;
	}
	.warp-mask{
		position: fixed;
		top: 0;
		z-index: 3;
		width: 100%;
		height: 100vh;
		background: #333333;
		opacity: 0.34;
		.arrow{
			position: absolute;
			right: 158rpx;
			width: 96rpx;
			height: 626rpx;
		}
		.share-warp{
			position: relative;
			top: 590rpx;
			width: 447rpx;
			height: 325rpx;
			background: rgb(166, 166, 166);
			border-radius: 50%;
			padding: 90rpx 70rpx 70rpx 70rpx;
			margin: 0 auto;
			
	
			font-size: 30rpx;
			line-height: 48rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
	.bg-color {
		height: calc(100vh - 122rpx);
	}

	.top-Bar {
		height: 154rpx;
		width: 100%;
		background: $main-theme-color;
	}

	.heade-info {
		width: 704rpx;
		height: 181rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-top: -151rpx;
		margin: -151rpx auto 20rpx auto;

		.avatar {
			width: 122rpx;
			height: 122rpx;
			border-radius: 50%;
			margin: 0 33rpx 0 29rpx;
		}

		.login-register {
			font-size: 30rpx;
			color: #212121;
		}
	}

	.meau {
		margin: 0 auto;
		width: 704rpx;
		background: #FFFFFF;
		border-radius: 20rpx;

		.meau-item {
			height: 86rpx;

			.icon-title {
				margin-left: 28rpx;

				.icon {
					width: 31rpx;
					height: 29rpx;
					margin-right: 26rpx;
				}

				.title {
					font-size: 30rpx;
					color: #212121;

				}
			}

			.black {
				width: 13rpx;
				height: 24rpx;
				margin-right: 37rpx;
			}
		}
	}
</style>
