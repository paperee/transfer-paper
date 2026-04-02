const base = []
const mkEssays = {
  async init() {
    for (const key in data.list) {
      if (data.list[key][0] === 'page') continue
      base.push([key, ...data.list[key]])
    }

    base.sort((a, b) => getT(b[4]) - getT(a[4]))
    print(base)

    const pages = Math.ceil(base.length / 4)
    for (let i = 0; i < pages; i++) {
      await this.createPage(i)
    }

    await flip.init(pages)
    await this.gotoEssay()
  },

  async createPage(index) {
    const div = create('div')
    div.classList.add('page')
    div.id = 'p' + (index + 1)

    const start = index * 4
    const end = Math.min((index + 1) * 4, base.length)
    for (let i = start; i < end; i++) {
      div.innerHTML += await this.createInfo(base[i])
    }

    const container = find('#essays .body')[0]
    if (container) container.appendChild(div)
  },

  async createInfo(info) {
    const title = info[0]
    const tag = info[1]
    const ext = info[2]
    const count = +info[3] || 0
    const tamp = info[4]

    const mins = Math.ceil(count / 1000)
    const chars = Math.ceil(count / 4)

    return (`
      <div class='essay' title='${title}'>
        <h2>${title}</h2>
        <p><span>标签: ${tag}</span><span>阅读时长: ${mins}分钟/${chars}字</span></p>
        <p><span>类型：${type[ext] || 'nothing'}</span><span>更新日期：${tamp}</span></p>
      </div>
    `)
  },

  async gotoEssay() {
    for (const ee of find('.page .essay')) {
      ee.onclick = () => go('essays/' + ee.title, '')
    }
  }
}