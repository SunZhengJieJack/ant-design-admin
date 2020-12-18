




export const mapState = (...names) => {
  let r = {}
  for(let name of names) {
    r[name] = {
      get () {
        return this.store.states[name]
      },
      set (value) {
        this.store.grid.$set(this.store.states, name, value)
      }
    }
  }
  return r
}

export const mapMethod = (...names) => {
  let r = {}
  for(let name of names) {
    r[name] =  function mappedMethod(...args) {
      return this.store[name](...args)
    }
  }
  return r
}










































/**
 * format 日期时间
 */
export const dateFormat = (time, format = 'yyyy-MM-dd') => {
  const t = new Date(time)
  const tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
      default:
        break
    }
  })
}