import { types } from "./../../actions/backEnd/customer";

const initState = {
  items: [],
  total: 0,
};

export default (state = initState, action) => {
  let items = [...state.items];
  let index = -1;

  switch (action.type) {
    case types.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        items: [...action.data.data.items],
        total: action.data.data.total,
      };

    case types.CREATE_CUSTOMRER_SUCCESS:
      return {
        ...state,
        items: [{ ...action.data.data }, ...state.items],
      };

    case types.UPDATE_CUSTOMRER_SUCCESS:
      index = items.findIndex((item) => item.id === action.data.data.id);
      items[index] = action.data.data;
      return {
        ...state,
        items,
      };

    case types.DELETE_CUSTOMRER_SUCCESS:
      index = items.findIndex((item) => item.id === action.data.data.id);
      items.splice(index, 1);
      return {
        ...state,
        items,
      };

    default:
      return state;
  }
};
