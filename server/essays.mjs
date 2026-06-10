const print = (...text) => console.log(...text)

import { parse, join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import { stat } from 'fs/promises'
import { watch } from 'chokidar'

class getEssays {
  constructor() {
    // awaitWriteFinish: 添加延迟，保证更新在删除之后（
    this.main = {
      depth: 1,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 1000
      }
    }
    this.reg = /(\d{4}-\d{2}-\d{2})~(.*)/
    this.sum = 0
    this.list = {}
    this.watch()
  }
  async watch() {
    watch(join(__dirname, 'essays'), this.main)
    .on('error', (path) => print('[error] ' + path))
    .on('change', (path) => print('[change] ' + path))
    .on('unlink', (path) => this.delete(path))
    .on('add', (path) => this.upload(path))
  }
  async delete(path) {
    this.sum -= 1
    const { name } = parse(path)
    const [_, __, title] = name.match(this.reg)
    delete this.list[title]
    print('[delete] ' + path)
  }
  async upload(path) {
    this.sum += 1

    const tag = basename(dirname(path))
    if (tag == '_') return

    const size = (await stat(path)).size

    const { name, ext } = parse(path)
    const [_, date, title] = name.match(this.reg)

    this.list[title] = [tag, ext, size, date]
    print('[upload] ' + path)
  }
}

export default getEssays