import React from 'react'
import { Uploader } from '@nbit/vant'
import { upload, demoData } from './utils'
import './style.less'

export default () => {
  return <Uploader defaultValue={demoData} upload={upload} />
}
