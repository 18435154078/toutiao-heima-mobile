<template>
  <div class="undate-nickname">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('input')"
      @click-right="onClickRight"
    />
    <div class="textarea">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入名字"
        show-word-limit
        ref="textarea"
      />
    </div>
  </div>
</template>

<script>
import { undateUser } from '@/api/user'
export default {
  name: 'undateNickname',
  data() {
    return {
      localName: this.name
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$refs.textarea.focus()
  },
  methods: {
    async onClickRight() {
      const res = await undateUser({
        name: this.localName
      })
      console.log(res)
      this.$emit('input')
      this.$emit('undate', this.localName)
    }
  }
}
</script>

<style lang="less" scoped>
.undate-nickname {
  /deep/ .van-nav-bar {
    background: #fff !important;
    .van-nav-bar__content {
      .van-nav-bar__title {
        color: #666 !important;
      }
    }
  }
  .textarea {
    padding: 10px;
  }
}
</style>