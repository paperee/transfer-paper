const mkComments={
    async init() {
        this.type={"essays":"留言板","essay":"评论区"}
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