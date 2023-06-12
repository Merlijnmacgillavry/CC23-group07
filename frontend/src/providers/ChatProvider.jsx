import React, { useEffect } from 'react'
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { useSession } from './SessionProvider'

const ChatContext = React.createContext()
export const useChat = () => React.useContext(ChatContext)

export default function ChatProvider({ children }) {
    const [messages, setMessages] = React.useState([])

    const [currentStage, setCurrentStage] = React.useState('void')

    const sessionContext = useSession()

    async function sendMessage(msg, stage) {
        console.log(msg, stage, sessionContext.user)
        let message = new Message(msg, sessionContext.user.display_name)
        try {
            const chatsRef = doc(db, 'chats', sessionContext.user.session_code, 'stages', stage);
            const chatsDoc = await getDoc(chatsRef);
            const existingMessages = chatsDoc.exists() ? chatsDoc.data().messages : [];

            const updatedMessages = [...existingMessages, message];
            await setDoc(chatsRef, { messages: updatedMessages.map((msg) => ({ ...msg })) });

            console.log(updatedMessages);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    useEffect(() => {
        if (sessionContext.user) {
            const unsub = onSnapshot(
                doc(db, 'chats', sessionContext.user.session_code, 'stages', currentStage), (doc) => {
                    console.log(doc.data())
                    setMessages(doc.data())
                })
            return () => unsub()
        }


    }, [sessionContext, currentStage])

    useEffect(() => {
        if (currentStage !== 'void') {
            setMessages([])
        }
    }, [currentStage])



    // const unsub = onSnapshot(
    //     doc(db, 'chats', sessionContext.user?.session_code), (doc) => {
    //         console.log(doc.data())
    //         setMessages(doc.data().messages)
    //     })

    // function sendMessage(message) {
    //     setMessages((messages) => [...messages, message])
    // }


    return (
        <ChatContext.Provider value={{ messages, sendMessage, setCurrentStage }}>
            {children}
        </ChatContext.Provider>
    )
}

class Message {
    constructor(text, sender) {
        let now = new Date()
        this.text = text
        this.sender = sender
        this.timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}