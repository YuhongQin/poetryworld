<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	//@import url("./static/iconfonts/iconfont.wxss");
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	@font-face {
		font-family: "jinghua";
		src: url('static/fonts/jinghua.ttf');
	}
	page {
		background-color: #eadfcb;
		font-family: 'jinghua', serif;
	}
	/* 自定义 tabBar,标题 字体 */
	.uni-tabbar {
	  font-family: 'jinghua', serif;
	  font-size: 14px;
	}
	.uni-page-head{
		font-family: 'jinghua', serif;
	}
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
