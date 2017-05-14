import { request } from '../../utils'

export function get(params) {
  return request('/api/quizinfo', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

export function del(params) {
  return request('/api/quizinfo', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}
export function post(data) {
  return request('/api/quizinfo', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function put(data) {
  return request('/api/quizinfo', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
