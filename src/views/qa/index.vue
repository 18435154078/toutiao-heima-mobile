<template>
  <div>
    <button @click="phone">拨打电话</button>
    <br/>
    <button @click="shareSystem">share</button>
  </div>
</template>

<script>
export default {
  name: 'qa',
  data() {
    return { }
  },
  mounted() {
    // console.log(plus.device.model)
  },
  methods: {
    // phone() {
    //   plus.device.dial("10086", false)
    // },
    // shareSystem(){
    //   plus.share.sendWithSystem({type:'image',content:'分享内容',href:'https://img2.baidu.com/it/u=2102736929,2417598652&fm=26&fmt=auto&gp=0.jpg'}, function(){
    //     console.log('分享成功')
    //   }, function(e){
    //     console.log('分享失败：'+JSON.stringify(e))
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>

</style>
