import {newMessage,saveMessage,changeActiveCon} from "../models/message.js"
import {addUser,updateActiveCon} from "../models/conversation.js"
const chatController = {
  sendMessage: function(content) {
      console.log(content);
      const message=newMessage(content);
   saveMessage(message);
  },
  addUser : function(email){
    addUser(email);
  },
  changeActiveCon: function(nextConId){
    //update conversation model
  updateActiveCon(nextConId);
  //update chat model
  changeActiveCon();
 
  }
};

export default chatController;