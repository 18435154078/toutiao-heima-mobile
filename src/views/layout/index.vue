<template>
  <div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" icon="wenda" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" icon="shipin" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" icon="me" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      active: 0,
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>