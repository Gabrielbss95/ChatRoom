import { IonButtons, IonContent, IonHeader, IonMenuButton, IonProgressBar, IonPage, IonItem, IonLabel, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { efetuarLogin } from '../firebaseConfig';
import { presentToast } from '../toast';
import Logo from '../images/crlogolight.png';


const Login: React.FC = () => {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarLoading, setMostrarLoading] = useState(false);

  const logar = async() => {
    setMostrarLoading(true);
    const user = await efetuarLogin(email, senha);
    if(user){
        presentToast('Logou');
    } else {
        presentToast('Dados incorretos.')
    }
    setMostrarLoading(false);
  }

  return (
    <IonPage>
      <IonContent color="dark">
        <div id="login-container">

            <img id="logo-login" width="200px" height="100px" src={Logo}/>
            <span id="descricao-login">Converse o que quiser, quando quiser. 💬 </span>

            <div id="login-campos-container">
                <IonItem color="light" className="input-login">
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput type="email" onIonChange={(e:any) => setEmail(e.target.value)}></IonInput>
                </IonItem>
                <IonItem color="light" className="input-login">
                    <IonLabel position="floating">Senha</IonLabel>
                    <IonInput type="password" onIonChange={(e:any) => setSenha(e.target.value)}></IonInput>
                </IonItem>
                <div id="loading-login">{(mostrarLoading ? <IonProgressBar type="indeterminate" color="medium"></IonProgressBar> : '')}</div>
                <IonButton onClick={async()=>{await logar()}} id="botao-login">Entrar</IonButton>
            </div>
            <div id="cadastro-login-container">
                Não tem conta? Cadastre-se! É Grátis!
                <IonButton onClick={()=>{history.push('/cadastro')}} id="botao-cadastro-login">Cadastro</IonButton>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;