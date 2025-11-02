var tags={}
const mkSidebar={
    async init() {
        this.display()
        this.tags()
        this.archives()
        this.stats()
        this.info()
        this.content()
    },
    async display() {
        find("#"+data.type)[0].style.display="flex"
        find("."+data.type).forEach((ee)=>ee.style.display="flex")
    },
    async tags() {
        base.forEach((ee)=>{
            if (ee[1]=="page") return
            if (!Object.keys(tags).includes(ee[1])) return tags[ee[1]]=[ee[0]]
            else tags[ee[1]].push(ee[0])
        })
        print(tags)
        Object.keys(tags).sort(()=>r()-0.5).forEach((tag)=>{
            find("#tags .body")[0].innerHTML+=
            "<label class='colorful' for='uvu4' title="+tag+">"
            +tag+"</label>"
        })
        find("#tags .colorful").forEach((ee)=>{
            ee.onclick=()=>{
                const search=find("#search .body")[0]
                search.innerHTML=""
                find("#search .head")[0].innerHTML=
                "<h2><i class='fas fa-search'></i>拥有标签 "+ee.textContent+" 的全部文章</h2>"
                tags[ee.title].forEach((id)=>{
                    const temp=find("#"+id)[0].cloneNode(true)
                    search.appendChild(temp)
                })
            }
        })
    },
    async archives() {
        const archives={}
        base.forEach((ee)=>{
            if (ee[1]=="page") return
            const time=returnTime(formaTime(new Date(ee[4])).slice(0,2))
            if (!archives[time]) archives[time]=[]
            archives[time].push(ee[0])
        })
        Object.keys(archives).forEach((value,index)=>{
            const div=create("div")
            archives[value].forEach((ee)=>{
                div.innerHTML+="<p class='ellipsis'><a href='essays/"
                +ee+
                "'>"
                +ee+
                "</a></p>"
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
            returnTime(formaTime(new Date()),false,"/"),1000
        )
        find("#sign")[0].textContent=data.pack.signature[
            Math.floor(r()*data.pack.signature.length)
        ]
        find("#table")[0].innerHTML=
        "<table><tr><td class='ellipsis'>运行天数</td><td>"
        +Math.ceil((+new Date-data.stat[0])/86400000)+
        "</td></tr><tr><td class='ellipsis'>总访问量</td><td>"
        +data.stat[1]+
        "</td></tr><tr><td class='ellipsis'>总文章数</td><td>"
        +data.stat[2]+
        "</td></tr><tr><td class='ellipsis'>总评论数</td><td>"
        +114514+
        "</td></tr></table>"
    },
    async info() {
        if (!data.info) return
        find("#info .body")[0].innerHTML=
        "<div class='brief'><p><b>标签</b> <span class='colorful'> "
        +data.info[0]+
        "</span></p><p><b>类型</b> "
        +type[data.info[1]]+
        "</p><p><b>阅读时长</b> "
        +Math.ceil(data.info[2]/1000)+
        "分钟/"
        +Math.ceil(data.info[2]/4)+
        "字</p><p><b>更新时间</b> "
        +returnTime(formaTime(new Date(data.info[3])),true)+
        "</p></div>"
    },
    async content() {
        const content=find("#content .list")[0]
        find("#essay h1,#essay h2,#essay h3").forEach((ee)=>{
            const temp=ee.cloneNode(true)
            temp.innerHTML="<a href='#"+ee.textContent+"'>"+ee.innerHTML+"</a>"
            content.appendChild(temp)
            ee.id=ee.textContent
            ee.innerHTML=temp.innerHTML
        })
    }
}