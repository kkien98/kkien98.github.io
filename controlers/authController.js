import validator from "../utils/validator.js";
import {makeResponse,responseCode,responseType } from "./response.js";
import user from "../models/user.js";
const authController = {
  register : async function (request){
      // console.log("I have received something :" + request);
      const result = validator.validate({
          name: {name:"notEmpty"}, 
          password: {name: "minLength",value : 8},
          retypePassword: {name:"matched" ,value:request.password}
      },request);

    await firebase.auth().createUserWithEmailAndPassword(request.email,request.password)
    firebase.auth().currentUser.updateProfile({
      displayName: request.name
    })
    firebase.auth().currentUser.sendEmailVerification();
   return makeResponse(
      responseType.SUCCESS,
      responseCode.auth.register_success,
      firebase.auth().currentUser);
  },

  login: async function(request)
  {
    const loginResult= await firebase.auth().signInWithEmailAndPassword(request.email,request.password);
    if(!loginResult.user.emailVerified)
    //if(loginResult.user.emailVerified == false)
    //trong code console gửi về email verify ở dạng boolean
    {
    return makeResponse(responseType.FAILURE,
      responseCode.auth.email_not_verified);
    }
    else{
      user.authedUser={
        email: loginResult.user.email,
        displayName: loginResult.user.displayName,
      };
    return makeResponse(responseType.SUCCESS,
      responseCode.auth.login_success,
      loginResult.user);
    }
  }
};

export default authController;