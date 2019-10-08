import setScreen from "./index.js";
import loginScreen from "./login.js";
import authController from "../controlers/authController.js";
import {responseCode} from "../controlers/response.js";

const screen = `
<div id="register-screen" class="width-100 height-100">
<div class="card">
<form id="js-formRegister">
<h4 class="align-center">Join Us</h4>
    <div class="input-group">
        <label>Name</label>
        <input id="name" type="text" class="reg-input">
        </div>
        <div class="input-group">
        <label>Email</label>
        <input id="email" type="email" class="reg-input">
        </div>
        <div class="input-group">
        <label>Password</label>
        <input id="password" type="password" class="reg-input">
        </div>
        <div class="input-group">
        <label>Confirm Password</label>
        <input id="retypePassword" type="password" class="reg-input">
        </div>
        <div class="input-group">
        <button class="btn" type="submit">Register</button>
        <button class="btn" id="js-btnBackToLogin" type="button">Back to Login Page</button>
        </div>
    </form>
    </div>
</div>
`;

function onLoad()
{
 const btnBackToLogin = document.getElementById("js-btnBackToLogin");
 const formRegister=document.getElementById("js-formRegister");
 formRegister.addEventListener("submit",async function(event) {
  event.preventDefault();
   const request = 
 {
     name: formRegister.name.value,
     email: formRegister.email.value,
     password: formRegister.password.value,
     retypePassword: formRegister.retypePassword.value
 };
 const response= await authController.register(request)  // register xong sẽ trả về response
  switch(response.code)
  {
    case responseCode.auth.register_success :   //code của trường hợp success trong response.js
        alert("Registered successfully,please check your E-mail to verify");
        setScreen(loginScreen);
        return;
  }
 });
 btnBackToLogin.addEventListener("click",function() {
     setScreen(loginScreen)
 });
}

export default {
    ui:screen,
    onLoad: onLoad,
}