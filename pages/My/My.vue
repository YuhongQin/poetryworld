<template>
	<view class="bg-set"></view>
	<view class="container">
		<!-- 头部开始 -->
		<navigator class="userinfo" style="background-color: rgba(255, 255, 255, 0);" url="/pages/userinfo/userinfo">
			<image class="avatar" src= "../../static/test/avatar.jpg" mode="aspectFill"></image>
			<view class="otherinfo">
				<view class="username">微信用户</view>
				<view class="edit">编辑个人资料</view>
			</view>
			<view class="arrow-right">
				<view class="arrow"></view>
			</view>
		</navigator>
		<!-- 头部结束 -->
		
		<!-- 中部读诗相关开始 -->
		<view class="read-data">
			<view class="read-item" bintap="setActive"
			hover-class="click-hover"
			hover-start-time="50"
			hover-stay-time="100">	
				<image class="icon" src="/pages/My/images/rank.png"></image>
				读诗排行榜		
			</view>
			<view class="read-item"
			hover-class="click-hover"
			hover-start-time="50"
			hover-stay-time="100">
				<image class="icon" src="/pages/My/images/time.png" mode="aspectFill"></image>阅读时长
			</view>
			<view class="read-item"
			hover-class="click-hover"
			hover-start-time="50"
			hover-stay-time="100">
				<image class="icon" src="/pages/My/images/level.png" mode="aspectFill"></image>等级
			</view>
		</view>
		<!-- 中部读诗相关结束 -->
		
		<!-- 个性推送开始 -->
		<view class="personality">
			<view class="personality-items">
				<view class="personality-item"
				hover-class="click-hover"
				hover-start-time="50"
				hover-stay-time="100">
					<view class="title">
						<image src="/pages/My/images/report.png" mode=""></image>阅读周报
					</view>
					<view class="p">本周尚未阅读</view>
				</view>
				<view class="personality-item"
				hover-class="click-hover"
				hover-start-time="50"
				hover-stay-time="100">
					<view class="title">
						<image src="/pages/My/images/personal.png" mode=""></image>个性形象
					</view>
					<view class="p">本周个性形象已更新~</view>
				</view>
			</view>
			<view class="personality-items">
				<view class="personality-item"
				hover-class="click-hover"
				hover-start-time="50"
				hover-stay-time="100">
					<view class="title">
						<image src="/pages/My/images/image.png" mode=""></image>AI图集
					</view>
					<view class="p">已收藏图片108张</view>
				</view>
				<view class="personality-item"
				hover-class="click-hover"
				hover-start-time="50"
				hover-stay-time="100">
					<view class="title">
						<image src="/pages/My/images/note.png" mode=""></image>读诗笔记
					</view>
					<view class="p">已做笔记28篇</view>
				</view>
			</view>
		</view>
		<!-- 个性推送结束 -->
		
		<!-- 尾部其它开始 -->
		<view class="bottom">
			<view class="bottom-item"
			hover-class="click-hover"
			hover-start-time="50"
			hover-stay-time="100">
				<image class="icon" src="/pages/My/images/history.png" mode="aspectFill"></image>
				我的足迹
			</view>
			<view class="bottom-item"
			hover-class="click-hover"
			hover-start-time="50"
			hover-stay-time="100">
				<image class="icon" src="/pages/My/images/aboutUs.png" mode="aspectFill"></image>
				关于我们
			</view>
		</view>
		<!-- 尾部其它结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isClick: false,
				read: [
					{title:'读诗排行榜', id: 0},
					{title:'阅读时长', id: 1},
					{title:'等级', id:'2'}
				]
			};
		},
		methods: {
			setActive() {
				this.isClick = true;
			}
		}
	}
</script>

<style lang="scss">
	/* @import '../../static/iconfonts/iconfont.wxss'; */
	.bg-set{
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    background-color: #f5f5f5;
	    z-index: -1;
	}
	
	.container {
		margin: 0 auto;
		width: 94.5%;
		height: 735px;
	}
	
	// 用户信息开始
	.userinfo {
		margin-top: 4.5%;
		width: 100%;
		height: 9.1%;
	}
	
	.avatar {
		float: left;
		height: 100%;
		width: 67.185px;
		border-radius: 50%;
	}
	
	.otherinfo {
		float: left;
		margin-left: 2%;
		// background-color: red;
	}
	
	.username {
		margin-top: 13%;
		font-size: 18px;
		font-weight: 600;
		color: black;
	}
	
	.edit {
		margin-top: 4%;
		font-size: 12px;
		color: #b4b4b6;
	}
	
	.userinfo .arrow-right {
		float: right;
		margin-top: 23px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
	}
	
	.arrow-right .arrow {
		width: 5px;
		height: 5px;
		border-top: 2px solid #ffffff;
		border-right: 2px solid #ffffff;
		transform: rotate(45deg);
		margin-top: 6px;
		margin-left: 4.5px;
	}
	// 用户信息结束
	
	// 读书数据开始
	.read-data {
		margin-top: 4%;
		width: 100%;
		height: 29.5%;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	
	.read-item {
		flex: 1;
		background-color: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: row;
		align-items: center;
		color: black;
	}
	
	.active {
		background-color: #768944;
	}
	
	.icon {
		margin-left: 12px;
		margin-right: 10px;
		width: 25px;
		height: 25px;
	}
	// 读诗数据结束
	
	//个性功能开始
	.personality {
		margin-top: 3%;
		width: 100%;
		height: 35%;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	
	.personality-items {
		flex: 1;
		display: flex;
	}
	
	.personality-items:first-child {
		margin-bottom: 3%;
	}
	
	.personality-item {
		flex: 1;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 12px;
	}
	
	.personality-item:first-child {
		margin-right: 3%;
	}
	
	.title {
		height: 52px;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: black;
	}
	
	.title image {
		width:25px;
		height: 25px;
		margin-left: 12px;
		margin-right: 10px;
	}
	
	.personality-item .p {
		margin-left: 12px;
		margin-top: -3px;
		font-size: 12px;
		color: #b4b4b6;
	}
	//个性功能结束
	
	.bottom {
		margin-top: 3%;
		width: 100%;
		height: 19.5%;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	
	.bottom-item {
		flex: 1;
		background-color: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: row;
		align-items: center;
		color: black;
	}
	
	.click-hover {
		background-color: #d0d0d0;
	}
</style>
