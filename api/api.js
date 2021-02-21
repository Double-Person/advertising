import { ajax, baseUrl} from "./request.js";

// 微信登陆
export const wxlogin = data => ajax({ url: '/worker/wxlogin', data, method: 'POST' });


// 这个是第一层信息获取接口
export const programme1 = data => ajax({ url: '/api/workerProgramme/programme1', data, method: 'GET' });



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
		uni.uploadFile({
			url: baseUrl + '/uploadFile/file', //仅为示例，非真实的接口地址
			filePath: option.path,
			name: option.name || 'file',
			formData: {
				// file: 'test'
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data)
				
				if(JSON.parse(uploadFileRes.data) && JSON.parse(uploadFileRes.data).state != 'success') {
					uni.showToast({ title: '图片上传失败', icon: 'none' })
					reject(uploadFileRes);
					return false;
					
				}
				uni.hideLoading()
				resolve(uploadFileRes)
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
