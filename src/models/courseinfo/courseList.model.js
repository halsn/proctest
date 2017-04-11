import { get } from '../../services/courseinfo/courseList.service'

export default {
  namespace: 'courselist',
  state: {
    courseData: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/courseinfo/courselist') {
          dispatch({ type: 'query' })
        }
      })
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(get)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    }
  },
  reducers: {
    querySuccess(state, payload) {
      console.log(payload)
      return {
        ...state
      }
    }
  }
}
