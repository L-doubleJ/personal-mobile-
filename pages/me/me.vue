<template>
	<view>
		<view class="bg-white padding list-wrapper">
			<view class="list-item">账号：{{userInfo.username}}</view>
			<view class="list-item">昵称：{{userInfo.realname}}</view>
			<view class="list-item">邮箱：{{userInfo.email}}</view>
			<view class="list-item">兴趣爱好：{{userInfo.hobbies}}</view>

			<view class="list-item">
				<button size="mini" @click="onEdit">编辑</button>
			</view>
			<view class="list-item">
				<button type="warn" size="mini" @click="logout">注销</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			uni.$on('meRefresh', () => {
				this.getUserInfo();
			})
			this.getUserInfo()
		},
		onPullDownRefresh() {
			this.getUserInfo();
		},
		methods: {
			onEdit() {
				uni.navigateTo({
					url: '../editMe/editMe?item=' + encodeURIComponent(JSON.stringify(this.userInfo))
				})
			},
			logout() {
				sessionStorage.removeItem('token');
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			getUserInfo() {
				this.$showLoading();
				this.$http({
					url: 'users/userInfo'
				}).then(res => {
					this.userInfo = res.data.data
				}).finally(() => {
					this.$hideLoading();
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style>
	.list-item+.list-item {
		margin-top: 30upx;
	}

	.list-wrapper+.list-wrapper {
		margin-top: 20upx;
	}
</style>
