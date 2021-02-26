<template>
	<view class="warp">
		<view class="fl jc-between nav-bar">
			<view v-for="(item,index) in navBar" :key="index" class="nav-title" :class="activeIndex == index ? 'active' : '' "
			 @click="clickTitle(index)">
				{{ item.title }}
			</view>
		</view>
		<view class="coupons-content">
			<CouponsItem v-for="item in list" :key="item.id" :info="item" />
		</view>
	</view>
</template>

<script>
	import CouponsItem from './couponsItem.vue';
	import {
		myCoupon
	} from "@/api/api.js"
	export default {
		components: {
			CouponsItem
		},
		data() {
			return {
				// -1 全部 0 未使用 1已使用 2已过期
				navBar: [{
						title: '未使用',
						value: 0,
						symbols: 'notUse'
					},
					{
						title: '已使用',
						value: 1,
						symbols: 'used'
					},
					{
						title: '已过期',
						value: 2,
						symbols: 'expired'
					}
				],
				limit: 10,
				page: 1,
				last_page: 0, // 总页数
				activeIndex: 0,
				list: [
					// { id: 1, money: 10, rules: 100, time: '2020-6-22',type: 'notUse' }, // 未使用
					// { id: 2, money: 10, rules: 100, time: '2020-6-22',type: 'used' },  // used
					// { id: 3, money: 10, rules: 100, time: '2020-6-22',type: 'expired' },  // expired
				]
			}
		},

		onReachBottom() {
			if (this.last_page == this.page) {
				return uni.showToast({
					title: '暂无更多数据',
					icon: 'none'
				})
			}
			this.page += 1;
			this._myCoupon()
		},
		onLoad() {
			this._myCoupon()
		},

		methods: {
			// 
			clickTitle(index) {
				this.activeIndex = index;
				this.page = 1;
				this.list = []
				this._myCoupon()
			},
			// 获取优惠券
			_myCoupon() {
				let obj = {
					status: this.navBar[this.activeIndex].value,
					limit: this.limit,
					page: this.page
				}
				myCoupon(obj).then(res => {
					let {
						last_page,
						data
					} = res;
					this.last_page = last_page
					if (data.length === 0) {
						return uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
					}
					let list = this.handData(data)

					this.list.push(...list)
				})
			},
			handData(list) {
				let data = list.map(item => {
					return {
						id: item.id,
						money: item.money,
						rules: item.use_min_price,
						money: item.coupon_price,
						time: item.end_time,
						type: this.navBar[this.activeIndex].symbols
					}
				})
				return data
			},

		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		background: #F1F1F1;
		width: 100%;
		height: 100vh;

		.coupons-content {
			width: 680rpx;

			margin: 0 auto;
		}
	}

	.nav-bar {
		height: 83rpx;
		line-height: 83rpx;
		// width: 100%;
		background: #fff;
		padding: 0 37rpx;

		.nav-title {
			font-size: 28rpx;
		}
	}

	.active {
		color: rgb(224, 18, 18);
	}
</style>
