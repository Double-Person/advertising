import {baseUrl} from '@/api/request.js';

export const handImgUrl = (path) => {
	let isStartHttp = path.startsWith('http');
	return isStartHttp ? path : (baseUrl + path)
}

export const toIndex = () => {
	console.log('=====')
	uni.showLoading({
		title: '===='
	})
	uni.navigateTo({
		url: '/pages/mine/mine.vue',
		fail(res) {
			console.log(res)
		}
	})
}


export const redirectFn = (title) => {
	uni.showToast({ title, icon: 'none' })
	setTimeout(() => {
		uni.navigateTo({
			url: '/pages/login/login',
		})
	}, 1000)
}
