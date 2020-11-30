import {endpoint} from './../constants/endpoint';

const callAjax = store => next => action => {
    if (action.url) {
        return processAjax(store, action);
    } else {
        return next(action)
    }
}
function processAjax(store, action) {

    return fetch(endpoint + action.url, {
        method: action.method,
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('access_token')
            // Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjM0MjA0NDI0MWEwNTcxNWZjOGNjN2Q3Y2U1MTdmNDE4ZjkxMzdkMTQyOGQyMTgxOTZmNmZlYjc1MjQ2OTAyMWZlN2ZiNGZkZTk3MzZlZDQiLCJpYXQiOjE2MDY2MTgwMDYsIm5iZiI6MTYwNjYxODAwNiwiZXhwIjoxNjM4MTU0MDA2LCJzdWIiOiIxMDAxIiwic2NvcGVzIjpbImFkbWluIl19.FiJrD--HfUV3qWT4WW_SDT4Josy3fmXPg66W94LPtC694AHA-JO1ZWJLDmtMl63bkcaAkyVhuCdpAERcwhqd0JxF7SZE_JfmjzATuxR3WPeMQOGenY-FOeDbzPT9XVT4DF3M5G0riKvBXIh8tjkG_fBL9AIXbPO_8yt--cGSwACYrNkBSmn1y2rPkd_pid560qqMz_za7FJtuc6Bpp2lXCxV1jt0NIa8ljJUGGz07-kBFjAGbA9My0tQIbzVFmYHwP-lcPEq5k1TrHcmXvJbkpgGF5Rzj8ZNsINgfbf_4ZHfPLBATJi224V_wnhr7aJOBira8aULhiBOpsc5NbvM3_G8o6zz-bXu8Sa4ZZDkjBAbyKiTZk-4CM4KhsH_jMs3IQVFh-SeLOATPTC-hsLjcv1P8C1CDo9viqruYMy-cacBj52n9k82wmJpLMIm_7NnWjFI12kqT1kbLthat6V4XBaRvxDU-UFokEWGAKzCyzGQs3OYj7urWIF6mH5X7ZpWEkXv8LrFmEmU_38-7O9LTv14Q8Lxyu6ZQCEMXNlPqLLzvx4hbc24wGdsDQBgD9kVJuzfFLQDhiFYYNxBhUAwH2f6SyufaKrh2yxQlj8mqyQpLABwcerYmBwxozkQkK6ti2n6IFkDSXKJJhtuL5bors-QxZ837TnT2n7ukQzgJqA"
        },
        body: action.param ? JSON.stringify(action.param) : null

    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                store.dispatch(
                    {
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