<template>
  <div class="toutiao-my">
    <div class="header-wrap">
      <div class="login-show" v-if="token">
        <div class="user-info">
          <div class="left">
            <van-image
              fit="cover"
              :src="info.photo"
              class="avatar"
              round
            />
            <span class="neckname">{{ info.name || '用户' }}</span>
          </div>
          <div class="right" @click="$router.push('/editUserInfo')">编辑资料</div>
        </div>
        <div class="user-message">
          <div class="item">
            <span class="num">{{ info.art_count || 0 }}</span>
            <span class="name">头条</span>
          </div>
          <div class="item">
            <span class="num">{{ info.follow_count || 0 }}</span>
            <span class="name">关注</span>
          </div>
          <div class="item">
            <span class="num">{{ info.fans_count || 0 }}</span>
            <span class="name">粉丝</span>
          </div>
          <div class="item">
            <span class="num">{{ Number(info.like_count) || 0  }}</span>
            <span class="name">获赞</span>
          </div>
        </div>
      </div>
      <div class="logout-show" v-else @click="$router.push('/login')">
        点击登录
      </div>
    </div>
    <div class="collect-and-his">
      <div class="collect" @click="onCollect">
        <van-icon name="star-o" class="icon" />
        <span>收 藏</span>
      </div>
      <div class="history" @click="onHistory">
        <van-icon name="clock-o" class="icon" />
        <span>历 史</span>
      </div>
    </div>
    <van-cell title="消息通知" is-link url="" class="msg-noti" v-if="token" />
    <van-cell title="小智同学" is-link url="/user/chat" class="robot" />
    <van-button plain type="default" block class="log-out" @click="log_out" v-if="token">退出登录</van-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'my',
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState(['token'])
  },
  mounted() {
    console.log()
    this.loadUserInfo()
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      if(!this.token){
        return
      }
      getUserInfo().then(res => {
        this.info = res.data.data
        this.$store.commit('SET_USER', this.info)
      })
    },
    onCollect() {
      if(!this.token){
        this.$dialog.confirm({
          title: '提示',
          message: '该功能需要登录，确认登录吗？'
        })
          .then(() => {
            // on confirm
            this.$router.push('/login')
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    onHistory() {
      if(!this.token){
        this.$dialog.confirm({
          title: '提示',
          message: '该功能需要登录，确认登录吗？'
        })
          .then(() => {
            // on confirm
            this.$router.push('/login')
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    log_out() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
            this.$store.commit('REMOVE_TOKEN')
            this.$router.go(0)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.toutiao-my {
  .header-wrap {
    // background: #3E9CFD;
    background: url('./image/banner.png') no-repeat;
    background-size: cover;
    padding-top: 40px;
    padding-bottom: 15px;
    height: 118px;
    .login-show {
      .user-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          margin-left: 20px;
          .avatar {
            width: 50px;
            height: 50px;
            border: 2px solid #fff;
          }
          .neckname {
            font-size: 12px;
            color: #fff;
            display: block;
            margin-left: 10px;
          }
        }
        .right {
          padding-left: 5px;
          padding-right: 5px;
          height: 20px;
          font-size: 12px;
          background-color: #fff;
          border-radius: 10px;
          text-align: center;
          color: #666;
          line-height: 20px;
          margin-right: 20px;
        }
      }
      .user-message {
        margin-top: 25px;
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          font-size: 15px;
          .name {
            font-size: 12px;
            display: block;
            margin-top: 5px;
          }
        }
      }
    }
    .logout-show {
      width: 70px;
      height: 80px;
      margin: 5px auto 0;
      background: url('./image/login-bg.png') no-repeat;
      background-size: 100% auto;
      font-size: 15px;
      color: #fff;
      line-height: 175px;
      text-align: center;
    }
    
  }
  .collect-and-his {
    background: #fff;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    .collect, .history {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      .icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
      .icon:nth-of-type(1){
        color: rgb(235, 82, 83);
      }
      .icon:nth-of-type(2){
        color: rgb(255, 160, 35);
      }
    }
  }
  .msg-noti {
    margin-top:5px;
  }
  .robot {
    margin-top:5px;
  }
  .log-out {
    color: red;
    margin-top: 4px;
  }
}
</style>
