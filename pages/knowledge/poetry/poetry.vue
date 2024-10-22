<template>  
  <view class="container">  
    <!-- <back-button></back-button>  -->

    <!-- 朝代选择 -->  
    <view v-if="showDynasty" class="selection">  
      <text class="title">朝代选择：</text>  
      <radio-group v-model="dynastySelected" @change="ondynastyChange">  
        <radio
          v-for="(value, index) in dynasties"  
          :key="index"  
          :value="value"  
        >{{ value }}</radio>  
      </radio-group>  
    </view>  
    
    <!-- 诗人选择 -->  
    <view v-else-if="showPoet" class="selection">  
      <text class="title">诗人选择：</text>  
      <radio-group v-model="poetSelected" @change="onPoetChange">  
        <radio  
          v-for="(value, index) in poets"  
          :key="index"  
          :value="value"  
        >{{ value }}</radio>  
      </radio-group>  
    </view>  
    
    <!-- 意象选择 -->  
    <view v-else-if="showImagery" class="selection">  
      <text class="title">意象选择：</text>  
      <radio-group v-model="ImagerySelected" @change="onImageryChange">  
        <radio  
          v-for="(value, index) in Imagery"  
          :key="index"  
          :value="value"  
        >{{ value }}</radio>  
      </radio-group>  
    </view>  

    <!-- 搜索框 -->  
    <view class="search-container">  
      <input  
        v-model="entity"  
        placeholder="请输入诗人名字/作品名称/意象词"  
        @keyup.enter="submit_node"  
        class="search-input"  
      />  
      <picker  @change="handleSearchTypeChange"  :range="searchOptions">  
          <view class="picker">  
            {{ searchOptions[searchType-1] || '请选择' }}  
          </view>  
      </picker>
      <button @click="submit_node" class="search-button">搜索</button>  
    </view>  

    <!-- Not Found 提示 -->  
    <view v-if="snackbar" class="snackbar">  
      <text class="snackbar-text">未找到相关信息!</text>  
      <button @click="snackbar = false" class="snackbar-button">关闭</button>  
    </view>  

    <!-- 词云或图表 -->  
    <view v-if="wordcloud" class="wordcloud">  
      <word></word>  
    </view>  
    <view v-else-if="no_wordcloud" class="no-wordcloud">  
      <div class="graph"border>  
        <view class="graph-content" id="graph"></view>  
      </div> 
    </view>  
  </view>  
</template>  

<script>
// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie'
//import backButton from '@/components/backButton.vue'
import word from '../../../components/word/word.vue'
import request from '../../../utils/request.js'
import 'echarts-wordcloud';  
import * as echarts from 'echarts';  // 引入ECharts库  


import BaiJuyi from './白居易.jpeg';
import DuFu from './杜甫.jpeg';
import LiBai from './李白.jpeg';
import LiuYuxi from './刘禹锡.jpeg';
import LiuZongyuan from './柳宗元.jpeg';
import MengHaoran from './孟浩然.jpeg';

const images = {
  '白居易': BaiJuyi,
  '杜甫': DuFu,
  '李白': LiBai,
  '刘禹锡': LiuYuxi,
  '柳宗元': LiuZongyuan,
  '孟浩然': MengHaoran
};

export default {
  name: 'knowledge',
  components: {
    word,
  },

  data() {
    return {
      showDynasty:true,
      showImagery:false,
      showPoet:false,
      wordcloud: true,
      no_wordcloud:true,
      entity: '',
      entityRules: [(v) => !v || v.length <= 50 || '不得超过50字'],
      dynastySelected: '全部',
      ImagerySelected:'全部',
      poetSelected:'全部',
      poets :['全部'],
      poet_data:{},
      Imagery_data:{},

      poetselect:'',
      dynastyselect:'',
      imageryselect:'',
      enablePoetChange: false,
      groups: [],
      valid: true,
      snackbar: false,
      bookRawData: null,
      page: 0,
      nCards: 0,
      isAchieveBottom: false,
      
      dialogTitle: '典籍介绍',
      dialogContent: `本页面根据【经史子集】分类展示古籍`,
      // search part
      book: '',
      bookRules: [(v) => !v || v.length <= 38 || '查询限制在38字以内'],
      notFound: false,
      curPage: 1,
      limit: 12,
      totalPages: -1,
      searchBooks: false,
      searchOptions: [
        '诗人','古诗','意象',
        
      ],
     c :[[      
        { name: '生卒' },
        { name: '别称' },
        { name: '主要成就'},
        { name: '收录作品数量'},
        { name: '作品' },
        { name: '历史相关人物' },
        { name: '上下级' },
        { name: '亲戚' },
        { name: '兄弟姐妹' },
        { name: '合作' },
        { name: '同僚' },
        { name: '同事' },
        { name: '同门' },
        { name: '夫妻' },
        { name: '好友' },
        { name: '敌对' },
        { name: '师生' },
        { name: '情侣' },
        { name: '祖孙' },
        { name: '本人' },
        { name: '父子' },
        { name: '父母' },
        { name: '朝代' },
        { name: '作者' },
      ],
      [
        {name:'作者'},
        {name:'朝代'},
        {name:'主题意象'},
        {name:'情感意象'},
      ],
      
      [
        {name:'属于'},
        {name:'包含'},
        {name:'相关作品'},
        {name:'意象'},
      ],
      [
        {name:'属于'},
        {name:'包含'},
        {name:'情感类别'},
        {name:'情感极性'},
        {name:'相关作品'},
        {name:'意象'},
      ]
    ],
      searchType: 1,
    }
  },

  watch: {
    groupSelected() {
      if (this.book) this.searchBook()
      else {
        this.totalPages = -1
        this.curPage = 1
        this.updateBookData()
      }
    },
    // searchType(newVal) {
    //   this.$nextTick(() => {
    //     const selectedOption = this.searchOptions.find(
    //       (option) => option.value === newVal
    //     )
    //     this.$refs.select.setSelectedItems([selectedOption])
    //   })
    // },
  },

  created() {
    // this.dynasties = ['全部', ...state.poetry.dynasties]
    // this.Imagery=['全部', ...state.poetry.Imagery]
    this.dynasties = ['全部', '先秦',
    '秦',
    '汉',
    '魏晋',
    '南北朝',
    '隋',
    '唐',
    '宋',
    '辽',
    '金',
    '元',
    '明',
    '清',]
    this.Imagery=['全部',  '主题意象',
    '情感意象',]
  },

  mounted() {
    // this.scroll()
	
    this.getInitData()
  },
  
  methods: {
    onImageryChange(selectedImagery)
    {
      if (this.entity!=='')
    {
    console.log('Selected Imagery:', selectedImagery);
    this.imageryselect = selectedImagery; 
    
    const keys = Object.keys(this.Imagery_data);
    const isKeyPresent = keys.includes(this.imageryselect);
    const filteredKeys = keys.filter(key => key !== '全部');
    if (isKeyPresent===true)
    {
       // console.log('节点:', this.poet_data[this.poetselect]);
       if (this.imageryselect ==='主题意象')
       {
        this.show_chart(1, this.Imagery_data[this.imageryselect ].nodes, this.Imagery_data[this.imageryselect ].edges,this.searchType)
       }
       else{
        this.show_chart(1, this.Imagery_data[this.imageryselect ].nodes, this.Imagery_data[this.imageryselect ].edges,this.searchType+1)
       }
      
    }
    else
    {
      
      alert('抱歉, 查询不到相关数据。当前诗人所在的朝代可能是 ' + filteredKeys.join(', '));
      
    }
    }
  },
    ondynastyChange(selectedDynasty)
    {
    if (this.entity!=='')
    {
    console.log('Selected dynasty:', selectedDynasty);
    this.dynastyselect = selectedDynasty; 
    
    const keys = Object.keys(this.poet_data);
    const isKeyPresent = keys.includes(this.dynastyselect);
    const filteredKeys = keys.filter(key => key !== '全部');
    if (isKeyPresent===true)
    {
       // console.log('节点:', this.poet_data[this.poetselect]);
    this.show_chart(1, this.poet_data[this.dynastyselect].nodes, this.poet_data[this.dynastyselect].edges,this.searchType)
    }
    else
    {
      
      alert('抱歉, 查询不到相关数据。当前诗人所在的朝代可能是 ' + filteredKeys.join(', '));
      
    }
  }
   
    },
    onPoetChange(selectedPoet) {
      if (this.enablePoetChange) {
        this.handlePoetChange(selectedPoet);
      } 
    },
    handlePoetChange(selectedPoet) {
    // 在这里处理选中的诗人
    // console.log('Selected poet:', selectedPoet);
    // console.log('数据类型:', this.poet_data.nodes);
    // selectedPoet= JSON.stringify(selectedPoet);
    console.log('Selected poet:', selectedPoet);
    this.poetselect = selectedPoet; 
    // console.log('节点:', this.poet_data[this.poetselect]);
    this.show_chart(1, this.poet_data[this.poetselect].nodes, this.poet_data[this.poetselect].edges,this.searchType)
    // 你可以添加其他逻辑，比如触发其他函数或更新状态
  },
    handleSearchTypeChange(e) {
	 console.log(e.detail.value + 1);
	 this.searchType = e.detail.value + 1;
      // 根据选择的搜索类型更新显示状态
      if (this.searchType === 1) {
        this.wordcloud=true;
        this.showDynasty = true;
        this.showPoet=false;
        this.showImagery = false;
        this.dynastySelected='全部'
        this.entity=''
      } else if (this.searchType === 2) {
        this.wordcloud=true;
        this.showDynasty = false;
        this.showPoet=true;
        this.poets = ['全部']
        this.poetSelected='全部'
        this.showImagery = false;
        this.entity=''
      } else if (this.searchType === 3) {
        this.wordcloud=true;
        this.showDynasty = false;
        this.showPoet=false;
        this.showImagery = true;
        this.ImagerySelected='全部'
        this.entity=''
        // 其他逻辑，根据需要添加
      }
    },
    show_chart: function (val, nodes, edges, searchType) {
      const _this = this;
      const myChart = echarts.init(document.getElementById('graph'));
      const categories = _this.c[searchType - 1];
      const option = {
        legend: [{
          data: categories.map(function (a) {
            return a.name;
          }),
        }],
        animationDuration: 1500,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          legendHoverLink: true,
          hoverAnimation: true,
          animation: false,
          draggable: true,
          focusNodeAdjacency: true,
          center: ['50%', '50%'],
          roam: true,
          edgeSymbol: ['none', 'arrow'],
          label: {
            normal: {
              show: true,
              position: 'right',
            },
            emphasis: {
              show: true,
            },
          },
          force: {
            repulsion: 300,
            gravity: 0.1,
            edgeLength: 150,
            layoutAnimation: {
              duration: 0.001,
              easing: 'cubicOut'
            }
          },
          data: nodes.map(function (n, idx) {
            if (val === 1 && images[n.name]) {
              return {
                id: n.id,
                name: n.name,
                category: n.category,
                symbolSize: 70,
                symbol: 'image://' + images[n.name],
              };
            } else {
              return {
                id: n.id,
                name: n.name,
                category: n.category,
                symbolSize: 25,
              };
            }
          }),
          categories,
          links: edges.map(function (x) {
            return {
              source: x.source,
              target: x.target,
              label: {
                normal: {
                  show: false,
                  formatter: x.edge_label,
                  color: 'black',
                  fontStyle: 'normal',
                  fontWeight: 'bolder',
                  textBorderColor: 'white',
                  textBorderWidth: 1,
                  fontFamily: 'sans-serif',
                  fontSize: 16,
                },
                emphasis: {
                  show: true,
                  fontSize: 16,
                },
              },
            };
          }),
          itemStyle: {
            borderColor: '#FFF',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
          lineStyle: {
            color: 'target',
            curveness: 0.3,
          },
          emphasis: {
            lineStyle: {
              width: 7,
            },
          },
        }],
      };
      myChart.setOption(option);
    },

    
    submit_node() {
      if (this.entity==='')
      {
        alert('请输出诗人/古诗/意象');
      }
      else{
      const _this = this
      // console.log(_this.entity)
      _this.wordcloud = false
      // _this.poetSelected='全部'
     
      request({
          method: 'POST',
          url: '/api/v1/graph_new',
          data: {
            entity: _this.entity,
            dynasty: '全部',
            searchType: _this.searchType,
            imagery:_this.entity,
            poet:'全部',
            ImagerySelected:_this.ImagerySelected
          },
        })
        .then((response) => {
			console.log(response);
          if (response === 300) {
           alert('抱歉,查询不到相关数据');
          }
          else{
            this.poet_data=response
            this.Imagery_data=response
          // console.log('节点内容:', response.data.nodes)
          // console.log('请求成功')
          // console.log('节点')
          // console.log(response.data['nodes'])
          // console.log('边')
          // console.log(response.data['edges'])
          if (_this.searchType===1){
            this.wordcloud=false;
            this.no_wordcloud=true;
            if (_this.dynastySelected==='全部')
            {
				console.log('dynastySelected===全部')
              _this.show_chart(1, response.全部.nodes, response.全部.edges,_this.searchType)
            _this.dynastySelected='全部'
            }
            else
            {
              const keys = Object.keys(this.poet_data);
              const isKeyPresent = keys.includes(this.dynastySelected);
              const filteredKeys = keys.filter(key => key !== '全部');
              if (isKeyPresent===true)
              {
                // console.log('节点:', this.poet_data[this.poetselect]);
              this.show_chart(1, this.poet_data[this.dynastySelected].nodes, this.poet_data[this.dynastySelected].edges,this.searchType)
              }
              else
              {
                // this.show_chart(1, this.poet_data[this.dynastyselect].nodes, this.poet_data[this.dynastyselect].edges,this.searchType)
                alert('抱歉, 查询不到相关数据。当前诗人所在的朝代可能是 ' + filteredKeys.join(', '));
                
              }
            }
            
          }
          // if (_this.searchType===2){
          //   this.poet_data=response.data
          //   this.wordcloud=false;
          //   this.no_wordcloud=true;
          //   if (response.data.show_all===1)
          //   {
              
          //     this.poets = ['全部', ...response.data.poets]
          //     this.showPoet=true
          //   }
            
          //   _this.show_chart(1, response.data.nodes, response.data.edges,_this.searchType)

          // }
          if (_this.searchType===2){
            // _this.poetselect='徐钧'
            // console.log(11111111111);
            this.enablePoetChange=false
            
            this.wordcloud=false;
            this.no_wordcloud=true;
            if (response.show_all===1)
            {
              // console.log(2222222222);
              this.poets = ['全部', ...response.poets]
              this.showPoet=true
            }
            
            _this.show_chart(1, response.全部.nodes, response.全部.edges,_this.searchType)
            _this.poetSelected='全部'
            this.enablePoetChange=true
            
          }
          if (_this.searchType===3)
          {
            this.wordcloud=false;
            this.no_wordcloud=true;
            if (this.ImagerySelected==='全部')
            {
              
              _this.show_chart(1, response.全部.nodes, response.全部.edges,_this.searchType+1)
            }
            else
            {
              const keys = Object.keys(this.Imagery_data);
              const isKeyPresent = keys.includes(this.ImagerySelected);
              const filteredKeys = keys.filter(key => key !== '全部');
              if (isKeyPresent===true)
              {
                if (this.ImagerySelected==='主题意象')
                // console.log('节点:', this.poet_data[this.poetselect]);
              {
                this.show_chart(1, this.Imagery_data[this.ImagerySelected ].nodes, this.Imagery_data[this.ImagerySelected ].edges,this.searchType)
              }
              else
              {
                this.show_chart(1, this.Imagery_data[this.ImagerySelected ].nodes, this.Imagery_data[this.ImagerySelected ].edges,this.searchType+1)
              }
                
              }
              else
              {
                
                alert('抱歉, 查询不到相关数据。当前诗人所在的朝代可能是 ' + filteredKeys.join(', '));
                
              }
            }
           
            // this.wordcloud=false;
            // this.no_wordcloud=true;
            // if (response.data.show_all==="全部" || response.data.show_all==='情感')
            // {
              
            //   _this.show_chart(1, response.data.nodes, response.data.edges,_this.searchType+1)
            // }
            // else
            // {
            //   _this.show_chart(1, response.data.nodes, response.data.edges,_this.searchType)
            // }
           
          }
          
          // console.log('成功')
        }
      
      })
        .catch((error) => {
          console.log('请求失败')
          console.log(error)
        })
    }},
    onPageChange() {
      if (this.searchBooks) this.searchBook()
      else this.updateBookData()
    },

    updateBookData() {
      const _this = this
      _this.searchBooks = false
      _this.bookData = []
      // let count = 0

      _this
        .$axios({
          method: 'post',
          url: '/api/v1/sikuquanshu/catalog',
          data: {
            group: _this.groupSelected,
            page: _this.curPage,
            limit: _this.limit,
            computePageNum: _this.totalPages < 0,
          },
        })
        .then((response) => {
          let pages
          ;[_this.bookRawData, pages] = response
          if (pages !== null) _this.totalPages = pages
          // console.log(_this.bookRawData, _this.totalPages)
          // for (const i in _this.bookRawData) {
          //   const bk = _this.bookRawData[i]
          //   _this.bookData.push(bk)
          // }
          _this.bookData = _this.bookRawData
          // console.log(_this.bookData)
          // _this.nCards = count
          _this.notFound = false
          _this.snackbar = false
          Cookies.set('lastGroup', _this.groupSelected)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getInitData: async function () {
      const _this = this
      const lastGroup = await Cookies.get('lastGroup')
      const lastSearch = await Cookies.get('lastBookSearch')
      const lastSearchType = await Cookies.get('lastBookSearchType')
      if (lastGroup === undefined) {
        _this.groupSelected = '全部'
      } else {
        if (lastSearch && lastSearchType) {
          _this.book = lastSearch
          _this.searchType = parseInt(lastSearchType)
        }
        _this.groupSelected = lastGroup // 调用this.searchBook()
      }
    },

    // scroll() {
    //   window.onscroll = () => {
    //     const _this = this
    //     const scrollTop =
    //       document.documentElement.scrollTop || document.body.scrollTop
    //     const windowHeight =
    //       document.documentElement.clientHeight || document.body.clientHeight
    //     const scrollHeight =
    //       document.documentElement.scrollHeight || document.body.scrollHeight
    //     _this.isAchieveBottom =
    //       scrollTop + windowHeight >= scrollHeight - 20 && !_this.isAchiveBottom
    //     if (_this.isAchieveBottom) {
    //       setTimeout(() => {
    //         const raw = _this.bookRawData
    //         const nCards = _this.nCards
    //         for (let i = nCards; i < nCards + 100 && i < raw.length; i++) {
    //           _this.bookData.push({
    //             author: _this.bookRawData[i].author,
    //             category: _this.bookRawData[i].category,
    //             dynasty: _this.bookRawData[i].dynasty,
    //             group: _this.bookRawData[i].group,
    //             title: _this.bookRawData[i].title,
    //           })
    //           _this.nCards++
    //         }
    //         _this.isAchieveBottom = false
    //       }, 500)
    //     }
    //   }
    // },

    searchBook() {
      if (this.$refs.form.validate()) {
        const _this = this
        _this.searchBooks = true
        _this.totalPages = -1
        // _this.curPage = 1
        _this.bookData = []
        if (_this.book === null) _this.book = ''
        if (_this.book === '') {
          _this.updateBookData(_this.groupSelected)
          return
        }
        request({
            method: 'post',
            url: '/api/v1/sikuquanshu/catalog/search',
            data: {
              group: _this.groupSelected,
              search: _this.book,
              page: _this.curPage,
              limit: _this.limit,
              computePageNum: _this.totalPages < 0,
              searchType: _this.searchType,
            },
          })
          .then((response) => {
            let pages
            ;[_this.bookRawData, pages] = response
            if (pages !== null) {
              _this.totalPages = pages
              if (_this.curPage > _this.totalPages) _this.curPage = 1
            }
            // for (const i in _this.bookRawData) {
            //   const bk = _this.bookRawData[i]
            //   _this.bookData.push(bk)
            // }
            _this.bookData = _this.bookRawData
            if (_this.bookData.length === 0) {
              _this.notFound = true
              _this.snackbar = true
            } else {
              _this.notFound = false
              _this.snackbar = false
              Cookies.set('lastBookSearch', _this.book)
              Cookies.set('lastBookSearchType', _this.searchType)
            }
            Cookies.set('lastGroup', _this.groupSelected)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },

    clearInput() {
      this.totalPages = -1
      this.book = ''
      // this.updateBookData()
      Cookies.remove('lastBookSearch')
      // Cookies.remove('lastBookSearchType')
    },
  },

  // directives: {
  //   highlight: {
  //     // The directive function
  //     update(el, binding) {
  //       const text = el.textContent
  //       const regex = new RegExp(binding.value, 'gi')
  //       const result = text.replace(
  //         regex,
  //         `<span class="yellow">${binding.value}</span>`
  //       )
  //       el.innerHTML = result
  //     },
  //   },
  // },

  filters: {
    ellipsis(value) {
      if (!value) return '暂无介绍'
      const len = 100
      if (value.length > len) {
        return value.slice(0, len) + '...'
      }
      return value
    },
  },
}
</script>

<style scoped>
	.container {  
	  padding: 20px;  
	}  
	
	.title {  
	  font-size: 20px;  
	  margin-bottom: 10px;  
	}  
	
	.selection {  
	  margin-bottom: 20px;  
	  text-align: center;  
	}  
	
	.search-container {  
	  display: flex;  
	  justify-content: center;  
	  align-items: center;  
	  margin-bottom: 20px;  
	}  
	
	.search-input {  
	  flex: 1;  
	  margin-right: 10px;  
	  padding: 10px;  
	  border: 1px solid #ccc;  
	  border-radius: 4px;  
	}  
	
	.picker {  
	  border: 1px solid #ccc;  
	  padding: 10px;  
	  border-radius: 4px;  
	  margin-right: 10px;  
	}  
	
	.search-button {  
	   
	  background-color: #42A5F5;  
	  color: white;  
	  border: none;  
	  border-radius: 4px;  
	  cursor: pointer; 
	  height: 46px;
	  
	}  
	
	.snackbar {  
	  background-color: red;  
	  color: white;  
	  padding: 10px;  
	  text-align: center;  
	  margin-bottom: 20px;  
	}  
	
	.snackbar-button {  
	  background: transparent;  
	  color: white;  
	  border: none;  
	  cursor: pointer;  
	}  
	
	.wordcloud {  
	  text-align: center;  
	}  
	
	.no-wordcloud {  
	  text-align: center;  
	}  
	
	.graph {  
	  width: 100%;  
	  height: 520px;  
	}  
	
	.graph-content {  
	  width: 100%;  
	  height: 100%;  
	}  
</style>
