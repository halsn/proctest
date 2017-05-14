import { request } from '../../utils'

export function get() {
  return request('/api/course', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
