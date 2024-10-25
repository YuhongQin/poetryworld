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
			<view class="diagram-name">{{dynasty}}-季节统计</view>
			<view class="card-divider"></view>
			<canvas canvas-id="VMxhkxTgpiTCnjYzoCiIKStiRSwhJsVI" id="VMxhkxTgpiTCnjYzoCiIKStiRSwhJsVI" class="charts" @touchend="tap"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-节气统计</view>
			<view class="card-divider"></view>
			<canvas canvas-id="KReAZdJmWCjyYmfJGIXBsIHcYLbNaAeU" id="KReAZdJmWCjyYmfJGIXBsIHcYLbNaAeU" class="charts" @touchend="tap"/>
		</view>
		<view class="card">
			<view class="diagram-name">{{dynasty}}-季节多样性排名</view>
			<view class="card-divider"></view>
			  <view class="charts">
			    <qiun-data-charts 
			      type="column"
			      :opts="opts"
			      :chartData="columnSolarData"
			      :ontouch="true"
			    />
			  </view>
		</view>
	</view>
</template>

<script>
import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
import request from '../../utils/request.js';
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
	  solar: [
		{ value: 0, text: "summary" },
		{ value: 1, text: "冬至"},
		{ value: 2, text: "处暑" },
		{ value: 3, text: "夏至" },
		{ value: 4, text: "大寒" },
		{ value: 5, text: "大暑" },
		{ value: 6, text: "大雪" },
		{ value: 7, text: "寒露" },
		{ value: 8, text: "小寒" },
		{ value: 9, text: "小暑" },
		{ value: 10, text: "小满" },
		{ value: 11, text: "小雪" },
		{ value: 12, text: "惊蛰" },
		{ value: 13, text: "春分"},
		{ value: 14, text: "清明"},
		{ value: 15, text: "白露"},
		{ value: 16, text: "秋分"},
		{ value: 17, text: "立冬"},
		{ value: 18, text: "立夏"},
		{ value: 19, text: "立春"},
		{ value: 20, text: "立秋"},
		{ value: 21, text: "芒种" },
		{ value: 22, text: "谷雨" },
		{ value: 23, text: "雨水" },
		{ value: 24, text: "霜降" },
	  ],
      cWidth: 750,
      cHeight: 500,
	  dataSeason: [{"name":"春","value":50},{"name":"夏","value":30},{"name":"秋","value":20},{"name":"冬","value":18}],
	  dataSolar:[{"name":"立春","value":0},{"name":"雨水","value":30},{"name":"惊蛰","value":20},{"name":"春分","value":18},
				{"name":"清明","value":50},{"name":"谷雨","value":30},{"name":"立夏","value":20},{"name":"小满","value":18},
				{"name":"芒种","value":50},{"name":"夏至","value":30},{"name":"小暑","value":20},{"name":"大暑","value":18},
				{"name":"立秋","value":50},{"name":"处暑","value":30},{"name":"白露","value":20},{"name":"秋分","value":18},
				{"name":"寒露","value":50},{"name":"霜降","value":30},{"name":"立冬","value":20},{"name":"小雪","value":18},
				{"name":"大雪","value":50},{"name":"冬至","value":30},{"name":"小寒","value":20},{"name":"大寒","value":18}],
	  columnSolarData: {},
	  columnSolarValueData: [],
	  opts: {
	    color: ["#0a9a8d","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
	    padding: [15,15,0,5],
	    touchMoveLimit: 24,
	    enableScroll: true,
	    legend: { show: false},
	    xAxis: {
	      disableGrid: true,
	      scrollShow: true,
	      itemCount: 4
	    },
	    yAxis: {
	      data: [
	        {
	          min: 0
	        }
	      ]
	    },
	    extra: {
	      column: {
	        type: "group",
	        width: 30,
	        activeBgColor: "#000000",
	        activeBgOpacity: 0.08,
	      }
	    }
	  }
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
	getSeasonData() {
		let that=this
		const baseUrl = 'https://www.poetryworld.cn:4430'
		request({
			url: '/api/v1/seasonSummary',
			method:"GET",			
			success(res) {
				
			}
		}).then((res) => {
			console.log(that.dynastySelected)
			that.dynasty = that.range[that.dynastySelected].text
			that.dataSeason[0].value = res[that.dynasty].春
			that.dataSeason[1].value = res[that.dynasty].夏
			that.dataSeason[2].value = res[that.dynasty].秋
			that.dataSeason[3].value = res[that.dynasty].冬
		})
	},
	getSolarData() {
		let that=this
		const baseUrl = 'https://www.poetryworld.cn:4430'
		request({
			url: '/api/v1/solarTermSummary',
			method:"GET",			
			success(res) {
				
			}
		}).then((res) => {
			// 因为删了之后数组的元素就少了,所以要再进行复原
			that.dataSolar = [{"name":"立春","value":0},{"name":"雨水","value":30},{"name":"惊蛰","value":20},{"name":"春分","value":18},
						{"name":"清明","value":50},{"name":"谷雨","value":30},{"name":"立夏","value":20},{"name":"小满","value":18},
						{"name":"芒种","value":50},{"name":"夏至","value":30},{"name":"小暑","value":20},{"name":"大暑","value":18},
						{"name":"立秋","value":50},{"name":"处暑","value":30},{"name":"白露","value":20},{"name":"秋分","value":18},
						{"name":"寒露","value":50},{"name":"霜降","value":30},{"name":"立冬","value":20},{"name":"小雪","value":18},
						{"name":"大雪","value":50},{"name":"冬至","value":30},{"name":"小寒","value":20},{"name":"大寒","value":18}]
			// 获得选中的朝代
			that.dynasty = that.range[that.dynastySelected].text
			// 给数组赋值
			for(let i = 1 ; i < 25 ; i++) {
				// 如果index为0就删掉
				if(res[that.dynasty][that.solar[i].text] == 0) {
					let solar = that.solar[i].text;
					let index = that.dataSolar.findIndex(item => item.name == solar);
					console.log(index,"index")
					that.dataSolar.splice(index,1)
				}
				else {
					let solar = that.solar[i].text;
					let index = that.dataSolar.findIndex(item => item.name == solar);
					that.dataSolar[index].value = res[that.dynasty][solar]
				}
			}
		})
	},
	getSolarDataForColumn() {
		let that=this
		const baseUrl = 'https://www.poetryworld.cn:4430'
		request({
			url: '/api/v1/solarTermSummary',
			method:"GET",			
			
		}).then((res) => {
			that.columnSolarValueData = []
			that.dynasty = that.range[that.dynastySelected].text
			for(let i = 1 ; i < 25 ; i++) {
				let solar = that.solar[i].text;
				that.columnSolarValueData.push(res[that.dynasty][solar]);
			}
			console.log(that.columnSolarValueData)
		})
	},
    getServerData() {
      //模拟从服务器获取数据时的延时
	  this.getSeasonData()
	  this.getSolarData()
	  this.getSolarDataForColumn()
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            series: [
              {
                data: this.dataSeason,
              }
            ]
          };
        this.drawCharts('VMxhkxTgpiTCnjYzoCiIKStiRSwhJsVI', res);
		let res2 = {
		      series: [
		        {
		          data: this.dataSolar,
		        }
		      ]
		    };
		this.drawCharts('KReAZdJmWCjyYmfJGIXBsIHcYLbNaAeU', res2);
		let res3 = {
		    categories: ["冬至","处暑","夏至","大寒","大蜀","大雪","寒露","小寒","小蜀","小满","小雪","惊蛰","春分","清明",
			"白露","秋分","立冬","立夏","立春","立秋","芒种","谷雨","雨水","霜降"],
		    series: [
		      {
		        name: "次数",
		        data: this.columnSolarValueData
		      }
		    ]
		  };
		this.columnSolarData = JSON.parse(JSON.stringify(res3));
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
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
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
            border: true,
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
    }
  }
};
</script>

<style scoped>
	.bg {
		padding-bottom: 10px;
	}
	.container {
		display: flex;
		margin: 0 auto;
		width: 90%;
		height: 300px;
		border: 2px solid red;
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
</style>