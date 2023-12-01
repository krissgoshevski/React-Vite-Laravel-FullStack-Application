
import axios from "axios"
import("axios").AxiosRequestConfig

const axiosClient = axios.create({

    // ova ke bide za od API url od Laravel 
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`

})


// treba da napravime i interseptors
// axiosClient koristi go ovoj interseptor 
axiosClient.interceptors.request.use((config) => {

    const token = localStorage.get('ACESS_TOKEN')

    // token so ke se zacuva vo local storage
    config.Authorization = `Bearer ${token}`

    return config;
})
// use() koristi 2 funkcii, t.e. moze da se predadat kako argumenti 
// 1. unfulfilled koga promisot e resolved --> imame arg response za unfulfilled
// 2. koga e rejected --> error
axiosClient.interceptors.response.use((response) => {

    return response; // treba da go vratime response

}, (error) => {

    const { response } = error;

    if (response.status === 401) {
        // ako userot ne e authorized
        // ako tokeno ne postoi, ili e nevaliden
        localStorage.removeItem('ACCESS_TOKEN')
    }

    // if (response.status === 404) { 
    // Not found page
    // }


    // if (response.status === 403) { 
    // medium pages
    // }

    throw error;

})

export default axiosClient;