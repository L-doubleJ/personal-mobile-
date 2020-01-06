<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input type="text" focus clearable v-model="form.username" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="form.password" placeholder="请输入密码"></m-input>
            </view>
			<view class="input-row border">
			    <text class="title">QQ邮箱：</text>
			    <m-input type="text" v-model="form.email" placeholder="请输入qq邮箱"></m-input>
			</view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
				form:{
					username:'',
					password:'',
					email:''
				}
               
            }
        },
        methods: {
            register() {
				if(!this.form.username.trim()){
					uni.showToast({
						title:'请输账号或密码',
						icon:'none'
					})
					return;
				}
				if(!this.form.password.trim()){
					uni.showToast({
						title:'请输账号或密码',
						icon:'none'
					})
					return;
				}
				
					const reg = /^\d{5,12}@[qQ][qQ]\.(com|cn)$/;
					if(!reg.test(this.form.email)){
						uni.showToast({
							title:'请输入正确的qq邮箱',
							icon:'none'
						})
						return;
					}
				this.$http({
					url:'users/register',
					method:'POST',
					data:this.form
				}).then(res=>{
					if(res.data.success){
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 1
							});
						},1000)
						uni.showToast({
						    title: '注册成功',
							icon:'none'
						});
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
					
				})
            }
        }
    }
</script>

<style>

</style>
