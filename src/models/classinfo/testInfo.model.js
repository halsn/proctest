/* global localStorage document window */
import { message } from 'antd'
import { get, post } from '../../services/classinfo/testInfo.service.js'
import { axios } from '../../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'testinfo',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/classinfo/testinfo') {
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
    testList: [],
    test: {}
  },
  effects: {
    *getTest({ payload }, { call, put }) {
      const { data } = yield call(post, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
        yield put({ type: 'putTest', data })
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
    putTest(state, { data }) {
      const { test } = data
      return {
        ...state,
        test
      }
    },
    resetList(state) {
      return {
        ...state,
        testList: []
      }
    },
    getSuccess(state, { data }) {
      var { testList } = data
      testList = testList || []
      return {
        ...state,
        testList
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
