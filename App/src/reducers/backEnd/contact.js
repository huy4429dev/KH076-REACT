import { types } from "./../../actions/backEnd/contact";

const initState = {
    contacts: null,
};

export default (state = initState, action) => {
    let index = -1;
    switch (action.type) {
        case types.GET_CONTACT_SUCCESS:
            state.contacts = action.data.data;
            return {
                ...state,
            };
        case types.DELETE_CONTACT_SUCCESS:
            state.contacts.items = state.contacts.items.filter(item => item.id != action.data.data.id);
            return {
                ...state,
            };
        default:
            return state;
    }
};
