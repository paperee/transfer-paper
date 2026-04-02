const webzoom = (value) => {
  const percent = +value
  const scale = 2 * percent / 100
  const title = find('#webzoom > h4')[0]
  if (title) title.textContent = `网页缩放：${percent}%`

  const html = find('html')[0]
  if (html) html.style.fontSize = `max(min(${scale}dvh, ${percent}vw), 12px)`
  save('webZ', percent)
  notice(
    '网页缩放',
    percent === 114
      ? '成功将*114514 1919810*\n调节为：哼哼哼 啊啊啊啊'
      : `成功将比例调节为：*${percent}%*`
  )
  return percent
}

const relativeZoom = (delta) => {
  const zoomBar = find('#webzoom > input')[0]
  if (!zoomBar) return
  zoomBar.value = String(+zoomBar.value + +delta)
  zoomBar.dispatchEvent(new Event('change'))
}