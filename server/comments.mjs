import { readFile,writeFile,mkdir,access } from "fs/promises"
import { dirname } from "path"

const getComments=async (path)=>{
    try {
        const data=await readFile(path,"utf-8")
        return JSON.parse(data.trim().replace(/^\uFEFF/,""))
    }
    catch(_) {
        await mkdir(dirname(path), { recursive: true })
        await writeFile(path,"[]",{ encoding: "utf8" })
        return []
    }
}

const checkComment=async (path,body)=>{
    try { await access(path) }catch(_) { return "找不到目标文章 QAQ" }
    if (!Object.values(body).every((item) => item.trim() !== ""))
        return "不可以提交空内容/空昵称——"
    if (!/^[\p{L}\p{N}]+$/u.test(body.nick))
        return "昵称应当由英/汉/数组成"
    if (!await body.nick.length>12)
        return "最多可以输入12字的昵称"
    if (!await body.text.length>512)
        return "最多可以输入512字的内容"
    return 0
}

const saveComment=async (path,body)=>{
    const comments=await getComments(path)
    const comment=[body.nick,body.text,+new Date()]
    comments.push(comment)
    await writeFile(path, JSON.stringify(comments), { encoding: "utf8" })
    return comment
}

export { getComments,checkComment,saveComment }