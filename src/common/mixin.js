import BackTop from "../components/content/backTop/BackTop.vue"

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	/*
	修复bug
	bug描述：混入后不能返回顶部
	bug原因：函数名错误，导致函数不能执行
	bug修复：修改函数名
	*/
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0, 0);
		}
	},
}

 