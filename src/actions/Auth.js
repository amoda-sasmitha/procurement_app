import axios from 'axios'
import env from '../util/env'
export const login = ( email , password ) => {
    return dispatch =>
      new Promise( (resolve, reject) => {
                  
                  axios.post(`${env.API_URL}/api/users/signin`, {
                      email,password
                  })
                  .then( result => {
                    if(result.data.success){
                      dispatch({
                        type: "USER_DETAILS",
                        payload : result.data.data
                      });
                      dispatch({
                        type: "IS_AUTHENTICATED",
                        payload: true
                      });
                      dispatch({
                        type: "USER_ROLE",
                        payload: 1
                      });
                      return  resolve({ type : 'success' , message : "Successfully Loged In" });
                    }else{
                      return  resolve({ type : 'failed' , message : "Loged In Failed" });
                    }
                    
                  })
                  .catch( error => {
                    reject({ message : "failed"});
                  })

              })
  };


  export const logout = () => {
      console.log('called');
      return dispatch => dispatch({ type : "RESET" });
  }