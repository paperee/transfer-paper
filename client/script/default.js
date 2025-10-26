const print=(text)=>console.log(text) // Python(bushi)

const find=(ee)=>document.querySelectorAll(ee) // 查找元素
const create=(ee)=>document.createElement(ee) // 创建元素

const test=(ee)=>ee==window.location.href // 获取URL

const save=(key,value)=>{ // 存入缓存
    localStorage.setItem(key,value)
    print("save "+key+" "+value)
    return value
}
const load=(key)=>{ // 读出缓存
    const value=localStorage.getItem(key)||100
    print("load "+key+" "+value)
    return value
}

const r=()=>Math.random().toFixed(2) // 0.00~1.00 随机数

const go=(to,type="_blank")=>{ // 链接跳转
    const ee=create("a")
    ee.href=to
    ee.target=type
    ee.rel="noopener noreferrer"
    ee.click()
}

const markdown=(html=false)=>{ // 初始化markdown
    return new Remarkable("full",{
        html:html,
        xhtmlOut:false,
        breaks:true,
        langPrefix:"",
        linkify:true,
        typographer:true,
        quotes:`""''`,
        linkTarget:'_blank" rel="noopener noreferrer',
        doHighlight:true,
        highlight:(str,lang)=>{
            try { return hljs.highlight(lang,str).value }
            catch (ee) {}
        }
    })
}