import { ajax, baseUrl} from "./request.js";


// GET 广告类别列表 /api/ad/ad_type
export const adType = data => ajax({ url: '/api/ad/ad_type', data, method: 'GET' });


// GET 轮播图列表 /api/slide/lists
export const lists = data => ajax({ url: '/api/slide/lists', data, method: 'GET' });

// GET 首页协议 /api/index/xieyi
export const xieyi = data => ajax({ url: '/api/index/xieyi', data, method: 'GET' });

// GET 首页公告 /api/index/ad
export const announcement = data => ajax({ url: '/api/index/ad', data, method: 'GET' });

// GET 首页搜索 /api/index/search
export const search = data => ajax({ url: '/api/index/search', data, method: 'GET' });


// GET 广告列表 /api/ad/index
export const announcementList = data => ajax({ url: '/api/ad/index', data, method: 'GET' });

// GET 广告详情页和评价列表 /api/ad/detail
export const detail = data => ajax({ url: '/api/ad/detail', data, method: 'GET' });

// GET 评价广告 /api/ad/add_comment
export const addComment = data => ajax({ url: '/api/ad/add_comment', data, method: 'GET', isLogin: true });

// GET 发布广告 /api/ad/add_ad
export const add_ad = data => ajax({ url: '/api/ad/add_ad', data, method: 'GET', isLogin: true });

export const upLoadFile = (option) => {
	if(!option.path) {
		throw new TypeError('文件上传路径不能为空')
	}
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '上传中',
			icon: 'loading',
			mask: true
		})
		let token = null;
		token = '328b0858-aa1a-409c-a7e5-89f45495229d'
		// try {
		// 	const value = uni.getStorageSync('HOUSE_TOKEN');
		// 	if (value) {
		// 		option.data.token = value
		// 	}
		// } catch (e) {
		// }
		uni.uploadFile({
			url: baseUrl + '/api/common/upload', //仅为示例，非真实的接口地址
			filePath: option.path,
			name: option.name || 'file',
			formData: {
				token: token,
				// file: 'test'
			},
			
			success: (uploadFileRes) => {
				
				let res = JSON.parse(uploadFileRes.data)
				console.log(res)
				if(res.code != 1) {
					uni.showToast({ title: res.data.msg|| '图片上传失败', icon: 'none' })
					reject(res.data);
					return false;
				}
				uni.hideLoading()
				resolve(res.data.fullurl)
			},
			fail: err => {
				uni.hideLoading();
				uni.showToast({
					title: '上传失败，请重新上传',
					icon: 'none'
				})
				reject(err)
			}
		});
	})
	
}
