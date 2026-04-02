const flip = {
  async init(n) {
    const first = find('.first a')[0]
    const last = find('.last a')[0]
    if (first) first.href = '#p1'
    if (last) last.href = `#p${n}`
    this.num = n
    this.getPage()
    this.setKeyEvent()
    this.setWheelEvent()
  },

  async getPage() {
    this.page = window.location.hash || '#p1'
    if (!find(this.page).length) this.page = '#p1'
    this.turnPage()
  },

  async turnPage() {
    const now = +this.page.split('#p')[1] || 1
    go(this.page, '')
    const nowSpan = find('.now span')[0]
    if (nowSpan) nowSpan.textContent = now
    const prev = find('.prev a')[0]
    const next = find('.next a')[0]
    if (prev) prev.href = '#p' + (now - 1 || 1)
    if (next) next.href = '#p' + Math.min(now + 1, this.num)
  },

  async setKeyEvent() {
    window.addEventListener('keydown', function (ee) {
      if (data.type !== 'essays' || isDisplay(find('#layer2')[0])) return
      if (ee.key in ruld) {
        const cfg = ruld[ee.key]
        const btn = find(`#flip .${cfg[0]} a`)[0]
        if (btn) btn.click()
      }
    })
  },

  async setWheelEvent() {
    const accumulator = (threshold = 100) => {
      let accum = 0
      return function (ee) {
        accum += normalizeDelta(ee)
        if (accum >= threshold) {
          keyDown('ArrowDown')
          accum = 0
        }
        if (accum <= -threshold) {
          keyDown('ArrowUp')
          accum = 0
        }
      }
    }

    const ee = find('#essays')[0]
    if (ee) ee.addEventListener('wheel', accumulator())
  }
}