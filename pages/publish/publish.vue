<template>
	<view class="publish-form">
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">选择分类：</text>
			<!-- <input class="" maxlength="10" placeholder="最大输入长度为10" placeholder-class="placeholder-class" /> -->
			<view class="uni-input input fl jc-between al-center select" @click="selectOption">
				<text>{{ checkText }}</text>
				<image src="/static/image/select.png" mode=""></image>
			</view>
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写详情：</text>
			<textarea :maxlength="100" auto-height placeholder="请填写广告详情" class="textarea" placeholder-class="placeholder-class" v-model="form.content" />
		</view>
		
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写地址：</text>
			<input :maxlength="100" class="uni-input input" maxlength="10" placeholder="请填写地址" placeholder-class="placeholder-class" v-model="form.address" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">填写价格：</text>
			<input :maxlength="100" class="uni-input input" maxlength="10" placeholder="请填写价格" placeholder-class="placeholder-class" v-model.number="form.price" />
		</view>
		<view class="fl fl-nowrap al-center item">
			<text class="common-form-label label">上传图片：</text>
			<up-load-file @success="success" multiple :max="6" />
		</view>
		
		
		
		<view class="common-btn btn" @click="_add_ad">
			立即发布
		</view>
		
		
		<customTabBar :active="1" />
	</view>
</template>

<script>
	import upLoadFile from '@/components/upLoadFile.vue';
	
	import { adType, add_ad } from "@/api/api.js"
	
	import mixin from "@/mixin/mixin.js"
	export default {
		components:{
			upLoadFile
		},
		mixins: [mixin],
		data() {
			return {
				checkText: '请选择分类',
				imgs: [],
				// 分类列表
				list: [],
				form: {
					type_id: '',
					content: '',
					images: '',
					price: '',
					address: '',
					lng: '',
					lat: '' // location
				}
			}
		},
		onLoad() {
			this._adType();
			
			try{
				let point = uni.getStorageSync('location');
				this.form.lng = point.longitude;
				this.form.lat = point.latitude;
			}catch(e){
				//TODO handle the exception
			}
		},
		methods: {
			// 文件上传
			success(imgs) {
				this.imgs = imgs;
				this.form.images = imgs.join(',')
			},
			// 发布广告
			async _add_ad() {
				if(!this.form.lat) {
					await uni.showToast({
						title: '请打开手机定位',
						icon: 'none'
					})
					await this.getPoint();
					
					try{
						let location = await uni.getStorageSync('location');
						this.form.lng = location.longitude;
						this.form.lat = location.latitude;
					}catch(e){
						await uni.showToast({
							title: '请打开手机定位',
							icon: 'none'
						})
					}
					return false
				}
				
				if(this.form.type_id == '' || this.form.type_id == undefined) {
					return uni.showToast({ title: '请选择分类', icon: 'none' })
				}
				if(!this.form.content) {
					return uni.showToast({ title: '请输入详情', icon: 'none' })
				}
				if(!this.form.address) {
					return uni.showToast({ title: '请输入地址', icon: 'none' })
				}
				if(!this.form.price) {
					return uni.showToast({ title: '请输入价格', icon: 'none' })
				}
				
				if(this.imgs.length === 0) {
					return uni.showToast({ title: '请上传图片', icon: 'none' })
				}
				
				await add_ad(this.form).then(res => {
					uni.showToast({
						title: res.msg || '请求失败',
						icon: 'none'
					})
				})
			},
			// 获取分类列表
			_adType() {
				adType().then(res => this.list = res)
			},
			// 分类选择
			selectOption() {
				uni.showActionSheet({
				    itemList: this.list.map(ele => ele.name),
				    success: (res) => {
						let { id, name } = this.list[res.tapIndex];
						this.checkText = name;
						this.form.type_id = id
				    },
				  
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-form{
		background: rgb(241, 241, 241);
		.item{
			margin-bottom: 35rpx;
			padding: 0 27rpx 0 17rpx;
			width: 706rpx;
			&:first-child{
				padding-top: 35rpx;
			}
			.label{
				font-size: 26rpx;
				color: #333333;
				width: 170rpx;
			}
			.input, .textarea {
				
				background: #F6F6F6;
				color: #999;
				font-size: 24rpx;
				width: 100%;
				padding: 0 15rpx;
			}
			input, .select{
				height: 50rpx;
				image{
					width: 30rpx;
					height: 18rpx;
				}
			}
			textarea{
				min-height: 100rpx;
				padding-top: 10rpx !important;
			}
		}
	
	
		.btn {
			margin: 257rpx auto 0 auto;
		}
		
	}

</style>
