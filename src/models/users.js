import { create, update, query } from '../services/users';

export default {

  namespace: 'users',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call }) {
      const { data } = yield call(query);
      if (data.success) {
        console.log('query success');
      }
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      const { data } = yield call(create, payload);
      if (data.success) {
        console.log('create success');
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data.success) {
        console.log('update success');
      }
    }
  },

  reducers: {
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    }
  }

};
