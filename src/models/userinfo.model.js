/* global localStorage */
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
  state: {
    quizNum: 0,
    courseNum: 0,
    testNum: 0,
    weatherIcon: '',
    temp: 0,
    weatherName: '',
    data: []
  },
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
      return {
        ...state,
        ...data
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
