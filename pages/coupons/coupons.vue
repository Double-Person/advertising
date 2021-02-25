<template>
	<view class="warp">
		<view class="fl jc-between nav-bar">
			<view v-for="(item,index) in navBar" :key="index" class="nav-title" :class="activeIndex == index ? 'active' : '' " @click="clickTitle(index)">
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
	import {myCoupon} from "@/api/api.js"
	export default {
		components:{
			CouponsItem
		},
		data() {
			return {
				// -1 全部 0 未使用 1已使用 2已过期
				navBar: [{
						title: '未使用',
						value: 0
					},
					{
						title: '已使用',
						value: 1
					},
					{
						title: '已过期',
						value: 2
					}
				],
				limit: 10,
				page: 1,
				total: 0, // 总条数
				activeIndex: 0,
				list: [
					{ id: 1, money: 10, rules: 100, time: '2020-6-22',type: 'notUse' }, // 未使用
					{ id: 2, money: 10, rules: 100, time: '2020-6-22',type: 'used' },  // used
					{ id: 3, money: 10, rules: 100, time: '2020-6-22',type: 'expired' },  // expired
					{ id: 4, money: 10, rules: 100, time: '2020-6-22',type: 'expired' },  // expired
					{ id: 5, money: 10, rules: 100, time: '2020-6-22',type: 'expired' },  // expired
					{ id: 6, money: 10, rules: 100, time: '2020-6-22',type: 'expired' },  // expired
					{ id: 7, money: 10, rules: 100, time: '2020-6-22',type: 'expired' },  // expired
				]
			}
		},
		
		onReachBottom() {
			console.log('上拉刷新全局')
			
			if(this.total != this.list.length && this.total != 0) {
				this.page += 1;
				this._myCoupon()
			}
			
		},
		onLoad() {
			this._myCoupon()
		},
		
		methods: {
			// 
			clickTitle(index) {
				this.activeIndex = index;
				this.page = 1
			},
			// 获取优惠券
			_myCoupon() {
				let obj = {
					status: this.navBar[this.activeIndex].value,
					limit: this.limit,
					page: this.page
				}
				myCoupon(obj).then(res => {
					console.log(res)
					// notUse 0  used 1  expired 2
					// this.list.push()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		background: #F1F1F1;
		width: 100%;
		height: 100vh;
		.coupons-content{
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
		.nav-title{
			font-size: 28rpx;
		}
	}

	.active {
		color: rgb(224, 18, 18);
	}
</style>
