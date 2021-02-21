<template>
	<view class="publish-form">
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">选择分类：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写详情：</text>
			<textarea auto-height placeholder="最大输入长度为10" class="textarea" />
		</view>
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写地址：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写价格：</text>
			<input class="uni-input input" maxlength="10" placeholder="最大输入长度为10" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">上传图片：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file />
			</view>
		</view>
		
		
		
		<view class="common-btn btn">
			立即发布
		</view>
		
		
		<customTabBar :active="1" />
	</view>
</template>

<script>
	import upLoadFile from '@/components/upLoadFile.vue'
	export default {
		components:{
			upLoadFile
		},
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
		
		.item{
			margin-top: 35rpx;
			padding: 0 27rpx 0 17rpx;
			width: 706rpx;
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
	
	
		.btn {
			margin: 257rpx auto 0 auto;
		}
		
	}

</style>
