import React from 'react'
import { Uploader, Dialog } from '@nbit/vant'
import { upload, demoData } from './utils'
import './style.less'

export default () => {
  return (
    <Uploader
      defaultValue={demoData}
      upload={upload}
      onDelete={() =>
        Dialog.confirm({ title: '提示', message: '确认删除？🤔' })
      }
    />
  )
}
