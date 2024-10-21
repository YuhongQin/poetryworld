"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navIndex: 0,
      tabBars: [{
        name: "诗人",
        id: "guanzhu"
      }, {
        name: "诗词",
        id: "tuijian"
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
        { value: 13, text: "清" }
      ],
      curPage: 1,
      // 下拉选择框数据结束
      poetData: [
        {
          poetId: 0,
          name: "",
          year: "",
          intro: ""
        }
      ],
      searchValuePoet: "",
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
        { value: 22, text: "怨恨" }
      ],
      poemData: [
        {
          title: "",
          PoetName: "",
          PoetDynasty: "",
          content: "",
          labels: ""
        }
      ],
      isPress: false,
      curPagePoem: 1,
      //诗词搜索部分
      searchValuePoem: "",
      btnShowPoem: true,
      // 诗词部分结束
      activeNavigator: "poet"
    };
  },
  mounted() {
    this.getPoetData();
    this.getPoemData();
  },
  methods: {
    showPoetData(index) {
      common_vendor.index.navigateTo({
        url: `/pages/PoetInfo/PoetInfo?PoetID=${index}&Data=` + encodeURIComponent(JSON.stringify(this.poetData))
      });
    },
    // 导航栏部分
    setActiveNavigator(navigator) {
      this.activeNavigator = navigator;
    },
    checkIndex(index) {
      console.log(index);
      this.navIndex = index;
    },
    scroll: function(e) {
      console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
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
    prevPage() {
      if (this.curPage > 1) {
        this.curPage = this.curPage - 1;
      } else {
        common_vendor.index.showToast({
          title: "已经是第一页~",
          icon: "none",
          duration: 2e3
        });
      }
      this.render();
    },
    nextPage() {
      this.curPage = this.curPage + 1;
      this.isPressPoet = true;
      this.render();
    },
    render() {
      const baseUrl = "http://www.poetryworld.cn:8198";
      common_vendor.index.request({
        url: baseUrl + "/api/v1/searchPoetData",
        method: "POST",
        data: {
          name: this.searchValuePoet,
          dynasty: this.range[this.dynastySelected].text,
          page: this.curPage,
          limit: 6,
          computePageNum: true
        },
        success: (res) => {
          const data = res.data[0];
          if (data.length != 0) {
            console.log(data);
            console.log(this.range[this.dynastySelected].text);
            console.log("testPoet");
            this.isPressPoet = false;
            this.poetData = [];
            this.btnShow = true;
            for (const p of data) {
              this.poetData.push({
                poetId: p[0],
                name: p[1],
                year: p[2].length === 0 ? "不详" : p[2],
                intro: p[3].length === 0 ? "暂无" : p[3]
              });
            }
          } else {
            if (this.searchValuePoet == "") {
              if (this.isPressPoet == true) {
                common_vendor.index.showToast({
                  title: "已经是最后一页~",
                  icon: "none",
                  duration: 2e3
                });
              } else {
                this.poetData = [];
                this.btnShow = false;
                common_vendor.index.showToast({
                  title: "没有匹配结果",
                  icon: "none",
                  duration: 2e3
                });
              }
            } else {
              if (this.isPressPoet == true) {
                common_vendor.index.showToast({
                  title: "已经是最后一页~",
                  icon: "none",
                  duration: 2e3
                });
              } else {
                common_vendor.index.showToast({
                  title: "没有匹配结果",
                  icon: "none",
                  duration: 2e3
                });
              }
            }
          }
        }
      });
    },
    // Poem部分
    getPoemData() {
      this.curPagePoem = 1;
      this.renderSearchPoem();
    },
    prevPagePoem() {
      if (this.curPagePoem > 1) {
        this.curPagePoem = this.curPagePoem - 1;
      } else {
        common_vendor.index.showToast({
          title: "已经是第一页~",
          icon: "none",
          duration: 2e3
        });
      }
      this.renderSearchPoem();
    },
    nextPagePoem() {
      this.curPagePoem = this.curPagePoem + 1;
      this.isPress = true;
      this.renderSearchPoem();
    },
    //Poem搜索部分
    onSearch(res) {
      this.searchValuePoem = res.detail.value;
      console.log(this.searchValuePoem);
    },
    getSearchPoemData() {
      this.curPagePoem = 1;
      this.renderSearchPoem();
    },
    renderSearchPoem() {
      const baseUrl = "http://www.poetryworld.cn:8198";
      common_vendor.index.request({
        url: baseUrl + "/api/v1/poetry/catalog/search",
        method: "POST",
        data: {
          search: this.searchValuePoem,
          label: this.rangePoem[this.genreSelected].text,
          searchType: 1,
          page: this.curPagePoem,
          limit: 6,
          computePageNum: true
        },
        success: (res) => {
          const data = res.data[0];
          if (data.length != 0) {
            console.log(data);
            this.isPress = false;
            this.poemData = [];
            this.btnShow = true;
            for (const p of data) {
              this.poemData.push({
                title: p[0],
                PoetName: p[1],
                PoetDynasty: p[2],
                content: p[3],
                labels: p[4]
              });
            }
          } else {
            if (this.searchValuePoem == "") {
              this.poetData = [];
              this.btnShowPoem = false;
              common_vendor.index.showToast({
                title: "没有匹配结果",
                icon: "none",
                duration: 2e3
              });
            } else {
              if (this.isPress == true) {
                common_vendor.index.showToast({
                  title: "已经是最后一页~",
                  icon: "none",
                  duration: 2e3
                });
              } else {
                common_vendor.index.showToast({
                  title: "没有匹配结果",
                  icon: "none",
                  duration: 2e3
                });
              }
            }
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  _easycom_uni_data_select2();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  _easycom_uni_data_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabBars, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: tab.id,
        c: tab.id,
        d: common_vendor.n($data.navIndex == index ? "activite" : ""),
        e: common_vendor.o(($event) => $options.checkIndex(index), tab.id)
      };
    }),
    b: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    c: $data.navIndex == 0
  }, $data.navIndex == 0 ? common_vendor.e({
    d: common_vendor.o((...args) => $options.onSearchPoet && $options.onSearchPoet(...args)),
    e: common_vendor.o((...args) => $options.getPoetData && $options.getPoetData(...args)),
    f: common_vendor.o(($event) => $options.getPoetData()),
    g: common_vendor.o(($event) => $data.dynastySelected = $event),
    h: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.dynastySelected
    }),
    i: common_vendor.f($data.poetData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.year),
        c: common_vendor.t(item.intro),
        d: common_vendor.o(($event) => $options.showPoetData(index), index),
        e: index
      };
    }),
    j: $data.btnShow === true
  }, $data.btnShow === true ? {
    k: common_vendor.o((...args) => $options.prevPage && $options.prevPage(...args)),
    l: common_vendor.o((...args) => $options.nextPage && $options.nextPage(...args))
  } : {}) : {}, {
    m: $data.navIndex == 1
  }, $data.navIndex == 1 ? common_vendor.e({
    n: common_vendor.o((...args) => $options.onSearch && $options.onSearch(...args)),
    o: common_vendor.o((...args) => $options.getSearchPoemData && $options.getSearchPoemData(...args)),
    p: common_vendor.o(($event) => $options.getPoemData()),
    q: common_vendor.o(($event) => $data.genreSelected = $event),
    r: common_vendor.p({
      localdata: $data.rangePoem,
      modelValue: $data.genreSelected
    }),
    s: common_vendor.f($data.poemData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.PoetName),
        c: common_vendor.t(item.PoetDynasty),
        d: common_vendor.t(item.labels),
        e: common_vendor.t(item.content),
        f: index
      };
    }),
    t: $data.btnShowPoem
  }, $data.btnShowPoem ? {
    v: common_vendor.o((...args) => $options.prevPagePoem && $options.prevPagePoem(...args)),
    w: common_vendor.o((...args) => $options.nextPagePoem && $options.nextPagePoem(...args))
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-72996608"], ["__file", "E:/code/如梦令寒假/App01/pages/Poet/Poet.vue"]]);
wx.createPage(MiniProgramPage);
