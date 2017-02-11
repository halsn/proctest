/* global localStorage document window */
import { message } from 'antd';
import { login, signup, logout } from '../services/app';

const ERROR_MSG_DURATION = 3; // 3 秒

export default {
  namespace: 'app',
  state: {
    login: false,
    signup: false,
    user: {
      name: '',
      email: ''
    },
    loginButtonLoading: false,
    signupButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769
  },
  subscriptions: {
    setup({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' });
      };
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' });
      const { data } = yield call(login, payload);
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username,
              email: data.useremail
            }
          }
        });
      } else {
        yield put({
          type: 'loginFail',
          payload: {
            error: data.error
          }
        });
      }
    },
    *signup({ payload }, { call, put }) {
      yield put({ type: 'showSignupButtonLoading' });
      const { data } = yield call(signup, payload);
      if (data.success) {
        yield put({ type: 'signupSuccess' });
      } else {
        yield put({
          type: 'signupFail',
          payload: { error: data.error }
        });
      }
    },
    *logout({ payload }, { call, put }) {
      const { data } = yield call(logout, payload);
      if (data.success) {
        yield put({ type: 'logoutSuccess' });
      }
    },
    *switchSider({ payload }, { put }) {
      yield put({ type: 'handleSwitchSider' });
    },
    *changeTheme({ payload }, { put }) {
      yield put({ type: 'handleChangeTheme' });
    },
    *changeNavbar({ payload }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' });
      } else {
        yield put({ type: 'hideNavbar' });
      }
    },
    *switchMenuPopver({ payload }, { put }) {
      yield put({ type: 'handleSwitchMenuPopver' });
    }
  },
  reducers: {
    showLogin(state) {
      return {
        ...state,
        login: false,
        signup: false
      };
    },
    showSignup(state) {
      return {
        ...state,
        login: false,
        signup: true
      };
    },
    loginSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
        login: true,
        loginButtonLoading: false
      };
    },
    signupSuccess(state) {
      message.success('注册成功', ERROR_MSG_DURATION);
      return {
        ...state,
        signup: false,
        login: false,
        signupButtonLoading: false
      };
    },
    logoutSuccess(state) {
      return {
        ...state,
        login: false
      };
    },
    loginFail(state, { payload }) {
      message.error(payload.error, ERROR_MSG_DURATION);
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      };
    },
    signupFail(state, { payload }) {
      message.error(payload.error, ERROR_MSG_DURATION);
      return {
        ...state,
        signup: true,
        signupButtonLoading: false
      };
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      };
    },
    showSignupButtonLoading(state) {
      return {
        ...state,
        signupButtonLoading: true
      };
    },
    handleSwitchSider(state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold
      };
    },
    handleChangeTheme(state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme
      };
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      };
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      };
    }
  }
};
