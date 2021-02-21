import {
    showLoading,
    hideLoading,
		showToast
} from './loading.js'

let baseUrl_ = ''
// #ifdef H5   
baseUrl_ = ''
// #endif

// #ifdef APP-PLUS
baseUrl_ = 'https://yflh.hkzhtech.com/housekeeper'
// #endif
export const baseUrl = baseUrl_

export const imgBaseUrl = 'https://yflh.hkzhtech.com/housekeeper/'


export const ajax = (option) => {
	if (!option.url) {
		throw new TypeError('请求地址不能为空')
		return false
	}
	return new Promise((resolve, reject) => {
		let token = null
		try {
			const value = uni.getStorageSync('HOUSE_TOKEN');
			if (value) {
				option.data.token = value
			}
		} catch (e) {

			console.log(e)
		}


		// uni.showLoading({
		// 	title: '加载中',
		// 	mask: true
		// })
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
				// 不同状态码相关提示
				switch (res.data.msgType) {
					case -1:
						showToast(res.data.returnMsg)
						break;
					case '1':
						showToast('你没有相关权限')
						break;
				}

				resolve(res.data);
			},
			fail: err => {
				showToast('请求失败，请稍后重试')
				reject(err);
			},
			complete() {
				// uni.hideLoading()
				hideLoading()
			}
		});
	})
}

