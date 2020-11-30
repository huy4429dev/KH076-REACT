import { types } from "./../../actions/backEnd/category";

const initState = {
  items: [],
};

export default (state = initState, action) => {

  let items = [...state.items];
  let index = -1;

  switch (action.type) {

    case types.GET_CATEGORIES_SUCCESS:

      return {
        ...state,
        items: [...action.data.data.items],
      };

    case types.CREATE_CATEGORY_SUCCESS:

      return {
        ...state,
        items: [{ ...action.data.data }, ...state.items],
      };

    case types.UPDATE_CATEGORY_SUCCESS:

      index  = items.findIndex(item => item.id === action.data.data.id);
      items[index] = action.data.data;
      return {
        ...state,
        items
      };

    case types.DELETE_CATEGORY_SUCCESS:

      index  = items.findIndex(item => item.id === action.data.data.id);
      items.splice(index,1);
      return {
        ...state,
        items
      };

    default:
      return state;
  }


};
