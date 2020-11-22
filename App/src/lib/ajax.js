const callAjax = store => next => action => {
    if (action.url) {
        return processAjax(store, action);
    } else {
        return next(action)
    }
}
function processAjax(store, action) {

    return fetch(action.url, {
        method: action.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: action.data ? JSON.stringify(action.data) : null

    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                store.dispatch({
                    type: action.onError,
                    data
                })
            } else {
                store.dispatch({
                    type: action.onSuccess,
                    data
                })
            }
            return data;
        })
        .catch(error => {
            store.dispatch({
                type: action.onError,
                ...error
            })
            return error;
        })
}

export default callAjax;