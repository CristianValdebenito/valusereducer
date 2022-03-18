import React, { useReducer, useState } from  'react';
    

const ReducerPrueba = (props) => {
    const initialState = {
        name: "",
        apellido:"",
        email: "",
        error_name: "",
        error_ap:"",
        error_email: "",
        hasBeenSubmitted: false
    };

    function reducer(state, action) 
    {
        switch(action.type)
        {
            case "NAME":
                if(action.name.length<3)
                {
                    return {
                        ...state,
                        name: action.name,
                        error_name: "debe ingresar un nombre mayor o igual a 3 caracteres"
                    }
                }
                else{
                    return {
                        ...state,
                        name: action.name,
                        error_name: ""
                    }  
                } 
            case "APELLIDO":
                if(action.apellido.length<5)
                {
                    return {
                        ...state,
                        apellido: action.apellido,
                        error_ap: "debe ingresar un apellido mayor o igual a 5 caracteres"
                    } 
                }  
                    else{
                        return {
                            ...state,
                            apellido: action.apellido,
                            error_ap: ""
                        }   
                    }
            case "EMAIL":
                if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(action.email))
                {
                    return {
                        ...state,
                        email: action.email,
                        error_email: "Verifique el formato del email ingresado"
                    } 
                }  
                    else{
                        return {
                            ...state,
                            email: action.email,
                            error_email: ""
                        }   
                    }
            case "SUBMIT":
                if(state.name.length>2 && state.apellido.length>4 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email))
                {
                    return{
                        ...state,
                        hasBeenSubmitted: true
                    }
                }else{
                    return{
                        ...state,
                        hasBeenSubmitted: false
                    }
                    
                }
        }   
    }
     
    const [state, dispatch] = useReducer(reducer, initialState);
 
    function handleNameAp(e) {
        if(e.target.name==="name"){
            const {value} = e.target;
            dispatch({type: "NAME", name: value})
        }
        else if(e.target.name==="apellido"){
            const {value} = e.target;
            dispatch({type: "APELLIDO", apellido: value})
    }  
         else if(e.target.name==="email") {
            const {value} = e.target;
            dispatch({type: "EMAIL", email: value})
         }   
        
    }


    function createAccount(e){
        e.preventDefault(); 
        console.log(e.target, "console del target del submit") 
        dispatch ({type: "SUBMIT"})
    }
    return (
        <div>
           <h1>Crea tu cuenta</h1>
                <form action="" onSubmit={createAccount}>
                {
            state.hasBeenSubmitted ? 
            <h2>"Gracias por enviar el formulario!"</h2>: 
            <h2>"Bienvenido, por favor envie el formulario!"</h2>
            }
                <label>
                    <span>Name:</span>
                    <input
                        name="name"
                        value={state.name}
                        onChange={handleNameAp}
                    />
                   <p>{state.error_name}</p>
                </label>
                <label>
                    <span>Apellido:</span>
                    <input
                        name="apellido"
                        value={state.apellido}
                        onChange={handleNameAp}
                    />
                   <p>{state.error_ap}</p>
                </label>
                <label>
                    <span>Email:</span>
                    <input
                        name="email"
                        value={state.email}
                        onChange={handleNameAp}
                    />
                   <p>{state.error_email}</p>
                </label>
                
                <button type="submit">Crear cuenta</button>
            </form>
            
        </div>
    );
};
    
export default ReducerPrueba;