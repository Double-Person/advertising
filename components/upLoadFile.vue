<template>
	<view class="">
		<view @click="chooseImg" v-if="!multiple">
			<!-- 文件上传 -->
			<view class="w-h126 upload">
				<image :src="img" mode="" v-if="img" class="w-h126"></image>
				<image class="upload-img" v-if="!img" src="/static/image/upLoadFile@2x.png" mode=""></image>
			</view>
		</view>
		<!-- 上传多张 -->
		<view v-if="multiple" class="fl fl-warp jc-between">
			<!-- 文件上传 -->
			<view class="w-h126 upload m-bottom" @click="chooseImgList(-1)" v-if="list.length != max">
				<image class="upload-img" src="/static/image/upLoadFile@2x.png" mode="" ></image>
			</view>
			<image class="w-h126 m-bottom" mode="" v-for="(item, index) in list" :key="item" :src="item" @click="chooseImgList(index)"></image>
		</view>
	</view>

</template>

<script>
	import {
		upLoadFile
	} from "@/api/api.js"
	export default {
		props: {
			multiple: {
				type: Boolean,
				default: false
			},
			max: {
				type: Number,
				default: 6
			}
		},
		data() {
			return {
				img: '',
				list: []
			};
		},
		methods: {
			// 上传单张图片
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.img = tempFilePaths[0];
						upLoadFile({
							path: tempFilePaths[0]
						}).then(res => {
							this.$emit('success', res)
						})
					}
				});
			},
			// 上传 多上
			chooseImgList(index) {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						upLoadFile({
							path: tempFilePaths[0]
						}).then(res => {
							if (index == -1) {
								this.list.push(res)
							} else {
								this.list[index] = res
							}
							this.$forceUpdate()
							this.$emit('success', this.list)
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.w-h126 {
		width: 126rpx;
		height: 126rpx;
	}

	.m-bottom {
		margin-bottom: 15rpx;
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
