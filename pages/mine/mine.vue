<template>
	<view class="bg-color">
		<view class="top-Bar"></view>
		<view class="fl al-center heade-info">
			<image class="avatar" src="/static/image/tabBar/mine.png" mode=""></image>
			<view class="login-register">
				登录/注册
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
		
		<!-- <uni-popup ref="popup" type="share">
		    <uni-popup-share title="分享到" @select="select"></uni-popup-share>
		</uni-popup> -->

		<customTabBar :active="2" />
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		 components: {
		        uniPopup,
		        uniPopupMessage,
		        uniPopupDialog
		    },
		data() {
			return {
				meau: [{
						icon: require('static/image/mine/card.png'),
						title: '我的账户',
						path: '/pages/withdrawal/withdrawal'
					},
					{
						icon: require('static/image/mine/team.png'),
						title: '立即分享'
					},
				]
			}
		},
		methods: {
			toPath(url) {
				if (!url) {
					return false;
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
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
