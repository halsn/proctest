/* global localStorage document window */
import { message } from 'antd'
import { get, put } from '../services/cloud.service.js'
import { axios } from '../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'cloud',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cloud') {
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
    displayData: [],
    selectedRowKeys: []
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
    select(state, { selectedRowKeys }) {
      return {
        ...state,
        selectedRowKeys
      }
    },
    search(state, { keyword }) {
      const { courseList } = state
      let displayData
      if (!keyword) {
        displayData = courseList
      } else {
        displayData = courseList.filter(d => d.name.includes(keyword))
      }
      return {
        ...state,
        displayData,
        selectedRowKeys: []
      }
    },
    getSuccess(state, { data }) {
      let { courseList } = data
      courseList = courseList.map((c, idx) => ({ key: idx, ...c }))
      return {
        ...state,
        courseList,
        displayData: courseList
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
