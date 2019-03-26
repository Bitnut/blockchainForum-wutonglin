import axios from 'axios';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGGED_ERROR = 'LOGGED_ERROR';


export const login = (result) => ({
    type: 'LOGGED_IN',
    success: result,
    user_token: localStorage.getItem("Forum-token")
});
export const logout = () => {
    return {
        'type': 'LOGGED_OUT'
    }
}
export const skipLogin = () => {
    return {
        'type': 'LOGGED_IN',
        'user_token': localStorage.getItem("Forum-token")
    }
}

export const userLogin = (api, value) => {
    return async (dispatch, getState) => {
        await axios.post(api,value).then((res) => {
            if (res.data.success) { // 如果成功
              localStorage.setItem('Forum-token', res.data.token) // 用localStorage把token存下来
              dispatch(login(res.data.success));
              this.props.history.push('/') // 进入todolist页面，登录成功
            } else {
              localStorage.setItem('Forum-token', null) // 将token清空
            }
          }).catch((err) => {
            console.log('some err occurs!',err);
            dispatch('');
        })
    }
}

