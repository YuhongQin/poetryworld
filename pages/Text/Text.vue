<template>
	<view class="bg-set">
		<!-- 头部开始（搜索&复选框）-->
		<view class="poet-head">	
			<view class="poet-title" style="font-size: 40rpx ; margin: 20rpx 16rpx">朝代选择</view>
			
			<view class="select" style="margin: 0 auto; width: 96%;">
			      <uni-data-select
			        v-model="dynastySelected"
			        :localdata="range"
			        @change="getPoetData()"
			      ></uni-data-select>
			</view>
		</view>
		<!-- 内容0 头部内容结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dynastySelected: 0,
				range: [
				  { value: 0, text: "先秦" },
				  { value: 1, text: "汉" },
				  { value: 2, text: "魏晋" },
				  { value: 3, text: "南北朝" },
				  { value: 4, text: "隋" },
				  { value: 5, text: "唐" },
				  { value: 6, text: "宋" },
				  { value: 7, text: "辽" },
				  { value: 8, text: "金" },
				  { value: 9, text: "元" },
				  { value: 10, text: "明" },
				  { value: 11, text: "清" },
				  { value: 12, text: "汇总" },
				],
			};
		},
		methods: {
			navBack() {
				uni.navigateBack({
				});
			}
		}
	}
</script>

<style lang="scss">
	.bg-set{
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    background-color: #f5f5f5;
	    z-index: -1;
	}
	/* 搜索样式 */
	search-bar {
	  display: flex;
	  flex-direction: row;
	  padding: 10px;	margin-bottom: -10px;
	}
	.search-bar input {
	  flex: 1; 
	  border: 1px solid #ccc;
	  padding: 5px;
	  border-radius: 5px;
	}
	.search-bar button {	font-size: 14px;
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
</style>
