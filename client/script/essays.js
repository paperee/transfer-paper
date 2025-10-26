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