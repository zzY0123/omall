
<template>
  <div class="wrapper" ref="wrapper">        <!-- vue当中使用ref可以明确的指向哪个组件 -->
	  <div class="content">
	  	<slot></slot>
	  </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
	probeType: {
		type: Number,
		default: 0
	},
	pullUpLoad: {
		type: Boolean,
		default: false
	}  
  },
  data() {
	  return {
		  scroll: null
	  }
  },
  mounted() {
	// 不建议使用，因为不能明确的指定
	// this.scroll = new BScroll(document.querySelector('wrapper'));
	// 创建
	this.scroll = new BScroll(this.$refs.wrapper, {
		// probeType: 3,
		// 让用户自己选择是否需要实时监听
		probeType: this.probeType,
		click: true,
		// pullUpLoad: true,
		pullUpLoad: this.pullUpLoad,
	})

	// 监听滚动位置
	// this.scroll.on("scroll", (position) => {
	// 	// console.log(position);
	// 	this.$emit("scroll", position);
	// })
	// 优化版
	if(this.probeType == 2 || this.probeType == 3) {
		this.scroll.on("scroll", (position) => {
			// console.log(position);
			this.$emit("scroll", position);
		})
	}

	// 监听上拉事件
	// this.scroll.on("pullingUp", () => {
	// 	// console.log("end");
	// 	this.$emit("pullingUp")
	// })  
	// 优化版
	if(this.pullUpLoad) {
		this.scroll.on("pullingUp", () => {
			// console.log("end");
			this.$emit("pullingUp");
		})  
	}
	// 修复bug
	// this.scroll.refresh();
	// console.log(this.scroll);
  },
  methods: {
	// 封装一个返回最上层方法
	scrollTo(x, y, time = 300) {
		// this.scroll.scrollTo(x, y, time);
		this.scroll && this.scroll.scrollTo(x, y, time);
	},
	// 封装一个上拉加载更多结束方法
	finishPullUp() {
		// this.scroll.finishPullUp();
		this.scroll && this.scroll.finishPullUp();
	},
	refresh() {
		// this.scroll.refresh(); 
		// 为了防止加载过快而产生null或者undefined，应该先进行判断scroll是否有值
		this.scroll && this.scroll.scrollTo && this.scroll.refresh(); 
	},
	getScrollY() {
		// console.log(this.scroll);
		return this.scroll ? this.scroll.y : 0;
	} 
  },
}
</script>

<style scoped>

</style>
