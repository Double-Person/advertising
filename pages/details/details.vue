<template>
	<view class="bg-color details">
		<!-- 轮播 -->
		<view class="shuffling page-section-spacing">
			<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="item in 4" :key="item">
					<view class="swiper-item uni-bg-red">{{ item }}</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="warp">
			<view class="info">
				<view class="fl jc-between top">
					<text class="num">￥ 200.00</text>
					<view class="fl ">
						<image src="/static/image/point.png" mode=""></image>
						<text class="address">成都市郫都区中信大道26号</text>
					</view>
				</view>
				<view class="over-ellipsis bottom">
					啦啦啦啦啦描述详情啦啦啦啦阿拉啦.........
				</view>
			</view>
		</view>

		<view class="comments">全部评论</view>
		<view class="comments-warp">
			<view class="comments-content">
				<input class="comments-input" type="text" value="" placeholder="可填写评论..." />
				<commentsItem v-for="item in 5" :key="item" />
				
			</view>
		</view>


		<customTabBar />
	</view>
</template>

<script>
	import commentsItem from './commentsItem.vue'
	export default {
		components: {
			commentsItem
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
	.details {
		height: calc(100vh - 122rpx);
	}

	.warp {
		width: 750rpx;
		background: #FFFFFF;
		padding: 25rpx;

		.info {
			width: 700rpx;

			.top {
				margin-bottom: 22rpx;

				.num {
					font-size: 32rpx;
					font-weight: bold;
					color: #E23435;
				}

				image {
					width: 23rpx;
					height: 32rpx;
				}

				.address {
					margin-left: 12rpx;
					font-size: 20rpx;
					color: #8A8A8A;
				}
			}

			.bottom {
				font-size: 30rpx;
				color: #000000;

			}
		}
	}

	.comments {
		margin-top: 13rpx;
		width: 750rpx;
		height: 73rpx;
		line-height: 73rpx;
		text-align: center;
		background: #FFFFFF;
		
		font-size: 30rpx;
		color: #000000;
	}
	
	.comments-warp{
		width: 100%;
		padding: 18rpx 18rpx 82rpx 25rpx;
		padding-bottom: 142rpx;
		background: #fff;
		.comments-content{
			width: 706rpx;
			.comments-input{
				width: 100%;
				height: 60rpx;
				background: #F1F1F1;
				border-radius: 10rpx;
				padding-left: 23rpx;
				margin-bottom: 11rpx;
			}
		}
		
	}
</style>
