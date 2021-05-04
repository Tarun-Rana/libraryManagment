import axios from 'axios'

function loginService(username,password){
   return axios.post('http://localhost:1022/authenticate',{
        "username":username,
        "password":password
    }).then(response=>[response,username]).catch((error)=>'error')
}

export default loginService