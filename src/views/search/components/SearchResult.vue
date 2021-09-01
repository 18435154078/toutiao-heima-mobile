<template>
  <div class="search-result">
    <!-- <van-cell-group>
      <van-cell
        v-for="result in searchResults"
        :key="result.art_id"
        :title="result.title"
      />
    </van-cell-group> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in articleList"
        :key="article.art_id"
      >
        <Article-item :article="article" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'SearchResult',
  data() {
    return {
      searchResults: [],
      articleList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    }
  },
  components: {
    ArticleItem
  },
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      const result = data.data.results
      if(result.length > 0) {
        this.articleList.push(...result)
        this.loading = false;
        this.page++
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-result {
  height: calc(100vh - 54px);
  overflow-y: auto;
}
</style>