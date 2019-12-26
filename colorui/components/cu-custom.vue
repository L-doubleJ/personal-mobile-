<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action">
					<block v-if="isBack">
						<text class="cuIcon-back" @tap="BackPage"></text>
						<slot name="backText" @tap="BackPage"></slot>
					</block>
					<view class="home-icon flex align-center" v-if="isHome">
						<view class="line"></view>
						<image src="/static/icon/home.svg" @click="goHome"></image>
					</view>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isHome: {
				type: Boolean,
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			customBack: {
				type: [Boolean, String],
				default: false
			},
			customHome: {
				type: [Boolean, String],
				default: false
			}
		},
		methods: {
			BackPage() {
				if (this.customBack) {
					return this.$emit('back');
				}
				if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
					let url = '/' + __wxConfig.pages[0]
					return uni.redirectTo({
						url
					})
				}
				uni.navigateBack({
					delta: 1
				});
			},
			goHome() {
				if(this.customHome){
					return this.$emit('goHome');
				}
				uni.reLaunch({
					url: '/pages/park/park'
				});
			}
		}
	}
</script>

<style lang="less">
	.home-icon {
		.line {
			width: 3upx;
			height: 28upx;
			background-color: #ededed;
		}

		image {
			height: 65upx;
			width: 65upx;
		}
	}
</style>
