<template>
	<view class="publish-form">
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">小区名称：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">物业名称：</text>
			<textarea auto-height placeholder="最大输入长度为10" class="textarea" />
		</view>
		
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">营业执照：</text>
			<view class="">
				126*126
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">发布者照片：</text>
			<view class="">
				126*126
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label img-label">场地照片/广告位照片：</text>
			<view class="">
				126*126
			</view>
		</view>
		
		<view class="common-btn btn">
			提交认证
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
				width: 170rpx;
			}
			.img-label {
				width: 300rpx !important;
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
		}
	}

</style>
