
let needLoadingRequestCount = 0;
let loadingTimer;
export function showLoading(title = '', mask = true) {
	if (needLoadingRequestCount === 0) {
		uni.showLoading({
			title,
			mask
		});
 
		// 最长10s自动关闭
		loadingTimer = setTimeout(() => {
			if (needLoadingRequestCount > 0) {
				uni.hideLoading();
			}
		}, 10000);
	}
 
	needLoadingRequestCount++;
}
 
// 隐藏遮罩
export function hideLoading() {
	if (needLoadingRequestCount <= 0) return;
 
	needLoadingRequestCount--;
 
	if (needLoadingRequestCount === 0) {
        loadingTimer && clearTimeout(loadingTimer);
		uni.hideLoading();
	}
}


export const showToast = (title = '系统错误') => {
	uni.showToast({
		title,
		icon: 'none'
	})
}