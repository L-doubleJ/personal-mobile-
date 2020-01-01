<template>
	<view class="padding">
		<view>
			<view class="text-lg">
				账号：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.username" disabled placeholder="请输入标题" @click="showtip"/>
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				昵称：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.realname" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				邮箱：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.email" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				兴趣爱好：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.hobbies" placeholder="请输入标题" />
			</view>
		</view>
		<button size="mini" type="primary" class="margin-top" @click="onSubmit">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {}
			}
		},
		onLoad(option) {
			if (option.item) {
				const item = JSON.parse(decodeURIComponent(option.item));
				this.formData = item;
			}
		},
		methods: {
			showtip(){
				uni.showToast({
					title: '账号名不能修改！',
					icon: 'none'
				})
			},
			onEdit() {
				this.$showLoading();
				this.$http({
					url: 'users/updateUserInfo',
					method: 'POST',
					data: this.formData
				}).then(res => {
					uni.$emit('meRefresh');
					uni.navigateBack();
				}).finally(() => {
					this.$hideLoading();
				})
			},
			onSubmit() {
				if (!this.formData.realname.trim()) {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					})
					return;
				}
				this.onEdit();
			}
		}
	}
</script>

<style>

</style>
