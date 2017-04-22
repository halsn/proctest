/* global localStorage document window */
import { message } from 'antd'
import { login, signup } from '../services/app.service'

import { axios } from '../utils'

const ERROR_MSG_DURATION = 3 // 3 秒

export default {
  namespace: 'app',
  state: {
    showLogin: true,
    showSignup: false,
    username: '',
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769
  },
  subscriptions: {
    setup({ dispatch }) {
      window.onresize = () => dispatch({ type: 'changeNavbar' })
      const token = localStorage.getItem('jwttoken')
      if (token) {
        dispatch({ type: 'login', payload: { token } })
      } else {
        dispatch({ type: 'showLogin' })
      }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, payload)
      if (data.tokenLogin || data.success) {
        yield put({ type: 'loginSuccess', payload: data })
      } else {
        yield put({ type: 'loginFail', payload: data })
      }
    },
    *signup({ payload }, { call, put }) {
      const { data } = yield call(signup, payload)
      if (data.success) {
        yield put({ type: 'signupSuccess', payload: data })
      } else {
        yield put({ type: 'signupFail', payload: data })
      }
    },
    *logout({ payload }, { put }) {
      localStorage.setItem('jwttoken', '')
      yield put({ type: 'showLogin' })
    },
    *switchSider({ payload }, { put }) {
      yield put({ type: 'handleSwitchSider' })
    },
    *changeTheme({ payload }, { put }) {
      yield put({ type: 'handleChangeTheme' })
    },
    *changeNavbar({ payload }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver({ payload }, { put }) {
      yield put({ type: 'handleSwitchMenuPopver' })
    }
  },
  reducers: {
    showLogin(state) {
      return {
        ...state,
        showLogin: true,
        showSignup: false
      }
    },
    showSignup(state) {
      return {
        ...state,
        showSignup: true,
        showLogin: false
      }
    },
    loginSuccess(state, { payload }) {
      if (payload.token) {
        localStorage.setItem('jwttoken', payload.token)
      } else {
        const token = localStorage.getItem('jwttoken')
        axios.defaults.headers.common.Authorization = 'Bearer ' + token
      }
      return {
        ...state,
        username: payload.name,
        showLogin: false,
        showSignup: false
      }
    },
    loginFail(state, { payload }) {
      if (payload.tokenFail) {
        message.error(payload.tokenFail, ERROR_MSG_DURATION)
        localStorage.setItem('jwttoken', '')
      } else {
        message.error(payload.error, ERROR_MSG_DURATION)
      }
      return {
        ...state,
        showLogin: true
      }
    },
    signupSuccess(state, { payload }) {
      message.success(payload.success, ERROR_MSG_DURATION)
      return {
        ...state,
        showSignup: false,
        showLogin: true
      }
    },
    signupFail(state, { payload }) {
      message.error(payload.error, ERROR_MSG_DURATION)
      return {
        ...state,
        showSignup: true
      }
    },
    handleSwitchSider(state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme(state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    }
  }
}
