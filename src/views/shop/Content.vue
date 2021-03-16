<template>
    <div class="content">
      <div class="category">
        <!-- <div class="category__item category__item--active">全部商品</div> -->
        <div
        v-for="item in categoryList"
        :key="item.tab"
        :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
        @click="() => handleCategaryClick(item.tab)"
        >{{item.name}}</div>
      </div>
      <div class="product">
        <div class="product__item" v-for="(item, index) in contentList" :key="index">
          <img :src="item.imgUrl" alt="" class="product__item__img">
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__sales">{{item.sales}}</p>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="() => handleCountChange(shopId, item._id, item, false)">-</span>
            {{cartList?.[shopId]?.[item._id]?.count || 0}}
            <span class="product__number__plus" @click="() => handleCountChange(shopId, item._id, item, true)">+</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'

const categoryList = [{
  name: '全部商品', tab: 'all'
}, {
  name: '秒杀', tab: 'seckill'
}, {
  name: '新鲜水果', tab: 'fruit'
}]

// 商品内容
const useContentEffect = (currentTab, shopId) => {
  const contentData = reactive({
    contentList: []
  })
  const getContentData = async () => {
    const res = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    // console.log(res)
    if (res?.errno === 0 && res?.data?.length) {
      contentData.contentList = res.data
    }
  }
  watchEffect(() => {
    getContentData()
  })
  const { contentList } = toRefs(contentData)
  return { contentList }
}

// 商品分类
const useCategoryEffect = () => {
  // const categoryData = reactive({
  //   currentTab: categoryList[0].tab
  // })
  // const { currentTab } = toRefs(categoryData)
  const currentTab = ref(categoryList[0].tab)
  const handleCategaryClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleCategaryClick }
}

// 添加商品
const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const handleCountChange = (shopId, productId, productInfo, isAdd) => {
    store.commit('addCartCount', { shopId, productId, productInfo, isAdd })
    // console.log(shopId, productId, productInfo)
  }
  return { cartList, handleCountChange }
}

export default {
  name: 'Content',
  setup (props) {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleCategaryClick } = useCategoryEffect()
    const { contentList } = useContentEffect(currentTab, shopId)
    const { cartList, handleCountChange } = useCartEffect()
    // getContentData(currentTab)
    return { currentTab, contentList, categoryList, handleCategaryClick, cartList, shopId, handleCountChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category{
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background: $search-bgColor;
  &__item{
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontColor;
    &--active{
      background-color: $bgColor;
    }
  }
}
.product{
  flex: 1;
  overflow-y: scroll;
  &__item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__detail{
      overflow: hidden;
    }
    &__img{
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &__sales{
      margin: .06rem 0;
      font-size: .12rem;
    }
    &__price{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__yen{
      font-size: .12rem;
    }
    &__origin{
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number{
      position: absolute;
      right: 0;
      bottom: .12rem;
      &__minus,&__plus{
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;
        font-size: .2rem;
        text-align: center;
        border-radius: 50%;
      }
      &__minus{
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus{
        background-color: $btn-bgColor;
        color: $bgColor;
        margin-left: .05rem;
      }
    }
  }
}
</style>
