import * as ep from './../../constants/enpoint';
export const types = {
    ADD_CONTACT_SUCCESS: "ADD_CONTACT_SUCCESS",
    ADD_CONTACT_ERROR: "ADD_CONTACT_ERROR",
}


export const addContact = (params) => {
    return {
        url: `${ep.enpoint}/api/contact/create`,
        method: 'post',
        data: params,
        onSuccess: types.ADD_CONTACT_SUCCESS,
        onError: types.ADD_CONTACT_ERROR,
    };

};