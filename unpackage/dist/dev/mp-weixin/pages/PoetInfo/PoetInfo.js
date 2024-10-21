"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      PoetInfo: {
        poetId: 0,
        name: "",
        year: "",
        intro: ""
      }
    };
  },
  onLoad: function(options) {
    let Info = JSON.parse(decodeURIComponent(options.Data));
    let ID = options.PoetID;
    console.log("PoetInfo", Info);
    console.log("PoetID", ID);
    this.PoetInfo = {
      poetId: Info[ID].poetId,
      name: Info[ID].name,
      year: Info[ID].year,
      intro: Info[ID].intro
    };
    console.log(this.PoetInfo.name);
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.PoetInfo.intro),
    b: common_vendor.p({
      title: $data.PoetInfo.name,
      ["sub-title"]: $data.PoetInfo.year
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/如梦令寒假/App01/pages/PoetInfo/PoetInfo.vue"]]);
wx.createPage(MiniProgramPage);
