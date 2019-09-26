import {saveConversation} from "../models/conversation.js"
import { saveMessage } from "../models/message.js"
const conversationController = {
    createConversation : function(name, email) {
        saveConversation(name,email)
    }
}

export default conversationController;