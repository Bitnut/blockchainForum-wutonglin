import { message} from 'antd';
export const SEARCHING = 'SEARCHING'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_ERR = 'SEARCH_ERR'


export const searching = () => ({
    type: SEARCHING,
})

export const searchSuccess = (data) => ({
    type: SEARCH_SUCCESS,
    data: data,
})
export const searchErr = () => ({
    type: SEARCH_ERR,
})


// 获取文章和点赞收藏信息用
export const searchArticle = (data) =>  (dispatch) => {
    let token = localStorage.getItem('Forum-token')
    fetch(`/api/search`, {
    headers:{
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + token,
    },
    method:'POST',body: JSON.stringify(data)}).then(response => {
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
            var listData = data.result
            dispatch(searchSuccess(listData))
        } else {
            dispatch(searchErr())
        }
    })
    .catch(err => {
        console.log('error is', err)
        message.error('出现错误： '+err.statusText);
        dispatch(searchErr())
    })

}