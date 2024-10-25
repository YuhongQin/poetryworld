<template>
  <view class="canvas-wrapper" ref="happyCanvas">
    <view class="toolbar" style="display: none">
      <button @tap="handleTransmit">传父级传值</button>
      <button @tap="onClear">清空</button>
      <button @tap="onUndo">撤销</button>
      <button @tap="onRedo">恢复</button><br />
      <button @tap="onChangeMode">{{ mode }}</button>
      <button @tap="onSetPen">设置画笔</button>
      <button @tap="onSave">保存</button>
    </view>
    <canvas
      canvas-id="myCanvas"
      class="canvas"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMousedown"
      @mousemove="onMousemove"
      @mouseup="onMouseup"
    />
  </view>
</template>

<script>
export default {
  name: "happy-doodle",
  props: ["canvasColor", "width", "height"],
  // props: {
  // 	can1: {
  // 		type: String,
  // 		default: function() {
  // 			return "null"
  // 		}
  // 	},
  // 	subtitle:{
  // 		type:String,
  // 		default:"默认副标题"
  // 	}
  //   },
  //实时监听某个变量变化
  // watch: {
  // 	can1: {
  // 	 handler() {
  // 			console.log('this.can1', this.$props.can1);
  // 		},
  // 		//监听到数据变化时立即执行
  // 		immediate: true
  // 	}
  // },
  data() {
    return {
      canvasLeft: 0,
      canvasTop: 0,
      canvasWidth: 300, // 画布宽度
      canvasHeight: 400, // 画布高度
      //canvasColor:'#545a7a',//画布颜色
      mode: "pen", // 当前模式：'pen'为画笔，'eraser'为橡皮擦
      drawing: false, // 是否正在画
      ctx: null, // canvas绘图上下文
      stack: [], //点击move移动时的数组
      redo: [], //
      history: [], // 操作历史记录
      historyIndex: -1, // 当前历史记录索引
      historyMax: 10, //最大缓存次数
      startX: 0, //点击时的横坐标
      startY: 0, //点击时的纵坐标
      lastX: 0, // 上一个点的横坐标
      lastY: 0, // 上一个点的纵坐标
      lineColor: "#000000", // 画笔颜色  F282A1
      lineWidth: 5, // 画笔粗细
      eraserSize: 20, // 橡皮擦大小
    };
  },
  mounted() {
    //const query = uni.createSelectorQuery().in(this);
    //console.log('query:',query);
    //console.log('canvasColor',this.canvasColor)
    let ctx = uni.createCanvasContext("myCanvas", this);
    this.ctx = ctx;
    this.ctx.setLineWidth(this.lineWidth);
    this.ctx.setStrokeStyle(this.lineColor);
    this.ctx.setFillStyle(this.canvasColor); //canvas背景颜色
    let info = uni.createSelectorQuery().in(this).select(".canvas");
    var _this = this;
    info
      .boundingClientRect(function (data) {
        //console.log('boundingClientRect:',data)
        _this.canvasWidth = data.width;
        _this.canvasHeight = data.height;
        _this.canvasLeft = data.left;
        _this.canvasTop = data.top;

        if (_this.canvasWidth == 0) {
          _this.canvasWidth = _this.width;
          _this.canvasHeight = _this.height;
        }

        //let width=data.width;
        //console.log('this.formData',_this.formData)

        _this.ctx.fillRect(0, 0, _this.canvasWidth, _this.canvasHeight); //canvas画布大小
        _this.ctx.draw(true);
        //console.log('getsize end')
      })
      .exec(function (res) {
        //console.log(res)
        // 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
      });
  },
  methods: {
    // 切换模式
    onChangeMode(mode) {
      if (mode) {
        this.mode = mode;
      } else {
        this.mode = this.mode === "pen" ? "eraser" : "pen";
      }
    },
    // 清空画布
    onClear() {
      //console.log('start clear', this.canvasWidth,this.canvasHeight)
      this.history = [];
      this.redo = [];

      //this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      //this.ctx.setFillStyle(this.canvasColor);
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight); //canvas画布大小
      this.ctx.draw(true);
      this.mode = "pen";
      //console.log('end clear')
    },
    // 撤销
    onUndo() {
      //console.log(this.history.length)
      if (this.history.length > 0) {
        let pop = this.history.pop();
        this.redo.push(pop);
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.draw(true);
        this.reDraw();
      }
    },
    // 恢复
    onRedo() {
      if (this.redo.length > 0) {
        let pop = this.redo.pop();
        this.history.push(pop);
        this.drawPop(pop);
      }
    },
    onSetPen(pen) {
      if (pen.width) this.lineWidth = pen.width;
      if (pen.color) this.lineColor = pen.color;
    },
    handleTransmit() {
      // 进行事件触发，传递数据
      //console.log($data)
      uni.$emit("Transmit", "111");
    },
    // 保存
    onSave() {
      var that = this;
      uni.canvasToTempFilePath(
        {
          canvasId: "myCanvas",
          quality: 1,
          complete: (res) => {
            //console.log('保存到相册', res);
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                uni.showToast({
                  title: "已保存到相册",
                  icon: "success",
                  duration: 2000,
                });
              },
            });
          },
        },
        that
      );
    },
    canvasToTempFilePath(object) {
      var that = this;
      uni.canvasToTempFilePath(object, that);
      //console.log('typeof(fun)',typeof(fun),fun)
      // if(typeof(fun)=='function')
      // {
      // 	uni.canvasToTempFilePath({
      // 		canvasId: 'myCanvas',
      // 		quality: 1,
      // 		complete: (res) => {
      // 			//console.log('保存到相册', res);
      // 			if(fun)
      // 			{
      // 				fun(res)
      // 			}
      // 		}
      // 	}, that);
      // }else{
      // 	//console.log('object')
      // 	uni.canvasToTempFilePath(object, that);
      // }
    },
    // 鼠标按下------------------
    onMousedown(e) {
      this.drawing = true;
      let offTop = this.$refs.happyCanvas.$el
        ? this.$refs.happyCanvas.$el.offsetParent.offsetTop
        : 0;
      const { x, y } = { x: e.pageX, y: e.pageY - offTop };
      this.lastX = x;
      this.lastY = y;
      this.stack = [];
      let item = {
        mode: this.mode,
        x: x,
        y: y,
      };
      if (this.mode == "pen") {
        item.color = this.lineColor;
        item.width = this.lineWidth;
        this.ctx.setLineWidth(item.width);
        this.ctx.setStrokeStyle(item.color);
      }
      this.stack.push(item);
      this.saveHistory();
    },
    // 鼠标移动------------------
    onMousemove(e) {
      if (this.drawing) {
        let offTop = this.$refs.happyCanvas.$el
          ? this.$refs.happyCanvas.$el.offsetParent.offsetTop
          : 0;
        const { x, y } = { x: e.pageX, y: e.pageY - offTop };
        if (this.mode === "pen") {
          this.stack.push({
            //mode:this.mode,
            x: x,
            y: y,
          });
          this.drawLine(this.lastX, this.lastY, x, y, this.lineColor);
        } else {
          this.stack.push({
            x: x,
            y: y,
          });
          this.drawRrc(x, y);
        }
        this.lastX = x;
        this.lastY = y;
      }
    },
    // 鼠标松开------------------
    onMouseup(e) {
      if (this.drawing) {
        this.history.push(this.stack);
        this.stack = [];
        this.redo = [];
        this.drawing = false;
        this.saveHistory();
      }
    },
    // 开始触摸
    onTouchStart(e) {
      //console.log('onTouchStart',e)
      // console.log('onTouchStart', JSON.stringify(e.changedTouches) )
      // let touch = this.getChangedTouch(e)
      // console.log('touch', touch)
      //console.log('e.changedTouches[0]',e.changedTouches[0])
      if (e.changedTouches[0]) {
        this.drawing = true;
        const { x, y } = this.getTouchPosition(e.changedTouches[0]);
        this.lastX = x;
        this.lastY = y;
        this.stack = [];
        let item = {
          mode: this.mode,
          x: x,
          y: y,
        };
        if (this.mode == "pen") {
          item.color = this.lineColor;
          item.width = this.lineWidth;
          this.ctx.setLineWidth(item.width);
          this.ctx.setStrokeStyle(item.color);
          //console.log('item',item)
        }
        this.stack.push(item);
        //console.log('x,y',x,y)
        this.saveHistory();
      }
    },
    // 移动触摸
    onTouchMove(e) {
      //console.log('onTouchMove',e)
      //console.log('onTouchMove',e)
      //console.log('onTouchMove',e.changedTouches)
      if (this.drawing && e.changedTouches[0]) {
        const { x, y } = this.getTouchPosition(e.changedTouches[0]);
        //console.log('x,y', x, y)
        if (this.mode === "pen") {
          this.stack.push({
            //mode:this.mode,
            x: x,
            y: y,
          });
          this.drawLine(this.lastX, this.lastY, x, y, this.lineColor);
        } else {
          //console.log('arc', this.eraserSize / 2)
          //this.ctx.save();
          //this.ctx.fillStyle = '#ffffff';
          this.stack.push({
            //mode:this.mode,
            x: x,
            y: y,
          });
          this.drawRrc(x, y);
        }
        this.lastX = x;
        this.lastY = y;
      }
    },
    // 结束触摸
    onTouchEnd(e) {
      //console.log('onTouchEnd',e)
      if (this.drawing) {
        //console.log('this.stack',this.stack)
        this.history.push(this.stack);
        this.stack = [];
        this.redo = [];
        this.drawing = false;
        this.saveHistory();
        //console.log('this.history', this.history)
      }
    },
    // 保存历史记录
    saveHistory() {},
    // 画线
    drawLine(x1, y1, x2, y2, color) {
      //console.log('x1y1x2y2',x1,y1,x2,y2);
      this.ctx.beginPath();

      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      this.ctx.draw(true);
    },
    drawRrc(x, y) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.eraserSize, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.draw(true);
    },
    drawPop(pos) {
      this.ctx.beginPath();
      //console.log(pos[0])
      // if(pos[0].mode=='color'){
      // 	this.ctx.setStrokeStyle(this.lineColor);

      // 	this.ctx.drawImage(pos[0].path,pos[0].x,pos[0].y,pos[0].w,pos[0].h);
      // }else
      if (pos[0].mode == "image") {
        this.ctx.drawImage(pos[0].path, pos[0].x, pos[0].y, pos[0].w, pos[0].h);
      } else if (pos[0].mode == "pen") {
        console.log(pos[0]);
        if (pos[0].width) {
          this.ctx.setLineWidth(pos[0].width);
        }

        if (pos[0].color) {
          this.ctx.setStrokeStyle(pos[0].color);
        }

        this.ctx.moveTo(pos[0].x, pos[0].y);
        for (var j = 1; j < pos.length; j++) {
          this.ctx.lineTo(pos[j].x, pos[j].y);
        }
        this.ctx.stroke();
      } else {
        for (var j = 0; j < pos.length; j++) {
          this.ctx.arc(pos[j].x, pos[j].y, this.eraserSize, 0, 2 * Math.PI);
        }
        this.ctx.fill();
      }
      this.ctx.draw(true);
    },
    drawImage(img, x, y, w, h) {
      let stack = {
        mode: "image",
        path: img.path,
        x: x,
        y: y,
        w: w,
        h: h,
      };
      this.history.push([stack]);
      //console.log(this.history)
      this.ctx.drawImage(img.path, x, y, w, h);
      this.ctx.draw(true);
      //console.log('drawImage',w,h)
    },
    reDraw() {
      //console.log('control reDraw',this.history)
      for (var i = 0; i < this.history.length; i++) {
        //console.log('condraw', this.history[i])
        this.drawPop(this.history[i]);
      }
    },
    getChangedTouch(e) {
      // // #ifdef APP-PLUS
      // 	if(e.changedTouches."0"){
      // 		return e.changedTouches.0
      // 	}
      // // #endif

      // // #ifndef APP-PLUS
      // 	if(e.changedTouches.length === 1){
      // 		return e.changedTouches[0]
      // 	}
      // // #endif
      return null;
    },
    // 获取触摸点坐标
    getTouchPosition(touch) {
      //console.log('touch',touch)

      const x = touch.x;
      const y = touch.y;
      //console.log('xy',x,y, this.canvasLeft,this.canvasTop)
      return {
        x,
        y,
      };
    },
  },
};
</script>
<style>
.canvas-wrapper {
  width: 100%;
  height: 100%;
}

.canvas {
  width: 100%;
  height: 100%;
  /*border: 1px solid #d5d5d6;
		background-color: aqua;*/
}

.toolbar {
  /* position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 10px;opacity:0.2;
		box-sizing: border-box; */
  background-color: #eee;
  height: 50px;
}

.toolbar button {
  margin-right: 2px;
  width: 70px;
  float: left;
}
</style>
