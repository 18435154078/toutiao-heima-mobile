/**
 * 这里封装localStorage
 */

export const setStorage = (token, value) => {
  if(typeof value === 'object'){
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(token, value)
}

export const getStorage = (token) => {
    const data = window.localStorage.getItem(token)
    try {
      return JSON.parse(data)
    } catch {
      return data
    }
}

export const removeStorage = (token) => {
    return window.localStorage.removeItem(token)
}
