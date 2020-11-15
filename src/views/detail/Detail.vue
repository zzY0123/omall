<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="isShow"></toast> -->
  </div>
</template>

<script>
// import NavBar from "../../components/common/navbar/NavBar"
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/scroll/Scroll";

import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";
// import Toast from '../../components/common/toast/Toast'

import { mapActions } from "vuex";

// 数据请求
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";

import { debounce } from "../../common/utils";
import { backTopMixin } from "../../common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopsY: [],
      currentIndex: 0,
      getThemeTopsY: null,
      // message: '',
      // isShow: false
      // isShowBackTop: false,
    };
  },
  // 利用混入完成到达顶部
  mixins: [backTopMixin],
  components: {
    // NavBar
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    // Toast
    // BackTop,
  },
  created() {
    // console.log(this.$route.params);
    this.iid = this.$route.params.iid;

    // 请求详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 获取数据
      const data = res.result;

      // 轮播图
      // this.topImages = res.result.itemInfo.topImages;
      this.topImages = data.itemInfo.topImages;

      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 店铺详情页
      this.shop = new Shop(data.shopInfo);

      // 商品详细
      this.detailInfo = data.detailInfo;

      // 参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /*
      this.getThemeTopsY = debounce(() => {
        this.themeTopsY = [];
        this.themeTopsY.push(0);
        this.themeTopsY.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopsY.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopsY.push(this.$refs.recommend.$el.offsetTop - 44);
        // console.log(this.themeTopsY);
      })
      */

      /*
      this.$nextTick(() => {
        this.themeTopsY = [];
        this.themeTopsY.push(0);
        this.themeTopsY.push(this.$refs.params.$el.offsetTop);
        this.themeTopsY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopsY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopsY);
      });
      */
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  methods: {
    // 将vuex当中的actions映射在detail当中
    ...mapActions(["addCart"]),
    /*
    ...mapActions({
      add: 'addCart'
    })
    */

    // 等待刷新图片
    imageLoad() {
      this.$refs.scroll.refresh();

      /*
      修复bug
      bug描述：在进行跳转的时候失败
      bug原因：第一次才想到了在更新后执行（updated），发现此时跳转失败，原因是图片还没有加载完就生成了高度，第一次是使用$nextTeck(),发现还是失败，原因还是图片还没有加载完，但是在   imageLoad之后刷新   后发现跳转时不对，经过比较，发现是忘记减少了头部的高度，所以-44
      bug修复：在全部图片加载后再往数组中push相应的高度，并且减去头部高度
      */

      this.themeTopsY = [];
      this.themeTopsY.push(0);
      this.themeTopsY.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopsY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopsY.push(this.$refs.recommend.$el.offsetTop - 44);

      // this.themeTopsY.push(Number.MAX_VALUE);
      // console.log(this.themeTopsY);

      // this.getThemeTopsY();
    },
    // 头部导航
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopsY[index]);
    },
    contentScroll(position) {
      const positionY = -position.y;
      // 跟随导航移动
      /* 
      修复bug
      bug描述：不能准确完成想要效果，滚动和导航栏对应 
      bug原因：for...in是对象枚举，枚举出来的是字符串形式00，01，02，03；则他们+1的话变成10，11，12，13，导致数据不准确
      bug修复：改成for循环或者parseInt转换成Number类型
      */
      /*
      for(let i in this.themeTopsY) {
        // console.log(i);
        if (positionY > this.themeTopsY[parseInt(i)] && positionY < this.themeTopsY[parseInt(i+1)]) {
       
        }
      }
      */
      /* 
      修复bug
      bug描述：发现代码完成，但是效果还是失败
      bug原因：经过log分析，发现都取得到值，但是就是不跳转，仔细分析if语句发现，length代表的是this.themeTopsY数组的长度，而我没有先定义，直接使用，导致判断失败
      bug修改：提前声明一个length
      */
      // 0
      // Number.MAX_VALUE  最大值
      let length = this.themeTopsY.length;
      for (let i = 0; i < length; i++) {
        // console.log(this.themeTopsY[i]);
        if (
          this.currentIndex !== i && // 防止赋值过于频繁，降低性能
          ((i < length - 1 && // 判断是否越界
            positionY >= this.themeTopsY[i] && //  判断区间
            positionY < this.themeTopsY[i + 1]) ||
            (i === length - 1 && // 判断是否越界
              positionY >= this.themeTopsY[i])) // 判断区间
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(i);
        }
      }

      // 回到顶部按钮隐藏与出现
      this.isShowBackTop = positionY > 1000;
    },
    // 回到顶部
    /*
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    */
    // 加入购物车
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      // console.log(product);

      // this.$store.commit('addCart', product);
      // this.$store.dispatch("addCart", product);

      // 添加商品成功加入购物车弹窗 
      // this.add(product).then((res) => {
      this.addCart(product).then((res) => {
        /*
        this.isShow = true;
        this.message = res; 
        console.log(res);
        setTimeout(() => {
          this.isShow = false;
          this.message = ""
        }, 1500)
        */
       this.$toast.show(res, 1500);
      });
      /*
      this.$store.dispatch("addCart", product).then((res) => {
        console.log(res);
      });
      */
    },
  },
  mounted() {
    // 修复bug
    // bug描述：函数防抖以及解决上拉卡顿失效
    // bug原因：因为为了解决防止跳转回首页之后首页自动刷新bug，修改了goodlistitem当中的方法，导致传入函数名不正确
    // bug修复：将正确的函数名传入
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("detailItemImageLoad", () => {
      refresh();
    });
  },
  /*
  updated() {
    this.themeTopsY = [];
    this.themeTopsY.push(0);
    this.themeTopsY.push(this.$refs.params.$el.offsetTop);
    this.themeTopsY.push(this.$refs.comment.$el.offsetTop);
    this.themeTopsY.push(this.$refs.recommend.$el.offsetTop);
    console.log(this.themeTopsY);
  },
  */
};
</script>
 
<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 99;
  background-color: #fff;
  /* top: 0; */
}

.content {
  height: calc(100% - 44px - 58px);
}
</style>
