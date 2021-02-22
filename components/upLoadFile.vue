<template>
	<view @click="chooseImg">
		<!-- 文件上传 -->
		<view class="w-h126 upload">
			<image :src="img" mode="" v-if="img" class="w-h126"></image>
			<image class="upload-img" v-else src="/static/image/upLoadFile@2x.png" mode=""></image>
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
		methods: {
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
	.w-h126 {
		width: 126rpx;
		height: 126rpx;
	}

	.upload {
		background: #F6F6F6;
		text-align: center;

		.upload-img {
			margin-top: 46rpx;
			width: 36rpx;
			height: 34rpx;
			border: none;
		}
	}
</style>
