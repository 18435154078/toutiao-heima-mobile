<template>
  <div class="search-history">
    <van-cell-group v-show="historyList.length">
      <van-cell title="历史记录">
        <div v-if="isDeleteHisroty">
          <span @click="deleteAll">全部删除</span>
          &nbsp;
          <span @click="isDeleteHisroty = false">完成</span>
        </div>
        <div v-else>
          <van-icon name="delete-o" @click="isDeleteHisroty = true" />
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        :title="historyList"
        v-for="(historyList, index) in historyList"
        :key="index"
        @click="editHistory(historyList, index)"
      >
        <div
          slot="default"
          v-show="isDeleteHisroty"
        >
          <van-icon name="cross" />
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// import { getSearchHistory } from '@/api/search'
export default {
  name: 'SearchHistoryt',
  data() {
    return {
      isDeleteHisroty: false,
      historyList: this.$store.state.searchHistory
    }
  },
  mounted() {
    this.loadSearchHistory()
  },
  methods: {
    async loadSearchHistory() {
      // 接口只有删除所有历史的，所以在这就不展示线上历史记录了
      // if(this.$store.state.token) {
      //   const { data } = await getSearchHistory()
      //   this.historyList = data.data.keywords
      // }
    },
    editHistory(historyText, index) {
      if (this.isDeleteHisroty) {
        this.historyList.splice(index, 1)
        this.$store.commit('UNDATE_SEARCH_HISTORY', this.historyList)
        return
      }
      this.$emit('clickSuggest', historyText)
    },
    deleteAll() {
      this.historyList = []
      this.$store.commit('UNDATE_SEARCH_HISTORY', [])
    }
  },
};
</script>

<style lang="less" scoped>

</style>