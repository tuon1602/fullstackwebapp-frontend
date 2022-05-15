
import axios from '../axios'


const handleLoginApi = (userEmail,userPassword) => 
{
    return axios.post('/api/login',{email:userEmail, password: userPassword})
}
export {handleLoginApi} //goi den server nodejs thong qua axios