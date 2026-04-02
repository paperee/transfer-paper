const get = {
  essays: () => mkEssays.init(),
  essay: () => mkEssay.init()
}

window.onload = () => {
  print(data)
  get[data.type]()
  mkSidebar.init()
  mkComments.init()

  window.addEventListener('hashchange', () => flip.getPage())

  const isMobile = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  if (!isMobile) VanillaTilt.init(find('#main')[0])

  const webZ = find('#webzoom > input')[0]
  if (webZ) {
    webZ.addEventListener('change', function () { webzoom(this.value) })
    webZ.value = webzoom(load('webZ', isMobile ? 90 : 100))
  }

  const reflect = { '+': 5, '=': 5, '-': -5 }
  document.addEventListener('keydown', (event) => {
    if (!event.ctrlKey) return
    if (event.key !== '+' && event.key !== '=' && event.key !== '-') return
    event.preventDefault()
    relativeZoom(reflect[event.key])
  })

  const userN = find('#user')[0]
  if (userN) {
    userN.value = load('userN', '')
    userN.addEventListener('input', function () {
      const previewN = find('.preview > h3')[0]
      if (previewN) previewN.textContent = this.value
      save('userN', this.value)
    })
    userN.dispatchEvent(new Event('input'))
  }

  const textA = find('#forum textarea')[0]
  if (textA) {
    const textAK = (data.title ?? 'home') + '-textA'
    textA.value = load(textAK, '')
    textA.addEventListener('input', function () {
      const previewC = find('.preview .content')[0]
      if (previewC) previewC.innerHTML = markdown().render(this.value)
      save(textAK, this.value)
    })
    textA.dispatchEvent(new Event('input'))
  }

  const forum = find('#forum')[0]
  if (forum) {
    forum.addEventListener('submit', function (event) {
      event.preventDefault()
      postComment.init(this)
    })
  }

  eebot.init()
}