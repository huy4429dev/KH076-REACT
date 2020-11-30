import * as ep from './../../constants/enpoint';
export const types = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    ADD_CATEGORY: 'CREATE_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
    GET_CATEGORIES_ERROR: 'GET_CATEGORIES_ERROR',
    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    CREATE_CATEGORY_ERROR: 'CREATE_CATEGORY_ERROR',
    UPDATE_CATEGORY_SUCCESS: 'UPDATE_CATEGORY_SUCCESS',
    UPDATE_CATEGORY_ERROR: 'UPDATE_CATEGORY_ERROR',
    DELETE_CATEGORY_SUCCESS: 'DELETE_CATEGORY_SUCCESS',
    DELETE_CATEGORY_ERROR: 'DELETE_CATEGORY_ERROR'
}


export const getCategories = () => {
    return {
        url: `${ep.enpoint}/api/categories`,
        method: 'get',
        onSuccess: types.GET_CATEGORIES_SUCCESS,
        onError: types.GET_CATEGORIES_ERROR
    };

};


export const createCategory = (data) => {
    return {
        url: `${ep.enpoint}/api/categories`, 
        method: 'post',  
        data: {...data},
        onSuccess: types.CREATE_CATEGORY_SUCCESS,
        onError: types.CREATE_CATEGORY_ERROR
    };
};

export const updateCategory = (data) => {
    console.log(data,'EDIT ITEM');
    return {
        url: `${ep.enpoint}/api/categories/${data.id}`, 
        method: 'put',  
        data: {...data},
        onSuccess: types.UPDATE_CATEGORY_SUCCESS,
        onError: types.UPDATE_CATEGORY_ERROR
    };
};

export const deleteCategory = (id) => {
    return {
        url: `${ep.enpoint}/api/categories/${id}`,
        method: 'delete',
        onSuccess: types.DELETE_CATEGORY_SUCCESS,
        onError: types.DELETE_CATEGORY_ERROR
    };

};