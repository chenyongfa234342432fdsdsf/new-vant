import React from 'react'
import { Button } from '@nbit/vant'
import './style.less'

export default () => {
  return (
    <div className='demo-button'>
      <Button square type='primary'>
        方形按钮
      </Button>
      <Button round type='info'>
        圆形按钮
      </Button>
    </div>
  )
}
