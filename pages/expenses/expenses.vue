<template>
	<view>
		<view class="padding flex align-center">
			<view class="uni-input flex align-center">
				<input confirm-type="search" @confirm="getList" v-model="formData.keyWord" placeholder="请输入标题" />
				<view class="search padding-lr-sm" @click="getList">搜索</view>
			</view>
			<button type="primary" size="mini" @click="onAdd">新增</button>
		</view>
		<view class="text-green flex justify-end padding-right">总收入：{{gettotal}}</view>
		<view class="text-red flex justify-end padding-right">总支出：{{paytotal}}</view>
		<block v-for="item in list">
			<!-- <navigator :url="'../expensesAdd/expensesAdd?item='+encodeURIComponent(JSON.stringify(item))"> -->
			<view class="bg-white padding list-wrapper" @click="onEdit(item)">
				<view class="list-item">标题：{{item.title}}</view>
				<view class="list-item">时间：{{item.date}}</view>
				<view class="list-item" :class="[item.state=='1'?'text-green':'text-red']">类型：{{item.state=='1'?'收入':'支出'}}</view>
				<view class="list-item" :class="[item.state=='1'?'text-green':'text-red']">金额：￥{{item.money}}</view>
				<view class="list-item">备注：{{item.remark}}</view>
				<view class="list-item"> <button type="warn" size="mini" @click="onDelete(item.id)">删除</button></view>
			</view>
			<!-- </navigator> -->
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
				formData: {
					keyWord: ''
				},
				gettotal:'',
				paytotal:''
			}
		},
		onPullDownRefresh() {
			this.getList();
		},
		onLoad() {
			uni.$on('expensesRefresh', () => {
				this.getList();
			})
			this.getList();
			// this.$http()
		},
		methods: {
			onEdit(item) {
				uni.navigateTo({
					url: '../expensesAdd/expensesAdd?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			onAdd() {
				uni.navigateTo({
					url: '../expensesAdd/expensesAdd'
				})
			},
			getList() {
				this.$showLoading();
				this.$http({
					url: 'expenses/list',
					data: this.formData
				}).then(res => {
					this.list = res.data.data.data;
					     this.gettotal = res.data.data.gettotal;
					          this.paytotal = res.data.data.paytotal;
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
								url: 'expenses/delete',
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

	.list-wrapper{
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
