<template>  
  <div id="cloud" ref="echarts" style="width: 100%; height: 450px;"></div>  
</template>  

<script>  
import 'echarts-wordcloud';  
import * as echarts from 'echarts';  // 引入ECharts库  

export default {  
  mounted() {  
    this.initCharts();  
    window.addEventListener('resize', this.resizeChart);  
  },  
  beforeDestroy() {  
    window.removeEventListener('resize', this.resizeChart);  
  },  
  methods: {  
    initCharts() {  
      const chartDom = this.$refs.echarts;  // Use refs instead of getElementById  
      if (!chartDom) {  
        console.error("Element with ref 'echarts' not found.");  
        return;  
      }  

      // 初始化 ECharts 实例  
      this.myChart = echarts.init(chartDom);  

      this.myChart.setOption({  
        title: {  
          x: 'center',  
        },  
        backgroundColor: '#fff',  
        series: [  
          {  
            type: 'wordCloud',  
            shape: 'circle',  
            gridSize: 30,  
            sizeRange: [14, 60],  
            rotationRange: [0, 0],  
            textStyle: {  
              normal: {  
                color: function () {  
                  return (  
                    'rgb(' +  
                    Math.round(Math.random() * 255) +  
                    ', ' +  
                    Math.round(Math.random() * 255) +  
                    ', ' +  
                    Math.round(Math.random() * 255) +  
                    ')'  
                  )  
                },  
              },  
            },  
            left: 'center',  
            top: 'center',  
            right: null,  
            bottom: null,  
            width: '100%',  // Set width to 100%  
            height: '100%', // Set height to 100%  
            data: this.getWordCloudData(),  
          },  
        ],  
      });  
    },  
    resizeChart() {  
      if (this.myChart) {  
        this.myChart.resize();  
      }  
    },  
    getWordCloudData() {  
      return [  
        { name: '静夜思', value: 0.009175132 },  
        { name: '春晓', value: 0.009175132 },  
        { name: '月下独酌', value: 0.009175132 },  
         { name: '赋得古原草送别 ', value: 0.009175132 },
                      { name: '念奴娇·赤壁怀古 ', value: 0.009175132 },
                      { name: '声声慢 ', value: 0.009175132 },
                      { name: '水调歌头 ', value: 0.009175132 },
                      { name: '明月 ', value: 0.009175132 },
                      { name: '柳树 ', value: 0.009175132 },
                      { name: '梅花 ', value: 0.009175132 },
                      { name: '菊花 ', value: 0.009175132 },
                      { name: '莲 ', value: 0.009175132 },
                      { name: '鸿雁 ', value: 0.009175132 },
                      { name: '杜鹃 ', value: 0.009175132 },
                      { name: '流水 ', value: 0.009175132 },
                      { name: '黄昏 ', value: 0.009175132 },
                      { name: '夕照 ', value: 0.009175132 },
                      { name: '重阳 ', value: 0.009175132 },
                      { name: '长亭 ', value: 0.009175132 },
                      { name: '琴瑟 ', value: 0.009175132 },
                      { name: '芳草 ', value: 0.009175132 },
                      { name: '松柏 ', value: 0.009175132 },
                      { name: '羌笛 ', value: 0.009175132 },
                      { name: '白云 ', value: 0.009175132 },
                      { name: '秋水 ', value: 0.009175132 },
                      { name: '连理枝 ', value: 0.009175132 },
                      { name: '比翼鸟 ', value: 0.009175132 },
                      { name: '谢家 ', value: 0.009175132 },
                      { name: '豆蔻 ', value: 0.009175132 },
                      { name: '精卫', value: 0.009175132 },
                      {
                        name: '孔子',
                        value: 0.0152644223,
                      },
                      {
                        name: '阮籍',
                        value: 0.010105981,
                      },
                      {
                        name: '嵇康',
                        value: 0.0073556,
                      },
                      {
                        name: '陶渊明',
                        value: 0.024666245,
                      },
                      {
                        name: '谢安',
                        value: 0.012497068,
                      },
                      {
                        name: '白居易',
                        value: 0.018803556,
                      },
                      {
                        name: '杜甫',
                        value: 0.026011745,
                      },
                      {
                        name: '李白',
                        value: 0.029723498,
                      },
                      {
                        name: '李商隐',
                        value: 0.005064369,
                      },
                      {
                        name: '杜牧',
                        value: 0.005805021,
                      },
                      {
                        name: '韩愈',
                        value: 0.012888271,
                      },
                      {
                        name: '孟浩然',
                        value: 0.004107777,
                      },
                      {
                        name: '王昌龄',
                        value: 0.003049462,
                      },
                      {
                        name: '贾岛',
                        value: 0.006309172,
                      },
                      {
                        name: '刘禹锡',
                        value: 0.007867452,
                      },
                      {
                        name: '王维',
                        value: 0.007358305,
                      },
                      {
                        name: '柳宗元',
                        value: 0.008528603,
                      },
                      {
                        name: '颜真卿',
                        value: 0.005024407,
                      },
                      {
                        name: '温庭筠',
                        value: 0.003255876,
                      },
                      {
                        name: '陆龟蒙',
                        value: 0.004075145,
                      },
                      {
                        name: '皮日休',
                        value: 0.003767173,
                      },
                      {
                        name: '岑参',
                        value: 0.004613373,
                      },
                      {
                        name: '柳永',
                        value: 0.001070578,
                      },
                      {
                        name: '李清照',
                        value: 0.00835108,
                      },
                      {
                        name: '苏轼',
                        value: 0.01893823,
                      },
                      {
                        name: '朱熹',
                        value: 0.012894547,
                      },
                      {
                        name: '陆游',
                        value: 0.017636602,
                      },
                      {
                        name: '王安石',
                        value: 0.010418194,
                      },
                      {
                        name: '欧阳修',
                        value: 0.009175132,
                      },
                      {
                        name: '黄庭坚',
                        value: 0.009520245,
                      },
                      {
                        name: '杨万里',
                        value: 0.00963382,
                      },
                      {
                        name: '范仲淹',
                        value: 0.003305837,
                      },
                      {
                        name: '辛弃疾',
                        value: 0.00120081,
                      },  
					{ name: '岳飞', value: 0.002417444 },  
      ];  
    }  
  },  
};  
</script>  

<style>  
#cloud {  
  /* Set a maximum width if desired */  
  max-width: 100%;  
  height: 450px; /* Fixed height for the chart */  
}  
</style>