import { notification, message} from 'antd';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERR = 'LOGIN_ERR';
export const SKIP_LOGIN = 'SKIP_LOGIN';
export const ON_WRITING = 'ON_WRITING';
export const EXIT_WRITING = 'EXIT_WRITING';
export const FETCH_USER = 'FETCH_USER';

export const login = () => ({
    type: 'LOGGING_IN',
});
export const skipLogin = (userInfo, articles, news) => ({
    type: 'SKIP_LOGIN',
    success: userInfo,
    userArticles: articles,
    news: news
});
export const fetchUser = (data) => ({
    type: 'FETCH_USER',
    success: data.userInfo,
    userArticles: data.userArticles,
    news: data.userNews
});
export const loginErr = (result) => ({
    type: 'LOGIN_ERR',
    info: result,
});
export const loginSuccess = (data) => ({
    type: 'LOGGED_IN',
    success: data.userInfo,
    userArticles: data.userArticles,
    news: data.userNews
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
    return (dispatch) => {
        dispatch(login());
        fetch('/auth/user/login', {
            headers: {
            "Content-Type": "application/json" 
            },
            method:'POST',body: JSON.stringify(value)}).then(response => {
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
                if(data.success) {
                    dispatch(loginSuccess(data));
                    openNotification(data.info);
                    localStorage.setItem('Forum-token', data.token) // 用localStorage把token存下来
                    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
                    localStorage.setItem('userArticles', JSON.stringify(data.userArticles))
                    localStorage.setItem('userNews', JSON.stringify(data.userNews))
                } else {
                    dispatch(loginErr(data.info));
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log('error is', err)
                message.error('出现错误： '+err.statusText);
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
        const userNews = JSON.parse(localStorage.getItem('userNews')) 
        dispatch(skipLogin(userInfo, userArticles, userNews));
        // 待添加， 向服务器请求数据
    }
}

export const fetchUserData = () => {
    return dispatch => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const userArticles = JSON.parse(localStorage.getItem('userArticles')) 
        const userNews = JSON.parse(localStorage.getItem('userNews'))
        dispatch(fetchUser({userInfo, userArticles, userNews}));
        // 待添加， 向服务器请求数据
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