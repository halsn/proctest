/* global localStorage document window */
import { message } from 'antd'
import { get, put } from '../../services/classinfo/pubTest.service.js'
import { axios } from '../../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'pubtest',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/classinfo/pubtest') {
          const token = localStorage.getItem('jwttoken')
          if (token) {
            axios.defaults.headers.common.Authorization = 'Bearer ' + token
          }
          dispatch({ type: 'reset' })
          dispatch({ type: 'get' })
        }
      })
    }
  },
  state: {
    maxSingleNum: 0,
    maxMultiNum: 0,
    maxJudgeNum: 0,
    maxAskNum: 0,
    studentsCount: 0,
    classList: []
  },
  effects: {
    *put({ payload }, { call }) {
      const { data } = yield call(put, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
      } else {
        message.error(data.error, ERROR_MSG_DURATION)
      }
    },
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
    reset(state) {
      return {
        ...state,
        maxSingleNum: 0,
        maxMultiNum: 0,
        maxJudgeNum: 0,
        maxAskNum: 0
      }
    },
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
