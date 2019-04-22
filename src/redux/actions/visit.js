import {message} from 'antd'
export const REQUEST_VISITDATA = 'REQUEST_VISITDATA'
export const RECEIVE_VISITDATA = 'RECEIVE_VISITDATA'
export const FETCH_ERR = 'FETCH_ERR'

export const requestData = () => ({
    type: REQUEST_VISITDATA,
})
export const fetchErr = () => ({
    type: FETCH_ERR,
})
export const receiveData= (data) => ({
    type: RECEIVE_VISITDATA,
    visitData: data,
    receivedAt: Date.now()
})


export const fetchVisitData = (id) => {
    return dispatch => {
        dispatch(requestData())
        let token = localStorage.getItem('Forum-token') 
        fetch(`/api/visit/${id}`, {
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
                    dispatch(receiveData(data.visitData))
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