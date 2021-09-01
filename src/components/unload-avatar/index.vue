<template>
  <div class="cropper">
    <vue-cropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.outputSize"
      :outputType="option.outputType"
      :info="option.info"
      :canScale="option.canScale"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixed="option.fixed"
      :fixedNumber="option.fixedNumber"
      :full="option.full"
      :fixedBox="option.fixedBox"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :original="option.original"
      :centerBox="option.centerBox"
      :height="option.height"
      :infoTrue="option.infoTrue"
      :maxImgSize="option.maxImgSize"
      :enlarge="option.enlarge"
      :mode="option.mode"
      @realTime="realTime"
      @imgLoad="imgLoad">
    </vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
name: 'unloadAvatar',
  data() {
    return {
      previews: {},
      option:{
        img: 'https://img01.yzcdn.cn/vant/leaf.jpg',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: window.innerWidth,  //默认生成截图框宽度
        autoCropHeight: window.innerWidth, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: true,      //上传图片是否可以移动
        canMoveBox: false,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: true,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: `${window.innerWidth} ${window.innerWidth}`  //图片默认渲染方式
      }
    }
  },
  components: {
    VueCropper
  },
  mounted() {},
  methods: {
    realTime() {
      console.log('realTime')
    },
    imgLoad() {
      console.log('imgLoad')
    },
  }
}
</script>

<style lang="less" scoped>
.cropper {
  /deep/ .vue-cropper {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999999999999999;
      background: rgba(0, 0, 0) !important;
      .cropper-box {
        width: 100%;
        height: 100vh;
          background: rgba(0, 0, 0, .7) !important;
        .cropper-modal {
          background: rgba(0, 0, 0, .7) !important;
        }
      }
    }
  }
</style>