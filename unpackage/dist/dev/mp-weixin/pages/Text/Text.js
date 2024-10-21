"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dynastySelected: 0,
      range: [
        { value: 0, text: "先秦" },
        { value: 1, text: "汉" },
        { value: 2, text: "魏晋" },
        { value: 3, text: "南北朝" },
        { value: 4, text: "隋" },
        { value: 5, text: "唐" },
        { value: 6, text: "宋" },
        { value: 7, text: "辽" },
        { value: 8, text: "金" },
        { value: 9, text: "元" },
        { value: 10, text: "明" },
        { value: 11, text: "清" },
        { value: 12, text: "汇总" }
      ]
    };
  },
  methods: {
    navBack() {
      common_vendor.index.navigateBack({});
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
  return {
    a: common_vendor.o(($event) => _ctx.getPoetData()),
    b: common_vendor.o(($event) => $data.dynastySelected = $event),
    c: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.dynastySelected
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/如梦令寒假/App01/pages/Text/Text.vue"]]);
wx.createPage(MiniProgramPage);
