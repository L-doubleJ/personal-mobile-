<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input class="m-input" type="text" clearable focus v-model="form.username" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="form.password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator url="../reg/reg">注册账号</navigator>
            <text>|</text>
            <navigator url="../pwd/pwd">忘记密码</navigator>
        </view>
    </view>
</template>

<script>
   
    import mInput from '../../components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
              form:{username:'',password:''}
            }
        },
        methods: {
        
            bindLogin() {
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
				this.$http({
					url:'api/users/login',
					method:'POST',
					data:this.form
				}).then(res=>{
					if(res.data.success){
						sessionStorage.setItem('token',res.data.data.token);
						sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
						uni.showToast({
							title:'登录成功',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
					
				})
				
            }
        },
        onReady() {
        
        }
    }
</script>

<style>
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
</style>
