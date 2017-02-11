import { request } from '../utils';

export async function myCity(params) {
  return request('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get',
    cross: true,
    data: params
  });
}

export async function queryWeather(params) {
  return request('http://www.zuimeitianqi.com/zuimei/queryWeather', {
    method: 'get',
    cross: true,
    data: params
  });
}

export async function query(params) {
  return request('/dashboard', {
    method: 'get',
    data: params
  });
}
