<template>
  <div class="edit-channel">
    <van-nav-bar title="频道编辑" class="title">
        <template #left>
          <van-icon
            name="cross"
            class="close-icon"
            @click="showOrHiddenChannel(active)"
          />
        </template>
      </van-nav-bar>
    <van-cell :border="false">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">我的频道</span>
        <span type="danger" style="font-size:10px;color:#ccc;margin-left:5px;">点击进入频道</span>
      </template>
      <template #right-icon>
        <van-button
          plain type="danger"
          size="mini" round
          style="width:50px;height:20px"
          @click="isEditChannel = !isEditChannel"
        >{{ isEditChannel ? '完成' : '编辑' }}</van-button>
      </template>
    </van-cell>
    <div class="user-channel-list">
      <div
        class="channel-item-wrap"
        :class="{ 'edit-channel-animate' : isEditChannel && channel.id !== 0 }"
        v-for="(channel, index) in channels"
        :key="channel.id"
      >
        <div
          class="channel-item"
          :class="{ active : channels[active].id === channel.id }"
          @click="enterChannel(index, channel.id)"
        >
          {{ channel.name }}
        </div>
        <van-icon
          name="cross"
          class="del-icon"
          v-show="isEditChannel && channel.id !== 0"
        />
      </div>
    </div>
    <van-cell :border="false">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">推荐频道</span>
        <span type="danger" style="font-size:10px;color:#ccc;margin-left:5px;">点击添加频道</span>
      </template>
    </van-cell>
    <div class="user-channel-list">
      <div
        class="channel-item-wrap "
        v-for="(channel) in recomChannel"
        :key="channel.id"
        @click="addChannel(channel)"
      >
        <div class="channel-item">
          {{ channel.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllChannel, AddUserChannel, deleteUserChannel } from '@/api/channel'
import bus from '@/utils/bus'
export default {
  name: 'channelPopup',
  data() {
    return {
      isEditChannel: false,
      allChannels: []
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.getAllChannels()
  },
  computed: {
    recomChannel() {
      return this.allChannels.filter(channel => {
        return !this.channels.find(userChannel => {
          return channel.id === userChannel.id
        })
      })
    }
  },
  methods: {
    async enterChannel(index, id) {
      if(!this.isEditChannel) {
        bus.$emit('set', index)
        return
      }
      if(id === 0) {
        return
      }
      if(this.$store.state.token) {
        await deleteUserChannel(id)
        this.channels.splice(index, 1)
        if(this.active > index) {
          bus.$emit('changeActive', '')
        }
        return
      }
      this.channels.splice(index, 1)
      this.$store.commit('UPDATE_CHANNEL', this.channels)
      if(this.active > index) {
        bus.$emit('changeActive', '')
      }
    },
    showOrHiddenChannel(active) {
      bus.$emit('set', active);
      this.isEditChannel = false
    },
    async getAllChannels() {
      const { data } = await getAllChannel()
      this.allChannels = data.data.channels
    },
    async addChannel(channel) {
      if(this.$store.state.token) {
        await AddUserChannel({
          channels: [
            {id: channel.id, seq: this.channels.length + 1}
          ]
        })
        this.channels.push(channel)
        return
      }
      this.channels.push(channel)
      this.$store.commit('UPDATE_CHANNEL', this.channels)
    }
  }
}
</script>

<style lang="less" scoped>
.edit-channel {
  /deep/ .title {
    background: #fff;
    .close-icon {
      color: #1989fa !important;
    }
    .van-nav-bar__content {
      .van-nav-bar__title {
        color: #000 !important;
      }
    }
  }
  .user-channel-list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .channel-item-wrap {
    margin-left: 9px;
    margin-right: 9px;
    width: 20.1%;
    position: relative;
    .channel-item {
      background: #F4F5F6;
      font-size: 12px;
      height: 40px;
      margin-bottom: 10px;
      line-height: 40px;
      text-align: center;
    }
    .del-icon {
      position: absolute;
      top: -2px;
      right: -2px;
      font-size: 10px;
      background: #ccc;
      border-radius: 50%;
      color: #fff;
      display: block;
      padding: 2px;
    }
    .active {
      color: #E5615B
    }
  }
}
}
</style>