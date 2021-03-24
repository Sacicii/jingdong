<template>
    <!-- 购物车商品 -->
    <div class="product">
        <template v-for="(item, index) in list" :key="index">
          <div class="product__item"  v-if="item.count > 0">
            <div
            class="product__item__icon iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe66c;'"
            @click="() => handleCheckChange(shopId, item._id)"
            ></div>
            <img :src="item.imgUrl" alt="" class="product__item__img">
            <div class="product__item__detail">
              <h4 class="product__item__title">{{item.name}}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{item.price}}
                <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
              </p>
            </div>
           <div class="product__number">
            <span class="product__number__minus" @click="() => handleCountChange(shopId, item._id, item, false)">-</span>
            <!-- {{cartList?.[shopId]?.[item._id]?.count || 0}} -->
            {{item.count || 0}}
            <span class="product__number__plus" @click="() => handleCountChange(shopId, item._id, item, true)">+</span>
           </div>
          </div>
        </template>
    </div>
    <!-- 购物车统计 -->
    <div class="cart">
        <div class="check">
          <div class="check__icon">
            <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png" />
            <div class="check__icon__tag">{{total}}</div>
          </div>
          <div class="check__info">
            总计:&nbsp;
            <span class="check__info__price">&yen; {{price}}</span>
            </div>
          <div class="check__btn">去结算</div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

// 购物车相关
const useCartEffect = () => {
  const { handleCountChange } = useCommonCartEffect()
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList
  // 计算总数量
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        count += productList[i].count
      }
    }
    return count
  })
  // 计算总价格
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        // console.log(product.check)
        if (product.check) {
          count += productList[i].price * productList[i].count
        }
      }
    //   console.log(count)
    }
    return count.toFixed(2)
  })

  // 获取商品列表
  const list = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  // 更改选中状态
  const handleCheckChange = (shopId, productId) => {
    store.commit('checkChange', { shopId, productId })
  }

  return { total, price, list, shopId, handleCountChange, handleCheckChange }
}

export default {
  name: 'Cart',
  setup () {
    const { total, price, list, shopId, handleCountChange, handleCheckChange } = useCartEffect()
    return { handleCountChange, handleCheckChange, total, price, list, shopId }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: .5rem;
}
.check{
  display: flex;
  height: .49rem;
  line-height: .49rem;
  border-top: .01rem solid $content-bgColor;
  &__icon{
    width: 0.76rem;
    position: relative;
    &__img{
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag{
      position: absolute;
      top: .04rem;
      right: .15rem;
      color: $bgColor;
      background-color: $highlight-fontColor;
      display: block;
      width: .2rem;
      height: .2rem;
      line-height: .2rem;
      text-align: center;
      font-size: .12rem;
      border-radius: 50%;
      transform: scale(.5);
    }
  }
  &__info{
    flex: 1;
    font-size: .12rem;
    height: .49rem;
    line-height: .49rem;
    color: $content-fontColor;
    &__price{
      font-size: .18rem;
      color: $highlight-fontColor;
    }
  }
  &__btn{
    width: .98rem;
    line-height: .5rem;
    background-color: #4fb0f9;
    text-align: center;
    color: $bgColor;
    font-size: .14rem;
  }
}
.product{
  position: absolute;
  left: 0;
  right: 0;
  bottom: .5rem;
  overflow-y: scroll;
  background-color: $bgColor;
  &__item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &__detail{
      overflow: hidden;
    }
    &__icon{
      font-size: .2rem;
      line-height: .5rem;
      margin-right: .2rem;
      color: #0091ff;
    }
    &__img{
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &__price{
      margin: .06rem 0 0 0;
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
