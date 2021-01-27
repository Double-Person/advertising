<template>
	<view class="management-img">
		<image src="/static/image/index/classroom.png" mode=""></image>
		<view class="over-ellipsis img-tips">啦啦啦啦啦啦啦啦啦啦</view>
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
