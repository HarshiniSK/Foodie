import axios from 'axios';
import {SignUp, SignIn} from './api';

const options = {headers: {'Content-Type': 'application/json'}};

export const signUpMeth =  (username, password) => {
  let response = null;
  axios
    .post(
      SignUp,
      {
        username: username,
        password: password,
      },
      options,
    )
    .then(res => {
      console.log('Signup:', res.data);
      response=res.data;
      // return res.data;
    })
    .catch(e => {
      console.error('Up error', e);
    });
  setTimeout(() => {
    return response;
  }, 500);
  // return(response);
};

export const signInMeth = (username, password) => {
  axios
    .post(
      SignIn,
      {
        username: username,
        password: password,
      },
      options,
    )
    .then(res => {
      console.log('Signin:', res.data);
      return res.data;
    })
    .catch(e => {
      console.error('In error', e);
    });
};
