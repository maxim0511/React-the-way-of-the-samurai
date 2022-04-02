

let subcribers={
    'messages-received':[] as ReceivedMessageSubcriberType[],
    'status-changed':[] as StatusChangedSubcriberType[],
};

let WS:WebSocket | null = null;


function createChannel(){
    cleanUp()
    WS?.close()

    WS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ChangedSubcriberStatus('pending')
    WS.addEventListener('close',closeHandler);
    WS.addEventListener('message',messageHandler)
    WS.addEventListener('open',openHandler)
    WS.addEventListener('error',errorHandler)
}



const closeHandler = ()=>{
    ChangedSubcriberStatus('pending')
    setTimeout(createChannel,3000);
}
const openHandler = ()=>{
    ChangedSubcriberStatus('ready')
}
const errorHandler = ()=>{
    ChangedSubcriberStatus('error')
}
const ChangedSubcriberStatus = (status:StatusType)=> {
    subcribers["status-changed"].forEach(s=>s(status));
}
const messageHandler =(e:MessageEvent) =>{
    let newMessage = JSON.parse(e.data)
    subcribers['messages-received'].forEach(s=>s(newMessage))
}



const cleanUp = () =>{
    WS?.removeEventListener('close',closeHandler);
    WS?.removeEventListener('message',messageHandler);
    WS?.removeEventListener('open',openHandler)
    WS?.removeEventListener('error',errorHandler)
}

export const chatAPI= {
    start(){
        createChannel()
    },
    stop (){
        subcribers["messages-received"]=[];
        subcribers['status-changed']=[];
        cleanUp()
        WS?.close();
    },
    subcribe(eventName:EventsNameType,callback:ReceivedMessageSubcriberType | StatusChangedSubcriberType){
        //@ts-ignore
        subcribers[eventName].push(callback)
        return ()=>{
            //@ts-ignore
            subcribers[eventName]=subcribers[eventName].filter(s=>s!==callback)
        }
    },
    unsubcribe(eventName:EventsNameType,callback:ReceivedMessageSubcriberType | StatusChangedSubcriberType){
        //@ts-ignore
        subcribers[eventName]=subcribers[eventName].filter(s=>s!==callback)
    },
    sendMessage(message:string){
        WS?.send(message)
    }
}


type ReceivedMessageSubcriberType  =(messages:ChatMessageType[])=>void;
type StatusChangedSubcriberType = (status:StatusType)=>void
export type StatusType = 'pending' | 'ready' | 'error';
type EventsNameType = 'messages-received' | 'status-changed'
export type ChatMessageType = {
    message:string,
    photo:string,
    userId:number,
    userName:string
}