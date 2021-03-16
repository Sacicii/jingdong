<template>
    <div class="cart">
        <div class="check">
          <div class="check__icon">
            <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png" />
            <div class="check__icon__tag">1</div>
          </div>
          <div class="check__info">
            总计:&nbsp;
            <span class="check__info__price">&yen;128</span>
            </div>
          <div class="check__btn">去结算</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cart'
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

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
</style>
