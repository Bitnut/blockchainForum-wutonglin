import {message} from 'antd'
export const REQUEST_HOMEDATA = 'REQUEST_HOMEDATA'
export const RECEIVE_HOMEDATA = 'RECEIVE_HOMEDATA'
export const FETCH_ERR = 'FETCH_ERR'

export const requestData = () => ({
    type: REQUEST_HOMEDATA,
})
export const fetchErr = () => ({
    type: FETCH_ERR,
})
export const receiveData= (data) => ({
    type: RECEIVE_HOMEDATA,
    homeData: data,
    receivedAt: Date.now()
})


export const fetchHomeData = () => {
    return dispatch => {
        dispatch(requestData())
        let token = localStorage.getItem('Forum-token') 
        fetch('/auth/homedata', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'GET'}).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    })
                }
            })
            .then(data =>{
                if (data.success) {
                    dispatch(receiveData(data))
                } else {
                }
            })
            .catch(err => {
                console.log('error is', err)
                message.error('出现错误： '+err.statusText);
                dispatch(fetchErr())
            })
    }
    
}