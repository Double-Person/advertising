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

