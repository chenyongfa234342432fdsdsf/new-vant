import React from 'react'
import { Toast, Calendar } from '@nbit/vant'

const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}`

export default () => {
  return (
    <Calendar
      style={{ height: 500 }}
      showConfirm={false}
      poppable={false}
      onConfirm={v => {
        Toast.info(formatDate(v))
      }}
    />
  )
}
