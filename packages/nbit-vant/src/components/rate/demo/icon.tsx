import React, { useState } from 'react'
import { Rate } from '@nbit/vant'
import { Fire, FireO } from '@react-vant/icons'

export default () => {
  const [value, setValue] = useState(3)
  return (
    <Rate
      icon={<Fire />}
      voidIcon={<FireO />}
      value={value}
      onChange={setValue}
    />
  )
}
