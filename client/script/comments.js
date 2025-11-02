var area={"essays":"留言板","essay":"评论区"}
const mkComments={
    async init() {
        find(".comments>span")[0].textContent
        =find("#comments .head h2 span")[0].textContent
        =area[data.type]
        this.emoji()
        this.area()
    },
    async emoji() {
        const emoji=["hi yo","awa!","uwu!","wow!","guru","来了老弟~"]
        emoji.forEach((ee)=>{
            find("#responses .buttons")[0].innerHTML+=
            "<div class='button'>"+ee+"</div>"
        })
        find("#responses .button").forEach((button)=>button.onclick=()=>{
            find("#forum textarea")[0].value+=button.textContent+" "
        })
    },
    async area() {
        const comments=find("#forum .all")[0]
        data.json.forEach((comment)=>comments.innerHTML+=mkComment(comment))
        find(".comment h3").forEach((nick)=>{
            nick.onclick=()=>find("#forum textarea")[0].value+="@"+(nick.textContent||at[Math.floor(r()*3)])+" "
        })
    }
}

const mkComment=(comment)=>{
    return "<div class='comment'><h3 title='"
    +returnTime(formaTime(new Date(comment[2])))+
    "'>"
    +comment[0]+
    "</h3><div class='bubble'><div class='content'>"
    +markdown().render(comment[1])+
    "</div></div></div>"
}

const postComment={
    async init(form) {
        this.comment=new FormData(form)
        this.comment.append("label",data.info?data.info[0]:".")
        this.comment.append("title",data.title||"home")
        this.test()
    },
    async test() {
        let text=""
        if (!Object.values(this.comment).every((item) => item.trim() !== ""))
            text="不可以提交空内容/空昵称——"
        if (!/^[\p{L}\p{N}]+$/u.test(this.comment.get("nick")))
            text="昵称应当由英/汉/数组成"
        if (!await this.comment.get("nick").length>12)
            text="最多可以输入12字的昵称"
        if (!await this.comment.get("text").length>512)
            text="最多可以输入512字的内容"
        text?notice(area[data.type],text):this.post()
    },
    async post() {
        const response =await fetch("/comment",{
            method: "POST",
            body:this.comment
        })

        if (!response.ok) return

        const result = await response.json()
        notice(area[data.type],result.text)
        if (!result.code) return

        find("#forum .all")[0].innerHTML+=mkComment(result.data)

        const nick=find("#user")[0]
        nick.value =""
        nick.dispatchEvent(new Event("input"))

        const text=find("#forum textarea")[0]
        text.value =""
        text.dispatchEvent(new Event("input"))
    }
}