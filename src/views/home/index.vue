<template>
  <div class="home">
    <!-- 头部 -->
    <van-nav-bar class="header">
      <template #left>
        <img src="./image/logo.png" alt="" class="logo">
      </template>
      <template #right>
        <van-button
          icon="search"
          type="primary"
          round
          class="search-btn"
          to="/search"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 导航 -->
    <div class="nav">
      <van-tabs
        v-model="active"
        @change="tabChange"
        class="scroll-wrap"
        swipeable
        animated
      >
        <van-tab
          v-for="channel in channels"
          :key="channel.id"
          :title="channel.name"
        >
          <article-list :channel="channel"/>
        </van-tab>
      </van-tabs>
      <div class="menu" @click="show = true">
        <van-icon class-prefix="toutiao" name="menu" class="menu-icon" />
      </div>
    </div>

    <!-- 编辑频道 -->
    <van-popup
      v-model="show"
      :closeable="false"
      position="bottom"
      :style="{ height: '100%' }"
      class="edit-channel"
    >
      <Channel-popup :channels="channels" :active="active" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel'
import articleList from './components/articleList'
import ChannelPopup from './components/channelPopup'
import bus from '@/utils/bus'
export default {
  name: 'home',
  data() {
    return {
      channels: [],
      active: 0,
      show: false
    }
  },
  components: {
    articleList,
    ChannelPopup
  },
  mounted() {
    this.loadUserChannel()
    bus.$on('set',id => {
      if(id >= 0){
        this.active = id;
        this.show = false
        return
      }
      this.show = false
    })
    bus.$on('changeActive',() => {
      this.active--
    })
  },
  methods: {
    async loadUserChannel() {
      // 如果登录，获取线上的
      if(this.$store.state.token) {
        const res = await getUserChannel()
        this.channels = res.data.data.channels
        return
      }
      // 如果未登录，但本地有存储，展示本地存储
      if(this.$store.state.userChannel) {
        this.channels = this.$store.state.userChannel
        return
      }
      // 未登录，本地没有存储，展示线上的
      const res = await getUserChannel()
      this.channels = res.data.data.channels
    },
    tabChange() {
      this.channel_id = this.channels[this.active].id
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: auto;
  .header {
    .logo{
      width: 110px;
    }
    .search-btn {
      width: 170px;
      height: 30px;
      background-color: #5BABFB;
      color: #fff;
      border: none;
    }
  }
  .nav {
    display: flex;
    .scroll-wrap {
      width: 325px;
      /deep/ .van-tabs__content {
        width: 375px;
      }
    }
    .menu {
      width: 50px;
      height: 44px;
      background: #fff;
      line-height: 44px;
      text-align: center;
      border-left: 1px solid #eee;
      .menu-icon {
        font-size: 20px;
        color: #666;
        display: block;
      }
    }
  }
}
</style>
