import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1');
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('添加新的商品');
      }
    })
  }
}

/*
export default {
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)

    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  }
}
*/

/*
export default {
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)

    if (oldProduct) {
      context.commit('addCounter', oldProduct);
    } else {
      payload.count = 1;
      context.commit('addToCart', payload);
    }
  }
}
*/
