<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      shape="round"
      show-action
      background="#1989FA"
      placeholder="请输入搜索关键词"
      class="search-box"
      @cancel="$router.back()"
      @search="onSearch"
      @focus="onFocus"
    />
    
    <!-- 搜索结果 -->
    <Search-result  v-if="isSerach" :searchText="searchText" />


    <!-- 搜索联想建议 -->
    <Search-suggestion v-else-if="searchText" :searchText="searchText" @clickSuggest="clickSuggestion" />
    

    <!-- 搜索历史 -->
    <Search-history v-else @clickSuggest="clickSuggestion" />
  </div>
</template>

<script>
import SearchSuggestion from '@/views/search/components/searchSuggestion'
import SearchResult from '@/views/search/components/SearchResult'
import SearchHistory from '@/views/search/components/SearchHistory'
export default {
  name: 'SearchArticle',
  data() {
    return {
      searchText: '',
      isSerach: false
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  mounted() {},
  methods: {
    onSearch() {
      this.isSerach = true
      this.updateHistory(this.searchText)
    },
    onFocus() {
      this.isSerach = false
    },
    clickSuggestion(suggestText) {
      this.searchText = suggestText
      this.isSerach = true
      this.updateHistory(suggestText)
    },
    updateHistory(text) {
      const history = this.$store.state.searchHistory
      if(this.$store.state.token) {
        return
      }
      if(!history) {
        history.unshift(text)
        this.$store.commit('UNDATE_SEARCH_HISTORY', history)
        return
      }
      const index = history.indexOf(text)
      if(index > -1) {
        history.splice(index,1)
      }
      history.unshift(text)
      this.$store.commit('UNDATE_SEARCH_HISTORY', history)
    }
  },
};
</script>

<style lang="less" scoped>
.search {
  /deep/ .search-box {
    .van-search__action {
      color: #fff;
    }
    .van-search__action:active {
      background: #5BABFB;
    }
  }
}
</style>