
export const types = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    ADD_CATEGORY: 'CREATE_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
    GET_CATEGORIES_ERROR: 'GET_CATEGORIES_ERROR',
    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    CREATE_CATEGORY_ERROR: 'CREATE_CATEGORY_ERROR',
}


export const getCategories = () => {
    return {
        url: `/api/categories`,
        method: 'get',
        onSuccess: types.GET_CATEGORIES_SUCCESS,
        onError: types.GET_CATEGORIES_ERROR
    };

};


export const createCategory = (data) => {
    return {
        url: `/api/categories`, 
        method: 'post',  
        param: {...data},
        onSuccess: types.GET_CATEGORIES_SUCCESS,
        onError: types.CREATE_CATEGORY_ERROR
    }
}


// export const addOften = (item, data) => {
//     return {
//         url: '/api/conversation/attachment/favorite/' + item.id,
//         method: 'put',
//         params: {
//             ...data
//         },
//     };
// };