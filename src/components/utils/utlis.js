export const mapState = (...names) => {
  let r = {}
  for (let name of names) {
    r[name] = {
      get() {
        return this.store.states[name]
      },
      set(value) {
        this.store.grid.$set(this.store.states, name, value)
      }
    }
  }
  return r
}

export const mapMethod = (...names) => {
  let r = {}
  for (let name of names) {
    r[name] = function mappedMethod(...args) {
      return this.store[name](...args)
    }
  }
  return r
}


export const findParent = function (self, componentName) {
  let parent = self.$parent || self.$root
  let name = parent.$options.name
  if (!componentName) componentName = name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.name
    }
  }
  if (parent) {
    return parent
  }
}

export const deepCopy = function (data, clear = false, cache = []) {
  let o
  let clear_func
  if (clear) {
    if (clear === true) {
      clear_func = (k, v) => {
        return k.startsWith('_') || k.endsWith('_static')
      }
    } else if (typeof clear === 'function') {
      clear_func = clear
    } else {
      throw new Error(`clear object ${clear} is not be supported, please check.`)
    }
  }

  if (!data) return data
  if (Array.isArray(data)) {
    o = []
  } else if (typeof data === 'function') {
    return data
  } else if (data instanceof Date) {
    return data
  } else if (data instanceof Object) {
    o = {}
  } else {
    return data
  }

  if (cache.indexOf(data) > -1) {
    return data
  }
  // 用于判断循环引用
  cache.push(data)
  if (Array.isArray(data)) {
    for (let c of data) {
      o.push(deepCopy(c, clear, cache))
    }
  } else if (data instanceof Object) {
    for (let i in data) {
      if (!clear_func || (clear_func && !clear_func(i, data[i])))
        o[i] = deepCopy(data[i], clear, cache)
    }
  }
  return o
}
// isEmpty
export const isEmpty = function (v) {
  if (Array.isArray(v)) {
    return v.length === 0
  } else if (v instanceof Date) {
    return false
  } else if (v instanceof Object) {
    for (let c in v) {
      return false
    }
    return true
  }
  return !v
}
export const walkTree = (data, callback, childrenField='children') => {
  if (!data || data.length === 0) return
  const _f = (d) => {
    for(let c of d) {
      let ret = callback(c)
      if (ret) return // 如果返回 true 则结束递归
      if (c[childrenField] && c[childrenField].length > 0) {
        _f(c[childrenField])
      }
    }
  }

  return _f(data)
}
export const uuid = function () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0
    d = Math.floor(d/16)
    return (c=='x' ? r : (r&0x3|0x8)).toString(16)
  })
  return uuid
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