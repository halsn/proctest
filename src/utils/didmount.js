import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import functional from 'react-functional'

export default function (component) {
  if (typeof component === 'object') {
    component.componentDidMount = () => NProgress.done()
    component.shouldComponentUpdate = () => NProgress.done()
  } else {
    component.componentDidMount = () => NProgress.done()
    component.shouldComponentUpdate = () => NProgress.done()
    return functional(component)
  }
}
