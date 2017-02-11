import { request } from '../utils';

export function login(params) {
  return request('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

export function logout() {
  return request('/logout', { method: 'get' });
}

export function signup(params) {
  return request('/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}
