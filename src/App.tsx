import React, { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { Redirect, Route } from 'react-router';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './Redux/appReducer';
import Preloader from './common/Preloader/Preloader';
import { AppStateType } from './Redux/ReduxStore';

const DialogsContainer = React.lazy(()=> import('./components/Dialogs/DialogsContainer'));
const ProfileContainer= React.lazy(()=> import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(()=> import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(()=> import('./components/Login/Login'));
const Chatpage = React.lazy(()=>import('./components/Pages/Chat/ChatPage'))

const App:React.FC = ()=> {
    const initialized = useSelector((State:AppStateType)=>State.app.initialized);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(initializeApp());
        document.title='Profile';
    },[])
    if (!initialized){
        return <Preloader/>
    }
         return (
          <div className="app-wrapper">
              <Header/>
              <Navbar/>
              <div className='app-wrapper-content'>
                  <Route path="/Profile/:userId?" 
                                             render={() =>{
                                                return <Suspense fallback={<Preloader/>}>
                                                          <ProfileContainer/>
                                                      </Suspense> 
                                            }}      
                    />  
                <Route path='/' exact><Redirect to='/Profile'/></Route>
                  <Route path="/Dialogs"  
                      render={() =>{
                          return <Suspense fallback={<Preloader/>}>
                                    <DialogsContainer 
                              /> 
                                </Suspense> 
                      }}/>   
                 <Route path="/Users"  
                       render={() =>{
                        return <Suspense fallback={<Preloader/>}>
                                  <UsersContainer pageTitle={'Самураи'}/> 
                              </Suspense> 
                    }}/>   
                 <Route path="/Login" 
                       render={() =>{
                        return <Suspense fallback={<Preloader/>}>
                                  <LoginPage/> 
                              </Suspense> 
                    }}/>                    {/*exact */}
                <Route path="/Chat"  
                       render={() =>{
                        return <Suspense fallback={<Preloader/>}>
                                  <Chatpage/>
                              </Suspense> 
                    }}/>  
                  <Route path="/Music"    render={() => <Music/>}/>
                  <Route path="/News"     render={() => <News/>}/>
                  <Route path="/Settings" render={() => <Settings/>}/>
              </div>
          </div>
        )
  };
export default App;