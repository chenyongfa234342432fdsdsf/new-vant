import React from 'react'
import { Checkbox } from '@nbit/vant'

export default () => {
  return (
    <div className='demo-checkbox'>
      <Checkbox.Group defaultValue={[]} max={2}>
        <Checkbox name='a'>复选框 a</Checkbox>
        <Checkbox name='b'>复选框 b</Checkbox>
        <Checkbox name='c'>复选框 c</Checkbox>
      </Checkbox.Group>
    </div>
  )
}
