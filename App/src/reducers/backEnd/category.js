import { types } from "./../../actions/backEnd/category";

const initState = {
  items: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: [...action.data.data.items]
      };

    case types.CREATE_CATEGORY_SUCCESS:

      return {
        ...state,
        items: state.items.unshift(action.data.data)
      };

      
    default:
      return state;
  }
};
