import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Filter = ({config, next}) => {
    const selectRef = useRef()
    const inputRef = useRef()

    useEffect(()=>{
        selectRef.current.value =  !!config && !!config.filter ?  config.filter : 'idTeam';
        inputRef.current.value =  !!config && !!config.value ?  config.value : '';
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const filterData = {
            filter: selectRef.current.value,
            value: inputRef.current.value
        }
        
        next(filterData);
    }
    return(
        <form onSubmit={onSubmit} >
            <div className="d-flex justify-content-center">
                <h2 >Filtro</h2>
            </div>
             <div className="input-group mb-3">
                <div className="input-group-prepend">
                <select ref={selectRef} className="custom-select">
                    <option value="idTeam">Id Equipo</option>
                    <option value="position">Posición</option>
                </select>
                </div>
                <input ref={inputRef} required type="text" className="form-control"/>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">Aplicar</button>
            </div>
        </form>
    )
}

export default Filter;