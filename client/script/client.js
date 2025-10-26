var base=[]
const get={
    essays:()=>mkEssays.init(),
    essay:()=>mkEssay.init()
}

window.onload=()=>{
    print(data)
    get[data.type]()
    mkSidebar.init()
    mkComments.init()

    window.addEventListener("hashchange",()=>flip.getPage())

    VanillaTilt.init(find("#main")[0])

    find("#webzoom>input")[0].addEventListener("change",function () { webzoom(this.value) })
    find("#webzoom>input")[0].value=webzoom(load("test"))
    eebot.init()
}