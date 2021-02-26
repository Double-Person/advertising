<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='/static/image/tabBar/mine.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getUserPhone,
		wxLogin
	} from "@/api/api.js"
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true 记录是否第一次授权
			};
		},
		onLoad() { //默认加载
			// this.login();
			this.appLoginWx()
		},
		methods: {
			_wxLogin(info) {
				wxLogin(info).then(res => {
					uni.setStorageSync('userInfo', res)
					uni.navigateTo({
						url: '../index/index'
					})
				})
			},
			// 授权登录
			appLoginWx() {
				try{
					let userInfo = uni.getStorageSync('userInfo');
					console.log(userInfo)
					if(userInfo.openid) {
						uni.navigateTo({
							url: '../index/index'
						})
					}
				}catch(e){
					//TODO handle the exception
				}
				return false;
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (!res.provider.includes('weixin')) {
							return uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								uni.getUserInfo({
									provider: 'weixin',
									success: infoRes => {
										
										let { encryptedData, iv, signature, rawData, userInfo: { avatarUrl } } = infoRes;
										let obj = {
											code: res2.code,
											encryptedData,
											iv,
											signature,
											raw_data: rawData
										}
										this._wxLogin(obj)

									}
								});
							},
							fail: () => {
								uni.showToast({
									title: "微信登录授权失败",
									icon: "none"
								});
							}
						})
					}
				});
				//#endif
			},

			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: (res2) => {
						console.log(res2) // {errMsg: "login:ok", code: "0936Kt1w3Pv3WV2a7r3w3zOiIz16Kt1A"}
						uni.getUserInfo({
							provider: 'weixin',
							success: infoRes => {
								console.log(infoRes)
								let {
									encryptedData,
									iv,
									signature,
									rawData,
									userInfo: {
										avatarUrl
									}
								} = infoRes;
								let obj = {
									code: res2.code,
									encryptedData,
									iv,
									signature,
									raw_data: rawData
								}
								this._wxLogin(obj)

							}
						});
					},
					fail: () => {
						uni.showToast({
							title: "微信登录授权失败",
							icon: "none"
						});
					}
				})

			},

			//登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...',
					mask: true
				});
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						let code = loginRes.code;
						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									console.log(infoRes)
									//获取用户信息后向调用信息更新方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									_this.updateUserInfo(); //调用更新信息方法
								}
							});
						}

						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.request({
							url: '服务器地址',
							data: {
								code: code,
							},
							method: 'GET',
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								uni.hideLoading();
							}
						});
					},
					fail(err) {
						console.log(err)
					}
				});
			},

		},

	}
</script>

<style scoped>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
