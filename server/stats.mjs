class getStats {
    constructor() {
        // [启动时间,总访问量,总文章数]
        this.stat=[+new Date(),0,0]
    }
    async get(length) {
        this.stat[1]++
        this.stat[2]=await length
        return this.stat
    }
}

export default getStats