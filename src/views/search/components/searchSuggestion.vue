<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
        v-for="(suggestion, index) in suggsetions"
        :key="index"
        icon="search"
        @click="$emit('clickSuggest', suggestion)"
      >
        <div slot="title" v-html="lineHeight(suggestion)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
/**
 * 当在搜索框输入是，为了避免频繁求情，需要做防抖处理
 * 需要用到第三方工具包，lodash  https://www.lodashjs.com/
 */
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggsetions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  mounted() {},
  watch: {
    searchText: {
      handler: debounce (async function(){
        const { data } =  await getSearchSuggestion(this.searchText)
        this.suggsetions = data.data.options
      }, 200),
      immediate: true
    }
  },
  methods: {
    lineHeight(str) {
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
};
</script>

<style lang="less" scoped>

</style>