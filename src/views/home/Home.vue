<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-top-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入组件
import NavBar from "../../components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";
// 导入网络请求
import { getHomeMultidata, getHomeGoods } from "../../network/home";
// 导入第三方插件
// import BScorll from 'better-scroll'
// 导入轮播图
// import {Swiper, SwiperItem} from "../../components/common/swiper"
// 导入js工具箱
import { debounce } from "../../common/utils";
import { backTopMixin } from "../../common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      // 保存请求出来的数据
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,     //在组件上给指令赋值，有可能被当成一个变量，所以需要这样做
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [backTopMixin],
  computed: {
    showGoods() {
      // 注意this应用
      return this.goods[this.currentType].list;
    },
  },
  // 在里面写的是主要逻辑，执行函数抽取到methods中
  created() {
    // 请求多个数据
    // 一定要写this，否则会指向的是导入进来的函数，而不是封装好的函数
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
    // 利用事件总线
    // 但已经不能使用了，要自己在prototype上添加$bus
    // this.$bus.$on("itemImageLoad", () => {
    // console.log('1');
    // this.$refs.scroll.refresh();
    // })
    // 优化版 函数防抖 减少向服务器请求次数
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("homeItemImageLoad", () => {
      refresh();
    });

    // 由于很多图片没有加载完，所以拿到的offsetTop不准确
    // this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  destroyed() {
    console.log("销毁了");
  },
  activated() {
    // console.log('activated');
    // 修复bug
    // bug描述：其他页面跳回首页，发现偶尔位置会自动返回最上层
    // bug原因：1.还未找到    2.版本问题
    // bug修复：1.调试的时候发现只要time添加一个值就可以修复这个bug，所以把0替换成1
    //          2.更换版本
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY();
    // this.$bus.$off("itemImageLoad", () => {

    // })
  },
  methods: {
    // 网络请求
    // 请求主页
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 保存请求出来的数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求商品
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; // 页码
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        // this.$refs.scroll.scroll.finishPullUp()
        this.$refs.scroll.finishPullUp();
      });
    },
    // 事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    /*
    // 回到最上层
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.scrollTo(0, 0); // 封装版本
    },
    */
    // 返回最上层隐藏和显示;固定分页栏
    contentScroll(position) {
      // console.log(position);
      // if(position.y > 1000) {}
      this.isShowBackTop = -position.y > 1237;

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      // console.log("end");
      this.getHomeGoods(this.currentType);
    },
    // 函数防抖
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // }

    // 固定分页栏获取高度
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: pink;
  color: #fff;
  /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}

.tab-top-control {
  position: relative;
  z-index: 9;
}

/* .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  } */

/* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
    background-color: #fff;
  } */

.content {
  /* height: calc(100% - 44px - 49px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  /* z-index: 5; */
}
</style>
