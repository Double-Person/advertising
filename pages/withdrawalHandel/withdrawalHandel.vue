<template>
	<view class="bg-color">

		<view class="balance">
			<text class="title">账户余额提现到微信</text>
			<view class="fl input">
				￥<input type="text" value="" />
			</view>
			<view class="fl jc-between bottom">
				<view class="show-money">
					账户余额：￥200.00
				</view>

				<view class="withdrawal-btn">
					全部提现
				</view>
			</view>
		</view>



		<view class="common-btn btn">
			立即提现
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	$padd-var: 30rpx;
	.bg-color {
		height: calc(100vh - 122rpx);
		padding-top: $padd-var;
	}

	.balance {
		width: 644rpx;
		padding: $padd-var;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		.title{
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			
		}
		.input{
			margin-top: 103rpx;
			border-bottom: 2rpx solid #F0F0F0;
			padding-bottom: 23rpx;
			font-size: 72rpx;
			font-weight: 500;
			input {
				margin-left: 45rpx;
			}
		}
		.bottom{
			margin: 73rpx auto 10rpx auto;
			
			.show-money{
				font-size: 28rpx;
				font-weight: 400;
				color: #7C838D;
			}
			
			.withdrawal-btn{
				font-size: 28rpx;
				font-weight: bold;
				color: #4492FF;
			}

		}
	}

	.btn {
		margin: 470rpx auto 0 auto;
	}
</style>
