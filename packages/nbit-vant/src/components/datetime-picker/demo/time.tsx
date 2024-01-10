import React from 'react'
import { DatetimePicker } from '@nbit/vant'

export default () => {
  return (
    <DatetimePicker
      defaultValue='12:00'
      type='time'
      minHour='10'
      maxHour='20'
    />
  )
}
