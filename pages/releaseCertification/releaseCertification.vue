<template>
	<view class="publish-form">
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">小区名称：</text>
			<input class="uni-input input" maxlength="10" v-model="form.house_name" placeholder="请输入小区名称" placeholder-class="placeholder-class"  />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">物业名称：</text>
			<input class="uni-input input" maxlength="10" v-model="form.property_name"  placeholder="请输入物业名称" placeholder-class="placeholder-class"  />
		</view>
		
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">营业执照：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file @success="res => form.yyzz_image = res" />
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">发布者照片：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file @success="res => form.my_image = res" />
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label img-label">场地照片/广告位照片：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file @success="res => form.other_ad_image = res" />
			</view>
		</view>
		
		<view class="common-btn btn" @click="submit">
			提交认证
		</view>
		
		
		<customTabBar :active="1" />
	</view>
</template>

<script>
	import upLoadFile from '@/components/upLoadFile.vue';
	import { submitAuth } from "@/api/api.js";
	
	export default {
		components:{
			upLoadFile
		},
		data() {
			return {
				form: {
					house_name: '',  // 小区名称
					property_name: '',  // 物业名称
					yyzz_image: '',  // 营业执照
					my_image: '',  // 发布者照片
					other_ad_image: '', // 场地照片/广告位照片
				}
			}
		},
		methods: {
			submit() {
				console.log(this.form);
				let { house_name, property_name, yyzz_image, my_image, other_ad_image } = this.form;
				if(!house_name) {
					return this.showToast('请输入小区名称')
				}
				if(!property_name) {
					return this.showToast('请输入物业名称')
				}
				if(!yyzz_image) {
					return this.showToast('请上营业执照')
				}
				if(!my_image) {
					return this.showToast('请上传发布者照片')
				}
				if(!other_ad_image) {
					return this.showToast('请上传场地照片/广告位照片')
				}
				submitAuth(this.form).then(res => {
					this.showToast('提交成功')
				})
			},
			showToast(title) {
				uni.showToast({
					title, icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-form{
		padding: 0 27rpx 0 17rpx;
		background: rgb(241, 241, 241);
		.item{
			// margin-top: 35rpx;
			margin-bottom: 35rpx;
			&:first-child{
				padding-top: 35rpx;
			}
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
