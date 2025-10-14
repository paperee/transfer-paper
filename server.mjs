const print = (text) => console.log(text)

import { join, dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

import config from "./config.json" with { type: "json" }
const { main, pack } = config

import getStats from "./server/stats.mjs"
const stats = new getStats()

import getEssay from "./server/essay.mjs"
import getEssays from "./server/essays.mjs"
const essays = new getEssays()

import express from "express"
const app = new express()
app.set("view engine", "ejs")
app.set("views", join(__dirname, "client"))
app.use(express.static(join(__dirname, "client")))

app.get("/essays/:folder/:file", (req, res) => {
    res.redirect("/" + req.params.folder + "/" + req.params.file)
})
app.get("/", async (_, res) => {
    const stat = await stats.get(essays.ls())
    res.render("index.ejs",
        { data: { type: "essays", pack: pack, list: essays.list, stat: stat } }
    )
})
app.get("/essays/:title", async (req, res) => {
    const title = req.params.title
    const info = essays.list[title]
    if (!info) return res.status(404).send("(4n0n4me) 404 Not Found")
    const stat = await stats.get(essays.ls())
    getEssay(join(__dirname, "server", "essays", info[0], title + info[1]))
        .then(async (text) => res.render("index.ejs",
            { data: { type: "essay", pack: pack, title: title, info: info, text: text, stat: stat } }
        ))
        .catch((_) => res.status(500).send("500 Internal Server Error"))
})

app.listen(main.port, () => print("http://localhost:" + main.port))