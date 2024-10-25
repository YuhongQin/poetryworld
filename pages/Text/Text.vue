<template>
	<view class="bg">
		<view class="season-head">
			<view class="poet-title" style="font-size: 40rpx ; margin: 20rpx 16rpx">朝代选择</view>
			<view class="select" style="margin: 0 auto; width: 96%;">
			      <uni-data-select
			        v-model="dynastySelected"
			        :localdata="range"
			        @change="render()"
			      ></uni-data-select>
			</view>
		</view>
		<view class="card">
			<view class="diagram-name">常用字 <span style="color:#0a9a8d; font-size: 16px;"> top10 </span> 统计</view>
			<view class="card-divider"></view>
			<canvas canvas-id="QnTVHFAOYayYRmZaIApnvfRhggLwukSp" id="QnTVHFAOYayYRmZaIApnvfRhggLwukSp" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name" style="margin-bottom: 10px;">{{dynasty}}-常用字统计表</view>
			<view class="subName" style="display: flex;">
				<p style="flex: 1;font-size: 12px; text-align: center;">常用字TOP100</p>
				<p style="flex: 1; font-size: 12px; text-align: center;">常用字频率</p>
			</view>
			<view  v-for="(item,index) in charData"  :key='index' class="content">
				<view style="display: flex; margin-top: 10px">
					<p style="flex: 1;font-size: 12px; text-align: center;">{{item.char}}</p>
					<p style="flex: 1; font-size: 12px; text-align: center;">{{item.weight}}</p>
				</view>
				<view class="card-divider"></view>
			</view>
			<view class="buttonContainer" style="display: flex;">
				<button @click="prevPage">上一页</button>
				<button @click="nextPage">下一页</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	import request from '../../utils/request';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				dynastySelected: 0,
				dynasty: '汇总',
				range: [
					{ value: 0, text: "汇总" },
					{ value: 1, text: "先秦"},
					{ value: 2, text: "汉" },
					{ value: 3, text: "魏晋" },
					{ value: 4, text: "南北朝" },
					{ value: 5, text: "隋" },
					{ value: 6, text: "唐" },
					{ value: 7, text: "宋" },
					{ value: 8, text: "辽" },
					{ value: 9, text: "金" },
					{ value: 10, text: "元" },
					{ value: 11, text: "明" },
					{ value: 12, text: "清" },
				],
				charArray: [],
				charX:[],
				charY:[],
				charData: [],
				page: 0,
				//图标的配置数据
				cWidth: 750,
				cHeight: 500
			};
		},
		onReady() {
		  //这里的 750 对应 css .charts 的 width
		  this.cWidth = uni.upx2px(750);
		  //这里的 500 对应 css .charts 的 height
		  this.cHeight = uni.upx2px(500);
		  this.getServerData();
		},
		methods: {
			clear() {
				this.charArray = []
				this.charX = []
				this.charY = []
				this.page = 0
			},
			render() {
				console.log("in render");
				this.getServerData();
			},
			getCharData() {
				this.clear()
				let that=this
				const baseUrl = 'https://www.poetryworld.cn:4430'
				request({
					url: '/api/v1/charSummary',
					method:"GET",			
					
				}).then((res) => {
					that.dynasty = that.range[that.dynastySelected].text
					// console.log(dynasty,"朝代")
					let temp = Object.keys(res[that.dynasty])
					let objArray = []
					for(let i = 0 ; i < temp.length ; i++) {
						let obj = {
							char: "一",
							weight: "1",
						}
						obj.char = temp[i]
						obj.weight = res[that.dynasty][temp[i]][that.dynasty]
						objArray.push(obj)
					}
					objArray.sort((a,b)=>{
					    //return( a[age] - b[age])
					    return( b.weight - a.weight)
					})
					that.charArray = objArray
					for(let i = 0 ; i < 10 ; i++) {
						that.charX.push(objArray[i].char)
						that.charY.push(objArray[i].weight.toFixed(8))
					}
					for(let i = that.page ; i < that.page+10 ; i++) {
						let j = i-that.page
						that.charData[j] = that.charArray[i] 
					}
					console.log(that.charX)
					console.log(that.charY)
				})
				// this.getFormData()
			},
			nextPage() {
				if(this.page >= 9) {
					uni.showToast({
						title: '已经是最后一页~',
						icon: 'none',
						duration: 2000
					})
				}
				else {
					this.page += 1
					console.log(this.page,"page")
					this.getFormData()
				}
			},
			prevPage() {
				if(this.page <= 0) {
					uni.showToast({
						title: '已经是第一页~',
						icon: 'none',
						duration: 2000
					})
				}
				else {
					this.page -= 1
					this.getFormData()
				}
			},
			getFormData() {
				console.log("into Function Form")
				for(let i = this.page*10 ; i < this.page*10+10 ; i++) {
					let j = i-this.page*10
					this.charData[j] = this.charArray[i] 
				}
				console.log(this.charData,"charData")
			},
			getServerData() {
				this.getCharData()
			      //模拟从服务器获取数据时的延时
			      setTimeout(() => {
			        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			        let res = {
			            categories: this.charX,
			            series: [
			              {
			                name: "常用字使用频率",
			                data: this.charY
			              }
			            ]
			          };
			        this.drawCharts('QnTVHFAOYayYRmZaIApnvfRhggLwukSp', res);
			      }, 500);
			    },
			    drawCharts(id,data){
			      const ctx = uni.createCanvasContext(id, this);
			      uChartsInstance[id] = new uCharts({
			        type: "column",
			        context: ctx,
			        width: this.cWidth,
			        height: this.cHeight,
			        categories: data.categories,
			        series: data.series,
			        animation: true,
			        timing: "easeOut",
			        duration: 1000,
			        rotate: false,
			        rotateLock: false,
			        background: "#FFFFFF",
			        color: ["#0a9a8d"],
			        padding: [15,15,0,5],
			        fontSize: 13,
			        fontColor: "#666666",
			        dataLabel: true,
			        dataPointShape: true,
			        dataPointShapeType: "solid",
			        touchMoveLimit: 60,
			        enableScroll: true,
			        enableMarkLine: false,
			        legend: {
			          show: false,
			          position: "bottom",
			          float: "center",
			          padding: 5,
			          margin: 5,
			          backgroundColor: "rgba(0,0,0,0)",
			          borderColor: "rgba(0,0,0,0)",
			          borderWidth: 0,
			          fontSize: 13,
			          fontColor: "#666666",
			          lineHeight: 11,
			          hiddenColor: "#CECECE",
			          itemGap: 10
			        },
			        xAxis: {
			          disableGrid: true,
			          disabled: false,
			          axisLine: true,
			          axisLineColor: "#CCCCCC",
			          calibration: false,
			          fontColor: "#666666",
			          fontSize: 13,
			          lineHeight: 20,
			          marginTop: 0,
			          rotateLabel: false,
			          rotateAngle: 45,
			          itemCount: 5,
			          boundaryGap: "center",
			          splitNumber: 5,
			          gridColor: "#CCCCCC",
			          gridType: "solid",
			          dashLength: 4,
			          gridEval: 1,
			          scrollShow: false,
			          scrollAlign: "left",
			          scrollColor: "#A6A6A6",
			          scrollBackgroundColor: "#EFEBEF",
			          title: "",
			          titleFontSize: 13,
			          titleOffsetY: 0,
			          titleOffsetX: 0,
			          titleFontColor: "#666666",
			          formatter: ""
			        },
			        yAxis: {
			          data: [
			            {
			              min: 0
			            }
			          ],
			          disabled: false,
			          disableGrid: false,
			          splitNumber: 5,
			          gridType: "solid",
			          dashLength: 8,
			          gridColor: "#CCCCCC",
			          padding: 10,
			          showTitle: false
			        },
			        extra: {
			          column: {
			            type: "group",
			            width: 30,
			            activeBgColor: "#000000",
			            activeBgOpacity: 0.08,
			            seriesGap: 2,
			            categoryGap: 3,
			            barBorderCircle: false,
			            linearType: "none",
			            linearOpacity: 1,
			            colorStop: 0,
			            meterBorder: 1,
			            meterFillColor: "#FFFFFF",
			            labelPosition: "outside"
			          },
			          tooltip: {
			            showBox: true,
			            showArrow: true,
			            showCategory: false,
			            borderWidth: 0,
			            borderRadius: 0,
			            borderColor: "#000000",
			            borderOpacity: 0.7,
			            bgColor: "#000000",
			            bgOpacity: 0.7,
			            gridType: "solid",
			            dashLength: 4,
			            gridColor: "#CCCCCC",
			            boxPadding: 3,
			            fontSize: 13,
			            lineHeight: 20,
			            fontColor: "#FFFFFF",
			            legendShow: true,
			            legendShape: "auto",
			            splitLine: true,
			            horizentalLine: false,
			            xAxisLabel: false,
			            yAxisLabel: false,
			            labelBgColor: "#FFFFFF",
			            labelBgOpacity: 0.7,
			            labelFontColor: "#666666"
			          },
			          markLine: {
			            type: "solid",
			            dashLength: 4,
			            data: []
			          }
			        }
			      });
			    },
			    touchstart(e){
			      uChartsInstance[e.target.id].scrollStart(e);
			    },
			    touchmove(e){
			      uChartsInstance[e.target.id].scroll(e);
			    },
			    touchend(e){
			      uChartsInstance[e.target.id].scrollEnd(e);
			      uChartsInstance[e.target.id].touchLegend(e);
			      uChartsInstance[e.target.id].showToolTip(e);
			    }
		}
	}
</script>

<style scoped>
	.bg {
		padding-bottom: 10px;
	}
	.charts{
		flex: 1;
		width: 750rpx;
		height: 500rpx;
	}
	
	.card {
		flex: 1;
		margin: 20rpx 12rpx;
		padding: 10rpx;
	/* 	height: 300rpx; */
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	
	.diagram-name {
		font-size: 14px;
		font-weight: bold;
	}
	
	.card-divider {
		height: 1px;
		background-color: #ccc;
		margin: 5px 0;
	}
	.charts{
	  width: 750rpx;
	  height: 500rpx;
	}
	button {
		margin-right: 12rpx;
		flex: 1;
		font-size: 12px;
		background-color: #fff;
		width: 20px;
	}
</style>
