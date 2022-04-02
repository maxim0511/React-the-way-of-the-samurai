import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../../API/chat-api";
import { SendMessage, startMessages, stopMessages } from "../../../Redux/chatReducer";
import { AppStateType } from "../../../Redux/ReduxStore";

const ChatPage:React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}
const Chat:React.FC = () => {
    const status=useSelector((State:AppStateType)=>State.chatPage.status)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(startMessages())
        return ()=>{
            dispatch(stopMessages())
        }
    },[])
    return (
        <div>
            {status == 'error' && <div>Ошибка,перезагрузите страницу</div>}
            <Messages />
            <AddMessageChatForm />
        </div>
    )
}

const Messages:React.FC = ({}) => {
    const messages=useSelector((State:AppStateType)=>State.chatPage.messages);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [autoScrollActive,setAutoScrollActive]=useState(true);
    const scrollHandler = (e:React.UIEvent<HTMLDivElement,UIEvent>)=> {
        let element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop)- element.clientHeight) < 300){
            !autoScrollActive && setAutoScrollActive(true)
        } else {
            autoScrollActive && setAutoScrollActive(false)
        }
    }
    useEffect(()=>{
        if (autoScrollActive) {
            messagesRef.current?.scrollIntoView({behavior:'smooth'})
        }
    },[messages])
    return (
        <div style={{height:'700px',overflowY:'auto'}} onScroll={scrollHandler}>
            {messages.map((m,index)=><Message key={m.id} message={m}/>)}
            <div ref={messagesRef}></div>
        </div>
    )
}
const Message:React.FC<{message:ChatMessageType}> = React.memo(({message}) => {
    return (
        <div style={{padding:'9px'}}>
            <div style={{display:'flex',alignItems:'center'}}>
            <img src={message.photo} style={{width:'70px',borderRadius:'40px'}}/><b style={{marginLeft:'1%'}}>{message.userName}</b>
            </div>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})


const AddMessageChatForm:React.FC = ({}) => {
    const [message,setMessage]=useState('');
    const status=useSelector((State:AppStateType)=>State.chatPage.status)
    const dispatch = useDispatch();
    const sendMessageHandler = () => {
        if (!message){return};
        dispatch(SendMessage(message))
        setMessage('');
    }
    return (
        <div>
            <div><textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}/></div>
            <div><button onClick={sendMessageHandler} disabled={status !== 'ready'}>Отправить</button></div>
        </div>
    )
}
export default ChatPage