<template>
	<view class="list">
		<view class="avatar">
			<text class="text">头像</text>
			<view>
				<img src="../../static/test/avatar.jpg" class="img">
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>用户名</text>
			<view>				
				<text>zach764945</text>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>性别</text>
			<view>
				<text>男</text>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>我的幸运日</text>
			<view>
				<text>完善信息</text>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>关联手机</text>
			<view>
				<text>131****0650</text>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>收货地址</text>
			<view>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>账号管理</text>
			<view>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="item">
			<text>协议与说明</text>
			<view>
				<img src="./images/arrow.png" alt="" class="arrow">
			</view>
		</view>
	</view>
	<button class="button" style='font-size: 11pt !important;'>退出登录</button>
</template>

<script>
</script>

<style>
	page {
		height: 100%;
		background-color: #F4F4F4;
	}
	.list {
	  margin: 0 auto;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  width: 90%;
	  height: 60%;
	  padding:30rpx 25rpx;
	  background-color: #fff;
	  margin-top: 20rpx;
	  border-radius: 10rpx;
	}

	.avatar {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin: 30rpx 0;
	}
	
	.avatar .text {
		height: 70rpx;
		font-size: 30rpx;
		color: #656565;
		line-height: 70rpx;;
	}
	
	.container {
		height: 100%;
	}
	.arrow {
		/* float: right; */
		margin-top: 5rpx;
		width: 60rpx;
		height: 60rpx;
		margin: 0 -13rpx;
		vertical-align: middle;
	}
	
	.avatar .img{
		width: 60rpx;
		height: 60rpx;
		border: 5rpx solid #0a9a8d;
		border-radius: 30px;
		vertical-align: middle;
	}
	
/* 	.avatar::after {
		content:"123";
		float:right;
	} */
	
	
	.item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
        padding-left: 10rpx;
	    font-size: 30rpx;
		color: #656565;
	}
	.button {
		margin-top: 230rpx;
		width: 95%;
		color: #fff;
		border-radius: 50rpx;
		background-color: #0a9a8d;
	}
</style>
