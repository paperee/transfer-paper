class getStats {
    constructor() {
        this.stat=[+new Date(),0,114514]
    }
    async get(length) {
        this.stat[1]++
        this.stat[2]=await length
        return this.stat
    }
}

export default getStats