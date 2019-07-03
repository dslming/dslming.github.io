export default {
    namespace: 'Sider',
    state: {
      counter: 0
    },
    reducers: {
      add(state, { payload }) {
        return { ...state, ...payload };
      },
    },
  };