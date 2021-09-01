<template>
  <div class="comment-wrap">
    <van-popup
        position="bottom"
        class="comment"
        v-model="isComment"
        @click-overlay="$emit('closeCommentPopup')"
        :close-on-click-overlay="false"
      >
        <van-field
          v-model.trim="comment"
          rows="3"
          autosize
          type="textarea"
          maxlength="50"
          :placeholder="placeheader ? `回复${placeheader}` : '优质评论会置顶哦'"
          show-word-limit
        >
          <div slot="extra"
            class="emit-commend"
            @click="onPublishComment"
          >发布</div>
        </van-field>
      </van-popup>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'Comment',
  data() {
    return {
      comment: ''
    }
  },
  props: {
    isComment: {
      type: Boolean,
      required: true
    },
    article: {
      type: Object,
      default: () => null
    },
    articleId: {
      type: [Number, String, Object],
      default: () => null
    },
    commentId: {
      type: [Number, String, Object],
      default: () => null
    },
    placeheader: {
      type: String,
      default: ''
    }
  },
  mounted() {},
  methods: {
    async onPublishComment() {
      if(!this.comment) {
        this.$toast({
          message: '评论不能为空',
          position: 'bottom'
        })
        return
      }
      this.$toast.loading({
        message: '发表中...',
        forbidClick: true
      })
      console.log(this.commentId)
      await addComment({
        target: this.commentId ? this.commentId.toString() : this.articleId.toString(),
        content: this.comment,
        art_id: this.commentId ? this.articleId : null
      })
      this.$toast({
        message: '发表成功',
        position: 'bottom'
      })
      this.comment = ''
      this.$emit('onPublish')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-wrap {
  /deep/ .comment {
    .van-cell {
      .van-cell__value {
        position: relative;
        background: #F5F7F9 !important;
        .van-field__body {
          .van-field__control {
            padding: 10px !important;
          }
        }
        .van-field__word-limit {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      }
      .emit-commend {
        width: 50px;
        text-align: right;
        line-height: 92px;
        color: #3196FA;
      }
    }
  }
}
</style>