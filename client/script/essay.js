const mkEssay={
    async init() {
        this.createEssay()
    },
    async createEssay() {
        find("#essay .body")[0].innerHTML=
        markdown(true).render(data["text"])
    }
}