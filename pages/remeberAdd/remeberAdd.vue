<template>
	<view class="padding">
		<view>
			<view class="text-lg">
				标题：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.title" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				时间：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<picker mode="date" @change="timeChange">
					<view class="input padding-lr-sm">{{formData.date?formData.date:'请选择日期'}}</view>
				</picker>
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				类型：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<picker @change="stateChange" :value="index" :range="stateArr">
					<view class="input padding-lr-sm">{{stateArr[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				备注：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius" style="max-height: 300upx;">
				<textarea  class="uni-input padding-lr-sm" v-model="formData.remark" placeholder="请输入备注"/>
			</view>
		</view>
		<button size="mini" type="primary" class="margin-top" @click="onSubmit">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{
					remark:'',
					title:'',
					date:''
				},
				stateArr:['重要（高）','一般（中）','次要（低）'],
				index:2,
				type:'add'
			}
		},
		onLoad(option){
			if(option.item){
				const item = JSON.parse(decodeURIComponent(option.item));
				this.type = 'edit';
				this.formData = item;
				this.index = item.state - 1;
				uni.setNavigationBarTitle({
				    title: '编辑'
				});
			}
		},
		methods: {
			onEdit(){
				this.$showLoading();
				this.formData.state = this.index + 1 +'';
				this.$http({
					url:'remeber/update',
					method:'POST',
					data:this.formData
				}).then(res=>{
					uni.$emit('remeberRefresh');
					uni.navigateBack();
				}).finally(()=>{
					this.$hideLoading();
				})
			},
			onAdd() {
				this.formData.state = this.index + 1 +'';
				this.$showLoading();
				this.$http({
					url:'remeber/add',
					method:'POST',
					data:this.formData
				}).then(res=>{
					uni.$emit('remeberRefresh');
					uni.navigateBack();
				}).finally(()=>{
					this.$hideLoading();
				})
			},
			onSubmit(){
				if(!this.formData.title.trim()){
					uni.showToast({
						title:'请输标题',
						icon:'none'
					})
					return;
				}
				if(!this.formData.date.trim()){
					uni.showToast({
						title:'请选择时间',
						icon:'none'
					})
					return;
				}
				if(!this.formData.remark.trim()){
					uni.showToast({
						title:'请输入备注',
						icon:'none'
					})
					return;
				}
				if(this.type =='add'){
					this.onAdd();
				}else{
					this.onEdit();
				}
			},
			timeChange(e) {
				this.formData.date = e.detail.value
			},
			stateChange(e) {
				this.index= e.detail.value
			}
		}
	}
</script>

<style>

</style>
