/* global localStorage document window */
import { message } from 'antd'
import { get, post } from '../../services/classinfo/addStudent.service.js'
import { axios } from '../../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'addstudent',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/classinfo/addstudent') {
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
    students: [],
    classList: [],
    selectClass: null
  },
  effects: {
    *post({ payload }, { call, put }) {
      const { data } = yield call(post, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
        yield put({ type: 'reset' })
        yield put({ type: 'get' })
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
    change(state, { selectClass }) {
      return {
        ...state,
        selectClass
      }
    },
    read(state, { students }) {
      return {
        ...state,
        students
      }
    },
    reset(state) {
      return {
        ...state,
        students: [],
        classList: []
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
