<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      class="article-wrap"
      :disabled="isDisabled"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="article-list"
        ref="article-list"
      >
        <van-cell
          class="article"
          v-for="article in list"
          :key="article.id"
        >
          <Article-item :article="article" />
        </van-cell>
      </van-list>
      <div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getRecomList } from '@/api/article'
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'home-article-list',
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      list:[],
      articleList: [],
      isDisabled: false,
      nextpage: null
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  mounted() {
    this.$refs['article-list'].$el.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    async onRefresh() {
      // const timestamp = Math.floor(Math.random() * 2)
      const { data } = await getRecomList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.list = data.data.results
      this.$toast({message: '更新了10条数据', position: 'top'})
      this.isLoading = false
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getRecomList({
          channel_id: this.channel.id,
          timestamp: this.nextpage || Date.now(),
          with_top: 1
        })
      this.nextpage = data.page
      this.list.push(...data.data.results)
      this.loading = false
      if(data.data.results.length === 0) {
        this.finished = true
      }
    },
    handleScroll() {
      if(this.$refs['article-list'].$el.scrollTop == 0) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
    width: 375px;
    height: calc(100vh - 140px);
    overflow: auto;
  .article-wrap {
      height: calc(100vh - 140px);
    .article-list {
      .article {
        padding: 8px 15px 8px 15px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e5ecf5;
      }
    }
  }
}
</style>