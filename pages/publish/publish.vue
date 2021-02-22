<template>
	<view class="publish-form">
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">选择分类：</text>
			<!-- <input class="" maxlength="10" placeholder="最大输入长度为10" placeholder-class="placeholder-class" /> -->
			<view class="uni-input input fl jc-between al-center select" @click="selectOption">
				<text>最大输入长度为</text>
				<image src="/static/image/select.png" mode=""></image>
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写详情：</text>
			<textarea auto-height placeholder="请填写广告详情" class="textarea" placeholder-class="placeholder-class" />
		</view>
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写地址：</text>
			<input class="uni-input input" maxlength="10" placeholder="请填写地址" placeholder-class="placeholder-class" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写价格：</text>
			<input class="uni-input input" maxlength="10" placeholder="请填写价格" placeholder-class="placeholder-class" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">上传图片：</text>
			<view class="fl">
				<!-- 126*126 -->
				<up-load-file @success="success" />
				<up-load-file @success="success" style="margin-left: 48rpx;" />
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
			success() {
				
			},
			selectOption() {
				uni.showActionSheet({
				    itemList: ['A', 'B', 'C'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-form{
		background: rgb(241, 241, 241);
		.item{
			margin-bottom: 35rpx;
			padding: 0 27rpx 0 17rpx;
			width: 706rpx;
			&:first-child{
				padding-top: 35rpx;
			}
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
			input, .select{
				height: 50rpx;
				image{
					width: 30rpx;
					height: 18rpx;
				}
			}
			textarea{
				min-height: 100rpx;
				padding-top: 10rpx !important;
			}
		}
	
	
		.btn {
			margin: 257rpx auto 0 auto;
		}
		
	}

</style>
