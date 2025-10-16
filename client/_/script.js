const print=(text)=>console.log(text) // Python(bushi)
const find=(ee)=>document.querySelectorAll(ee)
const create=(ee)=>document.createElement(ee)

const test=(ee)=>ee==window.location.href

const save=(key,value)=>{
    localStorage.setItem(key,value)
    print("save "+key+" "+value)
    return value
}
const load=(key)=>{
    const value=localStorage.getItem(key)||100
    print("load "+key+" "+value)
    return value
}

const date=new Date()
const pad=(time,total=2,str="0")=>time.toString().padStart(total,str)
const formatTimeDiff=(ms)=>{
    const seconds=Math.floor(ms/1000)
    const hours=Math.floor(seconds/3600)
    const minutes=Math.floor((seconds%3600)/60)
    return (hours?hours+"小时":"")
    +(minutes?minutes+"分钟":"")
    +seconds%60+"秒"
}
const formaTime=(timer)=>[
    pad(timer.getFullYear(),4),
    pad(timer.getMonth()+1),
    pad(timer.getDate()),
    pad(timer.getHours()),
    pad(timer.getMinutes()),
    pad(timer.getSeconds())
]
const returnTime=(time,sign="-")=>(
    time.slice(0,3).join(sign)+" "+
    time.slice(3).join(":")
).trimEnd()

const markdown=(html=false)=>{
    return new Remarkable("full",{
        html:html,
        xhtmlOut:false,
        breaks:true,
        langPrefix:"",
        linkify:true,
        typographer:true,
        quotes:`""''`,
        linkTarget:'_blank" rel="noopener noreferrer',
        doHighlight:true,
        highlight:(str,lang)=>{
            try { return hljs.highlight(lang,str).value }
            catch (ee) {}
        }
    })
}

const r=()=>Math.random().toFixed(2)
const go=(to,type="_blank")=>{
    const ee=create("a")
    ee.href=to
    ee.target=type
    ee.rel="noopener noreferrer"
    ee.click()
}

const type={
    ".md":"markdown",
    ".txt":"txt",
    ".html":"website"
}

const rickroll=[
    "*Never Gonna Give You Up*\n永远不会放弃你——",
    "*Never Gonna Let You Down*\n永远不会让你失望——",
    "*Never Gonna Run Around and Desert You*\n永远不会抛下你——",
    "*Never Gonna Make You Cry*\n永远不会让你哭泣——",
    "*Never Gonna Say Goodbye*\n永远不会对你说再见——",
    "*Never Gonna Tell a Lie and Hurt You*\n永远不会撒谎伤害你——",
]

const eebot={
    async init() {
        this.type={}
        await this.tags()
        await this.archives()
        await this.stats()
        await this.flip()
        await this.binding()
        await this.upload()
    },
    async tags() {
        this.type.tags=true
        find("#tags .palette")[0].onclick=()=>{
            if (!this.type.tags) return
            notice("Rick Astley",rickroll[Math.floor(r()*6)])
        }
    },
    async archives() {
        this.type.archives=true
        find("#archives .reverse")[0].onclick=()=>{
            if (!this.type.archives) return
            const text=["*最旧 → 最新*","*最新 → 最旧*"]
            const num=window.getComputedStyle(
                find("#archives .head h3")[0],"::after"
            ).getPropertyValue("content")
            notice("文章归档","调整顺序："+text[+num[1]])
        }
    },
    async stats() {
        this.type.stats=true
        find("#stats .switch")[0].onclick=()=>{
            if (!this.type.stats) return
            const time=+new Date-+date
            const timeStr=formatTimeDiff(time)
            notice("博客相关","你已经在这里呆了"+timeStr)
        }
    },
    async flip() {
        this.type.flip=true
        const list=[
            ["first","第一页","第一页"],
            ["prev","上一页","第一页"],
            ["next","下一页","最后一页"],
            ["last","最后一页","最后一页"]
        ]
        list.forEach((ee)=>{
            find("#flip ."+ee[0])[0].onclick=()=>{
                if (!this.type.flip) return
                const href=find("#flip ."+ee[0]+" a")[0].href
                notice(
                    ee[1],
                    test(href)
                    ?"已经在"+ee[2]+"了"
                    :"成功翻至第"+href[href.length-1]+"页"
                )
            }
        })
    },
    async binding() {
        this.type.binding=true
        find("#binding label")[0].onclick=()=>{
            notice("PAPEREE","*可恶 这个按钮没有任何作用*\n只是用来测试CSS是否正常工作")
        }
        find("#binding hr~label").forEach((ee)=>{
            ee.onclick=()=>{
                notice(
                    "指路石",
                    find("#"+ee.attributes.for.value)[0].checked
                    ?"成功传送至……原地？"
                    :"成功传送至"+ee.textContent
                )
            }
        })
    }
}
    
var base=[]
const get={
    essays:()=>mkEssays.init(),
    essay:()=>mkEssay.init()
}

const mkSidebar={
    async init() {
        this.display()
        this.tags()
        this.archives()
        this.stats()
    },
    async display() {
        find("#"+data.type)[0].style.display="flex"
        find("."+data.type).forEach((ee)=>ee.style.display="flex")
    },
    async tags() {
        const tags=[]
        base.forEach((ee)=>!tags.includes(ee[1])?tags.push(ee[1]):null)
        tags.sort(()=>r()-0.5)
        .forEach((tag)=>find("#tags .body")[0].innerHTML+="<span>"+tag+"</span>")
    },
    async archives() {
        const archives={}
        base.forEach((ee)=>{
            const time=returnTime(formaTime(new Date(ee[4])).slice(0,2))
            if (!archives[time]) archives[time]=[]
            archives[time].push(ee[0])
        })
        Object.keys(archives).forEach((value,index)=>{
            const div=create("div")
            archives[value].forEach((ee)=>{
                div.innerHTML+="<p class='ellipsis'><a>"+ee+"</a></p>"
            })
            find("#archives .body")[0].innerHTML+=
            "<div><input type='checkbox' id='ouo"
            +index+
            "'/><div>"
            +div.innerHTML+
            "</div><label for='ouo"
            +index+
            "'><i class='fas fa-caret-down'></i>"
            +value+
            "</label></div>"
        })
    },
    async stats() {
        setInterval(()=>find("#time")[0].textContent=
            returnTime(formaTime(new Date()),"/"),1000
        )
        find("#sign")[0].textContent=data.pack.signature[
            Math.floor(r()*data.pack.signature.length)
        ]
        find("#table")[0].innerHTML=
        "<table><tr><td>运行天数</td><td>"
        +Math.ceil((+new Date-data.stat[0])/86400000)+
        "</td></tr><tr><td>总访问量</td><td>"
        +data.stat[1]+
        "</td></tr><tr><td>总文章数</td><td>"
        +data.stat[2]+
        "</td></tr><tr><td>总评论数</td><td>"
        +114514+
        "</td></tr></table>"
    }
}

const mkEssays={
    async init() {
        Object.keys(data.list).forEach((ee)=>{
            base.push([ee,...data.list[ee]])
        })
        base.sort((a,b)=>b[4]-a[4])
        const num=Math.ceil(base.length/4)
        for (let i=0;i<num;i++) {
            await this.createPage(i)
        }
        await flip.init(num)
        await this.gotoEssay()
    },
    async createPage(index) {
        const div=create("div")
        div.classList.add("page")
        div.id="p"+(index+1)
        for (let i=index*4;i<Math.min((index+1)*4,base.length);i++) {
            div.innerHTML+=await this.createInfo(base[i])
        }
        find("#essays .body")[0].appendChild(div)
    },
    async createInfo(info) {
        return "<div class='essay' id='"+info[0]+"'><h2>"
        +info[0]+
        "</h2><p><span>标签: "
        +info[1]+
        "</span><span>类型: "
        +type[info[2]]+
        "</span><span>阅读时长: "
        +Math.ceil(info[3]/500)+
        "分钟</span></p><p><span>更新时间: "
        +returnTime(formaTime(new Date(info[4])))+
        "</span></p></div>"
    },
    async gotoEssay() {
        find(".page .essay").forEach((ee)=>{
            ee.onclick=()=>go("essays/"+ee.id)
        })
    }
}

const mkEssay={
    async init() {
        this.createEssay()
    },
    async createEssay() {
        find("#essay .body")[0].innerHTML=
        markdown(true).render(data["text"])
    }
}

const mkComments={
    async init() {
        this.type={"essays":"留言板","essay":"评论"}
        find(".comments>span")[0].textContent
        =find("#comments .head h2 span")[0].textContent
        =this.type[data.type]
        this.emoji()
    },
    async emoji() {
        const emoji=["awa!","uwu!","wow!","guru","来了老弟~"]
        emoji.forEach((ee)=>{
            find("#responses .buttons")[0].innerHTML+=
            "<div class='button'>"+ee+"</div>"
        })
    }
}

const flip={
    async init(num) {
        find(".first a")[0].href="#p1"
        find(".last a")[0].href="#p"+num
        this.num=num
        this.getPage()
    },
    async getPage() {
        this.page=window.location.hash||"#p1"
        if (!find(this.page).length) this.page="#p1"
        this.turnPage()
    },
    async turnPage() {
        const now=+this.page.split("#p")[1]
        go(this.page,"")
        find(".now span")[0].textContent=now
        find(".prev a")[0].href="#p"+(now-1||1)
        find(".next a")[0].href="#p"+Math.min(now+1,this.num)
    }
}

var notices=[]
const leechee=[
    "不许戳啦 再戳就坏掉荔--",
    "QAQ 走开走开走开--",
    "快把你的爪子拉远点--",
]
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

const webzoom=(value)=>{
    const value_=2*(+value)/100
    find("#webzoom>h4")[0].textContent="网页缩放："+value+"%"
    /* find("html")[0].style.fontSize="min("+value_+"vh,"+value_+"vw)" */
    save("test",value)
    notice(
        "网页缩放",
        +value===114
        ?"成功将*114514 1919810*\n调节为：哼哼哼 啊啊啊啊"
        :"成功将比例调节为：*"+value+"%*"
    )
    return value
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