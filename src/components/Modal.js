import React from 'react';
import {Link} from 'react-router-dom';

const Modal = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="modal" >
            <div className="modal-background" onClick={props.closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Pagar ${props.total}</p>
                    <button className="delete" aria-label="close" onClick={props.closeModal}></button>
                </header>
                <form onSubmit={props.onSubmit}>
                    {user ? 
                        <section className="modal-card-body">
                           <h3 className="subtitle">{user.name}</h3>
                           <h3 className="subtitle">{user.email}</h3>
                           <a onClick={()=>props.handleChangeAccount()}>Cambiar cuenta</a>
                        </section>                    
                    : 
                        <section className="modal-card-body">
                                <div><label>Correo electrónico: <input name="email" type="text"></input></label></div>
                                <div><label>Contraseña: <input name="password" type="password"></input ></label></div>
                        </section>
                    }
                    
                    <footer className="modal-card-foot">
                        <button className="button is-success" type="submit">{user ? "Pagar" : "Login"}</button>
                        <button  className="button" onClick={props.closeModal}>Cancelar</button>
                        <Link to={'/register/client'}>Regístrate</Link>
                    </footer>
                </form>
            </div>
        </div>
    );
}
   


export default Modal