import Vue from 'vue'
let app = new Vue()


export function myGet(url,data) {
  console.log('----',this,'---')
  return app.$axios.get(url,{params: data})
}

export function myPost(url,data) {
  return app.$axios.post(url,{data: data})
}
