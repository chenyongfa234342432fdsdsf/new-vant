/* eslint-disable no-console */
import React from 'react'
import { Checkbox } from '@nbit/vant'

export default () => {
  return (
    <div className='demo-checkbox'>
      <Checkbox.Group onChange={v => console.log(v)} defaultValue={['a', 'b']}>
        <Checkbox name='a'>复选框组 a</Checkbox>
        <Checkbox name='b'>复选框组 b</Checkbox>
        <Checkbox name='c'>复选框组 c</Checkbox>
      </Checkbox.Group>
    </div>
  )
}
