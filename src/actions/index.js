import {withRouter} from "react-router-dom";
const ROOT_URL = 'http://www.hy0936.com.tw:9990/';
import axios from 'axios';
import { AUTH_USER, UNAUTH_USER } from './types';


export function signinUser({email, password}) {
       // submit email/password
       console.log("Signin......");
       return function(dispatch) {
               //{'Authorization': "JWT "+auth.token}
               var creds = {
                       username: email,
                       password: password
               };
               axios.post(`${ROOT_URL}/api-token-auth/`, creds)
                       .then((response) => {
                               console.log(response);
                               dispatch({type: AUTH_USER});
                               console.log("Signin Successfully");
                               console.log(response.data.token);
                               localStorage.setItem('token', response.data.token);

                               //this changed when using react-router-dom
                               this.props.history.push('/');
                               // xhr.setRequestHeader("Authorization","JWT "+auth.token);
                       })
                       .catch((response) => {
                               console.log("Cannot signin");
                               console.log(response);
                       });
       }
 }

 // export function authError(error) {
 //    return {
 //            type: AUTH_ERROR,
 //            payload: error
 //    };
 // }

export function signoutUser() {
       localStorage.removeItem('token');
       return {
               type: UNAUTH_USER
       }
     }
