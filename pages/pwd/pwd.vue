<template>
    <view class="container">
	  <image src="/static/img/pwd.jpg" mode="widthFix"></image>
	  <view class="text">请联系管理员</view>
    </view>
</template>

<script>
  
    export default {
        data() {
            return{}
        },
        methods: {
           
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
