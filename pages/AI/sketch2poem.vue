<template>
  <view class="canvas-display">
    <!-- Page Title -->
    <view class="page-title">
      <text class="title">涂鸦配诗</text>
    </view>
    
    <!-- Return Button -->
    <view v-if="!no_poem" class="return-button">
      <button @click="clearAll(true)">重置</button>
    </view>
    
    <!-- Function Bar -->
    <view v-if="no_poem" class="function-bar">
      <!-- Upload -->
      <view class="upload-section">
        <button @click="dialog=true">上传涂鸦</button>
        <view v-if="dialog" class="dialog">
          <view class="dialog-content">
            <text>精选样例</text>
            <swiper circular indicator-dots autoplay :interval="4000" style="height: 60vh">
              <swiper-item v-for="(path, index) in sampleUrl" :key="index">
                <image :src="path" style="width: 100%; height: 100%;" @click="selectSample(path)"></image>
              </swiper-item>
            </swiper>
            <input type="file" @change="previewImage">
            <button @click="selectImg">保存上传</button>
          </view>
        </view>
      </view>
      
      <!-- Submit -->
      <view class="submit-section">
        <button @click="submit_node">提交搜索</button>
      </view>
      
      <!-- Clear -->
      <view v-if="!uploadSketch" class="clear-section">
        <button @click="clearCanvas">清空画布</button>
        <button @click="startErase">切换橡皮</button>
        <button @click="stopErase">切换画笔</button>
        <slider v-model="penWidth" min="1" max="15" step="1">粗细</slider>
      </view>
    </view>
    
    <!-- Canvas/Preview -->
    <view v-if="no_poem" class="canvas-preview">
      <image v-if="uploadSketch" :src="imageUrl" style="max-height:60vh;"></image>
      <canvas v-else ref="canvas" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="draw"></canvas>
    </view>
    
    <!-- Results Display -->
    <view v-else class="results-display">
      <!-- Drawing -->
      <view class="drawing-section">
        <image :src="imageUrl" style="max-height:55vh;"></image>
      </view>
      
      <!-- Poem -->
      <view class="poem-section">
        <view class="poem-title">匹配结果</view>
        <swiper circular indicator-dots autoplay :interval="10000" style="height: 72vh">
          <swiper-item v-for="(info, index) in results" :key="index">
            <button @click="navigateToPoetry(info.poetry_id)">{{info.name}}</button>
            <text>{{ info.author }}</text>
            <view class="poem-content" v-for="(item, i) in info.content" :key="i">{{ item }}</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
	// import JCanvasBroad from '@/components/sketch/JCanvasBroad.vue'
	import request from '../../utils/request.js'
	export default {
		
		data() {
			return {
				dialogTitle: "涂鸦配诗算法",
				dialogContent: "AI智能匹配，采用基于知识增强的古诗-涂鸦预训练模型。",
				uploadSketch: undefined,
				imageUrl: undefined,
				no_upload: true,
				no_poem: true,
				poem_author: '',
				poem_content: '',
				poem_title: '',
				score: 0,
				loading: false,

				dialog: false,
				sampleUrl: ['./images/test.jpg'], // USE_LOCAL_SMALL=True选择小规模古诗时，FSCOCO_000000041952→FSCOCO_000000060576

				isDrawing: false,
				canvas: null,
				context: null,
				isErase: false,
				penColor: {
					'white': "#ffffff",
					'black': "#000000"
				},
				penWidth: 2,
				results: [],	
			}
		},
		mounted() {
		  this.$nextTick(() => {
		    this.canvas = document.querySelector('canvas')
		    if (this.canvas && this.canvas instanceof HTMLCanvasElement) {
		      console.log('is canvas');
		      this.context = this.canvas.getContext('2d');
		      // 更新窗口尺寸
		      window.addEventListener('resize', this.updateCanvasSize);
		      this.updateCanvasSize();
		    } else {
		      console.error('canvas 元素未找到');
		    }
		  });
	},
		beforeUnmount() {
			window.removeEventListener('resize', this.updateCanvasSize);
		},

		methods: {
			selectImg() { // 确定上传本机图片
				this.dialog = false
				this.previewImage()
			},
			selectSample(chooseSample) { // 选择本地样例图片
				this.clearAll(false)
				this.dialog = false
				this.no_upload = false
				this.imageUrl = chooseSample

				fetch(this.imageUrl)
					.then(response => response.blob())
					.then(blob => {
						this.uploadSketch = blob;
					})
					.catch(error => {
						console.error('Error fetching image:', error);
					});
			},
			updateCanvasSize() { // 更新窗口尺寸
				const rect = this.canvas.parentNode.getBoundingClientRect();
				this.canvas.width = rect.width;
				this.canvas.height = rect.height;
			},

			previewImage() {
				const _this = this
				if (!_this.uploadSketch) {
					_this.no_upload = true
					_this.imageUrl = undefined
					return
				}
				_this.no_upload = false
				const reader = new FileReader()
				reader.readAsDataURL(_this.uploadSketch)
				reader.addEventListener('load', () => {
					_this.imageUrl = reader.result
				})
			},

			dataURItoBlob(dataURI) { // base64 string -> blob
				const byteString = window.atob(dataURI.split(',')[1]);
				const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
				const ab = new ArrayBuffer(byteString.length);
				const ia = new Uint8Array(ab);
				for (let i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				return new Blob([ab], {
					type: mimeString
				});
			},

			submit_node() {
				const _this = this
				_this.loading = true
				const fd = new FormData();

				if (_this.uploadSketch) {
					console.log('收到文件')
					fd.append('file', _this.uploadSketch);
				} else {
					// const canvas = document.getElementById('canvas');  // 获取canvas标签
					_this.imageUrl = _this.canvas.toDataURL("image/png"); // 将画板保存为图片base64 string
					const blob = _this.dataURItoBlob(_this.imageUrl);
					fd.append('file', blob); // 无法直接添加base64, 需转为blob
				}

				_this.loading = true
				/* Call API 涂鸦配诗 */
				request({
						method: 'POST',
						url: '/api/v2/sketch2poem',
						data: fd,
						headers: {
							'Content-Type': 'multipart/form-data',
							emulateJSON: true,
						},
					})
					.then((response) => {
						console.log('涂鸦配诗请求成功')
						console.log(response)
						// 用于轮播
						_this.results = response.poems

						// // 仅第一个结果
						// _this.poem_title = response.data.poems[0].name
						// _this.poem_author = response.data.poems[0].author
						// // 改格式
						// _this.poem_content = response.data.poems[0].content // 分句list
						// _this.score = response.data.scores[0] // list
						// console.log('结果得分：', _this.score)

						_this.loading = false
						_this.no_poem = false
					})
					.catch((error) => {
						console.log('涂鸦配诗请求失败', error)
						_this.poem_content = '请更换重试'
						_this.loading = false
						_this.no_poem = false
					})
			},

			clearAll(isF5) {
				// 刷新页面，否则canvas无法绘制
				if (isF5) {
					location.reload()
				} else {
					this.poem_author = ''
					this.poem_content = ''
					this.poem_title = ''
					this.results = []
					this.score = 0
					this.uploadSketch = false
					this.imageUrl = undefined
					this.no_upload = true
					this.no_poem = true
					this.loading = false
					this.isDrawing = false
				}

				// // 重置画布
				// this.clearCanvas()
				// // window.addEventListener('resize', this.updateCanvasSize);
				// // this.updateCanvasSize();
			},

			startDrawing() {
				this.isDrawing = true;
				this.context.beginPath();
			},
			stopDrawing() {
				this.isDrawing = false;
			},
			draw(e) {
				if (!this.isDrawing) return;
				const rect = this.canvas.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				this.context.lineWidth = this.penWidth;
				this.context.lineCap = 'round';
				this.context.lineTo(x, y);
				this.context.stroke();
			},

			startErase() {
				this.context.strokeStyle = this.penColor.white
				this.isErase = true
			},
			stopErase() {
				this.context.strokeStyle = this.penColor.black
				this.isErase = false
			},

			clearCanvas() {
				const w = this.canvas.width;
				const h = this.canvas.height;
				this.context.clearRect(0, 0, w, h);
			}
		},
	}
</script>

<style scoped>
/* Page title styling */
.page-title .title {
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
}

/* Canvas display container */
.canvas-display {
  padding: 10px;
}

/* Function bar styles */
.function-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

/* Upload section styles */
.upload-section, .submit-section, .clear-section {
  margin-bottom: 20px;
}

/* Dialog styles */
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.dialog-content {
  max-height: 80vh;
  overflow-y: auto;
}

/* Button styles */
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

/* Canvas styles */
canvas {
  width: 100%;
  height: 400rpx;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Poem display styles */
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

/* General responsive styles */
@media screen and (max-width: 600px) {
  .page-title .title {
    font-size: 20px;
  }

  .upload-section, .submit-section, .clear-section {
    width: 100%;
    margin-bottom: 15px;
  }

  .dialog-content {
    width: 90vw;
    height: 70vh;
  }

  .poem-section {
    margin: 5px;
  }

  .poem-title {
    font-size: 18px;
  }
}

</style>