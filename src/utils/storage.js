/**
 * 存储数据
 */
export const setItem = (key, value) => {
    // 将数组、对象类型的数据转化为 JSON 字符串进行存储
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }
  
  /**
   * 获取数据
   */
  export const getItem = key => {
    const data = localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }
  
  /**
   * 删除数据
   */
  export const removeItem = key => {
    localStorage.removeItem(key)
  }
  
  /**
   * 删除所有数据
   */
  export const removeAllItem = key => {
    localStorage.clear()
  }
  