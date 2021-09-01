import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('handleDate', function(value){
  return dayjs().to(value)
})

Vue.prototype.$format = (value, format) => {
  return dayjs(value).format(format)
}

Vue.filter('format', function(value, format = 'YYYY-MM-DD HH:mm'){
  return dayjs(value).format(format)
})