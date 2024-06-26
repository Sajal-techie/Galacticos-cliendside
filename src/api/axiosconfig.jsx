import axios  from "axios";
import { useNavigate } from "react-router-dom";

// to create an instance of axios with baseurl
const userApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})


userApi.interceptors.request.use(
    
    (config) =>{
        console.log('inside request intercepters');
        const token = localStorage.getItem('access')
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log('config',config,'\nconfig');
        return config
    },(error)=>{
        console.log('in request error 00000000000000000000000000000000');
        return Promise.reject(error)
    }
)


async function refreshToken(){
    const refresh_token = localStorage.getItem('refresh')
    try{
        const response = await userApi.post('api/token/refresh/',{refresh:refresh_token})
        console.log(response);
        const {access,refresh} = response.data
        localStorage.setItem('access',access)
        // localStorage.setItem('refresh',refresh)
        return access
    }catch(error){
        console.log(error,'error in refresh funtion');
        throw error;
    }
}

userApi.interceptors.response.use(
    
    (response) =>{
        return response 
    },
    
    async (error) =>{
        try{
            console.log(error.config.url,'inside reposcne error',error.config);
            const previosRequest = error.config
        if (error.response && error.response.status === 401 && !previosRequest._retry && error.response?.data?.code!="token_not_valid",previosRequest.url!='google'){
            previosRequest._retry = true


                try {
                    const accessToken = await refreshToken()
                    userApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`
                    previosRequest.headers['Authorization'] = `Bearer ${accessToken}`                    
                    return await userApi(previosRequest)
                } catch (err){
                    localStorage.clear()
                    console.log(err,'refrseh token error');
                    window.location.href = '/'
                    return Promise.reject(err)
                }
        }else if (error.response && error.response.status >= 500){
                console.log('server eror', error.response);
                // localStorage.clear()
            return Promise.reject(error.response?error.response.statusText:error);
        }
        else {
                console.log(error, 'else');
                // localStorage.clear()
                // window.location.href = '/'
                return Promise.reject(error.response?error.response:error);
            }
        }  catch (err){
            console.log(err,' last error');
        }
    }
    )
    
    export default userApi