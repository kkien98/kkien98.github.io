const responseType = {
    SUCCESS: "Success",
    FAILURE: "Failure",
}

const responseCode = {
    auth:{
        register_success: "auth/register_success",
        email_not_verified: "auth/email_not_verified",
        login_success: "auth/login_success",
        wrong_password:"auth/wrong-password",
        user_not_found:"auth/user-not-found"
    }
}

function makeResponse(type,code,data){
    return {
        type:type,
        code:code,
        data:data
    }
}

export {responseType,responseCode,makeResponse};