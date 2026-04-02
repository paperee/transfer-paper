const print = (...text) => console.log(...text) // Python(bushi)

const find = (ee) => document.querySelectorAll(ee) // 查找元素
const create = (ee) => document.createElement(ee) // 创建元素

const test = (url) => url == window.location.href // 获取URL

const save = (key, value) => { // 存入缓存
  localStorage.setItem(key, value)
  print('save', key, value)
  return value
}

const load = (key, def) => { // 读出缓存
  const value = localStorage.getItem(key) || def
  print('load', key, value)
  return value
}

const go = (to, target = '_blank') => { // 链接跳转
  const a = create('a')
  a.rel = 'noopener noreferrer'
  a.href = to
  a.target = target
  a.click()
}

const r = () => +Math.random().toFixed(2) // 0.00~1.00 随机数

const rEssay = () => {
  const list = Object.keys(data.list || {})
  if (!list.length) return
  const i = Math.floor(r() * list.length)
  go('/essays/' + list[i], '')
}

const toT = () => {
  const ee = find('#essay')[0]
  if (!ee) return
  ee.scrollTop = 0
}
const toB = () => {
  const ee = find('#essay')[0]
  if (!ee) return
  ee.scrollTop = ee.scrollHeight - ee.clientHeight
}

const style = (ee, prop, pseudo = null) => window.getComputedStyle(ee, pseudo).getPropertyValue(prop)
const isDisplay = (ee) => style(ee, 'display') !== 'none'

const normalizeDelta = (ee) => {
  const LINE_HEIGHT = 16
  const PAGE_HEIGHT = window.innerHeight
  if (ee.deltaMode === 1) return ee.deltaY * LINE_HEIGHT
  if (ee.deltaMode === 2) return ee.deltaY * PAGE_HEIGHT
  return ee.deltaY
}

const keyDown = (key) => {
  const eventInit = {
    key: key,
    code: key,
    bubbles: true,
    cancelable: true
  }
  document.dispatchEvent(new KeyboardEvent('keydown', eventInit))
}

const markdown = (html = false) => { // 初始化 markdown
  return new Remarkable('full', {
    html: html,
    xhtmlOut: false,
    breaks: true,
    langPrefix: '',
    linkify: true,
    typographer: false,
    linkTarget: '_blank',
    doHighlight: true,
    highlight: (text, lang) => {
      try { return hljs.highlight(lang, text).value }
      catch (error) {}
    }
  })
}