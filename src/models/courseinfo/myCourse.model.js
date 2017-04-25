/* global localStorage document window */
import { message } from 'antd'
import { get, put, del, post } from '../../services/courseinfo/myCourse.service.js'

import { axios } from '../../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'mycourse',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/courseinfo/mycourse') {
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
    showModal: false,
    showUpdateModal: false,
    myCourses: [],
    otherCourses: []
  },
  effects: {
    *post({ payload }, { call, put }) {
      const { data } = yield call(post, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
        yield put({ type: 'hideUpdateModal' })
        yield put({ type: 'get' })
      } else {
        message.error(data.error, ERROR_MSG_DURATION)
      }
    },
    *del({ payload }, { call, put }) {
      const { data } = yield call(del, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
        yield put({ type: 'get', data })
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
    },
    *put({ payload }, { call, put: dispatch }) {
      const { data } = yield call(put, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
        yield dispatch({ type: 'hideModal' })
        yield dispatch({ type: 'get' })
      } else {
        message.error(data.error, ERROR_MSG_DURATION)
      }
    }
  },
  reducers: {
    showUpdateModal(state) {
      return {
        ...state,
        showUpdateModal: true
      }
    },
    hideUpdateModal(state) {
      return {
        ...state,
        showUpdateModal: false
      }
    },
    openModal(state) {
      return {
        ...state,
        showModal: true
      }
    },
    hideModal(state) {
      return {
        ...state,
        showModal: false
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
