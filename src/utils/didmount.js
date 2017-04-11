import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import functional from 'react-functional'

export default function (component) {
  component.componentDidMount = () => NProgress.done()
  component.shouldComponentUpdate = () => NProgress.done()
  return functional(component)
}
