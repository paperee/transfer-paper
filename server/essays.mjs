const print=(text)=>console.log(text)

import { parse,join,dirname,basename } from "path"
import { fileURLToPath } from "url"
const __dirname=dirname(fileURLToPath(import.meta.url))

import { stat } from "fs/promises"
import { watch } from "chokidar"

class getEssays {
    constructor() {
        // awaitWriteFinish: 添加延迟，保证更新在删除之后（
        this.main={
            depth:1,
            awaitWriteFinish:{
                stabilityThreshold:757,
                pollInterval:757
            }
        }
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
        const label=basename(dirname(path))
        if (label=="bin") return
        this.list[parse(path).name]=[
            label,
            parse(path).ext,
            res.size,
            parseInt(res.mtimeMs)
        ]
        print("[upload] "+path)
    }
}

export default getEssays