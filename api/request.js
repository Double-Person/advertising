import {
	showLoading,
	hideLoading,
	showToast
} from './loading.js'
import { toIndex } from "@/utils/utils.js"

let baseUrl_ = 'http://6161gg.hkzhtech.com'
// #ifdef H5   
baseUrl_ = 'http://6161gg.hkzhtech.com'
// #endif

// #ifdef APP-PLUS
baseUrl_ = ''
// #endif
export const baseUrl = baseUrl_



export const ajax = (option) => {
	if (!option.url) {
		throw new TypeError('请求地址不能为空')
		return false
	}
	return new Promise((resolve, reject) => {
		if (option.isLogin) {
			console.log('需要登录')
			// toIndex()
			// return false
		} else {
			console.log('不需要登录')
		}
		let token = null;
		token = '328b0858-aa1a-409c-a7e5-89f45495229d'
		// try {
		// 	const value = uni.getStorageSync('HOUSE_TOKEN');
		// 	if (value) {
		// 		option.data.token = value
		// 	}
		// } catch (e) {
		// }

		showLoading()

		uni.request({
			url: baseUrl + option.url,
			data: option.data || {},
			method: option.method || 'GET',
			header: {
				'token': token, // option.headerType ||    option.headerType ? option.headerType :   'Bearer ' + 
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				// console.log(res)
				// 不同状态码相关提示
				if (res.data.code != 1) {
					showToast({
						title: res.data.msg || '请求失败'
					})
				}
				resolve(res.data.data);
			},
			fail: err => {
				showToast({
					title: '请求失败，请稍后重试'
				})
				reject(err);
			},
			complete() {
				hideLoading()
			}
		});
	})
}


