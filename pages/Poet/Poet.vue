<template>
	<!-- 所有内容开始 -->
	<view class="bg-set">
		<!-- tab切换开始 -->
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
			<view class="scroll-view-item_H" v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
				:class="navIndex==index ? 'activite' : ''" @click="checkIndex(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- tab切换结束 -->
		
		<!-- 内容切换开始 -->
		<!-- 内容0开始 -->
		<view class="content" v-if="navIndex==0">
			<!-- 头部开始（搜索&复选框）-->
			<view class="poet-head">	
				
			<uni-search-bar 
			bgColor="white" @confirm="getPoetData" 
			:focus="true" v-model="searchValuePoet"
				@cancel="onCancelPoetSearch" @clear="onClearPoetSearch" placeholder="请输入诗人名称">
			</uni-search-bar>
			

		
				<!-- < <view class="search-bar">
					<input class="search-button" type="text" placeholder="请输入诗人名称" @input="onSearchPoet" />
					<button class="search-button" @click="getPoetData">搜索</button>
				</view> > -->
				
				<view style="display: flex; align-items: center; font-size: 30rpx; margin: 16rpx 18rpx; justify-content: space-between;">
				  <view style="font-weight: bold; text-shadow: rgba(0, 0, 0, 0.15) 0.95px 0.95px 1.6px;">朝代选择</view>
				  <view class="uni-select" style="flex-grow: 1; margin-left: 10rpx; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;">
				    <uni-data-select
				      v-model="dynastySelected"
				      :localdata="range"
				      @change="getPoetData"
				      :clear="false"
				    ></uni-data-select>
				  </view>
				</view>


			</view>
			<!-- 内容0 头部内容结束 -->
			
			<!-- 内容0 body部分开始 -->
			<view class="poet-body">
				<view v-for="(item,index) in poetData"  :key="index" class="container" >
					<view class="card">
						<view class="poet-name">{{item.name}}</view>
						<view class="card-divider"></view>
						<view class="poet-bd">【生卒】{{item.year}}</view>
						<view class="intro">【简介】 {{item.intro}}</view>
						<view class="card-actions">
							<button @click="showPoetData(index)" style="text-align:left; color: #fff; margin-top: 10px; padding: 0px; padding-left: 10px;backgroundColor: #bbb5ac; border-radius: 4px; font-size: 26rpx">详细介绍</button>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 内容0 body部分结束 -->
			<view class="BtnContainer" v-if="btnShow === true">
				<button class="PrevBtn" @click="prevPage">上一页</button>
				<button class="NextBtn" @click="nextPage">下一页</button>
			</view>
		</view>
		<!-- 内容0结束 -->
	
		<!-- 内容1开始 -->	
		<view class="content" v-if="navIndex==1">
			<!-- 内容1 头部开始 -->
			<view class="poet-head">	
				<!-- <view class="search-bar">
					<input style="backgroundColor: #fff;" type="text" placeholder="请输入诗词名称" @input="onSearch" />
					<button style="backgroundColor: #fff;" @click="getSearchPoemData">搜索</button>
				</view> -->
				<uni-search-bar
				bgColor="white" @confirm="getSearchPoemData" 
				:focus="true" v-model="searchValuePoem"
					@cancel="onCancelPoetSearch" @clear="onClearPoetSearch" placeholder="请输入诗词名称">
				</uni-search-bar>
				
				<!-- <view class="poet-title" style="font-size: 40rpx ; margin: 20rpx 16rpx">体裁选择</view>
				<!-- 下拉选择框开始 -->
				<!-- <view class="select" style="margin: 0 auto; width: 96%;">
				      <uni-data-select
				        v-model="genreSelected"
				        :localdata="rangePoem"
				        @change="getPoemData()"
				      ></uni-data-select>
				</view> --> 
				<view style="display: flex; align-items: center; font-size: 30rpx; margin: 16rpx 18rpx; justify-content: space-between;">
				  <view style="font-weight: bold; text-shadow: rgba(0, 0, 0, 0.15) 0.95px 0.95px 1.6px;">体裁选择</view>
				  <view class="uni-select" style="flex-grow: 1; margin-left: 10rpx; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;">
				    <uni-data-select
				      v-model="genreSelected"
				      :localdata="range"
				      @change="getPoemData"
				      :clear="false"
				    ></uni-data-select>
				  </view>
				</view>
				<!-- 下拉选择框结束 -->	
			</view>
			<!-- 内容1 头部结束 -->
			<!-- body start -->
			<view class="poet-body">
				<!-- test -->
				<view v-for="(item,index) in poemData"  :key='index' class="container" >
					<view class="card">
						<view class="poem-name">{{item.title}}({{item.PoetName}},{{item.PoetDynasty}})</view>
						<view class="card-divider"></view>
						<view class="poem-genre">{{item.labels}}</view>
						<view class="poem-content">{{item.content}}</view>
					</view>
				</view>
				<!-- testend -->
			</view>
			<!-- body end -->
			<view class="BtnContainer" v-if="btnShowPoem">
				<button class="PrevBtn" @click="prevPagePoem">上一页</button>
				<button class="NextBtn" @click="nextPagePoem">下一页</button>
			</view>
		</view>
	<!-- 内容1结束 -->

	
	</view>

</template>

<script>
	import request from '../../utils/request.js';
	export default {
		data() {
			return {
				navIndex: 0,
				tabBars: [{
					name: '诗人',
					id: 'guanzhu'
				}, {
					name: '诗词',
					id: 'tuijian'
				}],
				// 诗人部分数据
				// 下拉选择框的数据
				dynastySelected: 0,
				range: [
				  { value: 0, text: "全部" },
				  { value: 1, text: "先秦" },
				  { value: 2, text: "秦" },
				  { value: 3, text: "汉" },
				  { value: 4, text: "魏晋" },
				  { value: 5, text: "南北朝" },
				  { value: 6, text: "隋" },
				  { value: 7, text: "唐" },
				  { value: 8, text: "宋" },
				  { value: 9, text: "辽" },
				  { value: 10, text: "金" },
				  { value: 11, text: "元" },
				  { value: 12, text: "明" },
				  { value: 13, text: "清" },
				],
				curPage: 1,
				// 下拉选择框数据结束
				poetData: [
					{
						poetId: 0,
						name: '',
						year: '',
						intro: '',
					}
				],
				searchValuePoet:'',
				isPressPoet: false,
				// 诗人部分数据结束
				// 诗词部分数据
				genreSelected: 0,
				btnShow: true,
				rangePoem: [
				  { value: 0, text: "全部" },
				  { value: 1, text: "闺怨" },
				  { value: 2, text: "送别" },
				  { value: 3, text: "怀人" },
				  { value: 4, text: "悼亡" },
				  { value: 5, text: "战争" },
				  { value: 6, text: "山水" },
				  { value: 7, text: "思乡" },
				  { value: 8, text: "咏物" },
				  { value: 9, text: "田园" },
				  { value: 10, text: "怀古" },
				  { value: 11, text: "流泪" },
				  { value: 12, text: "愁绪" },
				  { value: 13, text: "哀伤" },
				  { value: 14, text: "喜悦" },
				  { value: 15, text: "孤独" },
				  { value: 16, text: "失意" },
				  { value: 17, text: "思念" },
				  { value: 18, text: "恐惧" },
				  { value: 19, text: "惊讶" },
				  { value: 20, text: "想家" },
				  { value: 21, text: "愤怒" },
				  { value: 22, text: "怨恨" },
				],
			    poemData: [
					{
						title: '',
						PoetName: '',
						PoetDynasty: '',
						content: '',
						labels: '',
					}
				],
				isPress: false,
				curPagePoem: 1,
				//诗词搜索部分
				searchValuePoem: '',
				btnShowPoem: true,
				// 诗词部分结束
				activeNavigator: 'poet',
				
			}
		},
		mounted() {
			this.getPoetData()
			this.getPoemData()
		},
		methods: {
			showPoetData(index) {
				uni.navigateTo({
					url: `/pages/PoetInfo/PoetInfo?PoetID=${index}&Data=` + encodeURIComponent(JSON.stringify(this.poetData))
				})
			},
			// 导航栏部分
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
			
			// Poet部分
			onSearchPoet(res) {
				this.searchValuePoet = res.detail.value;
				console.log(this.searchValuePoet);
			},
			getPoetData() {
				this.curPage = 1;
				this.render();
			},
			onCancelPoetSearch() {
			      this.searchValuePoet = '';
				  this.render();
			    },
			onClearPoetSearch() {
			      this.searchValuePoet = '';
				  this.render();
			    },
			prevPage() {
				if(this.curPage > 1) {
					this.curPage = this.curPage-1;
				}
				else {
					uni.showToast({
						title: '已经是第一页~',
						icon: 'none',
						duration: 2000
					})
				}
				this.render();
			},
			nextPage() {
				this.curPage = this.curPage+1;
				this.isPressPoet = true;
				this.render();
			},
			render() {
				const baseUrl = 'http://www.poetryworld.cn:8198'
				request({
					url: '/api/v1/searchPoetData',
					method:"POST",
					data: {
						name: this.searchValuePoet,
						dynasty: this.range[this.dynastySelected].text,
						page: this.curPage,
						limit: 6,
						computePageNum: true,
					},					
					success:(res) => {
						
					}//success
				}).then((res) => {
					const data = (res[0]);
					if(data.length != 0) {
						console.log(data)
						console.log(this.range[this.dynastySelected].text)
						console.log("testPoet")
						this.isPressPoet = false;
						this.poetData=[]
						this.btnShow = true
						for (const p of data) {
						this.poetData.push({
							poetId: p[0],
							name: p[1],
							year: p[2].length === 0 ? '不详' : p[2],
							intro: p[3].length === 0 ? '暂无' : p[3],
						})
						}	
					}
					else {
						if(this.searchValuePoet == '') {
							if(this.isPressPoet == true) {
								uni.showToast({
									title: '已经是最后一页~',
									icon: 'none',
									duration: 2000
								})
							}
							else {
								this.poetData = [];
								this.btnShow = false;
								uni.showToast({
									title: '没有匹配结果',
									icon: 'none',
									duration: 2000
								})
							}
						}
						else {
							if(this.isPressPoet == true) {
								uni.showToast({
									title: '已经是最后一页~',
									icon: 'none',
									duration: 2000
								})
							}
							else {
								uni.showToast({
									title: '没有匹配结果',
									icon: 'none',
									duration: 2000
								})
							}
						}
					}
				})//request
			},//render
			
			// Poem部分
			getPoemData() {
				this.curPagePoem = 1;
				this.renderSearchPoem();
			},
			prevPagePoem() {
				if(this.curPagePoem > 1) {
					this.curPagePoem = this.curPagePoem-1;
				}
				else {
					uni.showToast({
						title: '已经是第一页~',
						icon: 'none',
						duration: 2000
					})
				}
				this.renderSearchPoem();
			},
			nextPagePoem() {
				this.curPagePoem = this.curPagePoem+1;
				this.isPress = true;
				this.renderSearchPoem();
			},
			//Poem搜索部分
			onSearch(res) {
				this.searchValuePoem = res.detail.value;
				console.log(this.searchValuePoem)
			},
			onCancelPoemSearch() {
			      this.searchValuePoem = '';
				  this.render();
			    },
			onClearPoemSearch() {
			      this.searchValuePoem = '';
				  this.render();
			    },
			getSearchPoemData() {
				this.curPagePoem = 1
				this.renderSearchPoem()
			},
			
			renderSearchPoem() {
				const baseUrl = 'http://www.poetryworld.cn:8198'
				request({
					url: '/api/v1/poetry/catalog/search',
					method:"POST",
					data: {
					    search: this.searchValuePoem,
					    label: this.rangePoem[this.genreSelected].text,
					    searchType: 1,
					    page: this.curPagePoem,
					    limit: 6,
					    computePageNum: true,
					},
					
				}).then((res) => {
						const data = res[0]
						if(data.length != 0) {
							console.log(data)
							this.isPress = false
							this.poemData=[]
							this.btnShow = true
							for (const p of data) {
								this.poemData.push({
									title: p[0],
									PoetName: p[1],
									PoetDynasty: p[2],
									content: p[3],
									labels: p[4],
								})
							}
						}
						else {
							if(this.searchValuePoem == '') {
								this.poetData = [];
								this.btnShowPoem = false;
								uni.showToast({
									title: '没有匹配结果',
									icon: 'none',
									duration: 2000
								})
							}
							else {
								if(this.isPress == true) {
									uni.showToast({
										title: '已经是最后一页~',
										icon: 'none',
										duration: 2000
									})
								}
								else {
									uni.showToast({
										title: '没有匹配结果',
										icon: 'none',
										duration: 2000
									})
								}
							}
						}
					})
			}
		}
	}
</script>

<style scoped>
	/* 设置背景颜色 */
	.bg-set{
	    width: 100%;
	    height: 100%;
	    /*background-color: #f5f5f5;*/
		background-image: url('/static/Poet/bg.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.activite {
		color: #856d72;
		font-weight: 700;
		border-bottom: 2px solid #856d72;
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
		width: 10%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
	}
	
	.scroll-view-item_H:first-child {
		margin-left: 37.5%;
		margin-right: 5%;
	}

	/* 搜索样式 */
	 .search-bar {
	    display: flex;
	    flex-direction: row;
	    padding: 10px;
		margin-bottom: -10px;
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
	/* 搜索样式结束 */
	/* 下拉栏开始 */

	/* 下拉栏结束 */
	.poet-head {
		height: 16%;
		width: 100%;
		border-color: red;
	}
	
	label {
		flex: 1;
		font-size: 32rpx;
	}
	checkbox-group {
		display: flex;
	}
	checkbox {
		transform: scale(0.7);
	}
	
	/* poet-body */
	.container {
		display: flex;
	}
	.card {
		flex: 1;
		margin: 20rpx 12rpx;
		padding: 10rpx;
/* 		height: 300rpx; */
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	
	.poet-name {
		font-size: 14px;
		font-weight: bold;
	}
	
	.card-divider {
		height: 1px;
		background-color: #ccc;
		margin: 5px 0;
	}
	
	.poet-bd {
		color: #666;
		font-size: 12px;
	}
	.intro {
		width: 100%;
	    /* 超过了就隐藏 */
	    overflow: hidden;
		/* 超过了就显示省略号 */
	    text-overflow: ellipsis;
		/* webkit内核的浏览器 */
	    display: -webkit-box;
	    -webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		color: #666;
		font-size: 12px;
	}
	.card-actions {
		font-size: 14px;
		margin-top: 6rpx;
		text-align: right;
	}

	.poem-name {
		font-size: 14px;
		font-weight: bold;		
	}
	
	.poem-genre {
		color: #666;
		font-size: 12px;
		margin-top: 5px;
		margin-bottom: 10px;
	}
	
	.poem-content {
		width: 100%;
		color: #666;
		font-size: 12px;
	}
	
	/* 按钮样式 */
	.BtnContainer {
		margin: 0 auto;
		width: 50%;
		display: flex;
		padding-bottom: 10px;
	}
	
	.PrevBtn {
		flex:1;
		margin-left: 12rpx;
		margin-right: 50px;
		font-size: 12px;
		background-color: #fff;
	}
	
	.NextBtn {
		margin-right: 12rpx;
		flex: 1;
		font-size: 12px;
		background-color: #fff;
	}
	
	.uni-select {
		background-color: #f99;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	}
	.search-button {
	  background-color: #fff;
	  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	}
	
	.search-button:hover {
	  /* 鼠标悬停时的效果，可以加深阴影或改变颜色 */
	  box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 4px;
	}

</style>