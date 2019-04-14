import { notification } from 'antd';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERR = 'LOGIN_ERR';
export const SKIP_LOGIN = 'SKIP_LOGIN';
export const ON_WRITING = 'ON_WRITING';
export const EXIT_WRITING = 'EXIT_WRITING';


export const login = () => ({
    type: 'LOGGING_IN',
});
export const skipLogin = (userInfo, articles) => ({
    type: 'SKIP_LOGIN',
    success: userInfo,
    userArticles: articles
});
export const loginErr = (result) => ({
    type: 'LOGIN_ERR',
    info: result,
});
export const loginSuccess = (result, articles) => ({
    type: 'LOGGED_IN',
    success: result,
    userArticles: articles
});
export const logout = () => {
    return {
        'type': 'LOGGED_OUT'
    }
}

export const onWriting = () => {
    return {
        'type': 'ON_WRITING'
    }
}
export const exitWriting = () => {
    return {
        'type': 'EXIT_WRITING'
    }
}

const openNotification = (info) => {
    const args = {
      message: info,
      duration: 2,
    };
    notification.open(args);
};

export const userLogin = value => {
    return (dispatch, getState) => {
        dispatch(login());
        fetch('/auth/user/login', {
            headers: {
            "Content-Type": "application/json" 
            },
            method:'POST',body: JSON.stringify(value)}).then(response => response.json())
            .then(data =>{
                const successInfo = data.userInfo;
                if(data.success) {
                    dispatch(loginSuccess(successInfo, data.userArticles));
                    openNotification(data.info);
                    localStorage.setItem('Forum-token', data.token) // 用localStorage把token存下来
                    localStorage.setItem('userInfo', JSON.stringify(successInfo))
                    localStorage.setItem('userArticles', JSON.stringify(data.userArticles))
                } else {
                    dispatch(loginErr(data.info));
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const userLogout = () => {
    localStorage.clear();
    return (dispatch, getState) => {
            dispatch(logout());
            openNotification('退出登录！');
    } 
}

export const skipLoginByToken = () => {
    return dispatch => {
        dispatch(login());
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const userArticles = JSON.parse(localStorage.getItem('userArticles'))  
        dispatch(skipLogin(userInfo, userArticles));
    }
}

export const goWriting = () => {
    return dispatch => {
        dispatch(onWriting());
    }
}

export const leaveWriting = () => {
    return dispatch => {
        dispatch(exitWriting());
    }
}