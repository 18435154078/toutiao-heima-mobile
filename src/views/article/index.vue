<template>
<transition name="fade">
  <div class="article-detail">
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <div class="article-detail-wrap">
      <div class="title">{{ article.title }}</div>
      <!-- 作者信息 -->
      <div class="author-info">
        <div class="ingo-left">
          <van-image
            :src="article.aut_photo"
            class="avatar"
          />
          <div class="neckname-and-date">
            <span class="nackname">{{ article.aut_name }}</span>
            <span class="date">{{ article.pubdate | handleDate }}</span>
          </div>
        </div>
        <van-button
          type="danger"
          size="mini"
          class="right-focus"
          :class="{'is-focus' : article.is_followed}"
          :icon="!article.is_followed ? 'plus' : ''"
          @click="onFollow"
          :loading="isFollowLoading"
          v-if="$store.state.user.id !== article.aut_id"
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
      </div>
      <!-- 文章内容 -->
      <div
        class="article-content markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>
      <!-- 所有评论 -->
      <div class="all-comment-content" id="comment">
        <div class="title">全部评论</div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="comment-list"
        >
          <van-cell
            class="comment-item"
            v-for="(item, index) in commentlists"
            :key="Number(JSON.stringify(item.com_id))"
          >
            <div class="comment-user-info">
              <div class="left">
                <img class="avatar" :src="item.aut_photo" alt="">
                <div clsss="nickname">{{ item.aut_name }}</div>
              </div>
              <div class="like" @click="onCommentLick(item.is_liking, item.com_id, index)">
                <van-icon
                  :name="item.is_liking ? 'good-job' : 'good-job-o'"
                  class="like-icon"
                  :color="item.is_liking ? 'red' : ''"
                />
                <span class="like-num">{{ item.like_count || '赞' }}</span>
              </div>
            </div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="date-and-replyNum">
              <span>{{ item.pubdate | format('YYYY-MM-DD HH:mm:ss') }}</span>
              <van-button
                type="default"
                size="mini"
                class="reply-btn"
                @click="showCommentReplyPopup(item)"
              >{{ item.reply_count }} 回复</van-button>
            </div>
          </van-cell>
        </van-list>
      </div>
      <!-- 点击评论 -->
      <div class="article-comment" >
        <van-button
          round type="info"
          class="comment-btn"
          size="mini"
          @click="isComment = true"
        >写评论</van-button>
        <a href="#comment">
          <van-icon name="comment-o" class="comment">
            <van-badge
              :content="commentTotal"
              class="badge"
            >
              <div class="child" />
            </van-badge>
          </van-icon>
        </a>
        <div>
          <van-icon
            :name="article.is_collected ? 'star' : 'star-o'"
            :color="article.is_collected ? 'yellow' : ''"
            class="star"
            @click="onCollect"
          />
        </div>
        <div>
          <van-icon
            :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
            class="like"
            :color="article.attitude === 1 ? 'red' : ''"
            @click="onAttitude"
          />
        </div>
      </div>
      <!-- 发表评论 -->
      <Commont
        :isComment="isComment"
        @closeCommentPopup="isComment = false"
        @onPublish="onPublish"
        :articleId="article.art_id"
        :article="article"
      />
      <!-- 回复评论 -->
      <Reply-comment
        :isShowCommentReply="isShowCommentReply"
        :articleId="article.art_id"
        :commentReplyItem="commentReplyItem"
        ref="showCommentReplyPopup"
        @showCommentReply="isShowCommentReply = !isShowCommentReply"
      />
    </div>
  </div>
</transition>
</template>

<script>
import { getArticleDetail, addCollect, addLiking, deleteLiking } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import { getComment, addCommentLike, deleteCommentLike } from '@/api/comment'
import '@/styles/github-markdown.css'
import Commont from '@/views/article/components/Comment'
import ReplyComment from '@/views/article/components/ReplyComment'
import { ImagePreview } from 'vant'
export default {
  name: 'Article',
  data() {
    return {
      article: {},   // 文章详情
      isFollowLoading: false,  // 关注的loading
      isComment: false,  // 是否展示弹出评论
      commentNum: null,  // 评论回复总数
      previewList: [],  // 图片查看器的列表
      commentlists: [],  // 评论列表
      loading: false,  // 加载list列表的loading
      finished: false,  // 列表是否加载完成
      offset: null,  // 偏移量
      limit: 10,  // 每次请求返回的评论条数
      commentTotal: 0,  // 评论总条数 isShowCommentReply
      isShowCommentReply: false,  // 是否展示回复评论
      commentReplyItem: {}
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    Commont,
    ReplyComment
  },
  mounted() {
    this.loadArticleDetail()
  },
  methods: {
    async loadArticleDetail() {
      const { data } = await getArticleDetail(this.articleId)
      this.article = data.data
      // console.log(this.article)
      this.commentNum = this.article.recomments.length
      // console.log(this.article)
      this.$nextTick(() => {
        // const images = this.$refs['article-content'].querySelectorAll('img')
        const images = document.querySelectorAll('.article-content img')
        images.forEach((image, index) => {
          this.previewList.push(image.src)
          image.onclick = () => {
            this.imagePreview(index)
          }
        })
      })
    },
    async onFollow() {
      this.isFollowLoading = true
      if(this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
        this.isFollowLoading = false
        this.article.is_followed = false
        return
      }
      await addFollow(this.article.aut_id)
      this.isFollowLoading = false
      this.article.is_followed = true
    },
    async onCollect() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      if(this.article.is_collected) {
        await addCollect(this.article.art_id)
        this.article.is_collected = false
        this.$toast.success('已取消收藏')
        return
      }
      await deleteFollow(this.article.art_id)
      this.article.is_collected = true
      this.$toast.success('收藏成功')
    },
    async onAttitude() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      if(this.article.attitude === 1) {
        await deleteLiking(this.article.art_id)
        this.article.attitude = -1
        this.$toast.success('已取消点赞')
        return
      }
      await addLiking(this.article.art_id)
      this.article.attitude = 1
      this.$toast.success('点赞成功')
    },
    imagePreview(index) {
      ImagePreview({
        images: this.previewList,
        startPosition: index
      })
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getComment({
        type: 'a',
        source: this.articleId.toString(),
        offset: this.offset,
        limit: this.limit
      })
      const commentlist = data.data.results
      this.commentTotal = data.data.total_count
      this.offset = data.data.last_id
      // console.log(data)
      if (commentlist.length > 0) {
        this.commentlists.push(...commentlist)
        this.loading = false
      } else {
        this.finished = true
      }
    },
    async onPublish() {
      this.isComment = false
      const { data } = await getComment({
        type: 'a',
        source: this.articleId,
        offset: null,
        limit: 10
      }, {
        target: this.articleId,
        content: this.article.content,
        aid: this.articleId
      })
      this.commentTotal = data.data.total_count
      this.commentlists.unshift(data.data.results[0])
    },
    async onCommentLick(isLiked, id = null, index) {
      if(isLiked) {
        await deleteCommentLike(JSON.parse(id))
        this.commentlists[index].is_liking = false
        this.commentlists[index].like_count--
        return
      }
      await addCommentLike(JSON.parse(id))
      this.commentlists[index].is_liking = true
      this.commentlists[index].like_count++
    },
    showCommentReplyPopup(comment) {
      this.isShowCommentReply = true
      this.$refs.showCommentReplyPopup.commentItem = comment
      this.$refs.showCommentReplyPopup.loadCommentReply()
      
    }
  }
}
</script>

<style lang="less" scoped>
.article-detail {
  padding-top: 46px;
  .article-detail-wrap {
    padding: 18px;
    background: #fff;
    height: calc(100vh - 96px);
    overflow-y: auto;
    .title {
      font-size: 15px;
      font-weight: 600;
    }
    .author-info {
      width: 100%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .ingo-left {
        display: flex;
        align-items: center;
        /deep/ .avatar {
          width: 35px !important;
          height: 35px !important;
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
        .neckname-and-date {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          margin-left: 10px;
          .date {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .right-focus {
        font-size: 12px;
        height: 30px;
        padding: 0 35px;
        border:none;
        border-radius: 15px;
        background: #FF6855;
      }
      .is-focus {
        color: #666 !important;
        background: #eee !important;
      }
    }
    .article-content {
      width: 100%;
      font-size: 15px;
      padding-bottom: 50px;
      margin-top: 10px;
    }
    .all-comment-content {
      .title {
        font-weight: 500;
      }
      /deep/ .comment-list {
        margin-top: 20px;
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
      }
    }
    .article-comment {
      width: 100vw;
      height: 50px;
      position: fixed;
      left: 0;
      bottom: -2px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 21px;
      /deep/ .comment-btn {
        width: 180px;
        height: 30px;
        padding-left: 15px;
        border: none;
        background: #eee;
        margin-left: 10px;
        .van-button__content {
          justify-content: left;
          .van-button__text {
            color: #888;
          }
        }
      }
      .comment-btn:active {
        background: #eee;
      }
      .comment-btn:focus {
        background: #eee;
      }
      .comment {
        position: relative;
        .badge {
          position: absolute;
          top: 2px;
          right: 2px;
        }
      }
      .like {
        margin-right: 10px;
      }
    }
  }
}

.fade-enter-active {
  animation: enter .5s;
}
.fade-leave-active {
  transition: leave .5s;
}
@keyframes enter {
  0% {
    transform: translateX(375px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes leave {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(375px);
  }
}
</style>