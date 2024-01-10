import React from 'react'

export default ({ renderDefaultHeader }) => (
  <>
    {renderDefaultHeader()}
    <p
      style={{
        margin: 0,
        padding: 10,
        borderRadius: 10,
        background: 'var(--mdoc-menu-color-background-active)',
      }}
    >
      如果你想查阅完整的组件文档，请在桌面浏览器中访问：
      <a href='https://@nbit/vant.3lang.dev' target='_blank' rel='noreferrer'>
        https://@nbit/vant.3lang.dev
      </a>
    </p>
  </>
)
