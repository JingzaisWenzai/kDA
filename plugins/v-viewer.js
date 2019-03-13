import Vue from 'vue'
import viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.prototype.$viewer = viewer
export default () => {
  Vue.use(viewer)
}
// viewer.setDefaults({
//   Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source"}
// })
