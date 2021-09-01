<template>
  <div class="article-item">
    <van-cell
      class="article-item-wrap"
      :to="{name: 'Article', params: {articleId: article.art_id}}"
    >
      <template #title>
        <div class="title">{{ article.title }}</div>
        <div class="cover-list" v-if="article.cover.type === 3">
          <van-image
            v-for="(image, index) in article.cover.images"
            :key="index"
            width="100"
            fit="contain"
            :src="image"
            class="images"
          />
        </div>
        <div class="article-detail">
          <span class="author">{{ article.aut_name }}</span>
          <span class="comment-count">{{ article.comm_count }}评论</span>
          <span class="date">{{ article.pubdate | handleDate }}</span>
          <span class="like">{{ article.like_count }}个赞</span>
        </div>
      </template>
      <template #right-icon v-if="article.cover.type === 1">
        <van-image
          fit="contain"
          :src="article.cover.images[0]"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'articleItem',
  data() {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // console.log(this.article)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  width: 100%;
  /deep/ .article-item-wrap {
    padding: 0;
    .van-cell__title {
      width: 100%;
      flex: unset;
      -webkit-flex: unset;
      -webkit-box-flex: unset;
      .title {
        font-size: 15px;
      }
      .cover-list {
        width: 96%;
        display: flex;
        justify-content: space-between;
        .images {
          width: 31% !important;
          height: 60px !important;
        }
      }
      .article-detail {
        margin-top: 10px;
        display: flex;
        color: #B4B4C5;
        font-size: 12px;
        align-items: center;
        .comment-count, .date, .like {
          display: block;
          margin-left: 10px
        }
      }
    }
    .van-image {
      .van-image__img {
        width: 100px;
        height: 60px;
      }
    }
  }
}
</style>