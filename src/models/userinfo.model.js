/* global localStorage document window */
import { message } from 'antd'
import { get } from '../services/userinfo.service.js'
import { axios } from '../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'userinfo',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/userinfo') {
          const token = localStorage.getItem('jwttoken')
          if (token) {
            axios.defaults.headers.common.Authorization = 'Bearer ' + token
          }
          dispatch({ type: 'get' })
        }
      })
    }
  },
  state: {},
  effects: {
    *get({ payload }, { call, put }) {
      const { data } = yield call(get, payload)
      if (data.success) {
        yield put({ type: 'getSuccess', data })
      } else {
        yield put({ type: 'getFail', data })
      }
    }
  },
  reducers: {
    getSuccess(state, { data }) {
      message.success(data.success, ERROR_MSG_DURATION)
      return {
        ...state
      }
    },
    getFail(state, { data }) {
      message.error(data.error, ERROR_MSG_DURATION)
      return {
        ...state
      }
    }
  }
}
