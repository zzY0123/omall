<template>
  <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['cartLength'])   => ({{cartLength}})
    ...mapGetters({
      length: 'cartLength'
    })
    /*
    cartLength() {
      return this.$store.getters.cartLength;
      // return this.$store.state.cartList.Length;
    }
    */
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background: pink;
  color: #fff;
}
</style>
