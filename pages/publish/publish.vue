<template>
	<view class="publish-form">
		<view class="fl fl-nowrap al-center item">
			<text class="label">选择分类：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="label">填写详情：</text>
			<textarea auto-height placeholder="最大输入长度为10" class="textarea" />
		</view>
		
		<view class="fl fl-nowrap al-center item">
			<text class="label">填写地址：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="label">填写价格：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="label">上传图片：</text>
			<view class="">
				126*126
			</view>
		</view>
		
		<view class="btn">
			立即发布
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
			.input, .textarea {
				
				background: #F6F6F6;
				color: #999;
				font-size: 24rpx;
				width: 100%;
				padding: 0 15rpx;
			}
			input{
				height: 50rpx;
			}
			textarea{
				min-height: 50rpx;
				padding-top: 10rpx !important;
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
