import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-my-burger-64994.firebaseio.com/'
});

export default instance;
