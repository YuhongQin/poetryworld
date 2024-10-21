"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navIndex: 0,
      //操控界面跳转
      activeNavigator: "",
      //tab样式改变
      leftColumnText: "",
      rightColumnText: "",
      isSubmit: false,
      imagePath: "",
      poemSubmit: false,
      tabBars: [{
        name: "诗配图",
        id: "poem-picture"
      }, {
        name: "图配诗",
        id: "picture-poem"
      }],
      // 诗配图部分使用的变量
      inputText: "",
      // 诗配图输入的诗文
      imagePath: "",
      imageUrl: "",
      isColumn: false,
      // 图配诗诗句
      poetrySwiper: [],
      tempPath: ""
    };
  },
  methods: {
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
    splitText() {
      const midpoint = Math.ceil(this.inputText.length / 2);
      this.leftColumnText = this.inputText.substring(0, midpoint);
      this.rightColumnText = this.inputText.substring(midpoint);
    },
    clear() {
      this.isSubmit = false;
      this.inputText = "";
    },
    clearPoem() {
      this.poemSubmit = false;
    },
    // 诗配图部分函数
    submitPoetry() {
      let that = this;
      that.isSubmit = true;
      const baseUrl = "http://www.poetryworld.cn:8198";
      common_vendor.index.request({
        url: baseUrl + "/api/v1/txt2img?poem=" + that.inputText,
        method: "GET",
        success(res) {
          console.log(res.data.img_paths[0]);
          that.imagePath = res.data.img_paths[0];
          that.getImageUrl();
        }
      });
    },
    getImageUrl() {
      let that = this;
      common_vendor.index.request({
        url: "http://www.poetryworld.cn:8198/api/v1/getunsplash?path=" + that.imagePath,
        method: "GET",
        responseType: "arraybuffer",
        success(res) {
          console.log(res, "kdkdkd");
          let datas = res.data;
          that.imageUrl = "data:image/png;base64," + common_vendor.index.arrayBufferToBase64(datas);
          console.log(that.imageUrl);
        }
      });
    },
    // 图配诗函数
    chooseImage() {
      const that = this;
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          that.tempPath = tempFilePaths[0];
          common_vendor.index.uploadFile({
            url: "http://www.poetryworld.cn:8198/api/v1/img2txt",
            //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              "user": "test"
            },
            success: (uploadFileRes) => {
              console.log("uploadFileRes.data打印结果", uploadFileRes.data);
              console.log("uploadFileRes.data.poems打印结果", JSON.parse(uploadFileRes.data).poems);
              that.poetrySwiper = JSON.parse(uploadFileRes.data).poems;
            }
          });
        }
      });
      this.poemSubmit = true;
    }
  }
};
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
    d: $data.isSubmit === false
  }, $data.isSubmit === false ? {
    e: common_vendor.o([($event) => $data.inputText = $event.detail.value, (...args) => $options.splitText && $options.splitText(...args)]),
    f: $data.inputText,
    g: common_vendor.o((...args) => $options.submitPoetry && $options.submitPoetry(...args))
  } : {}, {
    h: $data.isSubmit === true && $data.isColumn === false
  }, $data.isSubmit === true && $data.isColumn === false ? {
    i: $data.imageUrl,
    j: common_vendor.t($data.leftColumnText),
    k: common_vendor.t($data.rightColumnText)
  } : {}, {
    l: $data.isSubmit === true
  }, $data.isSubmit === true ? {
    m: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}) : {}, {
    n: $data.navIndex == 1
  }, $data.navIndex == 1 ? {
    o: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    p: $data.tempPath,
    q: common_vendor.f($data.poetrySwiper, (info, index, i0) => {
      return common_vendor.e({
        a: index == 0
      }, index == 0 ? {} : {}, {
        b: index == 1
      }, index == 1 ? {} : {}, {
        c: index == 2
      }, index == 2 ? {} : {}, {
        d: index == 3
      }, index == 3 ? {} : {}, {
        e: common_vendor.t(info.name),
        f: common_vendor.t(info.author),
        g: common_vendor.f(info.content, (item, i, i1) => {
          return {
            a: common_vendor.t(item),
            b: i
          };
        }),
        h: index
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e2f8c5c5"], ["__file", "E:/code/如梦令寒假/App01/pages/AI/AI.vue"]]);
wx.createPage(MiniProgramPage);
