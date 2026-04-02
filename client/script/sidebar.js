const mkSidebar = {
  async init() {
    this.display()
    this.tags()
    this.archives()
    this.stats()
    this.info()
    this.history()
    this.content()
  },

  async display() {
    const main = find(`#${data.type}`)[0]
    if (main) main.style.display = 'flex'
    for (const ee of find(`#uwu4 .${data.type}`)) {
      ee.style.display = 'flex'
    }
    const float = find(`#float .${data.type}`)[0]
    if (float) float.style.display = 'inline-block'
  },

  async tags() {
    const tags = {}
    for (const item of base) {
      if (item[1] === 'page') return
      if (!(item[1] in tags)) tags[item[1]] = [item[0]]
      else tags[item[1]].push(item[0])
    }
    print(tags)

    const body = find('#tags .body')[0]
    for (const tag in tags) {
      body.innerHTML += `
        <label class='colorful' for='uvu4' title='${tag}'>${tag}</label>
      `
    }

    for (const ee of find('#tags .colorful')) {
      ee.onclick = () => {
        const body = find('#search .body')[0]
        if (body) body.innerHTML = ''
        const head = find('#search .head')[0]
        if (head) head.innerHTML = `
          <h2><i class='fas fa-search'></i>拥有标签 ${ee.textContent} 的全部文章</h2>
        `
        for (const t of tags[ee.title]) {
          const src = find(`[title='${t}']`)[0]
          if (!src) return
          const temp = src.cloneNode(true)
          body.appendChild(temp)
          temp.onclick = () => go(`/essays/${t}`, '')
        }
      }
    }
  },

  async archives() {
    const archives = {}
    for (const item of base) {
      if (item[1] === 'page') return
      const time = reT(easyT(new Date(item[4])).slice(0, 2))
      if (!archives[time]) archives[time] = []
      archives[time].push(item[0])
    }

    const body = find('#archives .body')[0]
    if (!body) return

    Object.keys(archives).forEach((value, index) => {
      const div = create('div')
      for (const t of archives[value]) {
        div.innerHTML += `
          <p class='ellipsis'><a href='/essays/${t}'>${t}</a></p>
        `
      }
      body.innerHTML += `
        <div>
          <input type='checkbox' id='ouo${index}'/>
          <div>${div.innerHTML}</div>
          <label for='ouo${index}'><i class='fas fa-caret-down'></i>${value}</label>
        </div>
      `
    })
  },

  async stats() {
    const time = find('#time')[0]
    if (time) {
      const now = reT(easyT(new Date()))
      setInterval(() => (time.textContent = now, false, '/'), 1000)
    }

    const sign = find('#sign')[0]
    if (sign && data.pack && Array.isArray(data.pack.signature)) {
      sign.textContent = data.pack.signature[Math.floor(r() * data.pack.signature.length)]
    }

    const table = find('#table')[0]
    if (table) { 
      table.innerHTML = `
        <table>
          <tr>
            <td class='ellipsis'>运行天数</td>
            <td>${Math.ceil((+new Date() - data.stat[0]) / 86400000)}</td>
          </tr>
          <tr>
            <td class='ellipsis'>总访问量</td>
            <td>${data.stat[1]}</td>
          </tr>
          <tr>
            <td class='ellipsis'>总评论数</td>
            <td>${data.stat[2]}</td>
          </tr>
          <tr>
            <td class='ellipsis'>总文章数</td>
            <td>${data.stat[3]}</td>
          </tr>
        </table>
      `
    }
  },

  async info() {
    if (!data.info) return
    const info = find('#info .body')[0]
    if (!info) return
    info.innerHTML = `
      <div class='brief'>
        <p><b>标签</b> <span class='colorful'>${data.info[0]}</span></p>
        <p><b>类型</b> ${type[data.info[1]] || data.info[1]}</p>
        <p><b>阅读时长</b> ${Math.ceil(data.info[2] / 1000)}分钟/${Math.ceil(data.info[2] / 4)}字</p>
        <p><b>更新时间</b> ${reT(easyT(new Date(data.info[3])), true)}</p>
      </div>
    `
  },

  async history() {
    const uwu = {
      'new': find('#history .new')[0],
      'old': find('#history .old')[0]
    }
    if (!uwu.new && !uwu.old) return

    for (const mode of ['new', 'old']) {
      const container = uwu[mode]
      if (!container) continue
      for (const com of data[mode] || []) {
        container.innerHTML += `
          <div class="comment">
            <fieldset>
              <legend>${com[0]}<i class="far fa-comment-dots"></i></legend>
              <p>${reT(easyT(new Date(padE(com[2]))))}</p>
              <div class="content">${markdown().render(com[1])}</div>
              <h5 class="ellipsis">
                <a class="ellipsis" href="/essays/${com[4]}">${com[4]}</a>
              </h5>
            </fieldset>
          </div>
        `
      }
    }
  },

  async content() {
    const content = find('#content .list')[0]
    if (!content) return
    for (const ee of find('#essay h1, #essay h2, #essay h3')) {
      const temp = ee.cloneNode(true)
      temp.innerHTML = `<a href='#${ee.textContent}'>${ee.innerHTML}</a>`
      content.appendChild(temp)
      ee.id = ee.textContent
      ee.innerHTML = temp.innerHTML
    }
  }
}