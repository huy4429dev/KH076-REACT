import *as Actiontype from './../constansts/user';

export default function callApi(endpoint, method='GET', body=''){

    return fetch(`${Actiontype.API_ENDPOINT}/${endpoint}`,{
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Content-Type': 'application/json'
        },
    })

}