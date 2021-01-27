<template>
	<view class="publish-form">
		
		<view class="fl fl-nowrap al-center item">
			<text class="label">场地照片/广告位照片：</text>
			<view class="">
				126*126
			</view>
		</view>
		
		<view class="btn">
			提交
		</view>
		
		
		<customTabBar :active="1" />
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
	.publish-form{
		padding: 0 27rpx 0 17rpx;
		.item{
			margin-top: 35rpx;
			.label{
				font-size: 26rpx;
				color: #333333;
				width: 170rpx;
			}
			
		}
	
		.btn{
			margin: 257rpx auto 0 auto;
			width: 653rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: #A80404;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #FFFEFE;
		}
	}

</style>
