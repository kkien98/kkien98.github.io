import chatController from "../controlers/chatController.js"
import conversationController from "../controlers/conversationController.js"
import { activeConversation,listenConversation } from "../models/conversation.js";
import user from "../models/user.js"
// import {subscribe} from "../models/message.js"

let lastMsgEmail="";
const ui = `
<div class="flex-container height-100 background ">
<div id="left-side" class="element border-right scrollbar style-scroll ">
<div id="js-conversationHeader" class="js-conversationHeader">
</div>
<div id="js-conFrame" class="height-100 ">

</div>
</div>
<div id="right-side" class="flex-container flex-column grow-3">
<div class="js-conName">
<h4 class="white-bg">Hello ${user.authedUser.email} &#128522</h4>
</div>
<div class="flex-container element grow-1 vertical-scroll">
<div class="element grow-3 flex-container flex-column">
<div class="element grow-1 scrollbar style-scroll " id="js-chatFrame">
</div>
<div class="element">
<form id="js-formChat">
<div class="flex-container">
<div class="grow-1">
<input type="text"  id="js-userInput">
</div>
<div>
<button class="btn btn-sendMess">SEND</button>
</div>
</div>
</form>
</div>
</div>
<div class="element grow-1 border-left js-listUserFrame">
<div id="js-listUserFrame">
</div>
<div>
<form id="js-formAddUser">
<h5 class="white-bg">Want to talk to someone? Add them here:</h4>
<div >
<input class="inputAddUser"  id="js-inputAddUser" type="text" placeholder="Email only..." >
</div>
</form>
</div>
</div>
</div>
</div>
</div>
    `;
const formCreateHTML = `
<form id="js-formCreate" class="align-center">
  <div class="input-group">
  <label>Name Conversation</label>
  <input id="js-conName" type="text" class="width-90">
  </div>
  <div class="input-group">
  <label>Add People(email)</label>
  <input id="js-conEmail" type="text" class="width-90">
  </div>
  <div class="input-group">
  <button class="btn">Create</button>
  <button class="btn" onclick=closeFormCreate()>Close</button>
  </div>
</form>
`

const btnShowHTML = `
<button class="btn-createdCon width-100" id="js-btnShow" >Create new conversation</button>
`
function onLoad() {
    // subscribe(chatScreen);

    const formChat = document.getElementById("js-formChat");
    const formAddUser = document.getElementById("js-formAddUser");
    const conFrame = document.getElementById("js-conFrame")
    //click để switch giữa các conversation
    conFrame.addEventListener("click", function (event) {
        console.log(event.target.id);
        chatController.changeActiveCon(event.target.id);
    })
    formChat.addEventListener("submit", function (event) {
        event.preventDefault();
        // if(formChat["js-userInput"].value!="")
        // {
        //     addMessage((formChat["js-userInput"].value),"host");
        // }
        if (formChat["js-userInput"].value != "") { chatController.sendMessage(formChat["js-userInput"].value); }

        formChat["js-userInput"].value = "";
    })

    formAddUser.addEventListener("submit", function (event) {
        event.preventDefault();
        chatController.addUser(formAddUser["js-inputAddUser"].value);
        formAddUser["js-inputAddUser"].value="";
    })
    addBtnShow();
    listenConversation();
};



function addBtnShow() {
    const conHeader = document.getElementById("js-conversationHeader");
    conHeader.innerHTML = btnShowHTML;
    const btnShow = document.getElementById("js-btnShow");
    btnShow.addEventListener("click", function () {
        addFormCreate();
    })

}
function closeFormCreate(){
    const conHeader = document.getElementById("js-conversationHeader");
    conHeader.innerHTML= `
    <button class="btn-createdCon width-100" id="js-btnShow" class="width-100">Create new conversation</button>
    `
}



function addFormCreate() {
    const conHeader = document.getElementById("js-conversationHeader");
    conHeader.innerHTML = formCreateHTML;
    const formCreate = document.getElementById("js-formCreate");
    formCreate.addEventListener("submit", function (event) {
        event.preventDefault();
        // xử lý submit form add conversation ở đây
        const name = formCreate["js-conName"].value;
        const email = formCreate["js-conEmail"].value;
        conversationController.createConversation(name, email);
        addBtnShow();
    })

}


// function update(message) {
//     addMessage(message.content,"host")

// }
function addMessage(message) {
    const owner = message.user === user.authedUser.email ? "host" : "guest";
    let space="10";
    if(lastMsgEmail !== message.user){
        space ="50";
        lastMsgEmail =message.user;
    }
    const msg = `
    <div class="vertical-${space}"></div>
    <div class="flex-container ${owner === "host" ? "justify-end" : ""}"> 
    <small>${message.user}</small>
    <br/> 
    <span class=" msg msg-${owner}">${message.content}</span>
</div>
`;
    const chatFrame = document.getElementById("js-chatFrame");
    chatFrame.insertAdjacentHTML("beforeend", msg);
    chatFrame.scrollTop=chatFrame.scrollHeight;
}
//nếu owner bằng Host thì thêm justify-end,còn ko thì thêm ""
function addBulkMessages(messages) {
    messages.forEach(function (messages) {
        addMessage(messages);
    })
}
function addCon(conversation) {
    const con =
        `<div id="${conversation.id}" class="chat-con-item ${conversation.id === activeConversation ? "active" : null}">
    ${conversation.name}
 </div>`;
    const conFrame = document.getElementById("js-conFrame");
    conFrame.insertAdjacentHTML("afterbegin",con)
}
function updateUserList(listUser) {

    const userListFrame = document.getElementById("js-listUserFrame");
    userListFrame.innerHTML = "";
    let listUserHtml = "";
    for (let i = 0; i < listUser.length; i++) {
        listUserHtml += `
      <div>${listUser[i]}</div>`
    }

    userListFrame.insertAdjacentHTML("beforeend", listUserHtml);
}

function updateActiveCon(oldConId) {
    if (oldConId !== null) {
        const currentActiveCon = document.getElementById(oldConId);
        currentActiveCon.classList.remove("active");
    }
    const nextActiveCon = document.getElementById(activeConversation)
    nextActiveCon.classList.add("active");
}
function clearMessages() {
    const chatFrame = document.getElementById("js-chatFrame");
    chatFrame.innerHTML = "";
}
const chatScreen = {
    ui: ui,
    onLoad: onLoad,
    addMessage: addMessage,
    addCon: addCon,
    updateUserList: updateUserList,
    updateActiveCon: updateActiveCon,
    clearMessages: clearMessages,
    addBulkMessages: addBulkMessages,
    // update: update,
};
export default chatScreen;