"use strict";
const common_assets = require("../../common/assets.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isClick: false,
      read: [
        { title: "读诗排行榜", id: 0 },
        { title: "阅读时长", id: 1 },
        { title: "等级", id: "2" }
      ]
    };
  },
  methods: {
    setActive() {
      this.isClick = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_assets._imports_3,
    e: common_assets._imports_4,
    f: common_assets._imports_5,
    g: common_assets._imports_6,
    h: common_assets._imports_7,
    i: common_assets._imports_8
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/如梦令寒假/App01/pages/My/My.vue"]]);
wx.createPage(MiniProgramPage);
