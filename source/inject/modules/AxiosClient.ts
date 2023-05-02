import axios from 'axios';

export const AxiosClient = () => {
    return axios.create({
        withCredentials: true,
        headers: {
            'content-type': 'application/json'
        }
    });
};
