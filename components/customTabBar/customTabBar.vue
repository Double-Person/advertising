<template>
	<view class="fl jc-around tab-bar">
		<view class="fl fl-dir-col jc-center tab-bar-item" v-for="(item, index) in list" :key="index" @click="toPage(item, index)">
			<image v-if="active != index" :src="item.iconPath" mode=""></image>
			<image v-if="active == index" :src="item.selectedIconPath" mode=""></image>
			<text class="title" :style="{color: active == index ? selectedColor: color}">{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			active: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				"color": "#9C9C9C",
				"selectedColor": "#A80404",
				"list": [{
					"pagePath": "../../pages/index/index",
					"iconPath": require('static/image/tabBar/home.png'),
					"selectedIconPath": require("static/image/tabBar/homeSelect.png"),
					"text": "首页"
				}, {
					"pagePath": "../../pages/publish/publish",
					"iconPath": require("static/image/tabBar/puhlish.png"),
					"selectedIconPath": require("static/image/tabBar/publishSelect.png"),
					"text": "发布"
				}, {
					"pagePath": "../../pages/mine/mine",
					"iconPath": require("static/image/tabBar/mine.png"),
					"selectedIconPath": require("static/image/tabBar/mineSelect.png"),
					"text": "我的"
				}]
			}
		},
		methods: {
			toPage(item, index) {
				uni.navigateTo({
					url: item.pagePath
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 122rpx;
		background: #fff;
		box-shadow: 0rpx -4rpx 6rpx 0rpx rgba(0, 0, 0, 0.05);

		.tab-bar-item {
			flex: 1;
			text-align: center;

			image {
				width: 39rpx;
				height: 41rpx;
				margin-left: 50%;
				transform: translateX(-50%);
			}

			.title {
				text-align: center;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
			}
		}
	}
</style>
