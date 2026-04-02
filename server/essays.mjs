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
        stabilityThreshold:1000,
        pollInterval:1000
      }
    }
    this.e=/(\d{4}-\d{2}-\d{2})~(.*)/
    this.sum=0
    this.list={}
    this.watch()
  }
  async watch() {
    watch(join(__dirname,"essays"),this.main)
    .on("error",(path)=>print("[error] "+path))
    .on("change",(path)=>print("[change] "+path))
    .on("unlink",(path)=>this.delete(path))
    .on("add",(path)=>this.upload(path))
  }
  async delete(path) {
    this.sum-=1
    const name=parse(path).name.split(this.e)
    delete this.list[name[2]]
    print("[delete] "+path)
  }
  async upload(path) {
    this.sum+=1
    const res=await stat(path)
    const tag=basename(dirname(path))
    if (tag=="_") return
    const name=parse(path).name.split(this.e)
    this.list[name[2]]=[
      tag, // 父文件夹/标签
      parse(path).ext, // 文件拓展名/类型
      res.size, // 文件大小/字数
      name[1] // 文件名/标题
    ]
    print("[upload] "+path)
  }
}

export default getEssays