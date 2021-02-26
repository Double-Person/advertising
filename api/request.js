import {
	showLoading,
	hideLoading,
	showToast
} from './loading.js'
import { toIndex } from "@/utils/utils.js"

let baseUrl_ = 'https://6161gg.hkzhtech.com'
// #ifdef H5   
baseUrl_ = 'https://6161gg.hkzhtech.com'
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
	return new Promise(async (resolve, reject) => {
		
		let token = null;
		
		try {
			const value = await uni.getStorageSync('userInfo');
			console.log(value)
			if (value) {
				
				token = value.userinfo.token;
				console.log(token);
				// return false
			}
		} catch (e) {
			console.log('===', e)
			await uni.showToast({
				title: '您还未登录，请先登录',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			}, 1000)
			return false;
		}
		

		await showLoading()

		await uni.request({
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
				if(res.data.code == 401) {
					uni.showToast({
						title: '登录过期，请重新登录',
						icon: 'none'
					})
					uni.removeStorageSync('userInfo');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 1000)
					return false;
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


