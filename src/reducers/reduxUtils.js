const setState = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

export default setState;
