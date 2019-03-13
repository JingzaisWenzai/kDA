import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.getJSON(TokenKey)
}

export function setToken(data) {
  if(data.token !== undefined){
    return Cookies.set(TokenKey, data.token,{expires:(new Date(data.expiration))})
  }else {
    return Cookies.set(TokenKey, data)
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
