const mkComments = {
  async init() {
    const label = area[data.type]
    const spans = find('.comments>span')
    if (spans[0]) spans[0].textContent = label
    const headSpan = find('#comments .head h2 span')
    if (headSpan[0]) headSpan[0].textContent = label
    this.emoji()
    this.area()
  },

  async emoji() {
    const emoji = ['hi yo', 'awa!', 'uwu!', 'wow!', 'guru', '来了老弟~']
    const buttons = find('#responses .buttons')[0]
    if (!buttons) return
    for (const ee of emoji) {
      buttons.innerHTML += `<div class='button'>${ee}</div>`
    }
    for (const btn of find('#responses .button')) {
      btn.onclick = () => {
        const ta = find('#forum textarea')[0]
        if (!ta) return
        ta.value += btn.textContent + ' '
      }
    }
  },

  async area() {
    const comments = find('#forum .all')[0]
    if (!comments) return
    for (const comment of data.json) {
      comments.innerHTML += mkComment(comment)
    }
    for (const nick of find('.comment h3')) {
      nick.onclick = () => {
        const ta = find('#forum textarea')[0]
        if (!ta) return
        ta.value += '@' + (nick.textContent || at[Math.floor(r() * 3)]) + ' '
      }
    }
  }
}

const mkComment = (comment) => {
  return (`
    <div class='comment'>
      <h3 title='${reT(easyT(new Date(padE(comment[2]))))}'>${comment[0]}</h3>
      <div class='bubble'>
        <div class='content'>${markdown().render(comment[1])}</div>
      </div>
    </div>
  `)
}

const postComment = {
  async init(form) {
    this.comment = new FormData(form)
    this.comment.append('tag', data.info ? data.info[0] : '.')
    this.comment.append('title', data.info ? data.info[3] + '~' + data.title : 'home')
    this.test()
  },

  async test() {
    let text = ''
    const nick = this.comment.get('nick') || ''
    const txt = this.comment.get('text') || ''

    if (![...this.comment.values()].every((item) => String(item).trim() !== ''))
      text = '不可以提交空内容/空昵称——'

    if (!/^[\p{L}\p{N}]+$/u.test(nick))
      text = '昵称应当由英/汉/数组成'

    if (nick.length > 12)
      text = '最多可以输入12字的昵称'

    if (txt.length > 512)
      text = '最多可以输入512字的内容'

    text ? notice(area[data.type], text) : this.post()
  },

  async post() {
    const response = await fetch('/comment', {
      method: 'POST',
      body: this.comment
    })

    if (!response.ok) return

    const result = await response.json()
    notice(area[data.type], result.text)
    if (!result.code) return

    const comments = find('#forum .all')[0]
    if (comments) comments.innerHTML += mkComment(result.data)

    const text = find('#forum textarea')[0]
    if (text) {
      text.value = ''
      text.dispatchEvent(new Event('input'))
    }
  }
}