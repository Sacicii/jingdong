import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
    }
  },
  mutations: {
    //  更改商品数量
    addCartCount (state, payload) {
      const { shopId, productId, productInfo, isAdd } = payload
      // console.log(shopId, productId, productInfo, isAdd)
      let shopInfo = state.cartList[shopId]// 获取state中对应店铺信息 没有则新建空对象
      if (!shopInfo) {
        shopInfo = {}
      }
      let product = shopInfo[productId]// 获取店铺中对应商品信息 没有则赋值成传入的商品信息
      if (!product) {
        product = productInfo
        product.count = 0
      }
      isAdd ? product.count += 1 : product.count > 0 ? product.count -= 1 : product.count = 0
      product.count > 0 ? product.check = true : product.check = false // 确认是否勾中
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    },

    // 更改商品选中状态
    checkChange (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    }
  },
  actions: {
  },
  modules: {
  }
})
