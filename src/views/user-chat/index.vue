<template>
  <div class="user-chat">
    <!-- 头部 -->
    <van-nav-bar
      title="小智同学"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 消息区 -->
    <div class="message-list">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </div>


    <!-- 底部消息框 -->
    <van-field
      v-model="message"
      center
      clearable
      class="edit-message"
    >
      <template #button>
        <van-button size="small" type="primary">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
// npm i socket.io-client
import io from 'socket.io-client'
    // 建立连接
const socket = io('/api/app/socket.io/')
console.log(socket.id)
    // 连接成功
    socket.on('connect', () => {
      socket.id
    })
    socket.on('message', {
      msg: 'message',
      timestamp: Date.now()
    })
export default {
name: 'userChat',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.user-chat {
  /deep/ .edit-message {
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>