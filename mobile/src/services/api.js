import axios from 'axios';

function api() {
    const baseURL = 'http://IP_DO_BACKEND:3333';

    return axios.create({ baseURL })
}

export default api();