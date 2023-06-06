import axios from 'axios';

export const api = () => {
    const token = localStorage.getItem('token');
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            return Promise.reject();
        }

        return Promise.reject(error)
    })

    return api
}

export const get_single = async (props) => {
    const { endpoint, id } = props;
    const get = await api().get(`/${endpoint}/${id}`);
    return get;

}

export const get_all = async (props) => {
    const { endpoint } = props;
    const get = await api().get(`/${endpoint}`);
    return get;
}

export const create_data = async (props) => {
    const { endpoint, values, rest } = props;
    const create = await api().post(`/${endpoint}`, values, rest);
    return create;
}

export const update_data = async (props) => {
    const { endpoint, id, values, rest } = props;
    const coy = await api().put(`/${endpoint}/${id}`, values, rest);
    return coy;
}

export const mass_update = async (props) => {
    const { endpoint, values, rest } = props;
    const coy = await api().put(`/${endpoint}`, values, rest);
    return coy;
}

export const delete_data = async (props) => {
    const { endpoint, values, rest } = props;
    const coy = await api().delete(`/${endpoint}`, values, rest);
    return coy;
}