<template>
  <div id="app">
    <keep-alive :include="['layout']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components:{

  },
  methods: {
    
  }
}
</script>

<style lang="less">

</style>
