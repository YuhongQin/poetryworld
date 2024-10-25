<template>
	<view class="page">
		<!-- tab切换开始 -->
		<scroll-view class="scroll-view_H" scroll-x="true" >
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
					<view class="poet-card">
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
			<view v-if="tempPath" class="poem-card">
				<view class="imgContainer">
					<image :src="tempPath"></image>
				</view>
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
		<!-- 第三个页面开始 -->
		<view class="content" v-if="navIndex==2">
			<Sketch2poem></Sketch2poem>
		</view>
		<!-- 第三个页面结束 -->

	</view>
</template>

<script>
	import Sketch2poem from './sketch2poem.vue';
	export default {
		components:{
			Sketch2poem
		},
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
					},
					{
						name: '涂鸦配诗',
						id: 'sketch-poem'
					}
				],
				inputText: '', // 用户输入的诗句
				isColumn: false, // 控制列布局
				poetrySwiper: [], // 图配诗返回的数据
				tempPath: '' // 临时图片路径
			};
		},
		mounted() {
			this.setDefaultImageForPoetry();
		},
		methods: {
			setDefaultImageForPoetry() {
			        this.tempPath = '/static/initialImgs/default.png'; 
			
			        uni.uploadFile({
			            url: 'http://www.poetryworld.cn:8198/api/v1/img2txt',
			            filePath: this.tempPath,
			            name: 'file',
			            formData: {
			                'user': 'test'
			            },
			            success: (uploadFileRes) => {
			                this.poetrySwiper = JSON.parse(uploadFileRes.data).poems;
			            }
			        });
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
							formData: {
								'user': 'test'
							},
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
		margin-left: 20%;
		margin-right: 5%;
	}
	.scroll-view-item_H:nth-child(2) {
	    margin-left: 8%;
		margin-right: 10%;
	}

	/* 诗配图卡片 */
	.poet-card {
		margin: 20px auto;
		padding-top: 20px;
		width: 75%;
		background-color: #fff;
		padding-bottom: 20px;
		border-left: 2px  #B9B177;
		border-radius: 10px;
		opacity: 0.9;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	}

	.AIPoem {
		font-size: 18px;
		color: black;
		margin-top: 10px;
		margin-left: 13px;
		opacity: 0.8;
	}

	.imgContainer {
		margin: 0 auto;
		width: 300px;
		height: 200px;
		overflow: hidden;
		position: relative;
	}
	.imgContainer img {
		opacity: 0.8;
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
		background-color: #babaab;
		color: #fff;
		font-weight: 700;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}

	.poem-card {
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
		height: 32px;
		border-radius: 6px;
		background-color: #c4bc7d;
		text-align: center;
		font-size: 25px;
		color: #fff;
		padding-top: 2px;
		margin-right: 10px;
	}

	.info-number {
		font-size: 12px;
		color: #3c3c3c;
	}

	.poem-body {
		margin-top: 2%;
		margin-left: 11%;
		padding: 10px;
		border: 1.5px solid grey;
		border-left: 4px solid #c4bc7d;
	}
</style>