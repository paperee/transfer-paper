const print = (text) => console.log(text)

import archiver from 'archiver'

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const client = join(__dirname, 'client')
const server = join(__dirname, 'server')

import config from './config.json' with { type: 'json' }
const { main, pack } = config

import getEssay from './server/essay.mjs'
import getEssays from './server/essays.mjs'
const essays = new getEssays()

import { getComments, getAllComments, checkComment, saveComment }
from './server/comments.mjs'
let allComments = await getAllComments()

let vistorSum = 0
const firstDay = +new Date()

import express from 'express'
const app = new express()
app.set('view engine', 'ejs')
app.set('views', client)

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')  
  res.setHeader('X-Frame-Options', 'DENY')  
  res.setHeader('X-XSS-Protection', '1; mode=block')  
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  next()
})

app.use(express.static(client))
app.use(express.urlencoded({ extended: true }))

import multer from 'multer'
const upload = multer()

// import { hotReloadMiddleware } from '@devmade/express-hot-reload'
// app.use(hotReloadMiddleware({ watchFolders: ['./client'] }))

const test_ = (title) => /\/|\\|\.\./i.test(title)

const join_ = (dict, tag, title) => {
  const f_dict = dict == 'c' ? 'comments' : (dict == 'e' ? 'essays' : '.')
  return join(server, f_dict, tag, title)
}

app.get('/essays/:folder/:file', (req, res) => {
  const { folder, file } = req.params
  res.redirect('/' + folder + '/' + file)
})

app.get('/', async (_, res) => {
  try {
    const json = await getComments(join_('c', '.', 'home.json'))
    const stat = [firstDay, ++vistorSum, allComments.length, essays.sum]
    res.render('index.ejs',
      { data: {
        type: 'essays',
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
    res.status(500).send('520 LOVE')
  }
})

app.get('/essays/:title', async (req, res) => {
  const title = req.params.title
  if (test_(title)) res.status(500).send('250 WHAT')

  const info = essays.list[title]
  if (!info) return res.status(404).send('(4n0n4me) 404 CUTE')

  const [tag, ext, _, date_] = info
  const f_title = date_ + '~' + title

  try {
    const text = await getEssay(join_('e', tag, f_title + ext))
    const json = await getComments(join_('c', tag, f_title + '.json'))
    const stat = [firstDay, vistorSum, allComments.length, essays.sum]
    res.render('index.ejs',
      { data: {
        type: 'essay',
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
    res.status(500).send('520 LOVE')
  }
})

app.post('/comment', upload.none(), async (req, res) => {
  const { tag, date, title } = req.body
  const path = join_('c', tag, date + title + '.json')

  const check = await checkComment(path, req.body)
  if (check) return res.json({ code: 0, text: check })

  const comment = await saveComment(path, req.body)
  const f_comment = [...comment, tag, title]
  if (tag != '.') allComments.unshift(f_comment)

  res.json({ code: 1, text: '发送成功——', data: f_comment })
})

app.get('/download/:title', async (req, res) => {
  const title = req.params.title
  if (test_(title)) res.status(500).send('250 WHAT')

  const info = essays.list[title]
  if (!info) return res.status(404).send('(4n0n4me) 404 CUTE')

  const [tag, ext, _, date] = info
  const f_title = date + '~' + title

  const zipName = `[${+new Date()}] [${date}] ${title}.zip`
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(zipName)}`)

  const archive = archiver('zip', { zlib: { level: 9 }})
  req.on('close', () => archive.abort())
  archive.pipe(res)

  const eName = f_title + ext
  const ePath = join_('e', tag, eName)
  archive.file(ePath, { name: eName })

  const cName = f_title + '.json'
  const cPath = join_('c', tag, cName)
  archive.file(cPath, { name: cName })

  archive.finalize()
})

app.listen(main.port, () => print('[homepage] http://localhost:' + main.port))