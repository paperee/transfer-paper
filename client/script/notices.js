var notices=[]
const notice=(head,body)=>{
    const length=notices.length
    if (length>=6) {
        print(notices.slice(length-6,length))
    }
    if (length>17) {
        notices.shift()
        if (new Set(notices).size===1&&r()<0.25) {
            head="LEECHEE"
            body=leechee[Math.floor(r()*3)]
        }
    }
    notices.push(body)
    const div=create("div")
    const uwu6=find("#uwu6")[0]
    div.classList.add("notice")
    div.innerHTML=
    "<div class='head'><h4><i class='fas fa-bell'></i>"
    +head+
    "</h4></div><div class='body'>"
    +markdown(true).render(body)+
    "</div>"
    uwu6.prepend(div)
    setTimeout(()=>div.remove(),2700)
    if (uwu6.children.length>5) uwu6.children[5].remove()
}