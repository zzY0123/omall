import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
  cartList: []
}

/*
修复bug
bug描述：挂载不了vuex，页面显示不出来，并提示需要构造函数
bug原因：引入文件不对，应该是构造函数，构造函数首字母大写
bug修复：将from 'Vue' => from 'vue'  和  store => Store  
 */
const store = new Vuex.Store({
  /*
  state: {
    cartList: []
  },
  */

  state,
  mutations,
  actions,
  getters

  /*
  // 由于mutations中函数方法只可能单一，所以最好放在actions  
  mutations: {
    addCart(state, payload) {
	  // 添加新商品
	  // 1
      let oldProduct = null;
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
	  }
	  // 2
	  let oldProduct = state.cartList.find(function (item) {
		  return item.iid === payload.iid
	  });
	  
	  let oldProduct = state.cartList.find((item) => item.iid === payload.iid);
	  
      // 购物车商品数量
      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        payload.count = 1;
        state.cartList.push(payload);
      }
    }
  }
  */

  /*
  mutations: {
    // 更好的跟踪监听数量情况
    addCounter(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid);

      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit('addCounter', oldProduct);
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit('addToCart', payload);
      }
    }
  }
  */
 
})

export default store;
