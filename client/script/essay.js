function setInnerHTML(ee, html) {
  if (!ee) return
  ee.innerHTML = html

  Array.from(ee.querySelectorAll('script')).forEach((oldS) => {
    const newS = create('script')

    Array.from(oldS.attributes).forEach((attr) => {
      newS.setAttribute(attr.name, attr.value)
    })

    const text = document.createTextNode(oldS.innerHTML)
    newS.appendChild(text)

    oldS.parentNode.replaceChild(newS, oldS)
  })
}

const mkEssay = {
  async init() { this.createEssay() },
  async createEssay() {
    const body = find('#essay .body')[0]
    setInnerHTML(body, markdown(true).render(data.text))
  }
}