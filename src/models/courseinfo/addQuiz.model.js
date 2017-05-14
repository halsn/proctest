/* global localStorage document window */
import { message } from 'antd'
import { get, put } from '../../services/courseinfo/addQuiz.service.js'
import { axios } from '../../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'addquiz',
  subscriptions: {
    // { dispatch, history }
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/courseinfo/addquiz') {
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
    quizs: [],
    courseList: [],
    sheetData: [],
    selectCourse: null
  },
  effects: {
    *put({ payload }, { call, put: dispatch }) {
      const quizs = []
      // 格式化数据
      payload.sheetData.forEach(el => {
        const q = {}
        q.genre = el.类型
        q.describe = {}
        q.describe.content = el.题目
        q.ref_point = el.知识点
        q.answers = [el.参考答案]
        if (q.genre === '单选题' || q.genre === '多选题') {
          const secs = el.选项.split(';')
          q.selections = secs.map(el => el.trim().slice(2))
          q.answers = el.参考答案.split('').map(el => secs.filter(sec => sec.indexOf(el) === 0).join('').slice(2).trim())
        }
        quizs.push(q)
      })
      delete payload.sheetData
      payload.quizs = quizs
      const { data } = yield call(put, payload)
      if (data.success) {
        yield dispatch({ type: 'reset' })
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
    changeSheetDate(state, { sheetData }) {
      return {
        ...state,
        sheetData
      }
    },
    reset(state) {
      return {
        ...state,
        quizs: [],
        sheetData: []
      }
    },
    change(state, { selectCourse }) {
      return {
        ...state,
        selectCourse
      }
    },
    readFile(state, { quizs }) {
      return {
        ...state,
        quizs
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
