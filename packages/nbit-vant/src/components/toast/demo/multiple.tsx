import React from 'react'
import { Cell, Toast, Switch } from '@nbit/vant'

export default () => {
  return (
    <>
      <Cell title='开启'>
        <Switch
          style={{ display: 'block', float: 'right' }}
          size={20}
          onChange={v => {
            Toast.allowMultiple(v)
          }}
        />
      </Cell>
      <Cell
        title='第一个Toast'
        isLink
        onClick={() =>
          Toast({
            message: '第一个 Toast',
          })
        }
      />
      <Cell
        title='第二个Toast'
        isLink
        onClick={() =>
          Toast({
            message: '第二个 Toast',
          })
        }
      />
    </>
  )
}
