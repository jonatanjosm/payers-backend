import React, { useState } from 'react';
import Head from "next/head";
import {COLOR_VERDE, COLOR_AZUL_OSCURO, LIGHT_GRAY} from '../lib/util/Colors'
import { fetchTeams, fetchPlayers } from '../business/FetchInfo';
import { useEffect } from 'react/cjs/react.development';
import Modal from '../lib/util/Modal/Modal';
import Filter from '../components/Filter';


const Home = () => {
    const [teamsNav, setTeamsNav] = useState(true);
    const [playersNav, setPlayersNav] = useState(false);
    const [messageAlert, setMessageAlert] = useState({ status: false, message: null, type: null });
    const [tableData, setTableData] = useState(null);
    const [filterSaved, setFilterSaved] = useState({ filter: 'idTeam', value: ''});
    
    
    const [modalOpen, setModalOpen] = useState(false);

    const selectPlayersNav = () => {
        setTeamsNav(false);
        setPlayersNav(true);
        setTableData([]);
    }

    const selectTeamsNav = () => {
        setTeamsNav(true);
        setPlayersNav(false);
        setTableData([]);
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token == null || token == ''){
            console.log('invalid');
            window.location('/')
        }
        if(!!teamsNav && (tableData == null || tableData.length == 0) ){
            fetchData();
        }
    })


    const fetchData = (filterData) => {
        const dataFetch = !!teamsNav ? fetchTeams() : fetchPlayers(filterData);
        dataFetch
        .then((response) => {
            debugger
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
                        type: 'alert alert-danger'
                    }) 
                }, 3000);
            } else {
                var data = response.body;
                console.log(data);
                setTableData(data);
                if(!!playersNav){
                    setModalOpen(false);
                    if(!!filterData){
                        setFilterSaved(filterData);
                    }
                }
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }


    return(
      <div className="all">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="/fontawesome/css/all.css" rel="stylesheet" />
          <link rel="stylesheet" href="/css/general.css" />
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/styles/homeStyle.css" />
          <title>Portal Fanatiz</title>
        </Head>
        <Modal isOpen={modalOpen} onClose={() => {setModalOpen(!modalOpen)}}>
            <Filter next={fetchData} config={filterSaved}/>
        </Modal>
        <div className="HeadForm d-flex">
          <span className="titleHead mx-auto my-auto">Bienvenido al Portal Fanatiz <i className="fab fa-cotton-bureau" /></span>
        </div>
            {!!messageAlert.status && 
                <div className={messageAlert.type} role="alert">
                    {messageAlert.message}
                </div>
            }
        <div className="principalForm"> 
        
            <div className='d-flex justify-content-between'>
                <ul className="nav nav-tabs">
                    
                    <li className="nav-item">
                    <button className={`nav-link btn btn-link ${teamsNav ? "active" : ""}`} type="button"  onClick={selectTeamsNav}>Equipos</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link btn btn-link ${playersNav ? "active" : ""}`} type="button"  onClick={selectPlayersNav}>Jugadores</button>
                    </li>
                </ul>
                {!!playersNav && 
                    <div className="form-inline my-2 my-lg-0">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>{setModalOpen(true)}}>Filtrar</button>
                    </div>
                }
            </div>
           
          <div className="bodyUsers d-flex">
            <span className="listUsers mx-auto">{`Lista de ${teamsNav ? 'Equipos' : 'Jugadores'}`}</span>
          </div>
          <div className="pre-scrollable containList d-flex justify-content-between">
            {(!!teamsNav && tableData != null) &&
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Sigla</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Pais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!tableData && tableData.map(team => {
                            
                            return(
                                <tr key={team.id}>
                                    <th scope="row">{team.id}</th>
                                    <td>{team.nombre}</td>
                                    <td>{team.sigla}</td>
                                    <td>{team.tipo}</td>
                                    <td>{team.paisNombre}</td>
                                </tr>
                            )
                        })}
                        
                        
                    </tbody>
                </table>
            }

            {(!!playersNav && tableData != null) &&
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Nacimiento</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Altura</th>
                            <th scope="col">Peso</th>
                            <th scope="col">Camiseta</th>
                            <th scope="col">Posicion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!tableData && tableData.map(player => {
                                
                                return(
                                    <tr key={player.id}>
                                        <th scope="row">{player.id}</th>
                                        <td>{player.nombreCorto}</td>
                                        <td>{player.fechaNacimiento.replace('T', ' ')}</td>
                                        <td>{player.edad}</td>
                                        <td>{player.altura}</td>
                                        <td>{player.peso}</td>
                                        <td>{player.camiseta}</td>
                                        <td>{player.rol}</td>
                                    </tr>
                                )
                            })}
                            
                            
                        </tbody>
                    </table>
                }
          </div>
        </div>
        <style jsx>{`
          
          .btn-success {
            background-color: ${COLOR_VERDE};
            color: #FFF;
            width: 120px;
            height: 50px;
            border: 1px solid ${COLOR_VERDE};
          }
          .listUsers {
            font-family: Gilroy-Medium;
            font-size: 25px;
            color: ${COLOR_AZUL_OSCURO};
          }
          .bodyUsers {
            height: 50px;
            width: 100%;
            border-bottom: 1px solid ${LIGHT_GRAY};
          }
          .containList {
            max-height: 80%;
          }
        `}</style>
      </div>
    );
  
}

export default Home;