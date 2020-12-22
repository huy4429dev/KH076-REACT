import { types } from "./../../actions/backEnd/order";

const initState = {
  items: [],
  total: 0,
};

export default (state = initState, action) => {
  let items = [...state.items];
  let index = -1;

  switch (action.type) {
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        items: [...action.data.data.items],
        total: action.data.data.total,
      };

    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        items: [{ ...action.data.data }, ...state.items],
      };

    case types.UPDATE_ORDER_SUCCESS:
      index = items.findIndex((item) => item.id === action.data.data.id);
      items[index] = action.data.data;
      return {
        ...state,
        items,
      };

    case types.DELETE_ORDER_SUCCESS:
      state.items = state.items.filter(item => item.id != action.data.data.id);
      return {
        ...state,
      };
    case types.PUT_STATUS_ORDER_SUCCESS:
      index = state.items.findIndex(item => item.id == action.data.data.id);
      if (index != -1) {
        state.items[index].status = action.data.data.status;
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};
