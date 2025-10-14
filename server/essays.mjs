const print=(text)=>console.log(text)

import { parse,join,dirname,basename } from "path"
import { fileURLToPath } from "url"
const __dirname=dirname(fileURLToPath(import.meta.url))

import { stat } from "fs/promises"
import { watch } from "chokidar"

class getEssays {
    constructor() {
        // awaitWriteFinish: 添加延迟，保证新文章的更新在旧文章的删除之后（
        this.main={depth:1,awaitWriteFinish:{stabilityThreshold:757,pollInterval:757}}
        this.list={}
        this.watch()
    }
    async ls() {
        return Object.keys(this.list).length
    }
    async watch() {
        watch(join(__dirname,"essays"),this.main)
        .on("error",(path)=>print("[error] "+path))
        .on("change",(path)=>print("[change] "+path))
        .on("unlink",(path)=>this.delete(path))
        .on("add",(path)=>this.upload(path))
    }
    async delete(path) {
        delete this.list[parse(path).name]
        print("[delete] "+path)
    }
    async upload(path) {
        const res=await stat(path)
        this.list[parse(path).name]=[basename(dirname(path)),parse(path).ext,res.size,parseInt(res.birthtimeMs)]
        print("[upload] "+path)
    }
}

export default getEssays