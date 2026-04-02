const date = new Date() // 获取原始时间

const padS = (time, total = 2, str = '0') => {
  return String(time).padStart(total, str)
}

const padE = (time, total = 13, str = '0') => {
  return +String(time).padEnd(total, str)
}

const easyT = (timer) => [
  padS(timer.getFullYear(), 4),
  padS(timer.getMonth() + 1),
  padS(timer.getDate()),
  padS(timer.getHours()),
  padS(timer.getMinutes()),
  padS(timer.getSeconds())
]

const reT = (time, skip = 0, sign = '-') => {
  const YMD = time.slice(0, 3).join(sign)
  const HMS = skip ? '' : time.slice(3).join(':')
  return `${YMD} ${HMS}`.trimEnd()
}

const diffT = (ms) => {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return (h ? h + '时' : '') + (m ? m + '分' : '') + (s % 60) + '秒'
}

const getT = (str) => new Date(str + 'T00:00:00+08:00').getTime()