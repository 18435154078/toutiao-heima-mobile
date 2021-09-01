<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="localGender"
    />
  </div>
</template>

<script>
import { undateUser } from '@/api/user'
export default {
  name: 'updateGender',
  components: {  },
  directives: {  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    updateGendernameShow: {
      type: Boolean,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  mounted() {},
  methods: {
    async onConfirm(value, index) {
      await undateUser({
        gender: index
      })
      this.$emit('update:updateGendernameShow')
      this.$emit('input', index)
      
    },
    onCancel() {
      this.$emit('update:updateGendernameShow')
    },
  }
}
</script>

<style lang="less" scoped>

</style>