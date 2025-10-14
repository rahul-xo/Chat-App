import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL: import.meta.env.BAKCEND_URL,
    withCredentials:true
})