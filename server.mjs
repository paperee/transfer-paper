const print = (text) => console.log(text)

import archiver from "archiver"

import { join, dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))
const client = join(__dirname, "client")
const server = join(__dirname, "server")

import config from "./config.json" with { type: "json" }
const { main, pack } = config

import getEssay from "./server/essay.mjs"
import getEssays from "./server/essays.mjs"
const essays = new getEssays()

import { getComments, getAllComments, checkComment, saveComment }
from "./server/comments.mjs"
let allComments = await getAllComments()

let vistorSum = 0
const firstDay = +new Date()

import express from "express"
const app = new express()
app.set("view engine", "ejs")
app.set("views", client)
app.use(express.static(client))

import multer from "multer"
const upload = multer()
app.use(express.urlencoded({ extended: true }))

// import { hotReloadMiddleware } from "@devmade/express-hot-reload"
// app.use(hotReloadMiddleware({ watchFolders: ["./client"] }))

app.get("/essays/:folder/:file", (req, res) => {
    res.redirect("/" + req.params.folder + "/" + req.params.file)
})

app.get("/", async (_, res) => {
    try {
      vistorSum += 1
      const json = await getComments(join(server, "comments", "home.json"))
      const stat = [firstDay, vistorSum, allComments.length, essays.sum]
      res.render("index.ejs",
        { data: {
          type: "essays",
          pack: pack,
          list: essays.list,
          stat: stat,
          json: json,
          new: allComments.slice(0, 5),
          old: allComments.slice(-5).reverse(),
        } }
      )
    }
    catch(_) {
        print(_)
        res.status(500).send("500 Internal Server Error")
    }
})

app.get("/essays/:title", async (req, res) => {
  const title = req.params.title
  const info = essays.list[title]
  if (!info) return res.status(404).send("(4n0n4me) 404 Not Found")
  try {
    const text = await getEssay(join(server, "essays", info[0], info[3] + "~" + title + info[1]))
    const json = await getComments(join(server, "comments", info[0], info[3] + "~" + title + ".json"))
    const stat = [firstDay, vistorSum, allComments.length, essays.sum]
    res.render("index.ejs",
      { data: {
        type: "essay",
        pack: pack,
        title: title,
        info: info,
        stat: stat,
        json: json,
        text:text
      } }
    )
  }
  catch(_) {
    print(_)
    res.status(500).send("520 Internal Server Error")
  }
})

app.post("/comment", upload.none(), async (req, res) => {
  const path=join(server, "comments",req.body.tag,req.body.title+".json")
  const check=await checkComment(path,req.body)
  if (check) return res.json({code:0,text:check})
  const comment=await saveComment(path,req.body)
  if (req.body.tag != '.') allComments.unshift(comment)
  res.json({code:1,text:"发送成功——",data:comment})
})

app.get("/download/:title", async (req, res) => {
  const title = req.params.title
  const info = essays.list[title]
  if (!info) return res.status(404).send("(4n0n4me) 404 Not Found")

  const zipName = `[${+new Date()}] [${info[0]}] ${title}.zip`
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(zipName)}`)
  
  const archive = archiver('zip', { zlib: { level: 9 }})
  req.on('close', () => archive.abort())
  archive.pipe(res)

  const essayN = info[3] + "~" + title + info[1]
  const essayP = join(server, "essays", info[0], essayN)
  archive.file(essayP, { name: essayN })
  
  const commentN =info[3] + "~" + title + '.json'
  const commentP = join(server, "comments", info[0], commentN)
  archive.file(commentP, { name: commentN })

  archive.finalize()
})

app.listen(main.port, () => print("[homepage] http://localhost:" + main.port))