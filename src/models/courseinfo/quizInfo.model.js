/* global localStorage document window */
import { message } from 'antd'
import { get } from '../../services/courseinfo/quizInfo.service.js'
import { axios } from '../../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'quizinfo',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/courseinfo/quizinfo') {
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
    courseList: [],
    quizList: []
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
