<template>
	<view>
		<view class="padding flex align-center">
			<view class="uni-input flex align-center">
				<input confirm-type="search" v-model="formData.keyWord" @confirm="getList" placeholder="请输入姓名或称呼" />
				<view class="search padding-lr-sm" @click="getList">搜索</view>
			</view>
			<button type="primary" size="mini" @click="onAdd">新增</button>
		</view>

		<block v-for="item in list">
			<view class="bg-white padding list-wrapper" :key="item.id" @click="onEdit(item)">
				<view class="list-item">称呼：{{item.name}}</view>
				<view class="list-item">姓名：{{item.realname}}</view>
				
				<view class="list-item">电话：{{item.phone}}</view>
				<view class="list-item">关系：{{item.relation}}</view>
				<view class="list-item">备注：{{item.remark}}</view>
				<view class="list-item"> <button type="warn" size="mini" @click="onDelete(item.id)">删除</button></view>
			</view>

		</block>
		<view class="margin-top-xl padding flex justify-center text-lg text-grey" v-if="list==false">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				formData:{
					keyWord:''
				}
			}
		},
		onPullDownRefresh() {
			this.getList();
		},
		onLoad() {
			uni.$on('relationRefresh', () => {
				this.getList();
			})
			this.getList();
			// this.$http()
		},
		methods: {
			onEdit(item) {
				uni.navigateTo({
					url: '../relationAdd/relationAdd?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			onAdd(){
				uni.navigateTo({
					url: '../relationAdd/relationAdd'
				})
			},
			getList() {
				this.$showLoading();
				this.$http({
					url: 'relation/list',
					data:this.formData
				}).then(res => {
					this.list = res.data.data
				}).finally(() => {
					this.$hideLoading();
					uni.stopPullDownRefresh();
				})
			},
			onDelete(id) {
				uni.showModal({
					title: '提示',
					content: '是否确定删除',
					success: (res) => {
						if (res.confirm) {
							this.$http({
								url: 'relation/delete',
								method: 'DELETE',
								data: {
									id
								}
							}).then(res => {
								this.getList();
							});
						}
					}
				});
				// this.$http({
				// 	url: 'expenses/list',
				// 	method:'DELETE'
				// }).then(res => {
				// 	this.list = res.data.data
				// })
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

	.uni-input {
		padding-right: 100upx;
		position: relative;
		padding-left: 30upx;
		border: 1px solid rgb(15, 174, 255);
		height: 60upx;
		width: 80%;
		border-radius: 50upx;
	}

	.search {
		border-radius: 0 30upx 30upx 0;
		border-left: 1px solid rgb(15, 174, 255);
		line-height: 58upx;
		position: absolute;
		right: 0;
		color: white;
		background-color: rgb(15, 174, 255);
	}

	.search:active {
		background-color: rgba(15, 174, 255, .6);
	}
</style>
