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