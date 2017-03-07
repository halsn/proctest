export default {
  namespace: 'addquiz',
  state: {
    tableData: []
  },
  reducers: {
    readFile(state, action) {
      return {
        ...state,
        tableData: action.payload
      };
    }
  }
};
