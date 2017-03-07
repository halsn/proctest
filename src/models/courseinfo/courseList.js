import { get } from '../../services/courseinfo';

export default {
  namespace: 'courselist',
  state: {
    courseData: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/courseinfo/courseList') {
          dispatch({ type: 'query' });
        }
      });
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(get);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: data
        });
      }
    }
  },
  reducers: {
    querySuccess(state, action) {
      return {
        ...state
      };
    }
  }
};
