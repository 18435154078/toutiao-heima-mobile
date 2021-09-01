<template>
  <div class="reply-comment">
    <!-- 弹出层 -->
    <van-popup
      v-model="isShowCommentReply"
      position="bottom"
      :close-on-click-overlay="false"
      @click-overlay="$emit('showCommentReply')"
      close-icon-position="top-left"
      class="reply-comment-popup"
    >
      <van-nav-bar :title="commentCount + '条回复'" class="title">
        <div slot="left" @click="$emit('showCommentReply')">
          <van-icon name="cross" />
        </div>
      </van-nav-bar>
      
      <div class="comment-wrap">
        <!-- 楼主 -->
        <van-cell class="comment-item" >
          <div class="comment-user-info">
            <div class="left">
              <img class="avatar" :src="commentItem.aut_photo" alt="">
              <div clsss="nickname">{{ commentItem.aut_name }}</div>
            </div>
            <div class="like">
              <van-icon
                :name="commentItem.is_liking ? 'good-job' : 'good-job-o'"
                class="like-icon"
                :color="commentItem.is_liking ? 'red' : ''"
              />
              <span class="like-num">{{ commentItem.like_count || '赞' }}</span>
            </div>
          </div>
          <div class="content">
            {{ commentItem.content }}
          </div>
          <div class="date-and-replyNum">
            <span>{{ commentItem.pubdate | format('YYYY-MM-DD') }}</span>
          </div>
        </van-cell>
        <!-- 相关评论 -->
        <div class="comment-title">全部评论</div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="comment-list"
        >
          <van-cell
            class="comment-item"
            v-for="comment in commentReplyList"
            :key="JSON.stringify(comment.com_id)"
          >
            <div class="comment-user-info">
              <div class="left">
                <img class="avatar" :src="comment.aut_photo" alt="">
                <div clsss="nickname">{{ comment.aut_name }}</div>
              </div>
              <div class="like">
                <van-icon
                  :name="comment.is_liking ? 'good-job' : 'good-job-o'"
                  class="like-icon"
                  :color="comment.is_liking ? 'red' : ''"
                />
                <span class="like-num">{{ comment.like_count || '赞' }}</span>
              </div>
            </div>
            <div class="content">
              {{ comment.aut_id === commentItem.aut_id ? '' : '回复' }}
              <span style="color:#666"> {{ comment.aut_id === commentItem.aut_id ? '' : commentItem.aut_name + ':' }}</span>
              {{ comment.content }}
            </div>
            <div class="date-and-replyNum">
              <span>{{ comment.pubdate | format('YYYY-MM-DD ') }}</span>
              <van-button
                type="default"
                size="mini"
                class="reply-btn"
                @click="replyComment(comment)"
              >{{ comment.reply_count }} 回复</van-button>
            </div>
          </van-cell>
        </van-list>
      </div>

      <!-- 点击回复评论 -->
      <van-nav-bar class="click-comment">
        <van-button
          plain slot="title"
          round type="default"
          size="mini"
          @click="isComment = true"
        >写评论</van-button>
      </van-nav-bar>
    </van-popup>

    <!-- 写评论 -->
    <Commont
      :isComment="isComment"
      :articleId="articleId"
      :commentId="commentItem ? commentItem.com_id : null"
      @closeCommentPopup="isComment = false"
      @onPublish="onPublish"
      :placeheader="placeheader"
    />
  </div>
</template>

<script>
import Commont from '@/views/article/components/Comment'
import { getComment } from '@/api/comment'
export default {
  name: 'ReplyComment',
  data() {
    return {
      finished: false,
      loading: false,
      isComment: false,
      commentCount: 0,
      commentReplyList: [],
      commentItem: {},
      placeheader: ''
    }
  },
  props: {
    isShowCommentReply: {
      type: Boolean,
      required: true
    },
    articleId: {
      // type: [Object, Number, String],
      required: true
    }
  },
  components: {
    Commont
  },
  mounted() {},
  methods: {
    async loadCommentReply() {
      const { data } = await getComment({
        type: 'c',
        source: this.commentItem.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.commentReplyList = data.data.results
      this.commentCount = data.data.total_count
      console.log(this.commentReplyList)
    },
    onLoad() {
      this.finished = true
      return
    },
    async onPublish() {
      this.isComment = false
      const { data } = await getComment({
        type: 'c',
        source: this.commentItem.com_id.toString(),
        offset: null,
        limit: 10
      })
      this.commentCount = data.data.total_count
      this.commentReplyList.unshift(data.data.results[0])
    },
    replyComment(comment) {
      this.isComment = true
      this.placeheader = comment.aut_name
    }
  },
}
</script>

<style lang="less" scoped>
.reply-comment {
  /deep/ .reply-comment-popup {
    height: 90%;
    .title {
      height: 52px;
      background: #fff;
      .van-nav-bar__content {
        .van-nav-bar__left {
          .van-icon {
            color: skyblue !important;
            font-size: 20px;
          }
        }
      }
      .van-nav-bar__content {
        height: 52px;
        .van-nav-bar__title {
          color: #000 !important;
        }
      }
    }
    .comment-wrap {
      padding: 20px;
      .comment-item {
        padding: 3px;
        .comment-user-info {
          display: flex;
          justify-content: space-between;
          margin: 5px auto;
          .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #96A1BD;
            .avatar {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
          .like {
            display: flex;
            align-items: center;
            width: 38px;
            .like-icon {
              margin-right: 10px;
            }
            .like-num {
              height: 23px;
            }
          }
        }
        .content {
          padding-left: 45px;
          margin: 10px auto;
        }
        .date-and-replyNum {
          display: flex;
          align-items: center;
          padding-left: 45px;
          margin: 10px auto;
          .reply-btn {
            margin-left: 10px;
          }
        }
      }
      .comment-title {
        font-size: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    .click-comment {
      width: 375px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      border-top: 1px #eee solid;
      .van-nav-bar__content {
        .van-nav-bar__title {
          .van-button {
            background: #eee;
            width: 210px;
            height: 30px;
          }
          .van-button:focus {
            background: #eee;
          }
          .van-button:active {
            background: #eee;
          }
        }
      }
    }
  }
}
</style>