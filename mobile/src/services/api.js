import axios from 'axios';

const baseURL = 'http://IP_DO_BACKEND:3333';

function createAPI() {
    return axios.create({ baseURL })
}
const api = createAPI();
export {baseURL, api};