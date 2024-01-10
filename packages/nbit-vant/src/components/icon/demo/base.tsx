import React from 'react'
import { Space } from '@nbit/vant'
import { LocationO, LikeO, StarO } from '@react-vant/icons'

export default () => {
  return (
    <Space className='demo-icon' gap={20}>
      <LocationO />
      <LikeO />
      <StarO />
    </Space>
  )
}
