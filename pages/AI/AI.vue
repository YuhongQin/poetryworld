<template>
	<view class="page">
		<!-- tab切换开始 -->
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
			<view class="scroll-view-item_H" v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
				:class="navIndex==index ? 'activite' : ''" @click="checkIndex(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- tab切换结束 -->
		
		<!-- 第一个页面开始 -->
		<view class="content" v-if="navIndex==0">
			<view class="container" v-if="!isSubmit">
				<!-- 诗配图输入栏 -->
				<uni-search-bar class="search-bar" bgColor="white" v-model="inputText" @confirm="submitPoetry" 
					:focus="true" placeholder="请输入诗句..." />
			</view>
			<!-- 诗配图结果展示 -->
			<view style="min-height: 100vh; display: flex; flex-direction: column;">
				<view class="poet-card" v-if="isSubmit && !isColumn">
					<view class="imgContainer">
						<image :src="imageUrl"></image>
					</view>
					<view class="AIPoem">{{ leftColumnText }}</view>
					<view class="AIPoem">{{ rightColumnText }}</view>
					<view class="logoContainer">
						<view class="logo">如梦令</view>
					</view>
				</view>
				<view v-else style="flex: 1; width: 100%;">
					<view class="poet-card" style="opacity: 0.9;">
						<view style="text-align: center; opacity: 0.8">示例</view>
						<view class="imgContainer">
							<image src="../../static/initialImgs/1.jpg"></image>
						</view>
						<view class="AIPoem">夕阳无限好</view>
						<view class="AIPoem">只是近黄昏</view>
						
						<view class="imgContainer">
							<image src="../../static/initialImgs/2.jpg"></image>
						</view>
						<view class="AIPoem">冷日樱花争竞艳</view>
						<view class="AIPoem">东风趁早作媒中</view>
						<view class="logoContainer">
							<view class="logo">如梦令</view>
						</view>
					</view>
				</view>
				<button class="back" v-if="isSubmit" @click="clear">返回</button>
			</view>
		</view>
		<!-- 第一个页面结束 -->
		
		<!-- 第二个页面：图配诗 -->
		<view class="content" v-if="navIndex==1">
			<view class="container-poem">
				<!-- 图片选择按钮 -->
				<view class="upload-box">
					<button class="upload-button" @click="chooseImage">选择图片</button>
				</view>
			</view>
			
			<!-- 图配诗结果展示 -->
			<view class="poem-card">
				<image :src="tempPath" mode="widthFix"></image>
				<view>
					<view class="poem-container" v-for="(info,index) in poetrySwiper" :key='index'>
						<view class="poem-head">
							<view class="poem-logo">梦</view>
							<view class="AI-info">
								<view style="color: #B9B177;">如梦令AI</view>
								<view v-if="index == 0" class="info-number">诗一</view>
								<view v-if="index == 1" class="info-number">诗二</view>
								<view v-if="index == 2" class="info-number">诗三</view>
								<view v-if="index == 3" class="info-number">诗四</view>
							</view>
						</view>
						<view class="poem-body">
							<view class="poem-title" style="font-weight: 700;">{{info.name}}</view>
							<view class="poem-author" style="font-size:14px; color: #7b7b7b;">{{info.author}}</view>
							<view class="poem-content" v-for="(item,i) in info.content" :key='i' style="font-size:16px; color: #7b7b7b;">
								{{item}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 第二个页面结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0, // 控制 tab 切换
				leftColumnText: '', // 左列文本
				rightColumnText: '', // 右列文本
				isSubmit: false, // 控制诗配图页面的显示
				imageUrl: '', // 图片URL
				tabBars: [{
					name: '诗配图',
					id: 'poem-picture'
				}, {
					name: '图配诗',
					id: 'picture-poem'
				}],
				inputText: '春眠不觉晓，处处闻啼鸟', // 用户输入的诗句
				isColumn: false, // 控制列布局
				poetrySwiper: [], // 图配诗返回的数据
				tempPath: '' // 临时图片路径
			};
		},
		mounted() {
					this.showExampleData();
				},
		methods: {
			showExampleData() {
							this.imageUrl = this.exampleImageUrl;
							const midpoint = Math.ceil(this.inputText.length / 2);
							this.leftColumnText = this.inputText.substring(0, midpoint);
							this.rightColumnText = this.inputText.substring(midpoint);
						},
			// 切换tab
			checkIndex(index) {
				this.navIndex = index;
			},
			// 清除输入和结果
			clear() {
				this.isSubmit = false;
				this.inputText = '';
			},
			// 诗配图提交
			submitPoetry() {
				// 分割诗句成两列
				const midpoint = Math.ceil(this.inputText.length / 2);
				this.leftColumnText = this.inputText.substring(0, midpoint);
				this.rightColumnText = this.inputText.substring(midpoint);
				this.isSubmit = true;
				
				// 请求诗配图接口
				const baseUrl = 'http://www.poetryworld.cn:8198';
				uni.request({
					url: `${baseUrl}/api/v1/txt2img?poem=${this.inputText}`,
					method: "GET",
					success: (res) => {
						this.imageUrl = res.data.img_paths[0];
						this.getImageUrl();
					}
				});
			},
			// 获取图片URL
			getImageUrl() {
				uni.request({
					url: `http://www.poetryworld.cn:8198/api/v1/getunsplash?path=${this.imageUrl}`,
					method: "GET",			
					responseType: 'arraybuffer',
					success: (res) => {
						this.imageUrl = 'data:image/png;base64,' + uni.arrayBufferToBase64(res.data);
					}
				});
			},
			// 图配诗选择图片并上传
			chooseImage() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.tempPath = tempFilePaths[0];
						uni.uploadFile({
							url: 'http://www.poetryworld.cn:8198/api/v1/img2txt',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: { 'user': 'test' },
							success: (uploadFileRes) => {
								this.poetrySwiper = JSON.parse(uploadFileRes.data).poems;
							}
						});
					}
				});
			}
		}
	}
</script>

<style scoped>
	.page {
		background-image: url('/static/AI/bg.jpg');
	}
	/* 激活的tab样式 */
	.activite {
		color: #856d72;
		font-weight: 700;
		border-bottom: 2px solid #856d72;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		color: #CCCCCC;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 11.2%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
	}
	.scroll-view-item_H:first-child {
		margin-left: 37.5%;
		margin-right: 5%;
	}
	/* 诗配图卡片 */
	.poet-card {
		margin: 20px auto;
		padding-top: 20px;
		width: 80%;
		background-color: #fff;
		padding-bottom: 20px;
		border: 1.5px solid grey;
		border-left: 4px solid #B9B177;
	}
	.AIPoem {
		font-size: 18px;
		color: black;
		margin-top: 10px;
		margin-left: 13px;
		opacity: 0.8;
	}
	.imgContainer {
		width: 300px;
		height: 200px;
		overflow: hidden;
		position: relative;
	}
	.imgContainer img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.logoContainer {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
	.logo {
		margin-right: 20px;
		padding: 5px;
		background-color: #B9B177;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
	}
	.back {
		outline: none;
		background-color: transparent;
		color: #B9B177;
		font-size: 16px;
	}
	.upload-box {
		padding: 20px;
	}
	.upload-button {
		width: 100%;
		font-size: 16px;
		background-color: #0a9a8d;
		color: #fff;
		font-weight: 700;
	}
	.poem-card {
		padding: 10px;
		flex: 1; width: 100%;
	}
	image {
		margin-top: 5%;
		margin-left: 2.5%;
		width: 95%;
	}
	.poem-container {
		padding: 10px;
	}
	.poem-head {
		display: flex;
	}
	.poem-logo {
		width: 40px; 
		height: 38px; 
		border-radius: 6px; 
		background-color: #0a9a8d;
		text-align: center;
		font-size: 25px;
		color: #fff;
		padding-top: 2px;
		margin-right: 10px;
	}
	.info-number {
		font-size: 12px; 
		color:#3c3c3c;
	}
	.poem-body {
		margin-top: 2%;
		margin-left: 11%;
		padding: 10px;
		border: 1.5px solid grey;
		border-left: 4px solid #0a9a8d;
	}
</style>
