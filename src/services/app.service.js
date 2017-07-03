import { request } from '../utils'

export function login (data) {
  return request('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function signup (data) {
  return request('/api/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
