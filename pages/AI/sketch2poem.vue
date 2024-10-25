<template>
  <view class="canvas-display">
    <!-- Page Title -->
    <view class="page-title">
      <text class="title">涂鸦配诗</text>
    </view>

    <!-- Drawing Area -->
    <xiaobai-draw
	  ref="draw"
      :width="750"
      :height="750"
      :background="'#fff'"
      :color="'#000'"
      :size="1"
      @onSave="handleSave"
    />

    <!-- Action Buttons -->
    <view class="submit-section">
      <button @click="undo">重置</button>
      <button @click="save">提交搜素</button>
    </view>

    <!-- Results Display -->
    <view class="results-display">
      

      <!-- Poem -->
      <view class="poem-section">
        <view class="poem-title">匹配结果</view>
        <swiper circular indicator-dots autoplay :interval="10000" style="height: 72vh">
          <swiper-item v-for="(info, index) in results" :key="index">
            <button @click="navigateToPoetry(info.poetry_id)">{{ info.name }}</button>
            <text>{{ info.author }}</text>
            <view class="poem-content" v-for="(item, i) in info.content" :key="i">{{ item }}</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import request from '../../utils/request.js';
import Draw from '../../components/xiaobai-draw/xiaobai-draw.vue'; // 替换为实际路径

export default {
  data() {
    return {
      dialogTitle: "涂鸦配诗算法",
      dialogContent: "AI智能匹配，采用基于知识增强的古诗-涂鸦预训练模型。",
      uploadSketch: undefined,
      imageUrl: undefined,
      no_upload: true,
      results: [],
      loading: false,
    };
  },



  methods: {
	
    handleSave(tempFilePath) {
      this.imageUrl = tempFilePath
    },
    undo() {
      this.$refs.draw.back();
    },
    save() {
      this.$refs.draw.save();
	  this.submitSketch();
    },

    submitSketch() {
      this.loading = true;
      const fd = new FormData();
    
	  if (this.imageUrl) {
		  const imgBlob = this.dataURItoBlob(this.imageUrl)
		  console.log(imgBlob);

		  fd.append('file', imgBlob);

	  }
      this.sendRequest(fd);
    },

    sendRequest(fd) {
		
		uni.uploadFile({  
		    url: "http://www.poetryworld.cn:8198/api/v2/sketch2poem",  
		    filePath: this.imageUrl, // 随便填，不为空即可  
		    name: 'file', // 随便填，不为空即可  
		    header: {
				'Content-Type': 'multipart/form-data',
			}, // 可以加access_token等  
		    formData: fd, // 接口参数，json格式，底层自动转为FormData的格式数据  
            success: (uploadFileRes) => {
                console.log('上传成功:', uploadFileRes);
                const data = JSON.parse(uploadFileRes.data);  // 解析返回的 JSON 数据
                console.log(data);
            },
            fail: (error) => {
                console.error('上传失败:', error);
            }})
      // request({
      //   method: 'POST',
      //   url: '/api/v2/sketch2poem',
      //   data: formData,
      //   headers: {
      //     'Content-Type': "application/x-www-form-urlencoded",
      //     emulateJSON: true,
      //   },
      // })
      // .then(response => {
      //   this.results = response.poems;
      //   this.loading = false;
      //   this.no_upload = false;
      // })
      // .catch(error => {
      //   console.log('涂鸦配诗请求失败', error);
      //   this.loading = false;
      //   this.no_upload = false;
      // });
    },
    dataURItoBlob(dataURI) {
      const byteString = window.atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
  },
};
</script>

<style scoped>
.page-title .title {
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
}

.canvas-display {
  padding: 10px;
}

.submit-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.poem-section {
  background-color: #EBE5D1;
  padding: 15px;
  border-radius: 10px;
  margin: 10px;
}

.poem-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.poem-content {
  max-height: 57vh;
  overflow-y: auto;
}

/* Additional responsive styles */
@media screen and (max-width: 600px) {
  .page-title .title {
    font-size: 20px;
  }

  .submit-section {
    flex-direction: column;
    align-items: center;
  }

  .poem-title {
    font-size: 18px;
  }
}
</style>
