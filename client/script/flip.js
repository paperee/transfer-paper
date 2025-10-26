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