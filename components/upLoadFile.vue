<template>
	<view @click="chooseImg">
		<!-- 文件上传 -->
		<image :src="img" mode="" v-if="img" class="img"></image>
		<view class="" v-else>
			文件上传
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: ''
			};
		},
		methods:{
			chooseImg() {
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
								this.img = tempFilePaths[0];
								this.$emit('success', 'success')
								return false;
				        uni.uploadFile({
				            url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
												
				            }
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.img{
	width: 126rpx;
	height: 126rpx;
}
</style>
