import axios from "axios";

const api = axios.create(({
    baseURL: 'https://v6.exchangerate-api.com/v6/3f68322c8e846e06a81ab03a/'
}))


export default api;