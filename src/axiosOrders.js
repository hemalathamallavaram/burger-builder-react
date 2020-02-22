import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-app-e24bf.firebaseio.com/'
});

export default instance;