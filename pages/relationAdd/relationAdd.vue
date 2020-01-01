<template>
	<view class="padding">
		<view>
			<view class="text-lg">
				称呼：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.name" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				姓名：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.realname" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				电话：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.phone" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				关系：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.relation" placeholder="请输入标题" />
			</view>
		</view>
		<view class="margin-top">
			<view class="text-lg">
				备注：
			</view>
			<view class="margin-top-sm bg-white padding-tb-sm radius">
				<input class="uni-input padding-lr-sm" v-model="formData.remark" placeholder="请输入标题" />
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
					name:'',
					realname:'',
					relation:'',
					phone:''
				},
				type:'add'
			}
		},
		onLoad(option){
			if(option.item){
				const item = JSON.parse(decodeURIComponent(option.item));
				this.type = 'edit';
				this.formData = item;
				uni.setNavigationBarTitle({
				    title: '编辑'
				});
			}
		},
		methods: {
			onEdit(){
				this.$showLoading();
				this.$http({
					url:'relation/update',
					method:'POST',
					data:this.formData
				}).then(res=>{
					uni.$emit('relationRefresh');
					uni.navigateBack();
				}).finally(()=>{
					this.$hideLoading();
				})
			},
			onAdd() {
				this.$showLoading();
				this.$http({
					url:'relation/add',
					method:'POST',
					data:this.formData
				}).then(res=>{
					uni.$emit('relationRefresh');
					uni.navigateBack();
				}).finally(()=>{
					this.$hideLoading();
				})
			},
			onSubmit(){
				if(this.formData.phone.length>11){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					return;
				}
				if(!this.formData.name.trim()){
					uni.showToast({
						title:'请输标题',
						icon:'none'
					})
					return;
				}
				if(!this.formData.realname.trim()){
					uni.showToast({
						title:'请选输入姓名',
						icon:'none'
					})
					return;
				}
				if(!this.formData.relation.trim()){
					uni.showToast({
						title:'请输入关系',
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
		}
	}
</script>

<style>

</style>
