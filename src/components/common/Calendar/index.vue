<template>
  <div class="my-calendar">
    <div class="my-calendar_header"></div>
    <div class="my-calendar_body">
      <div class="my-calendar_body_day">
        <span v-for="day in days" :key="day.value" class="my-calendar_body_day_item">
          {{ day.text }}
        </span>
      </div>
      <div class="my-calender_body_date"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getWeekDays, getWeekDates, getMonthDates } from '@/utils/date'
const props = defineProps({
  firstDayOfWeek: {
    type: Number,
    default: 0,
    validate: (value) => {
      return value >= 0 && value <= 6
    },
  },
  showLunar: {
    type: Boolean,
    default: true,
  },
  defaultDate: {
    type: String,
    default: '',
  },
  defaultCheckedDay: {
    type: Boolean,
    default: true,
  },
  disabledToggle: {
    type: Boolean,
    default: false,
  },
})

const days = computed(() => {
  return getWeekDays(props.firstDayOfWeek)
})

const weekDates = getWeekDates(props.defaultDate, props.firstDayOfWeek)

const monthDates = getMonthDates(props.defaultDate, props.firstDayOfWeek)
</script>
<style lang='scss' scoped>
</style>
