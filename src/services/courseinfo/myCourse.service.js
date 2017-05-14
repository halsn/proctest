import { request } from '../../utils'

export function get(params) {
  return request('/api/course', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function del(params) {
  return request('/api/course', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}
export function post(data) {
  return request('/api/course', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function put(data) {
  return request('/api/course', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
