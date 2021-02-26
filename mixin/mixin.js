export default {
	data() {
		return {
			
		}
	},
	
	mounted() {},
	methods: {
		tts() {
			console.log('===')
		},
		// 获取位置
		getPoint() {
			// #ifdef MP-WEIXIN
			this.getLocation()
			// #endif
		
			// #ifdef H5
			this.loactionH5()
			// #endif
		},
		// 小程序获取位置
		getLocation() {
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					uni.setStorageSync('location', res);
					return res
				},
				fail() {
					uni.showToast({
						title: '定位失败，请检查是否开启定位',
						icon: 'none'
					})
				}
			});
		},
		// h5公众号定位
		loactionH5() {
			console.log('h5')
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					uni.setStorageSync('location', res);
					return res
				},
				fail(err) {
					uni.showToast({
						title: '定位失败，请检查是否开启定位',
						icon: 'none'
					})
				},
		
			});
		},
	}
}
