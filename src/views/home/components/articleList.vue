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
import { debounce } from 'lodash'
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
      nextpage: null,
      scrollTop: 0
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
    this.$refs['article-list'].$el.scrollTop = this.scrollTop
    this.$refs['article-list'].$el.addEventListener('scroll', debounce(this.handleScroll, 50), true)
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
      this.scrollTop = this.$refs['article-list'].$el.scrollTop
      if(this.$refs['article-list'].$el.scrollTop == 0) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  // watch: {
  //   $route: function(value){
  //     if(value.path === '/') {
  //       this.$refs['article-list'].$el.scrollTop = this.scrollTop
  //     }
  //   }
  // },
  activated() {
    console.log('进入组件')
    this.$refs['article-list'].$el.scrollTop = this.scrollTop
  },
  deactivated(){
    console.log('离开组件')
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