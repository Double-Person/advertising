<template>
	<view class="publish-form">
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">场地照片/广告位照片：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file />
			</view>
		</view>
		
		<view class="common-btn btn">
			提交
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
		padding: 0 27rpx 0 17rpx;
		.item{
			margin-top: 35rpx;
			.label{
				width: 300rpx;
			}
			
		}
	
		.btn{
			margin: 257rpx auto 0 auto;
		}
	}

</style>
