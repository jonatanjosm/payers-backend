import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head"
import { validateCreateUser } from '../business/Auth';


const Index = () =>{
    const inputUser = useRef(null);
    const inputPass = useRef();
    const [messageAlert, setMessageAlert] = useState({ status: false, message: null, type: null });
    const [newUser, setNewUser] = useState(false);

    useEffect(()=>{
        inputUser.current.value = "";
        inputPass.current.value = "";
    },[newUser])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const endpoint = !!newUser ? 'users/create' : 'users/login';
        
        validateCreateUser({
            user: inputUser.current.value,
            password: inputPass.current.value
        }, endpoint)
        .then((response) => {
            if(response.error){
                setMessageAlert({
                    status: true,
                    message: response.message,
                    type: 'alert alert-danger'
                })
                setTimeout(() => {
                    setMessageAlert({
                        status: false,
                        message: null,
                        type: null
                    }) 
                }, 3000);
            } else {
                console.log(response.body);
                if(!!newUser){
                    setMessageAlert({
                        status: true,
                        message: "Usuario creado",
                        type: 'alert alert-success' 
                    })
                    setTimeout(() => {
                        setMessageAlert({
                            status: false,
                            message: null 
                        }) 
                        setNewUser(false);
                    }, 3000);
                }else{
                    setMessageAlert({
                        status: false,
                        message: null 
                    })
                    localStorage.setItem('token', response.body.token);
                    window.location.replace("/home");
                }
            }
        })
        .catch((error) => {
            console.error(error);
        })
        //
    }

    return(
        <div>
            <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="/fontawesome/css/all.css" rel="stylesheet" />
            <link rel="stylesheet" href="/css/general.css" />
            <link rel="stylesheet" href="/css/bootstrap.min.css" />
            
            <link rel="stylesheet" href="/styles/formStyle.css" />
            <title>Portal Fanatiz</title>
            </Head>
            <div className="principalLogin all">
            <div className="containLogin">
                <form onSubmit={(e) => handleSubmit(e)} className="mx-auto formLog">
                <div className="headLogin d-flex">
                    <span className="mx-auto my-auto nameHead"><i className="fab fa-cotton-bureau" /> Fanatiz</span>
                </div>
                <div className="titleform d-flex">
                    <span className="mx-auto mt-4 title">{!!newUser ? 'Crear usuario' : 'Ingresa aquí'}</span>
                </div>
                {!!messageAlert.status && 
                    <div className={messageAlert.type} role="alert">
                        {messageAlert.message}
                    </div>
                }
                <div className="userform mt-5 d-flex">
                    <input 
                    type="text"
                    name="user"
                    className="form-control w-70 mx-auto"
                    placeholder="Ingresa tu usuario"
                    ref={inputUser}
                    required
                    />
                </div>
                <div className="passform d-flex">
                    <input 
                    type="password"
                    name="pass"
                    className="form-control w-70 mx-auto"
                    placeholder="Ingresa tu contraseña"
                    ref={inputPass}
                    required
                    />
                </div>
                <div className="d-flex">
                    <button onSubmit={(e) => handleSubmit(e, inputUser, inputPass) } name="login" className="btn btn-primary mx-auto" type="submit">
                    {!!newUser ? 'Crear' : 'Ingresar' }
                    </button>
                </div>
                
                <div className="d-flex">
                    <button type="button" className="btn btn-link mx-auto" onClick={(e)=>{e.preventDefault; setNewUser(!newUser); return false;}}>{!!newUser ? 'Iniciar sesión' : 'Crear usuario' }</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}
  


export default Index;