import React, { useState, useEffect, useCallback } from 'react'

// 创建自定义函数来写入方法
function UseWillSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  // 写入方法
  // 使用 useCallback 缓存方法
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize',  onResize)
    }
  }, [onResize])
  return size
}

function ExampleIndex() {
  const size = UseWillSize()
  return (
    <>
      <h2>
        高：{ size.height }
      </h2>
      
      <h2>
        宽：{ size.width }
      </h2>
    </>
  )
}

export default ExampleIndex
