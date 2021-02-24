<template>
	<view class="bg-color details">
		<!-- 轮播 -->
		<view class="shuffling page-section-spacing">
			<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="item in info.images" :key="item">
					<view class="swiper-item uni-bg-red">
						<image :src="item" mode="" class="banner-img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="warp">
			<view class="info">
				<view class="fl jc-between top">
					<text class="num">￥ {{ info.price }}</text>
					<view class="fl ">
						<image src="/static/image/point.png" mode=""></image>
						<text class="address">{{ info.address }}</text>
					</view>
				</view>
				<view class="over-ellipsis bottom">
					{{ info.content }}
				</view>
			</view>
		</view>

		<view class="comments">全部评论</view>
		<view class="comments-warp">
			<view class="comments-content">
				<view class="fl jc-between al-center comments-content-warp">
					<input class="comments-input" type="text" v-model="content" placeholder="可填写评论..." />
					<view class="send-btn" @click="_addComment">发表</view>
				</view>
				<view v-if="info.comment && info.comment.data">
					<commentsItem v-for="item in info.comment.data" :key="item.id" :evaluation="item" />
				</view>
				
			</view>
		</view>


		<customTabBar />
	</view>
</template>

<script>
	import commentsItem from './commentsItem.vue';
	
	import { detail, addComment } from "@/api/api.js"
	export default {
		components: {
			commentsItem
		},
		data() {
			return {
				query: {
					limit: 100,
					page: 1,
					id: 1,
				},
				info: {},
				content: ''
			}
		},
		onLoad(opt) {
			this.query.id = opt.id;
			this._detail()
		},
		// onReachBottom() {
		// 	this.query.page += 1;
		// 	this._detail()
		// },
		methods: {
			_detail() {
				detail(this.query).then(res => this.info = res)
			},
			_addComment() {
				addComment({content: this.content, ad_id: this.query.id}).then((res) => {
					uni.showToast({
						title:'评价成功等待管理员审核',
						icon: 'none'
					})
					setTimeout(() => {
						this.content = ''
						this._detail()
					}, 1000)
					
				})
				
			}
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
			.comments-content-warp{
				height: 60rpx;
				margin-bottom: 11rpx;
				.comments-input{
					width: 550rpx;
					height: 60rpx;
					background: #F1F1F1;
					border-radius: 10rpx;
					padding-left: 23rpx;
				}
				.send-btn {
					width: 120rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background: #A80404;
					border-radius: 10rpx;
					font-size: 30rpx;
					color: #FFFEFE;
				}
			}
			
		}
		
	}
</style>
