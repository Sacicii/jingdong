<template>
   <!-- 附近 -->
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <router-link
      v-for="item in nearbyList"
      :key="item.id"
      :to = '`/shop/${item._id}`'
      >
        <ShopInfo :item='item'/>
      </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearbyList = ref([])

  const getNearbyList = async () => {
    const res = await get('/api/shop/hot-list')
    if (res?.errno === 0 && res?.data?.length) {
      nearbyList.value = res.data
    }
  }

  return { nearbyList, getNearbyList }
}

export default {
  components: { ShopInfo },
  name: 'Nearby',
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.nearby{
  &__title{
    margin:.16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color:$content-fontColor;
  }
  a{
      text-decoration: none;
  }
}
</style>
