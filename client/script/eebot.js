const eebot = {
  async init() {
    this.type = {}
    await this.tags()
    await this.archives()
    await this.stats()
    await this.flip()
    await this.binding()
  },

  async tags() {
    this.type.tags = true
    const btn = find('#tags .palette')[0]
    if (!btn) return
    btn.onclick = () => {
      if (!this.type.tags) return
      notice('Rick Astley', rickroll[Math.floor(r() * 6)])
    }
  },

  async archives() {
    this.type.archives = false
    const btn = find('#archives .reverse')[0]
    if (!btn) return
    btn.onclick = () => {
      if (!this.type.archives) return
      const text = ['*最旧 → 最新*', '*最新 → 最旧*']
      const num = style(find('#archives .head h3')[0], 'content', '::after')
      notice('文章归档', '调整顺序：' + text[+num[1]])
    }
  },

  async stats() {
    this.type.stats = false
    const btn = find('#stats .switch')[0]
    if (!btn) return
    btn.onclick = () => {
      if (!this.type.stats) return
      const time = +new Date() - +date
      const timeStr = diffT(time)
      notice('博客相关', '你在这里呆了' + timeStr)
    }
  },

  async flip() {
    this.type.flip = false
    for (const entry in ruld) {
      const cls = entry[0]
      const btn = find('#flip .' + cls)[0]
      if (!btn) return
      btn.onclick = () => {
        if (!this.type.flip) return
        const link = find('#flip .' + cls + ' a')[0]
        const href = link ? link.href : ''
        notice(
          entry[1],
          test(href)
            ? '已经在' + entry[2] + '了'
            : '成功翻至第' + (href.match(/#p(\d+)/) || [])[1] + '页'
        )
      }
    }
  },

  async binding() {
    this.type.binding = true
    const primary = find('#binding label')[0]
    if (primary) {
      primary.onclick = () => {
        notice('PAPEREE', '谢谢你来看我 *uwu*')
      }
    }

    for (const ee of find('#binding hr ~ label')) {
      ee.onclick = () => {
        const targetId = ee.attributes.for && ee.attributes.for.value
        const target = targetId ? find('#' + targetId)[0] : null
        const checked = target ? target.checked : false
        notice(
          '指路石',
          checked ? '成功传送至……原地？' : '成功传送至' + ee.textContent
        )
      }
    }
  }
}