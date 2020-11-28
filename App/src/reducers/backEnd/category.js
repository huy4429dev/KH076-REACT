import { types } from "./../../actions/backEnd/category";

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:

      return {
        ...state,
        ...action.data,
      };

    case types.CREATE_CATEGORY_SUCCESS:

      return {
        ...state,
        ...action.data,
      };
      
    default:
      return state;
  }
};
