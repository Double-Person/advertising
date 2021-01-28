<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './style/common.scss';
	.shuffling.page-section-spacing {
			width: 100%;
			height: 343rpx;
			/deep/ .uni-swiper-dot {
				background: rgba(254, 69, 85, .5);
				
				width: 50rpx;
				height: 10rpx;
				border-radius: 30%;
			}
			.uni-swiper-dot-active {
				background: rgb(254, 69, 85);
			}
		}
</style>
