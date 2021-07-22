import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/global.less'

import '@/utils/dayjs'

// 按需引入组件
import { Tabbar, TabbarItem, NavBar,Form, Field, Button, Icon, Toast, CountDown, Cell, CellGroup, Image, Dialog, Tabs, Tab, PullRefresh, List, Popup } from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Form).use(Field).use(Button).use(Icon).use(Toast).use(CountDown).use(Cell).use(CellGroup).use(Image).use(Dialog)
Vue.use(Tab).use(Tabs).use(PullRefresh).use(List).use(Popup)

import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
