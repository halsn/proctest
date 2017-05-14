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
    *put({ payload }, { call, put: dispatch }) {
      const { data } = yield call(put, payload)
      if (data.success) {
        message.success(data.success, ERROR_MSG_DURATION)
        yield dispatch({ type: 'select', selectedRowKeys: [] })
      } else {
        message.error(data.error, ERROR_MSG_DURATION)
      }
    },
    *get({ payload }, { call, put }) {
      const { data } = yield call(get, payload)
      // { select, call, put } 拿到当前model state
      // const foo = yield select(({ cloud }) => cloud)
      // console.log(foo)
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
      courseList = courseList.map(c => ({ ...c, key: c._id }))
      return {
        ...state,
        courseList,
        displayData: courseList,
        selectedRowKeys: []
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
