<template>
	<view class="draw">
		<canvas canvas-id="myDraw" disable-scroll="true" :style="{'width': width + 'px', 'height': height + 'px'}" @touchstart="onStart" @touchmove="onMove"></canvas>
	</view>
</template>

<script>
	export default {
		name: 'draw',
		props: {
			width: {
				type: Number,
				default: uni.upx2px(750)
			},
			height: {
				type: Number,
				default: uni.upx2px(750)
			},
			background: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#000'
			},
			size: {
				type: Number,
				default: 1
			}
		},
		methods: {
			init: function () {
				this.s = []
				this.onDraw()
			},
			back: function () {
				this.s.splice(this.s.length - 1, 1)
				this.onDraw()
			},
			save: function (w = uni.upx2px(750), h = uni.upx2px(750)) {
				let that = this
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: this.width,
				  height: this.height,
				  destWidth: w,
				  destHeight: h,
				  canvasId: 'myDraw',
				  success: function(res) {
					that.$emit('onSave', res.tempFilePath)
				  },
				  fail(e) {
				  	console.log(e)
				  }
				})
			},
			onStart: function (e) {
				const t = e.changedTouches[0]
				this.s.push({
					x: t.x,
					y: t.y,
					location: []
				})
			},
			onMove: function (e) {
				const t = e.changedTouches[0]
				
				this.s[this.s.length - 1].location.push({
					x: t.x,
					y: t.y
				})
				
				this.onDraw()
			},
			onDraw: function () {
				this.drawBG()
				
				for (let j of this.s) {
					this.can.moveTo(j.x, j.y)
					
					for (let i of j.location) {
						this.can.lineTo(i.x, i.y)
					}
				}
				
				this.can.setStrokeStyle(this.color)
				this.can.setLineWidth(this.size)
				this.can.stroke()
				
				this.can.draw()
			},
			drawBG: function () {
				this.can.setFillStyle(this.background)
				this.can.fillRect(0, 0, this.width, this.height)
			}
		},
		created() {
			this.can = uni.createCanvasContext('myDraw')
		},
		mounted() {
			this.drawBG()
			this.can.draw()
		},
		data() {
			return {
				can: undefined,
				s: []
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
