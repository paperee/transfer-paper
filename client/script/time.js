const date=new Date() // 获取原始时间
const pad=(time,total=2,str="0")=>time.toString().padStart(total,str) // 数字空位0补齐
const formaTime=(timer)=>[ // 原始时间转易读列表
    pad(timer.getFullYear(),4),
    pad(timer.getMonth()+1),
    pad(timer.getDate()),
    pad(timer.getHours()),
    pad(timer.getMinutes()),
    pad(timer.getSeconds())
]
const returnTime=(time,cut=false,sign="-")=>( // 格式化时间列表
    time.slice(0,3).join(sign)+" "+
    (cut?"":time.slice(3).join(":"))
).trimEnd()

const formatTimeDiff=(ms)=>{ // 毫秒转时分秒
    const seconds=Math.floor(ms/1000)
    const hours=Math.floor(seconds/3600)
    const minutes=Math.floor((seconds%3600)/60)
    return (hours?hours+"时":"")
    +(minutes?minutes+"分":"")
    +seconds%60+"秒"
}