<template>
	<view class="page">
		<!-- tab切换开始 -->
		<view class="bg-set"></view>
		
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
			<view class="scroll-view-item_H" v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
				:class="navIndex==index ? 'activite' : ''" @click="checkIndex(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- tab切换结束 -->
		
		<!-- 第一个页面开始 -->
		<view class="content" v-if="navIndex==0">
			<view class="container" v-if="isSubmit===false">
				<!-- <textarea v-model="inputText" placeholder="请输入诗句..." @input="splitText"></textarea>
				<button @click="submitPoetry">提交</button> -->
				<view class="search-bar">
					<input style="backgroundColor: #fff;" v-model="inputText" type="text" placeholder="请输入诗句..." @input="splitText" />
					<button style="backgroundColor: #fff;" @click="submitPoetry">提交</button>
				</view>
			</view>
			<view class="poet-card" v-if="isSubmit===true && isColumn === false">
					<view class="imgContainer" style="width: 100%;">
						<image :src="imageUrl" mode="widthFix" class="imageAI"></image>
					</view>
					<view class="AIPoem">{{ leftColumnText }}</view>
					<view class="AIPoem">{{ rightColumnText }}</view>
					<view class="logoContainer"><view class="logo">如梦令</view></view>
			</view>
			<button class="back" v-if="isSubmit===true" @click="clear">返回</button>
		</view>
		<!-- 第一个页面结束 -->
		
		<!-- 第二个页面开始 -->
		<view class="content" v-if="navIndex==1">
			<view class="container-poem">
				<view class="upload-box">
				    <button class="upload-button" @click="chooseImage">选择图片</button>
				</view>
			</view>
			
			<view class="poem-card">
				<image :src="tempPath" mode="widthFix"></image>
				<view class="poem-container" v-for="(info,index) in poetrySwiper" :key='index'>
					<view class="poem-head">
						<view class="poem-logo">梦</view>
						<view class="AI-info">
							<view style="color: #7b7b7b;">如梦令AI</view>
							<view v-if="index == 0"  class="info-number">诗一</view>
							<view v-if="index == 1"  class="info-number">诗二</view>
							<view v-if="index == 2"  class="info-number">诗三</view>
							<view v-if="index == 3"  class="info-number">诗四</view>
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
		<!-- 第二个页面结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,//操控界面跳转
				activeNavigator: '',//tab样式改变
				leftColumnText: '',
				rightColumnText: '',
				isSubmit: false,
				imagePath:'',
				poemSubmit: false,
				tabBars: [{
					name: '诗配图',
					id: 'poem-picture'
				}, {
					name: '图配诗',
					id: 'picture-poem'
				}],
				
				// 诗配图部分使用的变量
				inputText: '', // 诗配图输入的诗文
				imagePath:'',
				imageUrl:'',
				isColumn: false,
				// 图配诗诗句
				poetrySwiper: [],
				tempPath:''
			};
		},
		methods: {
			setActiveNavigator(navigator) {
			    this.activeNavigator = navigator;
			},
			checkIndex(index) {
				console.log(index)
				this.navIndex = index;
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			splitText() {
			      const midpoint = Math.ceil(this.inputText.length / 2);
			      this.leftColumnText = this.inputText.substring(0, midpoint);
			      this.rightColumnText = this.inputText.substring(midpoint);
			},
			
			clear() {
				this.isSubmit = false;
				this.inputText = '';
			},
			
			clearPoem() {
				this.poemSubmit = false;
			},
			
			// 诗配图部分函数
			submitPoetry() {
				let that = this
				that.isSubmit = true;
				const baseUrl = 'http://www.poetryworld.cn:8198'
				uni.request({
					url: baseUrl + '/api/v1/txt2img?poem=' + that.inputText ,
					method:"GET",
					success(res) {
						console.log(res.data.img_paths[0])
						that.imagePath = res.data.img_paths[0]
						that.getImageUrl()
					}
				})
			},
			getImageUrl() {
				let that=this
				uni.request({
					url: 'http://www.poetryworld.cn:8198/api/v1/getunsplash?path=' + that.imagePath,
					method:"GET",			
					responseType: 'arraybuffer',
					success(res) {
						console.log(res, "kdkdkd")
						let datas = res.data;
						that.imageUrl = 'data:image/png;base64,'+uni.arrayBufferToBase64(datas);
						console.log(that.imageUrl)
					}
				})
			},
			// 图配诗函数
			chooseImage() {
			    const that = this;
			    uni.chooseImage({
			    	success: (chooseImageRes) => {
			    		const tempFilePaths = chooseImageRes.tempFilePaths;
						that.tempPath = tempFilePaths[0];
			    		uni.uploadFile({
			    			url: 'http://www.poetryworld.cn:8198/api/v1/img2txt', //仅为示例，非真实的接口地址
			    			filePath: tempFilePaths[0],
			    			name: 'file',
			    			formData: {
			    				'user': 'test'
			    			},
			    			success: (uploadFileRes) => {
								console.log('uploadFileRes.data打印结果',uploadFileRes.data);
								console.log('uploadFileRes.data.poems打印结果',JSON.parse(uploadFileRes.data).poems);
								that.poetrySwiper = JSON.parse(uploadFileRes.data).poems;
			    			}
			    		});
			    	}
			    });
				this.poemSubmit = true;
			}
		}
	}
</script>

<style scoped>
	/* 设置背景颜色 */
	.bg-set{
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    background-color: #f5f5f5;
	    z-index: -1;
	}
	/* 设置背景颜色结束 */
	
	/* tab导航栏开始 */
	.activite {
		color: #0a9a8d;
		font-weight: 700;
		border-bottom: 2px solid #0a9a8d;
	}

	.content {
		/* background: #008000; */
		/* height: 300px; */
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
	/* tab导航栏结束 */
	
	/* 输入诗句样式开始 */
	 .search-bar {
	    display: flex;
	    flex-direction: row;
		width: 100%;
	    padding: 10px;
	  }
	  .search-bar input {
	    flex: 1; 
	    border: 1px solid #ccc;
	    padding: 5px;
	    border-radius: 5px;
	  }
	  .search-bar button {
		font-size: 14px;
	    margin-left: 10px;
	  }
	/* 输入诗句样式结束 */
	
	/* 输入内容开始 */
	.container {
		margin: 0 auto;
		width: 90%;
		display: flex;
		padding: 5px;
	}
	/* 输入内容结束 */
	
	/* 试图卡片开始 */
	.poet-card {
		margin: 20px auto;
		padding-top: 20px;
		width: 80%;
		background-color: #fff;
		padding-bottom: 20px;
		border: 1.5px solid grey;
		border-left: 4px solid #0a9a8d;
		margin-bottom: 0;
	}
	
	.AIPoem {
		font-size: 18px;
		color: #CCCCCC;
		margin-top: 10px;
		margin-left: 13px;
	}
	
	.imgContainer {
		display: flex;
		justify-content: center;
	}
	
	.logoContainer {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
	
	.logo {
		margin-right: 20px;
		padding: 5px;
		background-color: #0a9a8d;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
	}
	
	.back::after {
		border: none;
	}
	
	.back {
		outline: none;
		background-color: transparent;
		color: #0a9a8d;
		font-size: 16px;
	}
	/* 试图卡片结束 */
	
	/* 图配诗界面开始 */
	.upload-box {
		padding: 20px;
		padding-bottom: 0;
		/* background-color: red */
	}
	
	.upload-button {
		width: 100%;
		font-size: 16px;	
		margin-bottom: 0;
		background-color: #0a9a8d;
		color: #fff;
		font-weight: 700;
	}
	
		
	.poem-card {
		/* background-color: blue; */
		padding: 10px;
		padding-top: 0;
	}
	
	swiper {
		border: 1px solid black;
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
