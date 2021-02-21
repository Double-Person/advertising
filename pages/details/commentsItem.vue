<template>
	<view class="fl comment">
		<image class="avatar" src="/static/image/tabBar/mine.png" mode=""></image>
		<view class="content">
			<view class="over-ellipsis nickname">头像昵称名字</view>
			<view class="info">
				留言栏量阿英撒呢过个啊呜诶规划委噶忘了改哈维
				还是沟通is和人工耳输入...  
			</view>
		</view>
	</view>
</template>

<script>
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
