<template>
  <div class="wrapper">
    <!-- 搜索 -->
    <div class="search">
      <div class="search__back iconfont" @click="handleBack">&#xe649;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe607;</span>
        <input type="text" class="search__content__input" placeholder="请输入商品名称">
      </div>
    </div>
    <!-- 商品信息 -->
    <ShopInfo
      :item = 'item'
      :hideBorder="true"
      v-show="item.imgUrl"
    />
    <Content/>
    <Cart/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    const res = await get(`/api/shop/${route.params.id}`)
    if (res?.errno === 0 && res?.data) {
      data.item = res.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 返回
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBack } = useBackRouterEffect()
    getItemData()
    return {
      item,
      handleBack
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
  padding: 0 .18rem;
}
.search{
  display: flex;
  margin: .14rem 0 .04rem 0;
  &__back{
    width: .3rem;
    font-size: .24rem;
    color: #b6b6b6;
  }
  &__content{
    display: flex;
    flex: 1;
    height: .32rem;
    border-radius: .16rem;
    background: $search-bgColor;
    &__icon{
      display: flex;
      justify-content: center;
      align-items: center;
      width: .44rem;
      text-align: center;
      font-size: .16rem;
      color: $search-fontColor;
    }
    &__input{
      display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      color: $content-fontColor;
      font-size: .14rem;
      &::placeholder{
        color: $content-fontColor;
      }
    }
  }
}
</style>
