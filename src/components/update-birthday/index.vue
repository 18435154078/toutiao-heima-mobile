<template>
  <div class="undate-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('update:updateBirthdaynameShow')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { undateUser } from '@/api/user'
export default {
  name: 'undateBirthday',
  data() {
    return {
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(2021, 12, 31),
      currentDate: new Date(this.value),
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    updateBirthdaynameShow: {
      type: Boolean,
      required: true
    }
  },
  mounted() {},
  methods: {
    async onConfirm(value) {
      await undateUser({
        birthday: this.$format(value, 'YYYY-MM-DD')
      })
      this.$emit('update:updateBirthdaynameShow')
      this.$emit('input', this.$format(value, 'YYYY-MM-DD'))
    }
  }
}
</script>

<style lang="less" scoped>

</style>