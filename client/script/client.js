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

    document.addEventListener("keydown", (event) => {
        if (!event.ctrlKey) return
        if (event.key !== "+" && event.key !== "=" && event.key !== "-") return
        event.preventDefault()
        const reflect={"+":5,"=":5,"-":-5}
        relativeZoom(reflect[event.key])
    })
    eebot.init()
}