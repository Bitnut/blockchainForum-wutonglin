import { notification } from 'antd';
export const SAVE_CHANGES = 'SAVE_CHANGES'
export const CHANGES_SUCCESS = 'CHANGES_SUCCESS'
export const CHANGE_ERR = 'CHANGE_ERR'

export const onChange = () => ({
    type: 'SAVE_CHANGES',
});
export const changeSuccess = (userInfo) => ({
    type: 'CHANGES_SUCCESS',
    Info: userInfo
});
export const changeErr = () => ({
    type: 'CHANGE_ERR',
});

const openNotification = (info) => {
    const args = {
      message: info,
      duration: 2,
    };
    notification.open(args);
};

export const changeSettings = userInfo => {
    return dispatch => {
        dispatch(onChange());
        let token = localStorage.getItem('Forum-token')
        fetch('/api/changesettings', {
            headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify(userInfo)}).then(response => response.json())
            .then(data =>{
                if(data.success) {
                    dispatch(changeSuccess(userInfo));
                    openNotification(data.info);
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                } else {
                    dispatch(changeErr());
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log(err)
            })
    }
}