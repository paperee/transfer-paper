import { readFile } from "fs/promises"
const getEssay=(path)=>readFile(path,"utf-8")

export default getEssay