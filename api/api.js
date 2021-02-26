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

// GET 首页广告列表 /api/index/index
export const indexList = data => ajax({ url: '/api/index/index', data, method: 'GET' });


// GET 广告列表 /api/ad/index
export const announcementList = data => ajax({ url: '/api/ad/index', data, method: 'GET' });

// GET 广告详情页和评价列表 /api/ad/detail
export const detail = data => ajax({ url: '/api/ad/detail', data, method: 'GET' });

// GET 评价广告 /api/ad/add_comment
export const addComment = data => ajax({ url: '/api/ad/add_comment', data, method: 'GET', isLogin: true });

// GET 发布广告 /api/ad/add_ad
export const add_ad = data => ajax({ url: '/api/ad/add_ad', data, method: 'GET', isLogin: true });

// GET 提交认证 /api/user/submit_auth
export const submitAuth = data => ajax({ url: '/api/user/submit_auth', data, method: 'GET', isLogin: true });

// GET 获取我的优惠券 /api/coupon/my_coupon
export const myCoupon = data => ajax({ url: '/api/coupon/my_coupon', data, method: 'GET', isLogin: true });

// GET 获取小程序手机号 /api/user/get_user_phone
export const getUserPhone = data => ajax({ url: '/api/user/get_user_phone', data, method: 'GET' });

// GET 小程序授权登录 /api/user/wx_login
export const wxLogin = data => ajax({ url: '/api/user/wx_login', data, method: 'GET' });

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
		
		try {
			const value = uni.getStorageSync('userInfo');
			if (value) {
				token = value.userinfo.token;
			}
		} catch (e) {
			uni.showToast({
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
