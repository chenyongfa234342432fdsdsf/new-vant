import React from 'react'
import { Picker } from '@nbit/vant'

export default () => {
  return (
    <Picker
      loading
      columns={[
        ['周一', '周二', '周三', '周四', '周五'],
        ['上午', '下午', '晚上'],
      ]}
    />
  )
}
