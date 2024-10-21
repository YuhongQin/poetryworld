<template>
	<view class="PoetInfoContainer">
		<uni-card v-bind:title="PoetInfo.name" v-bind:sub-title="PoetInfo.year">
			<text class="uni-body">{{PoetInfo.intro}}</text>
		</uni-card>
		<view style="color: rgba(255, 255, 255, 0);">1</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PoetInfo:
					{
						poetId: 0,
						name: '',
						year: '',
						intro: '',
					}
			};
		},
		onLoad: function (options) { //option为object类型，会序列化上个页面传递的参数
			let Info = JSON.parse(decodeURIComponent(options.Data));
			let ID = options.PoetID;
		    console.log('PoetInfo', Info);
			console.log('PoetID',ID);
			this.PoetInfo = {
				poetId : Info[ID].poetId,
				name : Info[ID].name,
				year : Info[ID].year,
				intro : Info[ID].intro,
			};
			console.log(this.PoetInfo.name);
		},
	}
</script>

<style lang="scss">
	.PoetInfoContainer {
		width: 100%;
		margin-bottom: 50px;
	}
</style>
