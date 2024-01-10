import React from 'react'
import { Space } from '@nbit/vant'
import { ChatO, FireO } from '@react-vant/icons'

export default () => {
  return (
    <Space className='demo-icon' gap={20}>
      <ChatO color='#f44336' />
      <FireO color='#f1ae3d' />
    </Space>
  )
}
