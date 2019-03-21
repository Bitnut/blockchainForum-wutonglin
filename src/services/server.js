import axios from 'axios';
// import qs from 'qs'

let http = {
    post: "",
    get: ""
}

http.post = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.post(api, data).then((res) => {
            resolve(res)
        });
    });
}

http.get = function (api, data) {
    return new Promise((resolve, reject) => {
        console.log(JSON.stringify(data));
        axios.get(api, JSON.stringify(data)).then((res) => {
            resolve(res)
        });
    })
}

export default http