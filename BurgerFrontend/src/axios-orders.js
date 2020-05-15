import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-7138a.firebaseio.com/'
});

export default instance;