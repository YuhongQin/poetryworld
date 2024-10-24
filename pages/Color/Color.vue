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
			<view class="diagram-name">{{dynasty}}-颜色使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFz" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFz" 
			class="charts" @touchend="tap"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #b0bec5">白色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFa" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFa" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #9c27b0">紫色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFb" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFb" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #f44336">红色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFc" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFc" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #4caf50">绿色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFd" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFd" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #0600ff">蓝色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFe" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFe" class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #ffd600">黄色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFf" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFf" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-<span style="font-size: 14px;
			font-weight: bold; color: #000000">黑色</span>使用占比</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFg" id="VOxWjQVBoUwbUquNTDDHhyigTdirsFFg" 
			class="charts" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"/>
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
				colorRange: [
					{ value: 0, text: "白", name:"white", whiteX: [1,2], whiteY:[], whiteData:[], color: ["#b0bec5"] },
					{ value: 1, text: "紫", name:"purple", purpleX: [3,4], purpleY:[], purpleData:[], color: ["#9c27b0"]},
					{ value: 2, text: "红", name: "red", redX: [], redY:[], redData:[], color: ["#f44336"]},
					{ value: 3, text: "绿", name: "green", greenX: [], greenY:[], greenData:[], color: ["#4caf50"]},
					{ value: 4, text: "蓝", name: "blue", blueX: [], blueY:[], blueData:[], color: ["#0600ff"] },
					{ value: 5, text: "黄", name: "yellow", yellowX: [], yellowY:[], yellowData:[], color: ["#ffd600"] },
					{ value: 6, text: "黑", name: "black", blackX: [], blackY:[], blackData:[], color: ["#000000"] },
				],
				colorData: [{"name":"白","value":50},{"name":"紫","value":30},{"name":"红","value":20},
				{"name":"绿","value":18},{"name":"蓝","value":8},{"name":"黄","value":50},{"name":"黑","value":30}],
				// 图配置
				cWidth: 750,
				cHeight: 500,
				redX: [],
				redY: [],
				redData: [],
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
			render() {
				this.getServerData()
			},
			getColorData() {
				let that=this
				const baseUrl = 'https://www.poetryworld.cn:4430'
				request({
					url: '/api/v1/colorSummary',
					method:"GET",			
					success(res) {
						
					}
				}).then((res) => {
					that.dynasty = that.range[that.dynastySelected].text
					console.log(that.dynasty,"朝代")
					console.log(res[that.dynasty][that.colorRange[1].text].summary)
					for(let i = 0 ; i < 7 ; i++) {
						that.colorData[i].value = res[that.dynasty][that.colorRange[i].text].summary
					}
					//test
					for(let i = 0 ; i < 7 ; i++) {
						// console.log("//////////////////////////////////")
						let nameX = that.colorRange[i].name+'X'
						let nameY = that.colorRange[i].name+'Y'
						// console.log(that.colorRange[i][nameX])
						that.colorRange[i][nameX] = []
						that.colorRange[i][nameY] = []
						that.colorRange[i][nameX] = Object.keys(res[that.dynasty][that.colorRange[i].text])
						that.colorRange[i][nameY] = Object.values(res[that.dynasty][that.colorRange[i].text])
						// console.log(that.colorRange[i][nameX])
						let length = that.colorRange[i][nameX].length
						let tempX = that.colorRange[i][nameX]
						let tempY = that.colorRange[i][nameY]
						let nameData = that.colorRange[i].name+'Data'
						// console.log(nameData)
						// console.log(length)
						for(let j = 1 ; j < length ; j++) {
							let temp = {
								name: "",
								value: 0,
							}
							temp.name = tempX[j]
							temp.value = tempY[j]
							that.colorRange[i][nameData][j-1] = temp
							// console.log(temp)
							// that.redData[i-1] = temp
						}
						// console.log(that.colorRange[i][nameData])
						that.colorRange[i][nameData].sort((a,b)=>{
						    //return( a[age] - b[age])
						    return( b.value - a.value)
						})
						// console.log(that.colorRange[i][nameData])
						for(let j = 0 ; j < length-1 ; j++) {
							that.colorRange[i][nameX][j] = that.colorRange[i][nameData][j].name
							that.colorRange[i][nameY][j] = that.colorRange[i][nameData][j].value
						}
						that.colorRange[i][nameX].pop()
						that.colorRange[i][nameY].pop()
					}
				})
			},
			getServerData() {
				this.getColorData()
			      //模拟从服务器获取数据时的延时
			      setTimeout(() => {
			        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			        let res = {
			          series: [
			            {
			              data: this.colorData
			            }
			          ]
			        };
					let white = {
						categories: this.colorRange[0]["whiteX"],
						series: [
						{
							name: "",
							data: this.colorRange[0]["whiteY"]
						}
						]
					};
					let purple = {
						categories: this.colorRange[1]["purpleX"],
						series: [
						{
							name: "",
							data: this.colorRange[1]["purpleY"]
						}
						]
					};
					let red = {
						categories: this.colorRange[2]["redX"],
						series: [
						{
							name: "",
							data: this.colorRange[2]["redY"]
						}
						]
					};
					let green = {
						categories: this.colorRange[3]["greenX"],
						series: [
						{
							name: "",
							data: this.colorRange[3]["greenY"]
						}
						]
					};
					let blue = {
						categories: this.colorRange[4]["blueX"],
						series: [
						{
							name: "",
							data: this.colorRange[4]["blueY"]
						}
						]
					};
					let yellow = {
						categories: this.colorRange[5]["yellowX"],
						series: [
						{
							name: "",
							data: this.colorRange[5]["yellowY"]
						}
						]
					};
					let black = {
						categories: this.colorRange[6]["blackX"],
						series: [
						{
							name: "",
							data: this.colorRange[6]["blackY"]
						}
						]
					};
			        this.drawCharts('VOxWjQVBoUwbUquNTDDHhyigTdirsFFz', res);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFa', white, 0);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFb', purple, 1);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFc', red, 2);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFd', green, 3);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFe', blue, 4);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFf', yellow, 5);
					this.drawChartsRed('VOxWjQVBoUwbUquNTDDHhyigTdirsFFg', black, 6);
			      }, 500);
			    },
			    drawCharts(id,data){
			      const ctx = uni.createCanvasContext(id, this);
			      uChartsInstance[id] = new uCharts({
			        type: "pie",
			        context: ctx,
			        width: this.cWidth,
			        height: this.cHeight,
			        series: data.series,
			        animation: true,
			        timing: "easeOut",
			        duration: 1000,
			        rotate: false,
			        rotateLock: false,
			        background: "#FFFFFF",
			        color: ["#b0bec5","#9c27b0","#f44336","#4caf50","#0600ff","#ffd600","#000000","#9A60B4","#ea7ccc"],
			        padding: [5,5,5,5],
			        fontSize: 13,
			        fontColor: "#666666",
			        dataLabel: true,
			        dataPointShape: true,
			        dataPointShapeType: "solid",
			        touchMoveLimit: 60,
			        enableScroll: false,
			        enableMarkLine: false,
			        legend: {
			          show: true,
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
			        extra: {
			          pie: {
			            activeOpacity: 0.5,
			            activeRadius: 10,
			            offsetAngle: 0,
			            labelWidth: 15,
			            border: false,
			            borderWidth: 3,
			            borderColor: "#FFFFFF",
			            customRadius: 0,
			            linearType: "none"
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
			          }
			        }
			      });
			    },
			    tap(e){
			      uChartsInstance[e.target.id].touchLegend(e);
			      uChartsInstance[e.target.id].showToolTip(e);
			    },
				//红色的柱状图
				drawChartsRed(id,data,index){
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
				        color: this.colorRange[index].color,
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
</style>
