<template>
	<view class="fl comment">
		<image class="avatar" :src="evaluation.avatar" mode=""></image>
		<view class="content">
			<view class="over-ellipsis nickname">{{evaluation.nickname}}</view>
			<view class="info">
				{{evaluation.content}} 
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			evaluation: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment{
		margin-top: 22rpx;
	}
	.avatar{
		width: 47rpx;
		height: 47rpx;
		margin-right: 17rpx;
	}
	.content{
		font-size: 28rpx;
		.nickname{
			height: 47rpx;
			line-height: 47rpx;
			font-weight: 600;
			color: #333333;
		}
		.info {
			font-weight: 400;
			color: #333333;
			padding-bottom: 19rpx;
			border-bottom: #F1F1F1 2rpx solid;
		}
	}
</style>
