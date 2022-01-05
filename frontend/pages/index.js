import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head"
import { validateCreateUser } from '../business/Auth';
import { IO } from '../business/IO';


const Index = () =>{
    const inputUser = useRef(null);
    const inputPass = useRef();
    const [errorAlert, setErrorAlert] = useState({ state: false, message: null });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputUser.current.value);
        validateCreateUser({
            user: inputUser.current.value,
            password: inputPass.current.value
        }, 'users/login')
        .then((response) => {
            if(response.error){
                setErrorAlert({
                    status: true,
                    message: response.message 
                })
                setTimeout(() => {
                    setErrorAlert({
                        status: false,
                        message: null 
                    }) 
                }, 3000);
            } else {
                console.log(response.body);
                setErrorAlert({
                    status: false,
                    message: null 
                })
                IO.token = response.body.token;
            }
        })
        .catch((error) => {
            console.error(error);
        })
        //window.location.replace("/formulario");
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
            <title>Portal Pruebas Fanatiz</title>
            </Head>
            <div className="principalLogin all">
            <div className="containLogin">
                <form onSubmit={(e) => handleSubmit(e)} className="mx-auto formLog">
                <div className="headLogin d-flex">
                    <span className="mx-auto my-auto nameHead"><i className="fab fa-cotton-bureau" /> Fanatiz</span>
                </div>
                <div className="titleform d-flex">
                    <span className="mx-auto mt-4 title">Ingresa aquí</span>
                </div>
                {!!errorAlert.status && 
                    <div className="alert alert-danger" role="alert">
                        {errorAlert.message}
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
                    Ingresar
                    </button>
                </div>
                <div className="d-flex">
                    <a href="/newUser" className='mx-auto' >Crear usuario</a>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}
  


export default Index;