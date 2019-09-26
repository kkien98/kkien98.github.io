import setScreen from './index.js'
import registerScreen from './register.js'
import authController from '../controlers/authController.js';
import {responseCode} from '../controlers/response.js'
import chatScreen from '../views/chat.js'
const form =`
<div id="login-screen" class="width-100 height-100">
<div class="card">
<form id="js-loginForm">
<h4 class="align-center">MindX Chat<h4>
        <div class="input-group">
        <label>Email</label>
        <input id="email" type="email">
        </div>
        <div class="input-group">
        <label>Password</label>
        <input id="password" type="password">
        </div>
        <div class="input-group">
        <button class="btn btn-primary" type="submit">Login</button>
        <button class="btn" id="js-btnMoveToRegister" type="button">Register now</button>
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
              alert("Account not activated! Please check your inbox")
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