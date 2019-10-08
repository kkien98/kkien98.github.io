import setScreen from './index.js'
import registerScreen from './register.js'
import authController from '../controlers/authController.js';
import {responseCode} from '../controlers/response.js'
import chatScreen from '../views/chat.js'
const form =`
<div id="login-screen" class="width-100 height-100">
<div class="card card-sm">
<form id="js-loginForm">
<h3 class="align-center">Just Chat</h3>
        <div class="input-group ">
        <label>Email</label>
        <input id="email" type="email" >
        </div>
        <div class="input-group">
        <label>Password</label>
        <input id="password" type="password">
        </div>
        <div class="input-group">
        <button class="btn btn-login" type="submit">Login</button>
        <button class="btn btn-moveToRegs" id="js-btnMoveToRegister" type="button">Register now</button>
        </div>
    </form></div>
</div>

`
function onLoad() {   
    const formLogin= document.getElementById("js-loginForm");
    formLogin.addEventListener("submit",async function(event)
    {
        event.preventDefault();
        const request = {
            email: formLogin.email.value,
            password: formLogin.password.value,
        };
      const response= await  authController.login(request);
      switch (response.code)
      {
          case responseCode.auth.email_not_verified:
              alert("Account not activated! Please check your E-mail")
              return;
          case responseCode.auth.wrong_password:
              alert("Password is incorrect please check again!")
              return;
           case responseCode.auth.user_not_found:
               alert("This account does not exist,please register first!")
               return;   
        case responseCode.auth.login_success:
            setScreen(chatScreen);
            return;
      }
    })
    const btnMoveToRegister = document.getElementById("js-btnMoveToRegister");
    btnMoveToRegister.addEventListener("click",function() {
        setScreen(registerScreen);
    })
}

export default {
    ui:form,
    onLoad: onLoad,
}