<template>
  <!-- 定位 -->
    <div class="position">
      <span class="iconfont position__icon">&#xe61f;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe860;</span>
    </div>
     <!-- 搜索 -->
    <div class="search">
      <span class="iconfont">&#xe607;</span>
      <span class="search__text">山姆会员商店优惠商品</span>
    </div>
    <!-- banner -->
    <div class="banner">
      <img class="banner__image" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
    </div>
    <!-- 图标 -->
    <div class="icons">
      <div class="icons__item"
           v-for="item of iconList"
           :key="item.imgUrl"
      >
        <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" class="icons__item__img">
        <p class="icons__item__desc">{{item.desc}}</p>
      </div>
    </div>
    <!-- gap -->
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘焙蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return {
      iconList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.position{
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis;
  .position__icon{
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position__notice{
    position: absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
  color: $content-fontColor;
}
.search{
  margin-bottom: .12rem;
  line-height: .32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: .16rem;
  font-size: .14rem;
  .iconfont{
    position: relative;
    top: .01rem;
    padding: 0 .12rem 0 .16rem;
    font-size: .16rem;
  }
}
.banner{
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__image{
    width: 100%;
  }
}
.icons{
  margin-top: .16rem;
  display: flex;
  flex-wrap: wrap;
  &__item{
    width: 20%;
    &__img{
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc{
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontColor;
    }
  }
}
.gap{
  margin: 0 -.18rem;
  height: .1rem;
  background-color: $content-bgColor;
}
</style>
