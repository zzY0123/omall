<template>
  <div class="bottom-bar">
    <Check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></Check-button>
    <span class="all-checked">全选</span>
    <span class="total-price">合计：{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        // this.$store.state.cartList
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
      //   return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;

      // return !(this.cartList.filter(item => !item.checked).length);

      // 效率更高
      return !this.cartList.find((item) => !item.checked);

      /*
		let isChecked = false;
		for (let item of this.carList) {
			if (!item.checked) {
				return false;
			}
		}
		return true;
		*/
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }

	  // 因为在forEach遍历时，checked随时都在变化，相互影响，所以这个代码不能这样简化
	  // this.cartList.forEach(item => item.checked = !this.isSelectAll);
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 1500)
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 40px;
  padding-left: 35px;
  box-sizing: border-box;
  /* position: relative; */
}

.bottom-bar .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 11px;
}

.bottom-bar .all-checked {
  line-height: 40px;
}

.bottom-bar .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-bar .buy-product {
  background-color: pink;
  font-size: 14px;
  color: #fff;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  float: right;
}
</style>
