"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      swipers: [
        "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png",
        "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png",
        "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
      ],
      gridList: [
        {
          url: "/static/dataMining/text.png",
          text: "常用字分析",
          badge: "0"
        },
        {
          url: "/static/dataMining/word.png",
          text: "常用词分析",
          badge: "1"
        },
        {
          url: "/static/dataMining/color.png",
          text: "颜色统计分析",
          badge: "2"
        },
        {
          url: "/static/dataMining/idea.png",
          text: "意象统计分析",
          badge: "3"
        },
        {
          url: "/static/dataMining/season.png",
          text: "季节统计分析",
          badge: "4"
        },
        {
          url: "/static/dataMining/network.png",
          text: "全朝代关系网络",
          badge: "5"
        },
        {
          url: "/static/dataMining/knowledge.png",
          text: "知识图谱",
          badge: "6"
        },
        {
          url: "/static/dataMining/influence.png",
          text: "人物影响力",
          badge: "7"
        },
        {
          url: "/static/dataMining/books.png",
          text: "古籍数据",
          badge: "8"
        }
      ]
    };
  },
  methods: {
    navClick(navId) {
      if (navId == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/Text/Text"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swipers, (item, k0, i0) => {
      return {
        a: item
      };
    }),
    b: common_vendor.f($data.gridList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.navClick(index), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/如梦令寒假/App01/pages/DM/DM.vue"]]);
wx.createPage(MiniProgramPage);
