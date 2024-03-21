import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://development-j5uca6zchq-uc.a.run.app/ens/api/v1'
})

const useAxiosPublic = () => {

    // request interceptor to add authorization header for every secure call to the api
    axiosPublic.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('requset stoped by inter...', token);
        config.headers.authorization = `Bearer ${token}`;
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })



    return axiosPublic
};

export default useAxiosPublic;