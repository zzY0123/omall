<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "../../../components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}

/* 
修复bug
bug描述:scroll失效
bug原因:height父子高度没有设置设置好
bug修复:按照现在这种设置,并且在以后注意better-scroll需要在父高度设定一个确认的值
 */
.content {
  height: 100%;
  overflow: hidden;
}
</style>
