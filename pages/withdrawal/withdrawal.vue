<template>
	<view class="bg-color">
		<view class="top-Bar"></view>
		<view class="balance">

			<view class="title">账户余额</view>
			<view class="num">￥ {{ userInfo.money || 0 }}</view>
		</view>

		<view class="common-btn btn" @click="toPath">
			立即提现
		</view>



		<customTabBar :active="2" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('allInfo') || {},
			}
		},
		methods: {
			toPath() {
				uni.navigateTo({
					url: '../withdrawalHandel/withdrawalHandel?money=' + this.userInfo.money
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-color {
		height: calc(100vh - 122rpx);
	}

	.top-Bar {
		height: 154rpx;
		width: 100%;
		background: $main-theme-color;
	}

	.balance {
		width: 704rpx;
		height: 181rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: -151rpx auto 20rpx auto;
		text-align: center;

		.title {
			font-size: 30rpx;
			color: #212121;
			padding: 25rpx 0 30rpx 0;
		}
		.num {
			font-size: 40rpx;
			font-weight: bold;
			color: $main-theme-color;
		}
	}

	.btn {
		margin: 490rpx auto 0 auto;
	}
</style>
