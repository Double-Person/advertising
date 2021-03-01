<template>
	<view class="bg-color">

		<view class="balance">
			<text class="title">账户余额提现到微信</text>
			<view class="fl input">
				<text>￥</text><input type="number" v-model.number="form.money" />
			</view>
			<view class="fl jc-between al-center bottom">
				<view class="show-money">
					账户余额：￥{{ money }}
				</view>

				<view class="withdrawal-btn" @click="allWithdrawal">
					全部提现
				</view>
			</view>
		</view>

		<view class="">
			<view class="fl fl-nowrap al-center item">
				<text class="common-form-label label">提现到：</text>
				<view class="uni-input input fl jc-between al-center select" @click="selectOption">
					<text>{{ form.type }}</text>
					<image src="/static/image/select.png" mode=""></image>
				</view>
			</view>

			<view class="fl fl-nowrap al-center item" v-if="checkType == 2">
				<text class="common-form-label label">银行名称：</text>
				<input :maxlength="100" class="uni-input input" placeholder="请填写银行名称" placeholder-class="placeholder-class" v-model="form.bank_name" />
			</view>

			<view class="fl fl-nowrap al-center item">
				<text class="common-form-label label">账号：</text>
				<input :maxlength="100" class="uni-input input" placeholder="请填写账号" placeholder-class="placeholder-class" v-model="form.account" />
			</view>
			<view class="fl fl-nowrap al-center item">
				<text class="common-form-label label">姓名：</text>
				<input :maxlength="100" class="uni-input input" placeholder="请填写姓名" placeholder-class="placeholder-class" v-model="form.name" />
			</view>

		</view>



		<view class="common-btn btn" @click="withdrawal">
			立即提现
		</view>
	</view>
</template>

<script>
	import {
		withdraw
	} from "@/api/api.js"
	export default {
		data() {
			return {
				money: 0,
				list: [{
						title: '支付宝',
						type: 1
					},
					{
						title: '银行卡',
						type: 2
					},
				],
				checkType: 1,
				form: {
					money: '', // 金额
					account: '', // 账号
					name: '', // 姓名
					type: '支付宝', // 类型  默认支付宝
					bank_name: '', // 银行名称

				}
			}
		},
		onLoad(opt) {
			this.money = opt.money
		},
		methods: {
			// 全部提现
			allWithdrawal() {
				this.form.money = this.money * 1
			},
			// 提现
			withdrawal() {

				if (this.form.money == '' || this.form.money == 0) {
					return this.showToast('请输入正确提现金额')
				}
				if (this.checkType == 1) { // 支付宝
					this.form.bank_name = ''
				} else if (this.checkType == 2) { // 银行卡
					if (!this.form.bank_name.trim()) {
						return this.showToast('请输入银行名称')
					}
				}
				if (!this.form.account.trim()) {
					return this.showToast('请输入账号')
				}
				if (!this.form.name.trim()) {
					return this.showToast('请输入姓名')
				}
				if (this.form.money * 1 > this.money * 1 || this.money * 1 == 0) {
					return this.showToast('用户余额不足')
				}
				withdraw(this.form).then(res => {
					if (res.code == 0) {
						return this.showToast(res.msg || '提现失败')
					}
					this.showToast(res.msg || '提现成功');
					setTimeout(() => {
						uni.navigateTo({
							url: '../mine/mine'
						})
					}, 2000)

				})
			},
			selectOption() {
				uni.showActionSheet({
					itemList: this.list.map(ele => ele.title),
					success: (res) => {
						let {
							title,
							type
						} = this.list[res.tapIndex];
						this.checkType = type
						this.form.type = title
					},

				});
			},
			showToast(title = '请完善信息') {
				uni.showToast({
					title,
					icon: 'none'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	$padd-var: 30rpx;

	.bg-color {
		height: calc(100vh - 122rpx);
		padding-top: $padd-var;
	}

	.balance {
		width: 644rpx;
		padding: $padd-var;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;

		.title {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;

		}

		.input {
			margin-top: 103rpx;
			border-bottom: 2rpx solid #F0F0F0;
			padding-bottom: 23rpx;
			font-size: 72rpx;
			font-weight: 500;

			input {
				margin-left: 15rpx;
				margin-top: 34rpx;
				font-size: 45rpx;
			}
		}

		.bottom {
			margin: 73rpx auto 10rpx auto;

			.show-money {
				font-size: 28rpx;
				font-weight: 400;
				color: #7C838D;
			}

			.withdrawal-btn {
				font-size: 28rpx;
				font-weight: bold;
				color: #4492FF;
			}

		}
	}

	.item {
		margin-bottom: 35rpx;
		padding: 0 27rpx 0 17rpx;
		width: 706rpx;

		&:first-child {
			padding-top: 35rpx;
		}

		.label {
			font-size: 26rpx;
			color: #333333;
			width: 170rpx;
		}

		.input,
		.textarea {

			background: #F6F6F6;
			color: #999;
			font-size: 24rpx;
			width: 100%;
			padding: 0 15rpx;
		}

		input,
		.select {
			height: 50rpx;

			image {
				width: 30rpx;
				height: 18rpx;
			}
		}

		textarea {
			min-height: 100rpx;
			padding-top: 10rpx !important;
		}
	}


	.btn {
		margin: 70rpx auto 0 auto;
	}
</style>
