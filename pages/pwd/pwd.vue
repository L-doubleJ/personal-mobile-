<template>
    <view class="content">
	 <view class="input-group">
	     <view class="input-row border">
	         <text class="title">账号：</text>
	         <m-input  v-model="form.username" placeholder="请输入账号名"></m-input>
	     </view>
	 </view>
	 <view class="margin-top">我们会发送到账号所绑定的QQ邮箱，请到邮箱查看。</view>
	 <view class="btn-row">
	     <button type="primary" class="primary" @tap="onSubmit">发送</button>
	 </view>
    </view>
</template>

<script>
  import mInput from '../../components/m-input.vue';
    export default {
        data() {
            return{
				form:{
					username:''
				}
			}
        },
		components:{
			mInput
		},
        methods: {
           onSubmit(){
			   if(!this.form.username.trim()){
			   	uni.showToast({
			   		title:'请输账号',
			   		icon:'none'
			   	})
			   	return;
			   }
			   this.$showLoading();
			   this.$http({
			   	url:'public/sendEmail',
			   	method:'POST',
			   	data:this.form
			   }).then(res=>{
				   this.$hideLoading();
				   uni.navigateBack();
			   })
		   }
        }
    }
</script>

<style>
	.container{
		position: relative;
	}
	.text{
		text-align: center;
		width: 100%;
		position: absolute;
		top: 40upx;
		left: 0;
		font-size: 18px;
	}
	image{
	 width:100%;
	}
</style>
