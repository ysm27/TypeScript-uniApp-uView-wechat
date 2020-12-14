<template>
	<view class="content">
      <image class="logo" src="../../static/logo.png"></image>
		<view>
      <text class="title">{{title}}</text>
    </view>
		<u-button type="primary">uView 按钮</u-button>
	</view>
</template>

<script lang="ts">
	import { Component,Vue ,Watch} from "vue-property-decorator";
	import commonApi from "@/global/service/commonService";

	@Component({}) //必须

	export default class Index extends Vue {
		onShow() {
			let param = {}
			commonApi.updateUser( param ).then(res => {
				console.log(res)
			})
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
