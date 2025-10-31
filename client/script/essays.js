var base=[]
const mkEssays={
    async init() {
        Object.keys(data.list).forEach((ee)=>{
            base.push([ee,...data.list[ee]])
        })
        base.sort((a,b)=>b[4]-a[4])
        print(base)
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
        const title=info[0]
        const label=info[1]
        const extension=info[2]
        const wordCount=info[3]
        const timestamp=info[4]
        return "<div class='essay' id='"
        +title+
        "'><h2>"
        +title+
        "</h2><p><span>标签: "
        +label+
        "</span><span>类型: "
        +type[extension]+
        "</span><span>阅读时长: "
        +Math.ceil(wordCount/1000)+
        "分钟/"
        +Math.ceil(wordCount/4)+
        "字</span></p><p><span>更新时间: "
        +returnTime(formaTime(new Date(timestamp)))+
        "</span></p></div>"
    },
    async gotoEssay() {
        find(".page .essay").forEach((ee)=>{
            ee.onclick=()=>go("essays/"+ee.id,"")
        })
    }
}