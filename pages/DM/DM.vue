<template>  
	<view>  
		<view class="bg-set">  
			<view class="DM-head">  
				<swiper circular indicator-dots :autoplay='true' :interval='3000' :duration='300'>  
					<swiper-item v-for="(item, index) in swipers" :key="index">  
						<image :src="item"></image>  
					</swiper-item>  
				</swiper>  
			</view>  
			<view class="grid-list">  
				<view class="grid-item" v-for="(item, index) in gridList" :key="index" @click="navClick(index)"  
				hover-class="click-hover"  
				hover-start-time="50"  
				hover-stay-time="100">  
					<image :src="item.url"></image>  
					<text>{{ item.text }}</text>  
				</view>  
			</view>  
		</view>  
	</view>  
</template>  

<script>  
export default {  
	components: {},  
	data() {  
		return {  
			swipers: [  
				'https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png',  
				'https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png',  
				'https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png',  
			],  
			gridList: [  
				{ url: '/static/dataMining/text.png', text: '常用字分析', badge: '0' },  
				{ url: '/static/dataMining/word.png', text: '常用词分析', badge: '1' },  
				{ url: '/static/dataMining/color.png', text: '颜色统计分析', badge: '2' },  
				{ url: '/static/dataMining/idea.png', text: '意象统计分析', badge: '3' },  
				{ url: '/static/dataMining/season.png', text: '季节统计分析', badge: '4' },  
				{ url: '/static/dataMining/network.png', text: '全朝代关系网络', badge: '5' },  
				{ url: '/static/dataMining/knowledge.png', text: '知识图谱', badge: '6' },  
				{ url: '/static/dataMining/influence.png', text: '人物影响力', badge: '7' },  
				{ url: '/static/dataMining/books.png', text: '古籍数据', badge: '8' }  
			]  
		}  
	},  
	methods: {  
		navClick(navId) {  
			switch(navId) {  
				case 0: // 常用字分析  
					uni.navigateTo({  
						url: "/pages/Text/Text",  
					});  
					break;  
				case 1: // 常用词分析  
					// Add custom navigation if needed  
					break;  
				case 2: // 颜色统计分析  
					// Add custom navigation if needed  
					break;  
				case 3: // 意象统计分析  
					// Add custom navigation if needed  
					break;  
				case 4: // 季节统计分析  
					// Add custom navigation if needed  
					break;  
				case 5: // 全朝代关系网络  
					// Add custom navigation if needed  
					break;  
				case 6: // 知识图谱  
					uni.navigateTo({  
						url: "/pages/knowledge/poetry/poetry"  
					});  
					break;  
				case 7: // 人物影响力  
					// Add custom navigation if needed  
					break;  
				case 8: // 古籍数据  
					// Add custom navigation if needed  
					break;  
				default:  
					break;  
			}  
		}  
	}  
}  
</script>  
<style lang="scss">  
	/* 设置背景颜色 */  
	.bg-set {  
	    // position: fixed;  
	    // width: 100%;  
	    // height: 100%;  
	    // top: 0;  
	    // left: 0;  
	    // background-color: #f5f5f5;  
	    // z-index: -1;  
	}  
	  
	.DM-head {  
		swiper {  
			width: 750rpx;  
			height: 370rpx;  
			image {  
				width: 100%;  
				height: 100%;  
			}  
		}  
	}  
	  
	.grid-list {  
		display: flex;  
		flex-wrap: wrap;  
		max-height: 600rpx; /* Adjust this height as needed */  
		}

	.grid-item {  
		width: 33.3%;  
		height: 140px;  
		border: 10px solid #f5f5f5;  
		display: flex;  
		flex-direction: column;  
		align-items: center;  
		justify-content: center;  
		box-sizing: border-box;  
		background-color: #fff;  
		border-radius: 30px;  
	}  

	.click-hover {  
		
	}  

	.grid-item image {  
		width: 30px;  
		height: 30px;  
	}  

	.grid-item text {  
		margin-top: 8px;  
		font-size: 14px;  
	}  
</style>