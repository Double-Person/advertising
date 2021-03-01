<template>
	<view class="publish-form">
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">身份证正面：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file @success="res => form.id_card1 = res" />
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">身份证反面：</text>
			<view class="">
				<!-- 126*126 -->
				<up-load-file @success="res => form.id_card2 = res" />
			</view>
		</view>
		
		<view class="common-btn btn" @click="_submitCard">
			提交
		</view>
		
		
		<customTabBar :active="1" />
	</view>
</template>

<script>
	import upLoadFile from '@/components/upLoadFile.vue';
	import {submitCard} from "@/api/api.js"
	export default {
		components:{
			upLoadFile
		},
		data() {
			return {
				form: {
					id_card1: '', // 正面
					id_card2: '',//   反面
				}
					
			}
		},
		methods: {
			_submitCard() {
				if(!this.form.id_card1) {
					return uni.showToast({title:'请上传身份证正面', icon:'none'})
				}
				if(!this.form.id_card2) {
					return uni.showToast({title: '请上传身份证反面', icon:'none'})
				}
				submitCard(this.form).then(res => {
					if(res && res.code == 0) {
						return uni.showToast({title: res.msg || '提交失败', icon:'none'})
						
					}
					uni.showToast({title: '提交成功', icon:'none'})
					setTimeout(() => {
						uni.navigateTo({
							url: '../mine/mine'
						}, 2000)
					})
				})
			}
			
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
			
		}
	
		.btn{
			margin: 257rpx auto 0 auto;
		}
	}

</style>
