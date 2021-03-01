import {
	showLoading,
	hideLoading,
	showToast
} from './loading.js'
import {
	redirectFn
} from "@/utils/utils.js"

let baseUrl_ = 'https://6161gg.hkzhtech.com'
// #ifdef H5   
baseUrl_ = 'https://6161gg.hkzhtech.com'
// #endif

// #ifdef APP-PLUS
baseUrl_ = ''
// #endif
export const baseUrl = baseUrl_




/**
 * @param { 
		url: string 请求url， required: true,
		[data: object 请求数据，default: {}] 
		[method：string 【GET, POST】请求方式，default: 'GET' ] 
		[isLogin：Boolean， 是否需要登录，default: false ]
		[showMsg： Boolean 是否显示msg消息, default: false ]
	}  
 * @return {promise}
 */

export const ajax = (option) => {
	if (!option.url) {
		throw new TypeError('请求地址不能为空')
		return false
	}
	return new Promise(async (resolve, reject) => {

		let token = null;
		try {
			const value = await uni.getStorageSync('userInfo');
			if (value) {
				token = value.userinfo.token;
			}
		} catch (e) {
			await uni.showToast({
				title: '您还未登录，请先登录',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			}, 1000)
			// await redirectFn('您还未登录，请先登录')
			return false;
		}


		await showLoading()

		await uni.request({
			url: baseUrl + option.url,
			data: option.data || {},
			method: option.method || 'GET',
			header: {
				'token': token, 
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: async (res) => {
				await hideLoading()
				// 不同状态码相关提示
				let { code, msg, data } = res.data;
				switch (code) {
					case 401:
						uni.removeStorageSync('userInfo');
						
						uni.showToast({
							title: '登录过期，请重新登录',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login',
							})
						}, 1000)
						// await redirectFn('登录过期，请重新登录')
						return false;
						break;
					case 1:
						resolve(data);
						break;
					default:
						showToast({
							title: msg || '请求失败'
						})
						resolve(res.data);
						break;
				}
				if (code != 1) {
				}
				if (code == 401) {
				}

			},
			fail: err => {
				hideLoading()
				showToast({ title: '请求失败，请稍后重试' })
				reject(err);
			},
			complete() {
				
				
			}
		});
	})
}
