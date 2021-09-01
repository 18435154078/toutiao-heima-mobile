<template>
  <div class="edit-info">
    <!-- 顶部 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头像 -->
    <van-uploader
      :after-read="onReadFile"
    >
      <van-cell title="头像" is-link center class="edit-avatar">
        <van-image
          width="30"
          height="30"
          round
          fit="cover"
          :src="info.photo"
        />
      </van-cell>
    </van-uploader>
    
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="info.name"
      @click="updateNicknameShow = true"
    />

    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="info.gender === 0 ? '男' : '女'"
      @click="updateGendernameShow = true"
    />

    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="info.birthday"
      @click="updateBirthdaynameShow = true"
    />

    <!-- 编辑昵称 -->
    <van-popup
      v-model="updateNicknameShow"
      position="bottom"
      :style="{ height: '100%', background: '#f5f7f9' }"
    >
      <Update-nickname
        v-if="updateNicknameShow"
        v-model="updateNicknameShow"
        :name="info.name"
        @undate="info.name = $event"
      />
    </van-popup>

    <!-- 修改性别 -->
    <van-popup
      v-model="updateGendernameShow"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <Update-gender
        v-model="info.gender"
        :updateGendernameShow.sync="updateGendernameShow"
        @update:updateGendernameShow="updateGendernameShow = false"
      />
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup
      position="bottom"
      v-model="updateBirthdaynameShow"
    >
      <Update-birthday
        v-model="info.birthday"
        :updateBirthdaynameShow.sync="updateBirthdaynameShow"
        @update:updateBirthdaynameShow="updateBirthdaynameShow = false"
      />
    </van-popup>

    <!-- 头像裁切 -->
    <van-popup position="bottom" v-model="updateAvatarShow" class="cropper" :style="{height: '100%'}">
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
      <van-nav-bar
        left-text="取消"
        right-text="完成"
        @click-left="updateAvatarShow = false"
        @click-right="onConfirm"
        class="confirmBtn"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUser, undateUserAvatar } from '@/api/user'
import UpdateNickname from '@/components/update-nickname'
import UpdateGender from '@/components/update-gender'
import UpdateBirthday from '@/components/update-birthday'
import { VueCropper } from 'vue-cropper'
export default {
  name: 'editInfo',
  data() {
    return {
      updateNicknameShow: false,
      updateGendernameShow: false,
      updateBirthdaynameShow: false,
      updateAvatarShow: false,
      info: {},
      previews: {},
      option:{
        img: '',             //裁剪图片的地址
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
      },
      localAvatar: ''
    }
  },
  components: {
    UpdateNickname,
    UpdateGender,
    UpdateBirthday,
    VueCropper
  },
  mounted() {
    this.loadUserInfo()
  },
  methods: {
    // 加载用户信息
    async loadUserInfo() {
      const { data } =  await getUser()
      this.info = data.data
      // console.log(this.info)
    },
    realTime() {
      // console.log('realTime')
    },
    imgLoad() {
      // console.log('imgLoad')
    },
    onReadFile(file) {
      
      this.localAvatar = this.option.img = file.content
      this.updateAvatarShow = true
    },
    onConfirm() {
      this.updateAvatarShow = false
      this.$refs.cropper.getCropBlob(file => {
        const fs = new FormData()
        fs.append('photo', file)
        undateUserAvatar(fs).then(res => {
          this.info.photo = res.data.data.photo
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.edit-info {
  position: relative;
  /deep/ .edit-avatar {
    .van-cell__value {
      height: 27px
    }
  }
  /deep/ .van-uploader {
    width: 100%;
    .van-uploader__wrapper {
      width: 100%;
      .van-uploader__input-wrapper {
        width: 100%;
        .edit-avatar {
          width: 100%;
          .van-uploader__input {
            display: block;
            width: 100%;
          }
        }
      }
    }
  }
  .cropper {
    .vue-cropper {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      background: rgba(0, 0, 0) !important;
      .cropper-box {
          background: rgba(0, 0, 0, .7) !important;
        .cropper-modal {
          background: rgba(0, 0, 0, .7) !important;
        }
      }
    }
    /deep/ .confirmBtn {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index:9999;
      background: #000;
      .van-nav-bar__content {
        .van-nav-bar__left {
          .van-nav-bar__text {
            color: #fff
          }
        }
        .van-nav-bar__right {
          .van-nav-bar__text {
            color: #fff
          }
        }
      }
    }
  }
}
</style>