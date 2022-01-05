import React, { useEffect, useRef, useState } from 'react';
import Head from "next/head"
import { validateCreateUser } from '../business/Auth';


const NewUser = () =>{
    const inputUser = useRef(null);
    const inputPass = useRef();
    const [messageAlert, setmessageAlert] = useState({ state: false, message: null, type: null });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputUser.current.value);
        validateCreateUser({
            user: inputUser.current.value,
            password: inputPass.current.value
        }, 'users/create')
        .then((response) => {
            if(response.error){
                setmessageAlert({
                    status: true,
                    message: response.message,
                    type: 'alert alert-danger' 
                })
                setTimeout(() => {
                    setmessageAlert({
                        status: false,
                        message: null 
                    }) 
                }, 3000);
            } else {
                console.log(response.body);
                setmessageAlert({
                    status: true,
                    message: "Usuario creado",
                    type: 'alert alert-success' 
                })
                setTimeout(() => {
                    setmessageAlert({
                        status: false,
                        message: null 
                    }) 
                    window.location.replace("/");
                }, 3000);
            }
        })
        .catch((error) => {
            console.error(error);
        })
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
                    <span className="mx-auto mt-4 title">Crear Usuario</span>
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
                    placeholder="Ingresa usuario"
                    ref={inputUser}
                    required
                    />
                </div>
                <div className="passform d-flex">
                    <input 
                    type="password"
                    name="pass"
                    className="form-control w-70 mx-auto"
                    placeholder="Ingresa contraseña"
                    ref={inputPass}
                    required
                    />
                </div>
                <div className="d-flex">
                    <button onSubmit={(e) => handleSubmit(e, inputUser, inputPass) } name="create" className="btn btn-primary mx-auto" type="submit">
                    Crear
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}
  


export default NewUser;