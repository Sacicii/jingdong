import { useStore } from 'vuex'
// import { toRefs } from 'vue'

// 修改商品数量
export const useCommonCartEffect = () => {
  const store = useStore()
  // const { cartList } = toRefs(store.state)
  const handleCountChange = (shopId, productId, productInfo, isAdd) => {
    store.commit('addCartCount', { shopId, productId, productInfo, isAdd })
    // console.log(shopId, productId, productInfo)
  }
  return { handleCountChange }
}
