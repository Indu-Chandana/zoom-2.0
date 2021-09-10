import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://zoom-itexphere.herokuapp.com'
})

export default instance