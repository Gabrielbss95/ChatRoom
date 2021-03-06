import {IonContent,  IonProgressBar, IonHeader, IonToolbar, IonAlert, IonPage, IonItem, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import './Conversa.css';
import {updateMessages, sendMessage } from '../firebaseConfig';
import Message from '../components/Message'

const Conversa: React.FC = () => {

  const location:any = useLocation(); 
  const room = location.state.room;
  const user = location.state.user;
  const [messages, setMessages]:any = useState(null);
  const [digitado, setDigitado] = useState("");
  const [mostrarLoading, setMostrarLoading] = useState(false);
  const botaoEnviar:any = document.getElementById('botao-enviar-conversa');
  
  const setMessagesAndScroll = (newMessages:any) => {
    setMessages(newMessages);
    scroll();
  }

  const scroll = () => {
    const container:any = document.getElementById('conversa-container');
    if(container){
      container.scrollTop = container.scrollHeight;
    }
  }

  if(!messages)
    updateMessages(room, messages, setMessagesAndScroll)
  

  window.onresize = () =>{
    scroll();
  } 

  const enviarMensagem = async () => {
    if(digitado.replace(/ /g,'') !== ''){
      botaoEnviar.disabled = true;
      setMostrarLoading(true);
      await sendMessage(room, digitado, user);
      setDigitado("");
      botaoEnviar.disabled = false;
      setMostrarLoading(false);
    }
  }

  //padrao msgs
  /*
    {
      name:
      email:
      content:
      timestamp:
    }
  */
   
  return (
    <IonPage>
      <IonHeader>
          <IonToolbar color="light">
            
            <div id="bar-conversa">
              {room}
            </div>
          </IonToolbar>
        </IonHeader>

      <IonContent color="dark">
        <div id="conversa-container">
          { messages? Object.keys(messages).map((message:any, index:number)=>{
              let myMessage = (messages[message].email===user.email);
              return <Message key={index} children={{key:index, message: messages[message], myMessage}}/>;
          }) :<IonAlert isOpen={true} header={'Carregando mensagens...'}/>}
        </div>
        <div id="campos-conversa">
          <IonItem  color="light" id="input-conversa">
              <IonInput type="text" value={digitado} placeholder="Digite aqui..." onIonChange={(e:any) => setDigitado(e.target.value)} ></IonInput>
          </IonItem>
          <IonButton id="botao-enviar-conversa" onClick={enviarMensagem}>
            <div id="botao-enviar-content">
              Enviar
              {(mostrarLoading ? <IonProgressBar type="indeterminate" color="medium" id="progress-bar-conversa"></IonProgressBar> : '')}
            </div>
            
          </IonButton>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Conversa;
