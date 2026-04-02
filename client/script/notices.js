const notices = []
const notice = (head, body) => {
  const len = notices.length

  if (len >= 6) {
    print(notices.slice(len - 6, len))
  }
  if (len > 17) {
    notices.shift()
    if (new Set(notices).size === 1 && r() < 0.25) {
      head = 'PAPEREE'
      body = paper[Math.floor(r() * 3)]
    }
  }
  notices.push(body)

  const div = create('div')
  const uwu6C = find('#uwu6')[0]
  if (!uwu6C) return
  div.classList.add('notice')
  div.innerHTML = `
    <div class='head'>
      <h4><i class='fas fa-bell'></i>${head}</h4>
    </div>
    <div class="body">
      ${markdown(true).render(body)}
    </div>`
  uwu6C.prepend(div)
  setTimeout(() => div.remove(), 2700)

  if (uwu6C.children.length > 5) {
    uwu6C.children[5].remove()
  }
}