<template>
	<view class="notUse">
		<!-- 未使用 -->
		<image class="bg" :src="info.type =='notUse' ? '/static/image/coupons/notUseBg.png' : '/static/image/coupons/otherBg.png' " mode=""></image>
		<view class="fl jc-between al-center info">
			<view class="left">
				<view class="">
					<text class="symbol">￥</text>
					<text class="money">{{info.money}}</text>
				</view>
				<view class="rules">满{{ info.rules }}元可用</view>
			</view>
			<view class="center">
				<image class="coupons-title" src="/static/image/coupons/coupons.png" mode=""></image>
				<view class="time">
					{{ info.time }}过期
				</view>
			</view>
			<view class="right">
				<!-- 未使用 -->
				<view class="logo" v-if="info.type == 'notUse' "></view>
				<!-- 已使用 -->
				<image class="logo" v-if="info.type == 'used' " src="/static/image/coupons/usedLogo.png" mode=""></image>
				<!-- 已过期 -->
				<image class="logo" v-if="info.type == 'expired' " src="/static/image/coupons/expiredLogo.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			info: {
				type: Object,
				require: true
			}
		},
		
	}
</script>

<style scoped lang="scss">
	
	.info{
		position: absolute;
		top: 27rpx;
		left: 15rpx;
		right: 20rpx;
		bottom: 34rpx;
		.left{
			color: #fff;
			.symbol{
				font-size: 37rpx;
				font-weight: normal;
			}
			.money{
				font-size: 44rpx;
				font-weight: normal;
			}
			.rules{
				// font-size: 28rpx;
				font-size: 24rpx;
				font-weight: normal;
				color: #FEFEFE;

			}
		}
		
		.center{
			margin-top: 7rpx;
			.coupons-title{
				width: 105rpx;
				height: 33rpx;
			}
			.time{
				margin-top: 26rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
			}
		}
		
		.right{
			margin-top: 10rpx;
			.logo{
				width: 113rpx;
				height: 85rpx;
			}
		}
	}
	
	.notUse{
		width: 680rpx;
		height: 159rpx;
		margin-top: 15rpx;
		position: relative;
		.bg{
			width: 100%;
			height: 100%;
		}
		
	}
</style>
