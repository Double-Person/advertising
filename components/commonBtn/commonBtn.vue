<template>
	<view class="btn">
		{{ title }}
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '提交'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.btn{
	/*  */
	// margin: 0 auto;
	width: 653rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background: $main-theme-color;
	border-radius: 10rpx;
	font-size: 30rpx;
	color: #FFFEFE;
}
</style>
