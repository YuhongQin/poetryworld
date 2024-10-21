"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello uni-app"
    };
  },
  onLoad() {
  },
  methods: {
    navBack() {
      common_vendor.index.navigateBack({});
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: common_vendor.o((...args) => $options.navBack && $options.navBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/如梦令寒假/App01/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
