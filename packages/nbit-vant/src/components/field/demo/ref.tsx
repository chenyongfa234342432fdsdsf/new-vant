import React, { useRef } from 'react'
import { Field, Button } from '@nbit/vant'
import type { FieldInstance } from '@nbit/vant'

export default () => {
  const fieldRef = useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={fieldRef}
      placeholder='请输入文本'
      label='文本'
      suffix={
        <Button
          size='small'
          onClick={() => {
            fieldRef?.current?.focus()
          }}
        >
          聚焦
        </Button>
      }
    />
  )
}
