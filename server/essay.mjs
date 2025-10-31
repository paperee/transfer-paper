import { readFile } from "fs/promises"
const getEssay=async (path)=>await readFile(path,"utf-8")

export default getEssay