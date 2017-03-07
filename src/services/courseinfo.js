import { request } from '../utils';

export function get(params) {
  return request('/api/course', {
    method: 'get',
    data: params
  });
}
