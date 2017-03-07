import { request } from '../utils';

export function myCity(params) {
  return request('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get',
    cross: true,
    data: params
  });
}
