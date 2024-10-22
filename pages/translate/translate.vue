<template>
  <view class="container">
    <view class="row" style="justify-content: center;">
      <view class="col col-11">
        <view class="banner" style="background-color: #bab5ad; text-align: center; padding: 16px; border-radius: 8px;">
          <text class="text-h5">&nbsp;古诗文 &nbsp;&nbsp;&nbsp;&nbsp; → &nbsp;&nbsp;&nbsp;&nbsp;现代汉语&nbsp;</text>
        </view>
      </view>
    </view>
    <view class="row" style="justify-content: center;">
      <view class="col col-5">
        <view class="row" style="justify-content: center;">
          <textarea
            v-model="query"
            placeholder="输入古诗文"
            style="width: 100%; height: 280px; border: 1px solid #ddd; border-radius: 8px; padding: 10px;"
            :maxlength="200"
            @keyup.enter="submit_node"
          ></textarea>
        </view>
      </view>
      <!-- 搜索button -->
      <view class="col col-1" style="align-self: center;">
        <view class="row" style="justify-content: center;">
          <button
            :loading="loading"
            :disabled="loading"
            @click="submit_node"
            style="padding: 10px; border: none; background-color: #bab5ad; border-radius: 5%;"
          >
            <text>点击翻译为现代汉语</text>
          </button>
          <!-- <view style="margin-top: 5px; text-align: center;"></view> -->
        </view>
      </view>
      <view class="col col-5">
        <view class="row" style="justify-content: center;">
          <textarea
            readonly
            placeholder="现代汉语译文"
            style="width: 100%; height: 480px; border: 1px solid #ddd; border-radius: 8px; padding: 10px;"
            :value="result"
          ></textarea>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
	import request from '../../utils/request'
export default {
  data() {
    return {
      query: '',
      poemRules: [
        (v) => !!v || '输入不得为空',
        (v) => (v && v.length <= 800) || '不得超过800字',
      ],
      loading: false,
      result:"", // ·返回本地图片路径list
      // history:[]
    }
  },

  methods: {
    submit_node() {
      const _this = this
      console.log(_this.query)
      this.loading = true

      request({
        method: 'POST',
        url: `/api/NMT/samplezh?poem=${encodeURIComponent(_this.query)}`,
        // param: {
        //   poem: _this.query,
        // }
      })
        .then((res) => {
			console.log(res);
          // _this.result = res.data.trans_zh // api版
          _this.result = res // torchserve版

          // _this.history.push([_this.query,_this.result])
          this.loading = false
        })
        .catch((error) => {
          console.log('古文翻译请求失败')
          console.log(error)
          this.loading = false
        })
    },

  },
}
</script>

<style scoped></style>
