import { request } from '../utils';

export function login(params) {
  return request('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

export function logout() {
  return request('/api/logout', { method: 'get' });
}

export function signup(params) {
  return request('/api/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}
